"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void }
  }
}

// What each CTA leads to, read from the attributes the CTA already carries for GA4.
function destination(event: string, label: string): string {
  if (label === "advisor") return "advisor"
  if (label === "maestro") return "maestro"
  if (event === "sign_up_click") return "alta"
  if (event === "example_menu_click") return "ejemplo"
  return event
}

/**
 * Counts clicks on the blog's CTAs in Umami, which uses no cookies, so it sees every reader and
 * not only those who accept the banner (GA4 keeps getting its own events). Only clicks inside an
 * element marked `data-cta-slot` count; the event is `cta-<slot>-<destination>`, e.g.
 * `cta-lateral-advisor`. Mounted only in the blog's layout: nothing outside /blog sends these.
 */
export function BlogUmamiEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const tracked = event.target.closest<HTMLElement>("[data-track-event]")
      const slot = tracked?.closest<HTMLElement>("[data-cta-slot]")?.dataset.ctaSlot
      if (!tracked || !slot) return
      const name = tracked.dataset.trackEvent ?? ""
      const label = tracked.dataset.trackLabel ?? ""
      try {
        window.umami?.track(`cta-${slot}-${destination(name, label)}`, {
          slug: window.location.pathname.replace(/^\/blog\/?/, "") || "(portada)",
          ...(label ? { label } : {}),
        })
      } catch {
        // Measuring must never break a click.
      }
    }
    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [])
  return null
}
