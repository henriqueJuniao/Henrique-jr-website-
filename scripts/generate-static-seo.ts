import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  absoluteAssetUrl,
  canonicalFor,
  notFoundSeo,
  schemaFor,
  seoPages,
  type SeoPage,
} from "../client/src/lib/seo";

const outputDirectory = path.resolve(process.cwd(), "dist/public");
const indexPath = path.join(outputDirectory, "index.html");
const baseHtml = await readFile(indexPath, "utf8");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setMeta(
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string,
): string {
  const expression = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*\\/?>`,
    "i",
  );
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace("</head>", `  ${tag}\n  </head>`);
}

function setCanonical(html: string, href: string): string {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  const expression = /<link\s+[^>]*rel=["']canonical["'][^>]*\/?>/i;
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace("</head>", `  ${tag}\n  </head>`);
}

function setTitle(html: string, title: string): string {
  const tag = `<title>${escapeHtml(title)}</title>`;
  return /<title>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title>[\s\S]*?<\/title>/i, tag)
    : html.replace("</head>", `  ${tag}\n  </head>`);
}

function removeSchema(html: string): string {
  return html.replace(
    /\s*<script\s+type=["']application\/ld\+json["'][^>]*data-henriquejr-schema=["']true["'][^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
}

function setSchema(html: string, value: unknown): string {
  const safeJson = JSON.stringify(value).replaceAll("<", "\\u003c");
  const script = `    <script type="application/ld+json" data-henriquejr-schema="true">${safeJson}</script>`;
  return removeSchema(html).replace("</head>", `${script}\n  </head>`);
}

function removeHomeImagePreload(html: string): string {
  return html.replace(
    /\s*<link\s+rel=["']preload["']\s+as=["']image["'][\s\S]*?fetchpriority=["']high["']\s*\/?>/i,
    "",
  );
}

function renderPage(page: SeoPage): string {
  const canonical = canonicalFor(page.path);
  const socialImage = absoluteAssetUrl(DEFAULT_SOCIAL_IMAGE_PATH);
  let html = page.path === "/" ? baseHtml : removeHomeImagePreload(baseHtml);

  html = setTitle(html, page.title);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "name", "robots", "index, follow, max-image-preview:large");
  html = setMeta(html, "property", "og:type", "website");
  html = setMeta(html, "property", "og:locale", "en_GB");
  html = setMeta(html, "property", "og:site_name", SITE_NAME);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "property", "og:image", socialImage);
  html = setMeta(html, "property", "og:image:alt", DEFAULT_SOCIAL_IMAGE_ALT);
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = setMeta(html, "name", "twitter:image", socialImage);
  html = setMeta(html, "name", "twitter:image:alt", DEFAULT_SOCIAL_IMAGE_ALT);
  html = setCanonical(html, canonical);
  html = setSchema(html, schemaFor(page.path, page));
  return html;
}

for (const page of seoPages) {
  const outputPath = page.path === "/"
    ? indexPath
    : path.join(outputDirectory, `${page.path.slice(1)}.html`);
  await writeFile(outputPath, renderPage(page), "utf8");
}

let notFoundHtml = removeHomeImagePreload(baseHtml);
notFoundHtml = setTitle(notFoundHtml, notFoundSeo.title);
notFoundHtml = setMeta(notFoundHtml, "name", "description", notFoundSeo.description);
notFoundHtml = setMeta(notFoundHtml, "name", "robots", "noindex, nofollow");
notFoundHtml = setMeta(notFoundHtml, "property", "og:title", notFoundSeo.title);
notFoundHtml = setMeta(notFoundHtml, "property", "og:description", notFoundSeo.description);
notFoundHtml = setMeta(notFoundHtml, "property", "og:url", `${SITE_URL}/404`);
notFoundHtml = setMeta(notFoundHtml, "name", "twitter:title", notFoundSeo.title);
notFoundHtml = setMeta(notFoundHtml, "name", "twitter:description", notFoundSeo.description);
notFoundHtml = setCanonical(notFoundHtml, `${SITE_URL}/404`);
notFoundHtml = removeSchema(notFoundHtml);
await writeFile(path.join(outputDirectory, "404.html"), notFoundHtml, "utf8");

const sitemapEntries = seoPages
  .map(
    (page) => `  <url>\n    <loc>${canonicalFor(page.path)}</loc>\n    <changefreq>${page.changeFrequency}</changefreq>\n    <priority>${page.priority.toFixed(1)}</priority>\n  </url>`,
  )
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap, "utf8");

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
await writeFile(path.join(outputDirectory, "robots.txt"), robots, "utf8");

await mkdir(path.join(outputDirectory, ".well-known"), { recursive: true });
console.log(`Generated crawler-visible metadata for ${seoPages.length} public routes plus 404.html.`);
