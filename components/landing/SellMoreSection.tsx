'use client'
import { SectionContainer } from "@/components/landing/SectionContainer"
import { sellMoreFeatures } from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"
import { useEffect, useRef } from "react"
import type { LottieRefCurrentProps } from "lottie-react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { BlurFade } from "../ui/blur-fade"

import Lottie from "lottie-react"
import Image from "next/image"

const revealViewport = {
  once: true,
  margin: "0px 0px -80px 0px",
} as const

const revealEase = [0.22, 1, 0.36, 1] as const

const textReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
} as const

function SellMoreCard({
  title,
  description,
  animation,
  index,
}: {
  title: string
  description: string
  animation: unknown
  index: number
}) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const cardDelay = (index + 1) * 0.8
  const isCardInView = useInView(cardRef, {
    once: true,
    margin: revealViewport.margin,
  })

  useEffect(() => {
    if (!isCardInView) return

    const play = () => lottieRef.current?.goToAndPlay(0, true)

    if (prefersReducedMotion) {
      play()
      return
    }

    const id = window.setTimeout(play, (cardDelay * 1000 + 400))
    return () => window.clearTimeout(id)
  }, [isCardInView, cardDelay, prefersReducedMotion])

  return (
    <article className="space-y-4">
      <motion.div
        ref={cardRef}
        className="relative h-[258px overflow-hidden rounded-2xl bg-gradient-to-b from-[#ECF8FF] to-[#C1EAFF] sm:h-[258px]"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.55, ease: revealEase, delay: cardDelay }}
        onMouseEnter={() => lottieRef.current?.goToAndPlay(0, true)}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animation}
          loop={false}
          autoplay={false}
          className="z-20 relative"
          style={{ width: '100%', height: 'auto' }}
        />
        <Image
          src="/images/cercles.svg"
          alt="cercles"
          width={1000}
          height={1000}
          className="absolute top-1/4 left-0 w-full h-full object-cover mix-blend-overlay z-10 scale-150 opacity-90"
        />
      </motion.div>
      <div className="space-y-2 pr-1 sm:pr-2">
        <motion.h3
          className="text-lg font-medium text-slate-700 sm:text-xl"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={revealViewport}
          variants={textReveal}
          transition={{ duration: 0.45, ease: revealEase, delay: cardDelay + 0.18 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm leading-6 text-slate-600 sm:text-base"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={revealViewport}
          variants={textReveal}
          transition={{ duration: 0.45, ease: revealEase, delay: cardDelay + 0.32 }}
        >
          {description}
        </motion.p>
      </div>
    </article>
  )
}

export function SellMoreSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <SectionContainer id="vende-mas">
      <div className="space-y-8 sm:space-y-10">
        <div className="space-y-3 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">Vende mas sin esfuerzo</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Tu carta le da al cliente los motivos para gastar mas. Sola.
            </p>
          </BlurFade>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {sellMoreFeatures.map((item, index) => (
            <SellMoreCard
              key={item.title}
              index={index}
              title={item.title}
              description={item.description}
              animation={item.animation}
            />
          ))}
        </div>
        <motion.div
          className="space-y-2 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.5, ease: revealEase, delay: 0.35 }}
        >
          <CTAButton />
        </motion.div>
      </div>
    </SectionContainer>
  )
}
