"use client";

import { useCookieConsent } from "@/components/cookie-consent";

export function CookieSettingsLink() {
  const { openSettings, state } = useCookieConsent();

  if (!state.hasConsented) {
    return <p>Cookies</p>;
  }

  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-left text-sm hover:opacity-80"
    >
      Cookies
    </button>
  );
}
