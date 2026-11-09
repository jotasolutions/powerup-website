"use client";

import { useConsentValue } from "@/components/cookie-consent/use-cookie-consent";
import { GoogleTagManager as NextGoogleTagManager } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

const GTM_ID = "GTM-WX5BXSST";

// Pages that never load GTM, so neither Meta's pixel nor Google Analytics runs there. The
// /colaboradores ads look for photographers, not customers: their visitors must stay out of the
// pixel's audiences. Umami (in the layout) still counts the visits.
const NO_GTM_PATHS = ["/colaboradores"];

export function GoogleTagManager() {
  const hasAnalyticsConsent = useConsentValue("analytics");
  const pathname = usePathname();
  const isNoGtmPath = NO_GTM_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!GTM_ID || !hasAnalyticsConsent || isNoGtmPath) return null;

  return <NextGoogleTagManager gtmId={GTM_ID} />;
}
