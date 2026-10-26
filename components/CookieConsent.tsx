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
      <CookieBanner />
      <CookieSettings />
    </CookieConsentProvider>
  );
}
