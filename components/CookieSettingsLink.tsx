"use client";

import { useCookieConsent } from "@/components/cookie-consent";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

export function CookieSettingsLink() {
  const { openSettings, state } = useCookieConsent();

  if (!state.hasConsented) {
    return <p>Cookies</p>;
  }

  return (
    <button
      type="button"
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.COOKIE_SETTINGS_OPEN, { location: "footer" });
        openSettings();
      }}
      className="text-left text-sm hover:opacity-80"
    >
      Cookies
    </button>
  );
}
