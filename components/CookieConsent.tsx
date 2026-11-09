"use client";

import {
  CookieBanner,
  CookieConsentProvider,
  CookieSettings,
  type CategoryConfig,
} from "@/components/cookie-consent";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { useLocale, type Locale } from "@/lib/locale";
import { cookieCopy } from "@/components/cookie-consent/copy";

const categoryKeys = ["necessary", "analytics", "marketing", "preferences"] as const;

function cookieCategories(locale: Locale): CategoryConfig[] {
  const texts = cookieCopy[locale].categories;
  return categoryKeys.map((key) => ({
    key,
    ...texts[key],
    ...(key === "necessary" ? { required: true } : {}),
  }));
}

export function CookieConsent({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  // /embed pages live inside another PowerUp site's window (Maestro), which shows its own banner;
  // the choice made there reaches www through the shared pu_consent cookie.
  const embedded = usePathname()?.startsWith("/embed/") ?? false;
  return (
    <CookieConsentProvider
      config={{
        consentVersion: "1.0.0",
        privacyPolicyUrl: "/privacy#cookies",
        position: "bottom-left",
        categories: cookieCategories(locale),
        googleConsentMode: {
          enabled: true,
          mapping: {
            analytics_storage: "analytics",
            ad_storage: "marketing",
            ad_user_data: "marketing",
            ad_personalization: "marketing",
          },
        },
      }}
    >
      <GoogleTagManager />
      <Suspense fallback={null}>
        <AnalyticsListener />
      </Suspense>
      {children}
      {!embedded && <CookieBanner />}
      <CookieSettings />
    </CookieConsentProvider>
  );
}
