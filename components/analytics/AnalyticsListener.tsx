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

export function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasAnalyticsConsent = useConsentValue("analytics");
  const isFirstPageView = useRef(true);
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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const section = (entry.target as HTMLElement).dataset.trackSection;
          if (!section || viewedSections.current.has(section)) continue;

          viewedSections.current.add(section);
          trackEvent(ANALYTICS_EVENTS.SECTION_VIEW, {
            section_name: section,
            page_path: pathname,
          });
        }
      },
      { threshold: 0.35 }
    );

    const sections = document.querySelectorAll("[data-track-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [hasAnalyticsConsent, pathname]);

  useEffect(() => {
    if (!hasAnalyticsConsent) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (isFirstPageView.current) {
      isFirstPageView.current = false;
      return;
    }

    trackPageView({ page_path: pagePath });
  }, [hasAnalyticsConsent, pathname, searchParams]);

  return null;
}
