"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef, type ReactNode } from "react"

// A slow green light that travels around the edge of its child. It's a rotating conic
// gradient behind the child, showing only through a 2 px gap; it runs while on screen and is
// left out for people who ask for reduced motion (a still beam would read as a stain).
const beamGradient =
    "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, #CDE9A0 290deg, #25946F 340deg, transparent 360deg)"

export function BorderBeam({ children, className = "" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref)
    const prefersReducedMotion = useReducedMotion()

    return (
        <div ref={ref} className={`relative isolate overflow-hidden rounded-[14px] bg-[#D0F6EA] p-[2px] ${className}`}>
            {!prefersReducedMotion && (
                <motion.div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[220%]"
                    style={{ x: "-50%", y: "-50%", background: beamGradient }}
                    animate={isInView ? { rotate: 360 } : undefined}
                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                />
            )}
            {children}
        </div>
    )
}
