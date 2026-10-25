"use client"

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { useEffect } from "react"

// Drawn in SVG (it used to be advisor-widget.png) so the gauge and the four sub-scores can fill
// up when the section comes into view. The card is shown between 150 and 214 px wide, so all
// sizes live in the viewBox and scale with it.

const SCORE = 8.5
const CX = 210
const CY = 205
const R = 158
// The gauge spans 200°, from 0 (bottom left) to 10 (bottom right) over the top.
const START_DEG = 190
const SPAN_DEG = 200

function pointAt(value: number, radius: number) {
    const rad = ((START_DEG - (value / 10) * SPAN_DEG) * Math.PI) / 180
    return { x: CX + radius * Math.cos(rad), y: CY - radius * Math.sin(rad) }
}

const arcStart = pointAt(0, R)
const arcEnd = pointAt(10, R)
const gaugePath = `M ${arcStart.x} ${arcStart.y} A ${R} ${R} 0 1 1 ${arcEnd.x} ${arcEnd.y}`

const ticks = Array.from({ length: 21 }, (_, i) => i / 2)
const tickLabels = [0, 3, 5, 7, 10]

const subScores = [
    { lines: ["Oferta", "gastronómica"], detail: "5 de 14", value: 3.5, color: "#EF6461", x: 52, y: 300 },
    { lines: ["Marketing"], detail: "3 de 4", value: 7.5, color: "#8BD46A", x: 258, y: 300 },
    { lines: ["Contenido"], detail: "2 de 4", value: 5, color: "#F3DF5C", x: 52, y: 392 },
    { lines: ["Diseño"], detail: "4 de 4", value: 10, color: "#8BD46A", x: 258, y: 392 },
]

const ease = [0.22, 1, 0.36, 1] as const
// Starts once the card has popped in (AdvisorSection's entrance takes 0.5 s).
const GAUGE_DELAY = 0.35
const GAUGE_DURATION = 1.4

/** `play`: AdvisorSection says when this beat of the story starts. */
export function AdvisorScoreCard({ play }: { play: boolean }) {
    const prefersReducedMotion = useReducedMotion()
    const run = play || prefersReducedMotion
    const instant = prefersReducedMotion ? { duration: 0 } : null

    const score = useMotionValue(prefersReducedMotion ? SCORE : 0)
    const scoreText = useTransform(score, (v) => v.toFixed(1))

    useEffect(() => {
        if (!run) return
        const controls = animate(score, SCORE, prefersReducedMotion ? { duration: 0 } : {
            delay: GAUGE_DELAY,
            duration: GAUGE_DURATION,
            ease,
        })
        return () => controls.stop()
    }, [run, score, prefersReducedMotion])

    return (
        <svg
            viewBox="0 0 420 440"
            role="img"
            aria-label={`Vista del análisis gratuito de la carta: nota ${SCORE} sobre 10`}
            className="block h-auto w-full bg-white"
        >
            <defs>
                <linearGradient id="advisor-gauge" x1="50" x2="370" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#2FA84F" />
                    <stop offset="0.55" stopColor="#7BCB5A" />
                    <stop offset="1" stopColor="#CDE9A0" />
                </linearGradient>
            </defs>

            {ticks.map((t) => {
                const major = Number.isInteger(t)
                const a = pointAt(t, R + 24)
                const b = pointAt(t, R + (major ? 32 : 28))
                return <line key={t} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#C7CDD4" strokeWidth={major ? 1.6 : 1} />
            })}
            {tickLabels.map((t) => {
                const p = pointAt(t, R + 46)
                return (
                    <text key={t} x={p.x} y={p.y + 5} textAnchor="middle" fontSize="15" fill="#334155" className="font-sans">
                        {t}
                    </text>
                )
            })}

            <path d={gaugePath} fill="none" stroke="#EEF1F4" strokeWidth="22" strokeLinecap="round" />
            <motion.path
                d={gaugePath}
                fill="none"
                stroke="url(#advisor-gauge)"
                strokeWidth="22"
                strokeLinecap="round"
                initial={{ pathLength: prefersReducedMotion ? SCORE / 10 : 0 }}
                animate={run ? { pathLength: SCORE / 10 } : undefined}
                transition={instant ?? { delay: GAUGE_DELAY, duration: GAUGE_DURATION, ease }}
            />

            <motion.text
                x={CX}
                y={176}
                textAnchor="middle"
                fontSize="68"
                fontWeight="600"
                fill="#1F4D3A"
                className="font-heading"
            >
                {scoreText}
            </motion.text>
            <text x={CX} y={222} textAnchor="middle" fontSize="21" fill="#1F4D3A" className="font-heading">
                nota de tu menú
            </text>

            {subScores.map((s, i) => {
                const delay = GAUGE_DELAY + 0.5 + i * 0.15
                return (
                    <g key={s.detail + s.color + i}>
                        <circle cx={s.x} cy={s.y} r="26" fill="none" stroke="#F1F3F5" strokeWidth="6" />
                        <motion.circle
                            cx={s.x}
                            cy={s.y}
                            r="26"
                            fill="none"
                            stroke={s.color}
                            strokeWidth="6"
                            strokeLinecap="round"
                            transform={`rotate(110 ${s.x} ${s.y})`}
                            initial={{ pathLength: prefersReducedMotion ? s.value / 10 : 0 }}
                            animate={run ? { pathLength: s.value / 10 } : undefined}
                            transition={instant ?? { delay, duration: 0.9, ease }}
                        />
                        <text x={s.x} y={s.y + 6} textAnchor="middle" fontSize="16" fill="#1E293B" className="font-sans">
                            {s.value}
                        </text>
                        {s.lines.map((line, li) => (
                            <text key={line} x={s.x + 46} y={s.y - 12 + li * 19 - (s.lines.length - 1) * 8} fontSize="16" fill="#1E293B" className="font-sans">
                                {line}
                            </text>
                        ))}
                        <text x={s.x + 46} y={s.y + 16 + (s.lines.length - 1) * 11} fontSize="15" fill="#64748B" className="font-sans">
                            {s.detail}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}
