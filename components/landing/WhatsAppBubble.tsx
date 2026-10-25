"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { COMPANY, whatsappUrlWithText } from "@/lib/company"

// Campaign landings stay free of anything that pulls away from sign-up.
const HIDDEN_PATHS = ["/vende-mas", "/visibilidad"]

const TEASER_DELAY_MS = 20_000
const TEASER_SCROLL_SHARE = 0.5
const TEASER_SEEN_KEY = "pu_whatsapp_teaser_seen"

// From lg a blog article keeps the Advisor card in a sticky aside, down in the bottom-right corner,
// and the teaser would cover it. Only the button shows there.
const BLOG_ARTICLE_PATH = /^\/blog\/(?!tema\/|autor\/|pagina\/)[^/]+$/
const ASIDE_MEDIA_QUERY = "(min-width: 1024px)"

function teaserWouldCoverAdvisor(pathname: string): boolean {
  return BLOG_ARTICLE_PATH.test(pathname) && window.matchMedia(ASIDE_MEDIA_QUERY).matches
}

// The typed message tells whoever answers which page the lead was on.
function whatsappUrlFor(pathname: string): string {
  if (pathname.startsWith("/pricing")) {
    return whatsappUrlWithText("Hola, estoy viendo los precios de PowerUp Menu y tengo una duda")
  }
  if (pathname.startsWith("/pagina-web")) {
    return whatsappUrlWithText("Hola, me interesa la página web de PowerUp Menu")
  }
  if (pathname.startsWith("/blog")) {
    return whatsappUrlWithText("Hola, estaba leyendo el blog de PowerUp Menu y tengo una pregunta")
  }
  return COMPANY.whatsappUrl
}

function teaserAlreadySeen(): boolean {
  try {
    return sessionStorage.getItem(TEASER_SEEN_KEY) === "1"
  } catch {
    return false
  }
}

function markTeaserSeen() {
  try {
    sessionStorage.setItem(TEASER_SEEN_KEY, "1")
  } catch {
    // Without storage the teaser may come back on the next page; nothing else breaks.
  }
}

/** Floating WhatsApp button with a one-off teaser per visit (after 20 s or half the page). */
export function WhatsAppBubble() {
  const pathname = usePathname()
  const hidden = HIDDEN_PATHS.some((path) => pathname.startsWith(path))
  const [teaserOpen, setTeaserOpen] = useState(false)

  useEffect(() => {
    if (hidden || teaserAlreadySeen() || teaserWouldCoverAdvisor(pathname)) return

    const show = () => {
      markTeaserSeen()
      setTeaserOpen(true)
      cleanup()
    }
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable > 0 && window.scrollY / scrollable >= TEASER_SCROLL_SHARE) show()
    }
    const timer = window.setTimeout(show, TEASER_DELAY_MS)
    window.addEventListener("scroll", onScroll, { passive: true })
    // Arriving already past half the page (anchor link, back navigation) counts too.
    onScroll()
    function cleanup() {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
    return cleanup
  }, [hidden, pathname])

  if (hidden) return null

  const href = whatsappUrlFor(pathname)

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {teaserOpen && (
        <div className="relative max-w-[15rem] rounded-2xl border border-slate-200 bg-white py-3 pr-9 pl-4 text-sm leading-5 text-slate-700 shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTeaserOpen(false)}
            {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, {
              label: "whatsapp",
              location: "burbuja",
              linkUrl: href,
            })}
          >
            <span className="font-semibold text-slate-900">¿Dudas?</span> Escríbenos por WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setTeaserOpen(false)}
            className="absolute top-2 right-2 rounded-full p-1 text-slate-400 transition-colors hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        onClick={() => setTeaserOpen(false)}
        className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, {
          label: "whatsapp",
          location: "burbuja",
          linkUrl: href,
        })}
      >
        <Image src="/icons/whatsapp-icon.svg" alt="" width={28} height={28} />
      </a>
    </div>
  )
}
