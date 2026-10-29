"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useSyncExternalStore } from "react"
import { AdvisorTrigger } from "@/app/blog/_components/AdvisorDialog"
import { GradientFrame } from "@/app/blog/_components/AdvisorPromo"
import { AdvisorStoryMini } from "@/app/blog/_components/AdvisorStoryMini"
import { CircledWord } from "@/app/blog/_components/CircledWord"
import { buttonAdvisor, eyebrow, pageTitle } from "@/app/blog/_components/styles"
import { advisorCopy } from "@/components/advisor-copy"
import { AdvisorClaims, AdvisorPressSeal } from "@/components/landing/AdvisorProof"
import { BorderBeam } from "@/components/landing/BorderBeam"
import { localeFromPath, type Locale } from "@/lib/locale"
import { cn } from "@/lib/utils"
import { NOT_FOUND_COPY } from "./not-found-copy"
import { REDIRECT_SECONDS, useRedirectCountdown } from "./use-redirect-countdown"

const inlineLink = "font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"

// Every 404 (site, blog, /it): the "0" is a timer that takes the visit home, and the Advisor is
// offered meanwhile. Opening it stops the timer, so nobody is sent away halfway through the form.
// Needs an AdvisorDialogProvider above it (the blog layout has one; app/not-found.tsx adds it).
export function NotFoundView({ showLogo = false }: { showLogo?: boolean }) {
  const locale = useLocaleAfterHydration()
  const copy = NOT_FOUND_COPY[locale]
  const advisor = advisorCopy[locale].section
  const countdown = useRedirectCountdown(copy.homeHref)
  useKeepDocumentTitle(copy.title)

  return (
    <section className="flex flex-1 flex-col items-center bg-gradient-to-b from-white via-[#DEF8FF] to-white px-5 py-6 sm:px-6">
      <title>{copy.title}</title>
      {showLogo && (
        <Link href={copy.homeHref} className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <Image src="/images/isotipo-negativo.png" alt="PowerUp Menu" width={20} height={20} className="object-contain" />
          </span>
          <Image src="/images/powerup-logo.png" alt="" width={130} height={32} className="h-3 w-auto object-contain" />
        </Link>
      )}

      {/* Side by side from lg, so the Advisor is in view next to the message instead of under the fold. */}
      <div className="grid w-full max-w-[1120px] flex-1 items-center gap-10 py-8 lg:py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-16">
        <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <p aria-hidden className="flex items-center gap-[0.06em] font-heading text-[80px] leading-none font-semibold text-primary sm:text-[112px]">
            4<TimerZero stopped={countdown.stopped} />4
          </p>
          <p className="font-heading text-sm font-medium tracking-[0.08em] text-slate-600">{copy.eyebrow}</p>
          <h1 className={pageTitle}>
            {copy.headingStart} <CircledWord>{copy.headingCircled}</CircledWord>
          </h1>
          <p className="max-w-[460px] text-[17px] leading-relaxed text-slate-600">{copy.body}</p>

          {/* WCAG 2.2.1: a time limit can be stopped. */}
          <p className="min-h-5 text-sm text-slate-500">
            {countdown.stopped ? (
              <>
                {copy.stayed}{" "}
                <Link href={copy.homeHref} className={inlineLink}>
                  {copy.backHome}
                </Link>
              </>
            ) : (
              <>
                <span className="tabular-nums">{copy.countdown(countdown.secondsLeft)}</span>{" "}
                <Link href={copy.homeHref} className={inlineLink}>
                  {copy.goHome}
                </Link>
                {" · "}
                <button type="button" onClick={countdown.stop} className={inlineLink}>
                  {copy.stay}
                </button>
              </>
            )}
          </p>
        </div>

        {/* The home's Advisor story (menu scanned, score, improvements) shows what you get before you ask for it.
            Below lg the card sits under the message, capped so on tablets the animation doesn't fill the screen. */}
        <div className="@container mx-auto w-full max-w-[540px] lg:max-w-none">
          <GradientFrame className="flex flex-col gap-4 p-3 sm:p-4">
            <AdvisorStoryMini variant="full" locale={locale} />
            <div className="flex flex-col gap-3 px-2 pb-1 sm:px-3">
              <p className={eyebrow}>{copy.advisorEyebrow}</p>
              <h2 className="font-heading text-[24px] font-medium leading-tight tracking-tight text-slate-900 sm:text-[28px]">
                {copy.advisorTitle}
              </h2>
              <p className="text-[15px] leading-relaxed text-slate-600">{copy.advisorText}</p>
              <AdvisorClaims claims={advisor.claims} />
              <BorderBeam className="mt-1 w-full">
                <AdvisorTrigger
                  location="not_found"
                  onOpen={countdown.stop}
                  className={cn(buttonAdvisor, "h-14 w-full rounded-[12px] px-7 text-base")}
                >
                  {copy.advisorButton}
                </AdvisorTrigger>
              </BorderBeam>
              <AdvisorPressSeal label={advisor.pressLabel} />
            </div>
          </GradientFrame>
        </div>
      </div>
    </section>
  )
}

// The "0" of the 404 is a ring, as thick as the 4s, that empties over the countdown and freezes when it stops.
function TimerZero({ stopped }: { stopped: boolean }) {
  const ring = useRef<SVGCircleElement>(null)
  const animation = useRef<Animation | null>(null)

  useEffect(() => {
    if (!ring.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    animation.current = ring.current.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -100 }], {
      duration: REDIRECT_SECONDS * 1000,
      easing: "linear",
      fill: "forwards",
    })
    return () => animation.current?.cancel()
  }, [])

  useEffect(() => {
    if (stopped) animation.current?.pause()
  }, [stopped])

  return (
    <svg viewBox="0 0 100 100" className="size-[0.74em]">
      <circle cx="50" cy="50" r="42" fill="none" strokeWidth="15" className="stroke-primary/15" />
      <circle
        ref={ring}
        transform="rotate(-90 50 50)"
        cx="50"
        cy="50"
        r="42"
        fill="none"
        strokeWidth="15"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        className="stroke-primary"
      />
    </svg>
  )
}

// In production the root 404 is prerendered once (as /_not-found, in Spanish) and served for every
// missing URL, /it ones included. Reading the language from the address only in the browser, after
// hydration, switches /it to Italian without a server/client mismatch.
const noSubscription = () => () => {}

function useLocaleAfterHydration(): Locale {
  return useSyncExternalStore(
    noSubscription,
    () => localeFromPath(window.location.pathname),
    () => "es",
  )
}

// After hydration Next adds the root layout's <title> in front of the page's, so the tab (and every
// GA4 event, which reads document.title) would say "home". This keeps the 404's title while it's shown.
function useKeepDocumentTitle(title: string) {
  useEffect(() => {
    const keep = () => {
      if (document.title !== title) document.title = title
    }
    keep()
    const observer = new MutationObserver(keep)
    observer.observe(document.head, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [title])
}
