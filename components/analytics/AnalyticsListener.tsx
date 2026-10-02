"use client";

import { useConsentValue } from "@/components/cookie-consent/use-cookie-consent";
import { ANALYTICS_EVENTS, trackEvent, trackPageView } from "@/lib/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

function getTrackedElement(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest("[data-track-event]") as HTMLElement | null;
}

function getLinkUrl(element: HTMLElement): string | undefined {
  const explicitUrl = element.dataset.trackLinkUrl;
  if (explicitUrl) return explicitUrl;

  const anchor = element.closest("a");
  return anchor?.href || undefined;
}

// A section counts as seen when 35% of it is on screen at once. One taller than about three
// screens never gets there, so it counts when it fills at least half the screen instead.
const SECTION_VISIBLE_SHARE = 0.35;
const TALL_SECTION_SCREEN_SHARE = 0.5;
const TALL_SECTION_THRESHOLDS = [0.02, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];

function fillsHalfTheScreenWhileTall(entry: IntersectionObserverEntry): boolean {
  const screenHeight = entry.rootBounds?.height ?? window.innerHeight;
  const isTall = entry.boundingClientRect.height * SECTION_VISIBLE_SHARE > screenHeight;
  return isTall && entry.intersectionRect.height >= screenHeight * TALL_SECTION_SCREEN_SHARE;
}

export function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasAnalyticsConsent = useConsentValue("analytics");
  const lastTrackedPath = useRef<string | null>(null);
  const viewedSections = useRef(new Set<string>());

  useEffect(() => {
    if (!hasAnalyticsConsent) return;

    const handleClick = (event: MouseEvent) => {
      const element = getTrackedElement(event.target);
      if (!element) return;

      const eventName = element.dataset.trackEvent;
      if (!eventName) return;

      trackEvent(eventName, {
        event_label: element.dataset.trackLabel || element.textContent?.trim().slice(0, 120),
        link_url: getLinkUrl(element),
        link_text: element.textContent?.trim().slice(0, 120),
        location: element.dataset.trackLocation ||
          element.closest("[data-track-location]")?.getAttribute("data-track-location") ||
          undefined,
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [hasAnalyticsConsent]);

  useEffect(() => {
    if (!hasAnalyticsConsent) return;

    const markSectionViewed = (target: Element) => {
      const section = (target as HTMLElement).dataset.trackSection;
      if (!section || viewedSections.current.has(section)) return;

      viewedSections.current.add(section);
      trackEvent(ANALYTICS_EVENTS.SECTION_VIEW, {
        section_name: section,
        page_path: pathname,
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) markSectionViewed(entry.target);
        }
      },
      { threshold: SECTION_VISIBLE_SHARE }
    );

    const tallSectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && fillsHalfTheScreenWhileTall(entry)) {
            markSectionViewed(entry.target);
          }
        }
      },
      { threshold: TALL_SECTION_THRESHOLDS }
    );

    const sections = document.querySelectorAll("[data-track-section]");
    sections.forEach((section) => {
      observer.observe(section);
      tallSectionObserver.observe(section);
    });

    return () => {
      observer.disconnect();
      tallSectionObserver.disconnect();
    };
  }, [hasAnalyticsConsent, pathname]);

  useEffect(() => {
    if (!hasAnalyticsConsent) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    // Same URL → skip (re-renders / React Strict Mode).
    if (lastTrackedPath.current === pagePath) return;

    lastTrackedPath.current = pagePath;
    viewedSections.current = new Set();

    trackPageView({ page_path: pagePath });
  }, [hasAnalyticsConsent, pathname, searchParams]);

  return null;
}
