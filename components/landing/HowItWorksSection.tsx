'use client'
import { SectionContainer } from "@/components/landing/SectionContainer"
import { steps } from "@/components/landing/section-data"
import Image from "next/image"
import { CTAButton } from "../CTAButton"
import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { BlurFade } from "../ui/blur-fade"

const revealViewport = {
  once: true,
  margin: "0px 0px -80px 0px",
} as const

const lineEase = "linear" as const
const textEase = [0.22, 1, 0.36, 1] as const

const textReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
} as const

const HIW_PATH =
  "M1.50488 127.056C71.5049 47.0562 210.505 -47.9438 385.005 83.0526C519.505 184.021 602.005 158.053 591.005 83.0526C583.379 31.0562 527.444 -20.2119 487.005 12.0543C440.005 49.5548 515.005 223.053 681.005 96.0525C847.005 -30.9475 979.505 29.0562 1011 90.0525"

function HiwVectorLine({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(svgRef, {
    once: true,
    margin: revealViewport.margin,
  })
  const prefersReducedMotion = useReducedMotion()
  const shouldDraw = Boolean(prefersReducedMotion || isInView)

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 1013 152"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="paint0_linear_686_392"
          x1="1.50488"
          y1="75.6999"
          x2="1011"
          y2="75.6999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D2EFFF" />
          <stop offset="1" stopColor="#BBF9F0" />
        </linearGradient>
      </defs>
      <motion.path
        d={HIW_PATH}
        stroke="url(#paint0_linear_686_392)"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: shouldDraw ? 1 : 0,
          opacity: 1,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.8,
          ease: lineEase,
        }}
      />
    </svg>
  )
}

export function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <SectionContainer>
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">Empezar es muy facil</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Es tan simple que podrias configurarlo tu solo. Pero te lo facilitamos aun mas.
            </p>
          </BlurFade>
        </div>
        <div className="flex flex-row justify-between gap-12 relative">
          <HiwVectorLine className="pointer-events-none absolute -top-24 left-[2%] h-full w-[80%]" />
          {steps.map((item, index) => (
            <article key={item.title} className="space-y-4 w-1/3">
              <div className="relative h-55">
                <motion.div
                  className={`absolute text-xl font-heading font-medium w-13 h-13 rounded-full flex items-center justify-center ${item.stepNumerClass}`}
                  initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
                  whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
                  viewport={revealViewport}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    mass: 0.8,
                    delay: (index + 1) * 0.22,
                  }}
                >
                  <div className="plus-darker opacity-70">{index + 1}</div>
                </motion.div>
                <Image src={item.image} alt={item.title} width={300} height={300} className={item.imageClass} />
              </div>
              <div className="space-y-2 pr-2">
                <motion.h3
                  className="text-xl font-medium text-slate-700"
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView={prefersReducedMotion ? undefined : "visible"}
                  viewport={revealViewport}
                  variants={textReveal}
                  transition={{ duration: 0.45, ease: textEase, delay: (index + 1) * 0.22 + 0.18 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="text-base leading-6 text-slate-600"
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView={prefersReducedMotion ? undefined : "visible"}
                  viewport={revealViewport}
                  variants={textReveal}
                  transition={{ duration: 0.45, ease: textEase, delay: (index + 1) * 0.22 + 0.32 }}
                >
                  {item.description}
                </motion.p>
              </div>

            </article>
          ))}
        </div>
        <div className="flex justify-center">
          <CTAButton />
        </div>
      </div>
    </SectionContainer>
  )
}
