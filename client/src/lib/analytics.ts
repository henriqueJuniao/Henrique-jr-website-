export const GA4_MEASUREMENT_ID =
  import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() || "G-XXXXXXXXXX";
export const CLARITY_PROJECT_ID =
  import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || "CLARITY_PROJECT_ID";

export const CONSENT_STORAGE_KEY = "henriquejr_analytics_consent_v1";
export const CONSENT_CHANGED_EVENT = "henriquejr:analytics-consent-changed";
export const CONSENT_SETTINGS_EVENT = "henriquejr:open-analytics-settings";

export type ConsentPreference = "accepted" | "rejected";
export type ConversionEvent =
  | "contact_form_submit"
  | "email_click"
  | "phone_click"
  | "whatsapp_click";

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function isProductionWebsite(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.protocol === "https:" &&
    window.location.hostname === "www.henriquejr.com"
  );
}

export function isGa4Configured(): boolean {
  return /^G-[A-Z0-9]+$/i.test(GA4_MEASUREMENT_ID) && GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX";
}

export function isClarityConfigured(): boolean {
  return (
    /^[a-z0-9]+$/i.test(CLARITY_PROJECT_ID) &&
    CLARITY_PROJECT_ID !== "CLARITY_PROJECT_ID"
  );
}

export function getConsentPreference(): ConsentPreference | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function openAnalyticsSettings(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT));
  }
}

export function setConsentPreference(preference: ConsentPreference): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, preference);
  } catch {
    // A blocked storage API must not prevent the visitor from using the site.
  }
  window.dispatchEvent(
    new CustomEvent<ConsentPreference>(CONSENT_CHANGED_EVENT, { detail: preference }),
  );
}

function createGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  return window.gtag;
}

function loadGa4(): void {
  if (!isGa4Configured() || document.getElementById("henriquejr-ga4")) return;

  const gtag = createGtag();
  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.id = "henriquejr-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

function loadClarity(): void {
  if (!isClarityConfigured() || document.getElementById("henriquejr-clarity")) return;

  if (!window.clarity) {
    window.clarity = function clarity(...args: unknown[]) {
      (window.clarity as unknown as { q?: unknown[][] }).q =
        (window.clarity as unknown as { q?: unknown[][] }).q || [];
      (window.clarity as unknown as { q: unknown[][] }).q.push(args);
    };
  }

  window.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });

  const script = document.createElement("script");
  script.id = "henriquejr-clarity";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_PROJECT_ID)}`;
  document.head.appendChild(script);
}

export function startAnalytics(): void {
  if (getConsentPreference() !== "accepted" || !isProductionWebsite()) return;
  loadGa4();
  loadClarity();
}

function expireCookie(name: string, domain?: string): void {
  const domainAttribute = domain ? `; domain=${domain}` : "";
  document.cookie = `${name}=; Max-Age=0; path=/${domainAttribute}; SameSite=Lax`;
}

export function clearKnownAnalyticsCookies(): void {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((item) => item.trim().split("=")[0])
    .filter(
      (name) =>
        name === "_ga" ||
        name.startsWith("_ga_") ||
        name === "_gid" ||
        name === "_gat" ||
        name === "_clck" ||
        name === "_clsk",
    );

  for (const name of names) {
    expireCookie(name);
    expireCookie(name, window.location.hostname);
    expireCookie(name, ".henriquejr.com");
  }
}

export function withdrawAnalyticsConsent(): void {
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "denied",
  });
  setConsentPreference("rejected");
  clearKnownAnalyticsCookies();
}

export function trackPageView(): void {
  if (
    getConsentPreference() !== "accepted" ||
    !isProductionWebsite() ||
    !isGa4Configured()
  ) {
    return;
  }
  startAnalytics();
  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

export function trackConversion(eventName: ConversionEvent): void {
  if (getConsentPreference() !== "accepted" || !isProductionWebsite()) return;
  startAnalytics();
  if (isGa4Configured()) {
    window.gtag?.("event", eventName, {
      event_category: "conversion",
      page_path: window.location.pathname,
    });
  }
  if (isClarityConfigured()) {
    window.clarity?.("event", eventName);
  }
}
