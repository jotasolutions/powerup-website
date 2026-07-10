'use client'

import { useEffect, useRef } from "react"
import type { LottieRefCurrentProps } from "lottie-react"
import Lottie from "lottie-react"
import { motion, useInView, useReducedMotion } from "motion/react"
import Image from "next/image"
import {
  cardStagger,
  revealEase,
  revealViewport,
  textReveal,
  textStagger,
} from "@/lib/motion"

interface RevealCardProps {
  title: string
  description: string
  animation: unknown
  index: number
  cardClassName: string
  lottieClassName?: string
}

export function RevealCard({
  title,
  description,
  animation,
  index,
  cardClassName,
  lottieClassName = "relative z-20",
}: RevealCardProps) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const delay = cardStagger(index)
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

    const id = window.setTimeout(play, delay * 1000 + 400)
    return () => window.clearTimeout(id)
  }, [delay, isCardInView, prefersReducedMotion])

  return (
    <article className="space-y-4">
      <motion.div
        ref={cardRef}
        className={cardClassName}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.55, ease: revealEase, delay }}
        onMouseEnter={() => lottieRef.current?.goToAndPlay(0, true)}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animation}
          loop={false}
          autoplay={false}
          className={lottieClassName}
          style={{ width: "100%", height: "auto" }}
        />
        <Image
          src="/images/cercles.svg"
          alt="cercles"
          width={1000}
          height={1000}
          className="absolute top-1/4 left-0 z-10 h-full w-full scale-150 object-cover opacity-90 mix-blend-overlay"
        />
      </motion.div>
      <div className="space-y-2 pr-1 sm:pr-2">
        <motion.h3
          className="text-lg font-medium text-slate-700 sm:text-xl"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={revealViewport}
          variants={textReveal}
          transition={{
            duration: 0.45,
            ease: revealEase,
            delay: textStagger(delay, 0.18),
          }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-base leading-relaxed text-slate-600 sm:text-base"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={revealViewport}
          variants={textReveal}
          transition={{
            duration: 0.45,
            ease: revealEase,
            delay: textStagger(delay, 0.32),
          }}
        >
          {description}
        </motion.p>
      </div>
    </article>
  )
}
