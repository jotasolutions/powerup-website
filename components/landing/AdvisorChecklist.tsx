"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

// Drawn in SVG (it used to be advisor-checks.png) so the first two tasks can tick themselves
// off after the score card fills up. Shown between 200 and 280 px wide; sizes live in the viewBox.

const tasks = [
    { label: "Mejorar descripciones", done: true, opacity: 1 },
    { label: "Agrega todos los alérgenos", done: true, opacity: 1 },
    { label: "Ofrece promociones temporales", done: false, opacity: 0.75 },
    { label: "Añade ingredientes extra a los platos", done: false, opacity: 0.5 },
]

const CARD_W = 360
const CARD_H = 64
const GAP = 16
const PAD = 12
// After the score card's gauge (AdvisorScoreCard) is mostly full.
const FIRST_CHECK_DELAY = 1.1
const CHECK_STEP = 0.45

export function AdvisorChecklist() {
    const ref = useRef<SVGSVGElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.45 })
    const prefersReducedMotion = useReducedMotion()
    const run = isInView || prefersReducedMotion
    const height = PAD * 2 + tasks.length * CARD_H + (tasks.length - 1) * GAP

    return (
        <svg
            ref={ref}
            viewBox={`0 0 ${CARD_W + PAD * 2} ${height}`}
            role="img"
            aria-label="Comprobaciones del análisis de la carta"
            className="block h-auto w-full overflow-visible"
        >
            <defs>
                <filter id="advisor-check-shadow" x="-10%" y="-30%" width="120%" height="160%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.08" />
                </filter>
            </defs>
            {tasks.map((task, i) => {
                const y = PAD + i * (CARD_H + GAP)
                const cx = PAD + CARD_W - 36
                const cy = y + CARD_H / 2
                const delay = FIRST_CHECK_DELAY + i * CHECK_STEP
                const transition = prefersReducedMotion ? { duration: 0 } : { delay, duration: 0.35 }
                return (
                    <g key={task.label} opacity={task.opacity}>
                        <rect
                            x={PAD}
                            y={y}
                            width={CARD_W}
                            height={CARD_H}
                            rx="12"
                            fill="#FFFFFF"
                            stroke="#EEF0F2"
                            filter={task.done ? "url(#advisor-check-shadow)" : undefined}
                        />
                        <text x={PAD + 22} y={cy + 6} fontSize="16" fill={task.done ? "#0F172A" : "#475569"} className="font-sans">
                            {task.label}
                        </text>
                        <circle cx={cx} cy={cy} r="14" fill="#ECECEC" />
                        {task.done && (
                            <>
                                <motion.circle
                                    cx={cx}
                                    cy={cy}
                                    r="14"
                                    fill="#7DD3B8"
                                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                                    initial={{ scale: prefersReducedMotion ? 1 : 0 }}
                                    animate={run ? { scale: [null, 1.15, 1] } : undefined}
                                    transition={transition}
                                />
                                <motion.path
                                    d={`M ${cx - 6} ${cy} l 4 4.5 l 8 -9`}
                                    fill="none"
                                    stroke="#FFFFFF"
                                    strokeWidth="2.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                                    animate={run ? { pathLength: 1 } : undefined}
                                    transition={prefersReducedMotion ? { duration: 0 } : { delay: delay + 0.2, duration: 0.3 }}
                                />
                            </>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
