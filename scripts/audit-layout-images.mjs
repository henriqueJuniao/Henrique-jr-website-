import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const chromePath = "/usr/bin/chromium";
const port = 9444;
const outputDir = "/home/ubuntu/henriquejr-v1/v4-qa";
const baseUrl = process.argv[2] || "http://127.0.0.1:3000";
const routes = ["/", "/about", "/private-coaching", "/corporate", "/kids", "/testimonials", "/contact"];
const viewports = [
  { name: "mobile", width: 390, height: 844, mobile: false },
  { name: "tablet", width: 768, height: 1024, mobile: false },
  { name: "desktop", width: 1440, height: 900, mobile: false },
];

await mkdir(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  "--user-data-dir=/tmp/henriquejr-v3-layout-audit",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJson(path, attempts = 60) {
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

  const results = [];
  for (const viewport of viewports) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile,
      screenWidth: viewport.width,
      screenHeight: viewport.height,
    });

    for (const route of routes) {
      await send("Page.navigate", { url: `${baseUrl}${route}` });
      await sleep(900);

      const pageHeightResult = await send("Runtime.evaluate", {
        expression: "Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)",
        returnByValue: true,
      });
      const pageHeight = pageHeightResult.result.value;
      const step = Math.max(320, Math.round(viewport.height * 0.72));
      for (let y = 0; y <= pageHeight; y += step) {
        await send("Runtime.evaluate", {
          expression: `window.scrollTo({ top: ${y}, behavior: 'instant' })`,
        });
        await sleep(70);
      }
      await send("Runtime.evaluate", {
        expression: "window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })",
      });
      await sleep(450);
      await send("Runtime.evaluate", {
        expression: `Promise.race([
          Promise.all([...document.images].map((image) => image.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
              }))),
          new Promise((resolve) => setTimeout(resolve, 6000)),
        ])`,
        awaitPromise: true,
      });

      const audit = await send("Runtime.evaluate", {
        expression: `(() => {
          const images = [...document.images]
            .filter((image) => getComputedStyle(image).display !== 'none')
            .map((image) => ({
              alt: image.alt,
              loading: image.loading,
              complete: image.complete,
              naturalWidth: image.naturalWidth,
              naturalHeight: image.naturalHeight,
              renderedWidth: Math.round(image.getBoundingClientRect().width),
              renderedHeight: Math.round(image.getBoundingClientRect().height),
            }));
          const overflowElements = [...document.querySelectorAll('body *')]
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                tag: element.tagName,
                className: typeof element.className === 'string' ? element.className : '',
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              };
            })
            .filter((element) => element.right > window.innerWidth + 1 || element.left < -1)
            .slice(0, 20);
          const h1 = document.querySelector('.contact-page__heading h1');
          const form = document.querySelector('.contact-form');
          const h1Rect = h1?.getBoundingClientRect();
          const formRect = form?.getBoundingClientRect();
          const contactOverlap = h1Rect && formRect
            ? Math.max(0, Math.min(h1Rect.right, formRect.right) - Math.max(h1Rect.left, formRect.left)) > 0
              && Math.max(0, Math.min(h1Rect.bottom, formRect.bottom) - Math.max(h1Rect.top, formRect.top)) > 0
            : false;
          const contactSingleColumn = h1Rect && formRect ? formRect.top >= h1Rect.bottom - 1 : true;
          return {
            title: document.title,
            innerWidth: window.innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
            overflowElements,
            renderedImageCount: images.length,
            failedImages: images.filter((image) => !image.complete || image.naturalWidth === 0),
            zeroSizeImages: images.filter((image) => image.renderedWidth === 0 || image.renderedHeight === 0),
            contactOverlap,
            contactSingleColumn,
            contactHeadingRect: h1Rect ? { left: h1Rect.left, right: h1Rect.right, top: h1Rect.top, bottom: h1Rect.bottom } : null,
            contactFormRect: formRect ? { left: formRect.left, right: formRect.right, top: formRect.top, bottom: formRect.bottom } : null,
          };
        })()`,
        returnByValue: true,
      });

      results.push({ viewport: viewport.name, route, requiresContactStack: viewport.width <= 900, ...audit.result.value });
    }
  }

  const summary = {
    baseUrl,
    passed: results.every((result) => !result.horizontalOverflow && result.failedImages.length === 0 && result.zeroSizeImages.length === 0 && !result.contactOverlap && (!result.requiresContactStack || result.contactSingleColumn)),
    results,
  };
  await writeFile(`${outputDir}/layout-image-audit.json`, `${JSON.stringify(summary, null, 2)}\n`);
  console.log(JSON.stringify({
    passed: summary.passed,
    results: results.map(({ viewport, route, horizontalOverflow, renderedImageCount, failedImages, zeroSizeImages, contactOverlap, requiresContactStack, contactSingleColumn }) => ({
      viewport,
      route,
      horizontalOverflow,
      renderedImageCount,
      failedImageCount: failedImages.length,
      zeroSizeImageCount: zeroSizeImages.length,
      contactOverlap,
      contactStackPass: !requiresContactStack || contactSingleColumn,
    })),
  }, null, 2));
  socket.close();
} finally {
  chrome.kill("SIGTERM");
}
