import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_SETTINGS_EVENT,
  getConsentPreference,
  setConsentPreference,
  startAnalytics,
  trackPageView,
  trackConversion,
  withdrawAnalyticsConsent,
  type ConsentPreference,
} from "@/lib/analytics";

export default function AnalyticsConsent() {
  const [location] = useLocation();
  const [preference, setPreference] = useState<ConsentPreference | null>(() =>
    getConsentPreference(),
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    () => getConsentPreference() === "accepted",
  );

  useEffect(() => {
    const onConsentChange = (event: Event) => {
      const value = (event as CustomEvent<ConsentPreference>).detail;
      setPreference(value);
      setAnalyticsEnabled(value === "accepted");
    };
    const onOpenSettings = () => {
      setAnalyticsEnabled(getConsentPreference() === "accepted");
      setSettingsOpen(true);
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
    window.addEventListener(CONSENT_SETTINGS_EVENT, onOpenSettings);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
      window.removeEventListener(CONSENT_SETTINGS_EVENT, onOpenSettings);
    };
  }, []);

  useEffect(() => {
    if (preference !== "accepted") return;
    startAnalytics();
    const frame = window.requestAnimationFrame(() => trackPageView());
    return () => window.cancelAnimationFrame(frame);
  }, [location, preference]);

  useEffect(() => {
    const onContactLinkClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href")?.trim().toLowerCase() || "";

      if (href.startsWith("mailto:")) trackConversion("email_click");
      else if (href.startsWith("tel:")) trackConversion("phone_click");
      else if (
        href.includes("wa.me/") ||
        href.includes("whatsapp.com/") ||
        href.startsWith("whatsapp:")
      ) {
        trackConversion("whatsapp_click");
      }
    };

    document.addEventListener("click", onContactLinkClick);
    return () => document.removeEventListener("click", onContactLinkClick);
  }, []);

  const acceptAnalytics = () => {
    setConsentPreference("accepted");
    setSettingsOpen(false);
  };

  const rejectAnalytics = () => {
    if (getConsentPreference() === "accepted") {
      withdrawAnalyticsConsent();
      window.location.reload();
      return;
    }
    setConsentPreference("rejected");
    setSettingsOpen(false);
  };

  const saveSettings = () => {
    if (analyticsEnabled) acceptAnalytics();
    else rejectAnalytics();
  };

  return (
    <>
      {preference === null && !settingsOpen ? (
        <section
          className="consent-banner"
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          aria-describedby="consent-description"
        >
          <div className="consent-banner__copy">
            <p className="eyebrow" id="consent-title">Analytics preferences</p>
            <p id="consent-description">
              This site uses essential storage for your privacy choice. Optional Google
              Analytics and Microsoft Clarity will load only if you accept analytics.
            </p>
            <a href="/privacy">Read the privacy and analytics notice</a>
          </div>
          <div className="consent-banner__actions">
            <button type="button" className="button button-secondary" onClick={rejectAnalytics}>
              Reject analytics
            </button>
            <button type="button" className="button button-secondary" onClick={() => setSettingsOpen(true)}>
              Manage settings
            </button>
            <button type="button" className="button button-primary" onClick={acceptAnalytics}>
              Accept analytics
            </button>
          </div>
        </section>
      ) : null}

      {settingsOpen ? (
        <div className="consent-settings-backdrop" role="presentation">
          <section
            className="consent-settings"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-settings-title"
          >
            <div className="consent-settings__header">
              <div>
                <p className="eyebrow">Privacy controls</p>
                <h2 id="consent-settings-title">Analytics settings</h2>
              </div>
              <button
                type="button"
                className="consent-settings__close"
                aria-label="Close analytics settings"
                onClick={() => setSettingsOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="consent-setting-row">
              <div>
                <h3>Essential storage</h3>
                <p>Stores only your analytics preference. This cannot be switched off.</p>
              </div>
              <span className="consent-setting-status">Always active</span>
            </div>

            <label className="consent-setting-row consent-setting-row--interactive">
              <div>
                <h3>Analytics</h3>
                <p>
                  Allows Google Analytics and Microsoft Clarity to measure site use and
                  contact-action conversions. No advertising storage is enabled.
                </p>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                aria-label="Allow analytics"
              />
            </label>

            <div className="consent-settings__actions">
              <button type="button" className="button button-secondary" onClick={rejectAnalytics}>
                Reject analytics
              </button>
              <button type="button" className="button button-primary" onClick={saveSettings}>
                Save settings
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
