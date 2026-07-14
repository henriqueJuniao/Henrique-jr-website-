import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const chromePath = "/usr/bin/chromium";
const port = 9333;
const outputDir = "/home/ubuntu/henriquejr-v1/v4-qa";
const url = process.argv[2] || "http://127.0.0.1:3000/";

await mkdir(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  "--user-data-dir=/tmp/henriquejr-v4-menu-audit",
  "--window-size=390,844",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJson(path, attempts = 50) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}${path}`);
      if (response.ok) return response.json();
    } catch {
      // Chromium is still starting.
    }
    await sleep(100);
  }
  throw new Error(`Chromium DevTools endpoint did not become ready: ${path}`);
}

try {
  await waitForJson("/json/version");
  const targets = await waitForJson("/json/list");
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("No Chromium page target found.");

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(JSON.stringify(message.error)));
    else waiter.resolve(message.result);
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, { resolve, reject });
    socket.send(JSON.stringify({ id: messageId, method, params }));
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
    screenWidth: 390,
    screenHeight: 844,
  });
  await send("Page.navigate", { url });
  await sleep(1800);

  await send("Runtime.evaluate", {
    expression: `document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo({ top: 640, behavior: 'instant' });`,
    awaitPromise: true,
  });
  await sleep(180);
  await send("Runtime.evaluate", {
    expression: `document.querySelector('.menu-button')?.click();`,
    awaitPromise: true,
  });
  await sleep(450);

  const openAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const overlay = document.querySelector('.mobile-menu');
      const rect = overlay?.getBoundingClientRect();
      const active = document.activeElement;
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        overlayRect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null,
        overlayVisibility: overlay ? getComputedStyle(overlay).visibility : null,
        overlayOpacity: overlay ? getComputedStyle(overlay).opacity : null,
        overlayZIndex: overlay ? getComputedStyle(overlay).zIndex : null,
        htmlOverflow: getComputedStyle(document.documentElement).overflow,
        bodyOverflow: getComputedStyle(document.body).overflow,
        bodyPosition: getComputedStyle(document.body).position,
        bodyTop: getComputedStyle(document.body).top,
        mainInert: document.querySelector('#main-content')?.hasAttribute('inert') ?? false,
        footerInert: document.querySelector('.site-footer')?.hasAttribute('inert') ?? false,
        activeElement: active ? {
          tag: active.tagName,
          ariaLabel: active.getAttribute('aria-label'),
          className: active.getAttribute('class'),
        } : null,
        menuOpen: overlay?.classList.contains('is-open') ?? false,
      };
    })()`,
    returnByValue: true,
  });

  const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  await writeFile(`${outputDir}/mobile-menu-open.png`, Buffer.from(screenshot.data, "base64"));

  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await sleep(350);

  const closeAudit = await send("Runtime.evaluate", {
    expression: `(() => ({
      menuOpen: document.querySelector('.mobile-menu')?.classList.contains('is-open') ?? false,
      htmlOverflow: getComputedStyle(document.documentElement).overflow,
      bodyPosition: getComputedStyle(document.body).position,
      mainInert: document.querySelector('#main-content')?.hasAttribute('inert') ?? false,
      activeElement: document.activeElement ? {
        tag: document.activeElement.tagName,
        ariaLabel: document.activeElement.getAttribute('aria-label'),
        className: document.activeElement.getAttribute('class'),
      } : null,
      scrollY: window.scrollY,
    }))()`,
    returnByValue: true,
  });

  const opened = openAudit.result.value;
  const closedWithEscape = closeAudit.result.value;
  const passed = opened.menuOpen
    && opened.overlayRect?.x === 0
    && opened.overlayRect?.y === 0
    && opened.overlayRect?.width === opened.viewport.width
    && opened.overlayRect?.height === opened.viewport.height
    && opened.overlayVisibility === "visible"
    && Number(opened.overlayOpacity) === 1
    && Number(opened.overlayZIndex) >= 200
    && opened.htmlOverflow === "hidden"
    && opened.bodyOverflow === "hidden"
    && opened.mainInert
    && opened.footerInert
    && opened.activeElement?.ariaLabel === "Close navigation"
    && !closedWithEscape.menuOpen
    && !closedWithEscape.mainInert
    && closedWithEscape.activeElement?.ariaLabel === "Open navigation"
    && closedWithEscape.scrollY === 640;
  const report = {
    url,
    passed,
    opened,
    closedWithEscape,
  };
  await writeFile(`${outputDir}/mobile-menu-audit.json`, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  socket.close();
} finally {
  chrome.kill("SIGTERM");
}
