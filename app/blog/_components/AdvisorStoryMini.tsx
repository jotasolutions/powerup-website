"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { advisorCopy } from "@/components/advisor-copy"
import { AdvisorChecklist } from "@/components/landing/AdvisorChecklist"
import { AdvisorMenuScan } from "@/components/landing/AdvisorMenuScan"
import { AdvisorProcessSteps } from "@/components/landing/AdvisorProcessSteps"
import { AdvisorScoreCard } from "@/components/landing/AdvisorScoreCard"
import { useLocale } from "@/lib/locale"
import { cn } from "@/lib/utils"

// The home's Advisor story (AdvisorSection) for the blog's promo cards, same pieces and timing:
// the menu is scanned (1), it gets its score (2), the suggestions tick themselves off (3).
// "full" is the whole scene, for the wide card; "score" keeps only the score, for the narrow
// sidebar. It plays once in view; with reduced motion the last beat shows straight away.
const STORY_VIEWPORT = { once: true, amount: 0.45 } as const
const PHASE_STARTS_MS = [0, 1700, 3400]
const pop = { duration: 0.5, ease: [0.7, -0.6, 0.32, 1.6] as const }

export function AdvisorStoryMini({ variant, className }: { variant: "full" | "score"; className?: string }) {
  const copy = advisorCopy[useLocale()].section.story
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, STORY_VIEWPORT)
  const prefersReducedMotion = useReducedMotion()
  const [storyPhase, setStoryPhase] = useState(0)
  const phase = prefersReducedMotion ? 3 : storyPhase

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return
    const timers = PHASE_STARTS_MS.map((ms, i) => window.setTimeout(() => setStoryPhase(i + 1), ms))
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [isInView, prefersReducedMotion])

  const enter = (atPhase: number, rotate = 0) => ({
    initial: prefersReducedMotion ? false : { y: 30, opacity: 0, scale: 0.85, rotate: 0 },
    animate: phase >= atPhase ? { y: 0, opacity: 1, scale: 1, rotate } : undefined,
    transition: pop,
  })

  return (
    // On the home's green so the white pieces stand out, as they do there.
    <div
      aria-hidden
      className={cn("flex w-full flex-col gap-3 rounded-2xl border border-[#D0F6EA] bg-gradient-to-b from-[#F0FEE2] to-[#E2FEE2] p-3", className)}
    >
      {variant === "full" ? (
        <div ref={ref} className="relative aspect-[16/9] w-full">
          <div className="absolute bottom-1 left-0 z-10 w-[27%]">
            <motion.div className="origin-bottom" {...enter(1, -6)}>
              <div className="overflow-hidden rounded-xl border-[3px] border-white/70 shadow-lg">
                <AdvisorMenuScan play={phase >= 1} copy={copy} />
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-1 left-[30%] z-30 w-[40%]">
            <motion.div className="origin-bottom" {...enter(2)}>
              <div className="overflow-hidden rounded-2xl border-[3px] border-white/70 shadow-xl">
                <AdvisorScoreCard play={phase >= 2} copy={copy} />
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-1 right-0 z-20 w-[33%]">
            <motion.div className="origin-bottom" {...enter(3, 4)}>
              <AdvisorChecklist play={phase >= 3} copy={copy} />
            </motion.div>
          </div>
        </div>
      ) : (
        // The sidebar only has room for the score; it plays on the second beat, as on the home.
        <div ref={ref} className="mx-auto w-full max-w-[180px]">
          <div className="overflow-hidden rounded-2xl border-[3px] border-white/70 shadow-xl">
            <AdvisorScoreCard play={phase >= 2} copy={copy} />
          </div>
        </div>
      )}
      <AdvisorProcessSteps phase={phase} steps={copy.steps} compact={variant === "score"} />
    </div>
  )
}
