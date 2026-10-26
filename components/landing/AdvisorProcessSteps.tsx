"use client"

import { Check } from "lucide-react"
import { motion } from "motion/react"
import type { AdvisorCopy } from "../advisor-copy"

// The three beats of the Advisor animation, lit in step with it (AdvisorSection's `phase`).
// Three equal columns so each label sits under its piece of the animation.

/** `compact` keeps the phone layout at every width, for narrow spots like the blog's sidebar. */
export function AdvisorProcessSteps({
    phase,
    steps,
    compact = false,
}: {
    phase: number
    steps: AdvisorCopy["section"]["story"]["steps"]
    compact?: boolean
}) {
    const sm = (classes: string) => (compact ? "" : classes)
    return (
        // Phones: number above the label. From sm: number beside it, as a pill.
        <ol className={`grid grid-cols-3 ${compact ? "gap-0" : "gap-1"} whitespace-nowrap font-medium ${compact ? "text-[10px]" : "text-[11px] sm:text-[13px]"}`}>
            {steps.map((label, i) => {
                const step = i + 1
                const done = phase > step
                const active = phase === step
                return (
                    <li key={label} className="flex justify-center">
                        <motion.span
                            className={`flex w-full flex-col items-center gap-1 rounded-xl py-1.5 ${compact ? "px-0" : "px-1"} ${sm("sm:w-auto sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-2 sm:py-1")}`}
                            animate={{
                                backgroundColor: active ? "#FFFFFF" : "rgba(255,255,255,0)",
                                color: active || done ? "#1F4D3A" : "#64748B",
                                boxShadow: active ? "0 2px 10px rgba(31,77,58,0.12)" : "0 0 0 rgba(0,0,0,0)",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <span
                                className={`flex size-4 items-center justify-center rounded-full text-[10px] transition-colors duration-300 ${
                                    done || active ? "bg-[#25946F] text-white" : "bg-slate-300/70 text-white"
                                }`}
                            >
                                {done ? <Check className="size-2.5" strokeWidth={3} /> : step}
                            </span>
                            {label}
                        </motion.span>
                    </li>
                )
            })}
        </ol>
    )
}
