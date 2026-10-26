"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { COMPANY, whatsappUrlWithText } from "@/lib/company"

// The person who answers the site's WhatsApp. Showing a real face and name tells visitors a human
// replies, not a bot.
const TEAM_MEMBER = {
  name: "Fede",
  photo: "/images/about-fede.png",
}

// Campaign landings stay free of anything that pulls away from sign-up. The Italian site (/it) has
// its own WhatsApp copy in home-copy.ts and no bubble yet.
const HIDDEN_PATHS = ["/vende-mas", "/visibilidad", "/it"]

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

// The home hero's "Ver ejemplo" QR (desktop only) sits in the same corner on short laptop screens,
// so the pill steps aside while it is on screen.
const STEP_ASIDE_SELECTOR = "[data-example-qr]"
const PATHS_WITH_QR = ["/"]

/**
 * Floating WhatsApp contact: a pill with the face of the person who answers. It never opens by
 * itself. docs/burbuja-whatsapp.md explains it.
 */
export function WhatsAppBubble() {
  const pathname = usePathname()
  // What the observer last reported, tied to the page it was reported on.
  const [qrState, setQrState] = useState<{ pathname: string; onScreen: boolean } | null>(null)

  useEffect(() => {
    const qr = document.querySelector(STEP_ASIDE_SELECTOR)
    if (!qr) return
    // A hidden QR (phones, display: none) never intersects, so the pill shows there.
    const observer = new IntersectionObserver(([entry]) =>
      setQrState({ pathname, onScreen: entry.isIntersecting }),
    )
    observer.observe(qr)
    return () => observer.disconnect()
  }, [pathname])

  if (HIDDEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return null

  const href = whatsappUrlFor(pathname)
  // Until the observer answers, a page with the QR keeps the pill aside, so it never flashes over it.
  const steppedAside =
    qrState?.pathname === pathname ? qrState.onScreen : PATHS_WITH_QR.includes(pathname)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir a ${TEAM_MEMBER.name} por WhatsApp`}
      aria-hidden={steppedAside || undefined}
      tabIndex={steppedAside ? -1 : undefined}
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 shadow-xl transition-[opacity,transform,box-shadow] duration-300 hover:shadow-2xl motion-reduce:transition-none sm:right-6 sm:bottom-6 sm:pr-5 ${
        steppedAside ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
      {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "whatsapp", location: "burbuja", linkUrl: href })}
    >
      <span className="relative">
        <span className="block size-12 shrink-0 overflow-hidden rounded-full bg-slate-200">
          <Image src={TEAM_MEMBER.photo} alt={TEAM_MEMBER.name} width={96} height={96} className="size-full object-cover" />
        </span>
        <span className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-b from-green-400 to-green-600">
          <Image src="/icons/whatsapp-icon.svg" alt="" width={12} height={12} />
        </span>
      </span>
      <span className="hidden leading-tight sm:block">
        <span className="block text-sm font-medium text-slate-900">¿Hablamos?</span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <OnlineDot />
          Te responde {TEAM_MEMBER.name}
        </span>
      </span>
    </a>
  )
}

function OnlineDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
      <span className="relative inline-flex size-2 rounded-full bg-green-500" />
    </span>
  )
}
