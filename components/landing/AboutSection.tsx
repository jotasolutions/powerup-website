"use client"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "../CTAButton"
import Image from "next/image"
import { BlurFade } from "../ui/blur-fade"
import { motion, useReducedMotion } from "motion/react"
import { revealEase } from "@/lib/motion"

const aboutImageViewport = {
  once: true as const,
  /** Require a meaningful portion of the element in view (default is very loose). */
  amount: 0.45,
  /** Shrink the “in view” band from the bottom so the scroll trigger fires later. */
  margin: "0px 0px -22% 0px",
}

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion()

  const imageMotion = (fromX: number, fromY: number, toX: number, toY: number) => ({
    initial: prefersReducedMotion
      ? false
      : { x: fromX, y: fromY, opacity: 0, scale: 0.8 },
    whileInView: prefersReducedMotion
      ? undefined
      : { x: toX, y: toY, opacity: 1, scale: 1 },
    viewport: aboutImageViewport,
    transition: {
      duration: 0.5,
      ease: revealEase,
    },
  })

  const textMotion = (delay: number) => ({
    initial: prefersReducedMotion ? false : { y: 10, opacity: 0 },
    whileInView: prefersReducedMotion ? undefined : { y: -6, opacity: 1 },
    viewport: aboutImageViewport,
    transition: {
      delay,
      duration: 0.5,
      ease: revealEase,
    },
  })

  return (
    <SectionContainer >
      <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-2 md:items-center gap-12 md:gap-10 ">
        <div className="space-y-4 col-span-1">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">
              Construido por especialistas en ventas y restauracion
            </h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              PowerUp nace de la combinacion entre tecnologia y estrategia gastronomica. Unimos
              ingenieria de menu, marketing y desarrollo de producto para ayudar a restaurantes a
              vender mas con su carta digital.
            </p>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.24}>
            <p className="text-sm font-medium text-black flex items-center gap-2 opacity-60" >
              <Image src="/images/spain.svg" alt="spain" width={20} height={20} className="size-5" />
              Startup española acelerada por Lanzadera
            </p>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.36}>
            <CTAButton />
          </BlurFade>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-center gap-4 sm:gap-5" >
            <motion.div
              {...imageMotion(40, 30, 20, -8)}
              animate={prefersReducedMotion ? { x: 20, y: -8, opacity: 1, scale: 1 } : undefined}
            >
              <Image src="/images/about-fede.png" alt="about 1" width={170} height={170} className="aspect-square w-[100px] md:w-[128px]  -rotate-7 rounded-2xl bg-slate-200 object-cover shadow-2xl" />
            </motion.div>
            <motion.div
              {...textMotion(0.1)}
            >

              <div className="mt-2 sm:mt-5">
                <div className="font-medium">Federico Bello</div>
                <div className="text-sm text-slate-800">Director</div>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-row justify-end gap-4 sm:gap-5" >
            <motion.div
              {...textMotion(0.2)}
            >

              <div className="mt-6 flex flex-col items-end sm:mt-8">
                <div className="font-medium">Dani jimenez</div>
                <div className="text-sm text-slate-800">Tecnologia</div>
              </div>
            </motion.div>
            <motion.div
              {...imageMotion(45, 30, 18, -8)}
              animate={prefersReducedMotion ? { x: 18, y: -8, opacity: 1, scale: 1 } : undefined}
              transition={{
                duration: 0.5,
                ease: revealEase,
                delay: 0.12
              }}
            >
              <Image src="/images/about-dani.png" alt="about 1" width={170} height={170} className="aspect-square  w-[100px] md:w-[128px] rounded-2xl bg-slate-200 object-cover shadow-2xl " />
            </motion.div>
          </div>
          <div className="-mt-6 flex flex-row items-end justify-start gap-4 pl-4 sm:-mt-8 sm:gap-5 sm:pl-8" >
            <motion.div
              {...imageMotion(36, 24, 14, -8)}
              animate={prefersReducedMotion ? { x: 14, y: -8, opacity: 1, scale: 1 } : undefined}
              transition={{
                duration: 0.5,
                ease: revealEase,
                delay: 0.24
              }}
            >
              <Image src="/images/about-jordi.png" alt="about 1" width={170} height={170} className="aspect-square  w-[100px] md:w-[128px] rounded-2xl bg-slate-200 object-cover shadow-2xl" />
            </motion.div>
            <motion.div
              {...textMotion(0.3)}
            >

              <div className="mb-3">
                <div className="font-medium">Jordi Puig</div>
                <div className="text-sm text-slate-800">Consultor gastronómico</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
