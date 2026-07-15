/** Route-aware metadata for client-side navigation; build output is prerendered from the same source of truth. */
import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  absoluteAssetUrl,
  canonicalFor,
  normalizePath,
  notFoundSeo,
  schemaFor,
  seoByPath,
  type PublicPath,
} from "@/lib/seo";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function Seo() {
  const [location] = useLocation();
  const normalizedPath = normalizePath(location);
  const isPublicPath = Object.prototype.hasOwnProperty.call(seoByPath, normalizedPath);
  const path = isPublicPath ? (normalizedPath as PublicPath) : null;
  const page = path ? seoByPath[path] : notFoundSeo;
  const canonical = path ? canonicalFor(path) : `${SITE_URL}/404`;
  const socialImage = absoluteAssetUrl(DEFAULT_SOCIAL_IMAGE_PATH);

  useEffect(() => {
    document.documentElement.lang = "en-GB";
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta(
      "name",
      "robots",
      path ? "index, follow, max-image-preview:large" : "noindex, nofollow",
    );
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "en_GB");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", socialImage);
    setMeta("property", "og:image:alt", DEFAULT_SOCIAL_IMAGE_ALT);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", socialImage);
    setMeta("name", "twitter:image:alt", DEFAULT_SOCIAL_IMAGE_ALT);
    setCanonical(canonical);

    let script = document.head.querySelector<HTMLScriptElement>(
      'script[data-henriquejr-schema="true"]',
    );

    if (!path) {
      script?.remove();
      return;
    }

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.henriquejrSchema = "true";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaFor(path, seoByPath[path]));
  }, [canonical, page.description, page.title, path, socialImage]);

  return null;
}
