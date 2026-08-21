import { loadConsentState } from "@/components/cookie-consent/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import type { AnalyticsEventName, AnalyticsEventParams } from "./events";

/** Keys we previously pushed; cleared before the next event to avoid GTM merge bleed. */
let lastEventKeys: string[] = [];

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

function clearStaleDataLayerKeys(nextPayload: Record<string, unknown>): void {
  const staleKeys = lastEventKeys.filter(
    (key) => key !== "event" && !(key in nextPayload)
  );

  if (staleKeys.length === 0) return;

  sendGTMEvent(
    Object.fromEntries(staleKeys.map((key) => [key, undefined]))
  );
}


export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  const nextPayload: Record<string, unknown> = {
    ...payload,
    event_id: crypto.randomUUID(),
  };

  clearStaleDataLayerKeys(nextPayload);
  lastEventKeys = Object.keys(nextPayload);
  sendGTMEvent(nextPayload);
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
