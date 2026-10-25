"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { COMPANY, whatsappUrlWithText } from "@/lib/company"

// The person who answers the site's WhatsApp. Showing a real face and name tells visitors a human
// replies, not a bot.
const TEAM_MEMBER = {
  name: "Fede",
  role: "CEO de PowerUp",
  photo: "/images/about-fede.png",
}

// Spring for the pill-to-card morph (shared layoutId), as in motion-primitives' MorphingPopover.
const MORPH = { type: "spring", bounce: 0.15, duration: 0.5 } as const

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
  const tracking = trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, {
    label: "whatsapp",
    location: "burbuja",
    linkUrl: href,
  })

  return (
    <MotionConfig reducedMotion="user" transition={MORPH}>
      <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 sm:right-6 sm:bottom-6">
        <AnimatePresence initial={false} mode="popLayout">
          {teaserOpen ? (
            <motion.div
              key="card"
              layoutId="whatsapp-shell"
              style={{ borderRadius: 16 }}
              className="w-[min(19rem,calc(100vw-2rem))] border border-slate-200 bg-white p-4 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <TeamPhoto layoutId="whatsapp-photo" className="size-14 -rotate-6 rounded-2xl shadow-lg" />
                <motion.div
                  className="min-w-0 flex-1 pt-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                >
                  <div className="font-medium text-slate-900">{TEAM_MEMBER.name}</div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <OnlineDot />
                    {TEAM_MEMBER.role}
                  </div>
                </motion.div>
                <button
                  type="button"
                  onClick={() => setTeaserOpen(false)}
                  className="-mt-1 -mr-1 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Cerrar"
                >
                  <X className="size-4" />
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
              >
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  ¡Hola!{" "}
                  <motion.span
                    className="inline-block origin-[70%_70%]"
                    animate={{ rotate: [0, 18, -8, 18, 0] }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                  >
                    👋
                  </motion.span>{" "}
                  ¿Te ayudo con tu carta?
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  Soy {TEAM_MEMBER.name}, {TEAM_MEMBER.role}. Escríbeme por WhatsApp y te contesto yo
                  mismo.
                </p>
                <Button variant="whatsapp" className="mt-4 w-full rounded-full" asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => setTeaserOpen(false)} {...tracking}>
                    <Image src="/icons/whatsapp-icon.svg" alt="" width={16} height={16} />
                    Escribir a {TEAM_MEMBER.name}
                  </a>
                </Button>
                <p className="mt-2 text-center text-xs text-slate-500">
                  Te contesta una persona, no un bot
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.a
              key="pill"
              layoutId="whatsapp-shell"
              style={{ borderRadius: 999 }}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Escribir a ${TEAM_MEMBER.name} por WhatsApp`}
              className="group flex items-center gap-3 border border-slate-200 bg-white p-1.5 shadow-xl transition-shadow hover:shadow-2xl sm:pr-5"
              {...tracking}
            >
              <span className="relative">
                <TeamPhoto layoutId="whatsapp-photo" className="size-12 rounded-full" />
                <span className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-b from-green-400 to-green-600">
                  <Image src="/icons/whatsapp-icon.svg" alt="" width={12} height={12} />
                </span>
              </span>
              <motion.span
                className="hidden leading-tight sm:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                <span className="block text-sm font-medium text-slate-900">¿Hablamos?</span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <OnlineDot />
                  Te responde {TEAM_MEMBER.name}
                </span>
              </motion.span>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

function TeamPhoto({ layoutId, className }: { layoutId: string; className: string }) {
  return (
    <motion.span layoutId={layoutId} className={`block shrink-0 overflow-hidden bg-slate-200 ${className}`}>
      <Image src={TEAM_MEMBER.photo} alt={TEAM_MEMBER.name} width={112} height={112} className="size-full object-cover" />
    </motion.span>
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
