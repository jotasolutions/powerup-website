"use client"

import { motion, useReducedMotion } from "motion/react"

// First beat of the Advisor story: a menu being scanned. Same size and spot as the score card
// that replaces it (AdvisorSection), so the menu seems to turn into its score.

const sections = [
    { y: 92, dishes: [0.62, 0.48, 0.7] },
    { y: 214, dishes: [0.55, 0.66] },
]

export function AdvisorMenuScan() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <svg viewBox="0 0 420 440" role="img" aria-label="Tu carta, mientras se analiza" className="block h-auto w-full bg-white">
            <defs>
                <linearGradient id="advisor-scan-glow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#7BCB5A" stopOpacity="0" />
                    <stop offset="1" stopColor="#7BCB5A" stopOpacity="0.28" />
                </linearGradient>
            </defs>

            <text x="210" y="56" textAnchor="middle" fontSize="26" fontWeight="600" letterSpacing="6" fill="#1F4D3A" className="font-heading">
                CARTA
            </text>
            <line x1="170" x2="250" y1="72" y2="72" stroke="#CDE9A0" strokeWidth="3" strokeLinecap="round" />

            {sections.map((section) => (
                <g key={section.y}>
                    <rect x="48" y={section.y} width="110" height="12" rx="6" fill="#1F4D3A" opacity="0.75" />
                    {section.dishes.map((w, i) => {
                        const y = section.y + 32 + i * 30
                        return (
                            <g key={i}>
                                <rect x="48" y={y} width={260 * w} height="9" rx="4.5" fill="#CBD5E1" />
                                <rect x="330" y={y} width="42" height="9" rx="4.5" fill="#94A3B8" />
                            </g>
                        )
                    })}
                </g>
            ))}
            <rect x="48" y="330" width="324" height="64" rx="12" fill="#F1F5F9" />
            <rect x="66" y="352" width="150" height="9" rx="4.5" fill="#CBD5E1" />
            <rect x="66" y="370" width="100" height="9" rx="4.5" fill="#E2E8F0" />

            {!prefersReducedMotion && (
                <motion.g initial={{ y: -60 }} animate={{ y: 440 }} transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}>
                    <rect x="0" y="0" width="420" height="60" fill="url(#advisor-scan-glow)" />
                    <rect x="0" y="58" width="420" height="3" fill="#25946F" />
                </motion.g>
            )}
        </svg>
    )
}
