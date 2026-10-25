"use client"

import { Check } from "lucide-react"
import { motion } from "motion/react"

// The three beats of the Advisor animation, lit in step with it (AdvisorSection's `phase`).
const steps = ["Tu carta", "Método PowerUp", "Mejoras"]

export function AdvisorProcessSteps({ phase }: { phase: number }) {
    return (
        // Phones: three columns, number above the label. From sm: one row of pills with arrows.
        <ol className="grid grid-cols-3 gap-1 whitespace-nowrap text-[11px] font-medium sm:flex sm:items-center sm:text-[13px]">
            {steps.map((label, i) => {
                const step = i + 1
                const done = phase > step
                const active = phase === step
                return (
                    <li key={label} className="flex items-center justify-center gap-1 sm:justify-start">
                        <motion.span
                            className="flex w-full flex-col items-center gap-1 rounded-xl px-1 py-1.5 sm:w-auto sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-2 sm:py-1"
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
                        {step < steps.length && <span className="hidden text-slate-400 sm:inline" aria-hidden>›</span>}
                    </li>
                )
            })}
        </ol>
    )
}
