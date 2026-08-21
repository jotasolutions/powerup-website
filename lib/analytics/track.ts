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

/** Dedup ventana: eventos con misma firma dentro de X ms se descartan. */
const DEDUP_WINDOW_MS = 2000;
const recentSignatures = new Map<string, number>();

function eventSignature(payload: Record<string, unknown>): string {
  // Firma sin event_id (siempre cambia) y sin timestamps.
  // Usa las claves de identidad del evento.
  const identity = {
    event: payload.event,
    page_path: payload.page_path,
    cta_id: payload.cta_id,
    location: payload.location,
    link_url: payload.link_url,
  };
  return JSON.stringify(identity);
}

function isDuplicate(payload: Record<string, unknown>): boolean {
  const sig = eventSignature(payload);
  const now = Date.now();
  const last = recentSignatures.get(sig);

  if (last && now - last < DEDUP_WINDOW_MS) {
    return true;
  }

  recentSignatures.set(sig, now);

  // Limpieza para no leakear memoria
  if (recentSignatures.size > 50) {
    const cutoff = now - DEDUP_WINDOW_MS;
    for (const [key, ts] of recentSignatures.entries()) {
      if (ts < cutoff) recentSignatures.delete(key);
    }
  }

  return false;
}

export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  const nextPayload: Record<string, unknown> = {
    ...payload,
    event_id: crypto.randomUUID(),
  };
  if (isDuplicate(nextPayload)) return;
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
