"use client";

import { useConsentValue } from "@/components/cookie-consent/use-cookie-consent";
import { GoogleTagManager as NextGoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  const hasAnalyticsConsent = useConsentValue("analytics");

  if (!GTM_ID || !hasAnalyticsConsent) return null;

  return <NextGoogleTagManager gtmId={GTM_ID} />;
}
