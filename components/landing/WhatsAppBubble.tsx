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

// The pill is always there; the card opens by itself only once the visitor has gone past the
// section where doubts show up (the prices), never on top of it: on a phone the card covers half
// the screen. Pages not listed here (blog, legal) never open it by themselves.
const AUTO_OPEN_AFTER_SECTION: Record<string, string> = {
  "/": "preguntas", // after prices and the FAQ, which has its own WhatsApp button
  "/pricing": "pricing", // after the price cards
  "/pagina-web": "website-pricing",
}

// While one of these is on screen the card waits: the visitor is busy with the main goal.
const BUSY_SECTIONS = ["advisor"]

// Roughly where the open card sits, measured from the bottom-right corner (it is 19rem wide).
const CARD_ZONE = { width: 340, height: 380 }

// Scrolling this far with the card open, without touching it, folds it back into the pill.
const AUTO_CLOSE_SCROLL_PX = 400

const SEEN_THIS_VISIT_KEY = "pu_whatsapp_card_seen" // sessionStorage
const SIGNED_UP_THIS_VISIT_KEY = "pu_whatsapp_signup_click" // sessionStorage
const CLOSED_AT_KEY = "pu_whatsapp_card_closed_at" // localStorage, timestamp
const CONTACTED_KEY = "pu_whatsapp_contacted" // localStorage
const CLOSED_QUIET_MS = 7 * 24 * 60 * 60 * 1000

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

// Storage can throw (private mode, blocked site data). Failing open only means the card may show
// again; nothing else depends on it.
function readStorage(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key)
  } catch {
    return null
  }
}

function writeStorage(storage: () => Storage, key: string, value: string) {
  try {
    storage().setItem(key, value)
  } catch {}
}

const session = () => window.sessionStorage
const local = () => window.localStorage

function mayAutoOpen(): boolean {
  if (readStorage(session, SEEN_THIS_VISIT_KEY)) return false
  if (readStorage(session, SIGNED_UP_THIS_VISIT_KEY)) return false
  if (readStorage(local, CONTACTED_KEY)) return false
  const closedAt = Number(readStorage(local, CLOSED_AT_KEY))
  return !closedAt || Date.now() - closedAt > CLOSED_QUIET_MS
}

// A sign-up button under the card would be hidden by it: the card never covers the main goal.
// `lookahead` extends the zone below the screen, so the card doesn't open just before a button
// scrolls into it.
function signUpButtonUnderCard(lookahead = 0): boolean {
  const zoneTop = window.innerHeight - CARD_ZONE.height
  const zoneLeft = window.innerWidth - CARD_ZONE.width
  return [...document.querySelectorAll('[data-track-event="sign_up_click"]')].some((button) => {
    const rect = button.getBoundingClientRect()
    return (
      rect.width > 0 &&
      rect.bottom > zoneTop &&
      rect.top < window.innerHeight + lookahead &&
      rect.right > zoneLeft
    )
  })
}

// "Past" the section: none of it is left where the card would open.
function sectionIsPast(section: HTMLElement): boolean {
  return section.getBoundingClientRect().bottom <= window.innerHeight - CARD_ZONE.height
}

function visitorIsBusy(): boolean {
  if (signUpButtonUnderCard(AUTO_CLOSE_SCROLL_PX)) return true
  const active = document.activeElement
  if (active instanceof HTMLElement && active.matches("input, textarea, select, [contenteditable]")) {
    return true
  }
  return BUSY_SECTIONS.some((id) => {
    const rect = document.getElementById(id)?.getBoundingClientRect()
    return rect !== undefined && rect.top < window.innerHeight && rect.bottom > 0
  })
}

/**
 * Floating WhatsApp contact: a pill with the face of the person who answers, which once per visit
 * morphs into a card after the prices. docs/burbuja-whatsapp.md explains every rule.
 */
export function WhatsAppBubble() {
  const pathname = usePathname()
  const hidden = HIDDEN_PATHS.some((path) => pathname.startsWith(path))
  const [cardOpen, setCardOpen] = useState(false)

  // A sign-up click anywhere means the visitor is on the main path: leave them alone this visit.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('[data-track-event="sign_up_click"]')) {
        writeStorage(session, SIGNED_UP_THIS_VISIT_KEY, "1")
      }
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  useEffect(() => {
    const sectionId = AUTO_OPEN_AFTER_SECTION[pathname]
    if (hidden || !sectionId || !mayAutoOpen()) return

    let frame = 0
    const check = () => {
      frame = 0
      const section = document.getElementById(sectionId)
      if (!section || !sectionIsPast(section)) return
      if (!mayAutoOpen() || visitorIsBusy()) return
      writeStorage(session, SEEN_THIS_VISIT_KEY, "1")
      setCardOpen(true)
      window.removeEventListener("scroll", onScroll)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    // Arriving already past the section (anchor link, back navigation) counts too.
    check()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [hidden, pathname])

  // Keep scrolling past the open card, or bring a sign-up button under it, and it folds back into
  // the pill.
  useEffect(() => {
    if (!cardOpen) return
    const openedAt = window.scrollY
    const onScroll = () => {
      if (Math.abs(window.scrollY - openedAt) > AUTO_CLOSE_SCROLL_PX || signUpButtonUnderCard()) {
        setCardOpen(false)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [cardOpen])

  const closeCard = () => {
    writeStorage(local, CLOSED_AT_KEY, String(Date.now()))
    setCardOpen(false)
  }

  const markContacted = () => {
    writeStorage(local, CONTACTED_KEY, "1")
    setCardOpen(false)
  }

  if (hidden) return null

  const href = whatsappUrlFor(pathname)
  const trackingAt = (location: string) =>
    trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "whatsapp", location, linkUrl: href })

  return (
    <MotionConfig reducedMotion="user" transition={MORPH}>
      <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 sm:right-6 sm:bottom-6">
        <AnimatePresence initial={false} mode="popLayout">
          {cardOpen ? (
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
                  onClick={closeCard}
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
                  <a href={href} target="_blank" rel="noopener noreferrer" onClick={markContacted} {...trackingAt("burbuja_tarjeta")}>
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
              onClick={markContacted}
              {...trackingAt("burbuja")}
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
