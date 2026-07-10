import { loadConsentState } from "@/components/cookie-consent/utils";
import type { AnalyticsEventName, AnalyticsEventParams } from "./events";

function hasAnalyticsConsent(): boolean {
  const state = loadConsentState();
  return state?.categories.analytics ?? false;
}

function cleanParams(
  params?: AnalyticsEventParams
): Record<string, string | number | boolean> {
  if (!params) return {};

  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  ) as Record<string, string | number | boolean>;
}

export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function trackEvent(
  event: AnalyticsEventName | string,
  params?: AnalyticsEventParams
): void {
  pushToDataLayer({
    event,
    ...cleanParams(params),
  });
}

export function trackPageView(params: {
  page_path: string;
  page_title?: string;
  page_location?: string;
}): void {
  trackEvent("page_view", {
    page_path: params.page_path,
    page_title: params.page_title ?? document.title,
    page_location: params.page_location ?? window.location.href,
  });
}
