'use client'

import { SectionContainer } from "@/components/landing/SectionContainer"
import { analyticsFeatures } from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"
import { useEffect, useRef } from "react"
import type { LottieRefCurrentProps } from "lottie-react"
import { motion, useInView, useReducedMotion } from "motion/react"
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

function AnalyticsCard({
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
  const cardDelay = 0.3 * index;
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
        className="relative flex items-end overflow-hidden rounded-2xl bg-gradient-to-b from-[#F8F0FF] to-[#ecdff7] sm:h-[258px]"
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
          className="relative z-20 w-full"
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
          className="text-base leading-relaxed text-slate-600 sm:text-base"
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


export function AnalyticsSection() {
  return (
    <SectionContainer>
      <div className="space-y-8 sm:space-y-10">
        <div className="space-y-3 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">Conoce a tus clientes</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Toma decisiones basadas en como se comportan tus clientes.
            </p>
          </BlurFade>
        </div>
        <div className="grid gap-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {analyticsFeatures.map((item, index) => (
            <AnalyticsCard
              key={item.title}
              index={index}
              title={item.title}
              description={item.description}
              animation={item.animation}
            />
          ))}
        </div>
        <div className="space-y-2 text-center">
          <CTAButton />
        </div>
      </div>
    </SectionContainer>
  )
}
