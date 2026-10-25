"use client"

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { useEffect, useRef } from "react"

// The two reasons to trust the Advisor, as figures: same claims the section always made
// («Análisis 360º», «más de 50 publicaciones»), shown big so they read as authority.

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })
    const prefersReducedMotion = useReducedMotion()
    const value = useMotionValue(prefersReducedMotion ? to : 0)
    const text = useTransform(value, (v) => `${prefix}${Math.round(v)}${suffix}`)

    useEffect(() => {
        if (!isInView || prefersReducedMotion) return
        const controls = animate(value, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] })
        return () => controls.stop()
    }, [isInView, prefersReducedMotion, value, to])

    return <motion.span ref={ref}>{text}</motion.span>
}

const proofs = [
    { figure: <CountUp to={360} suffix="º" />, title: "Análisis completo", desc: "Para encontrar puntos de mejora" },
    { figure: <CountUp to={50} prefix="+" />, title: "Publicaciones científicas", desc: "El marco en el que se basa el análisis" },
]

export function AdvisorProof() {
    return (
        <div className="grid grid-cols-2 gap-3">
            {proofs.map((proof) => (
                <div key={proof.title} className="rounded-2xl border border-white bg-white/60 p-4 shadow-sm shadow-[#1F4D3A]/5 backdrop-blur-sm">
                    <div className="font-heading text-3xl font-semibold tracking-tight text-[#1F4D3A] tabular-nums sm:text-4xl">
                        {proof.figure}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#1F4D3A]">{proof.title}</div>
                    <div className="mt-0.5 text-xs leading-snug text-slate-600">{proof.desc}</div>
                </div>
            ))}
        </div>
    )
}
