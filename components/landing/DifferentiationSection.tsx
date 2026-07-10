"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { Brain, Check, CreditCard, PieChart } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { CTAButton } from "../CTAButton"
import Image from "next/image"
import { BlurFade } from "../ui/blur-fade"
import { revealEase, uiSpring } from "@/lib/motion"

/** Must match mockup `transition.duration` so the brain scales after the slide ends. */
const MOCKUP_SLIDE_DURATION_S = 1.2

export function DifferentiationSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <SectionContainer
      id="diferenciacion"
      className="relative bg-gradient-to-b from-[#EFF9FF] to-white py-12 md:py-20"
    >
      <>
        <Image
          src="/images/cercles.svg"
          alt="cercles"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay z-10"
        />

        <div className="relative z-20 mx-auto max-w-5xl rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 md:p-10 lg:p-14">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="relative -mt-12 h-44 overflow-hidden sm:-mt-16 sm:h-52 md:h-56">
              <motion.div
                className="absolute bottom-0 left-1/2 mb-2 -translate-x-1/2"
                initial={prefersReducedMotion ? false : { opacity: 1, y: 200 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                animate={prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : MOCKUP_SLIDE_DURATION_S,
                  ease: revealEase,
                }}
              >
                <Image
                  src="/images/carta-mockup2.png"
                  alt="Carta digital mockup"
                  width={400}
                  height={400}
                  className="mx-auto h-auto w-[260px] rounded-xl object-contain sm:w-[320px] md:w-[375px]"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2"
                initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0 }}
                whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
                animate={prefersReducedMotion ? { scale: 1, opacity: 1 } : undefined}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  ...(prefersReducedMotion ? { duration: 0 } : uiSpring),
                  delay: prefersReducedMotion ? 0 : 0.7,
                }}
              >
                <Image
                  src="/images/brain.png"
                  alt="Ilustración cerebro"
                  width={130}
                  height={130}
                  className="mx-auto h-auto w-[72px] object-contain drop-shadow-xl sm:w-[90px] md:w-[100px]"
                  priority
                />
              </motion.div>
            </div>
            <BlurFade inView inViewMargin="-80px">
              <h2 className="section-title ">
                La carta que piensa como tú venderías
              </h2>
            </BlurFade>
            <BlurFade inView inViewMargin="-80px" delay={0.12}>
              <p className="section-paragraph  max-w-xl mx-auto">
                No solo digitalizamos tu carta. Optimizamos cómo se presentan y medimos qué
                funciona para mejorarlo continuamente.
              </p>
            </BlurFade>
          </div>

          <div className="mt-10 grid gap-8 sm:mt-12 md:mt-14 md:grid-cols-2 md:gap-10 lg:gap-16">
            <article className="flex flex-col items-center gap-4 text-center">
              <BlurFade delay={0.20}>
                <div
                  className="flex size-16 items-center justify-center rounded-2xl bg-[#FFCCBE] text-[#C45C2A] border-4 border-[#FFEFE9]"
                >
                  <Brain className="size-8" strokeWidth={1.75} aria-hidden />
                </div>
              </BlurFade>
              <BlurFade delay={0.25}>
                <h3 className="text-lg font-medium sm:text-xl">
                  Neuromarketing
                </h3>
              </BlurFade>
              <BlurFade delay={0.30}>
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed sm:text-base">
                    Aplicamos principios como efecto ancla, orden estratégico de categorías, nombres descriptivos y resaltado inteligente para <strong className="font-medium">aumentar el ticket medio de forma natural.</strong>
                  </p>
                  <p className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    <span className="scale-80 hidden size-5 shrink-0 items-center justify-center rounded-full border border-2 border-gray-600 text-gray-700 sm:flex">
                      <Check className="size-2.5" strokeWidth={4} aria-hidden />
                    </span>
                    Basado en más de 80 estudios científicos
                  </p>
                  {/*
                  <Button className="mt-4 w-fit" variant="secondary">
                    Saber más
                    <ArrowRight className="size-3.5" />
                  </Button>
                  */}
                </div>
              </BlurFade>
            </article>
            <article className="flex flex-col items-center gap-4 text-center">
              <BlurFade delay={0.35}>
                <div
                  className="flex size-16 items-center justify-center rounded-2xl bg-[#FFE6BE] text-[#C89746] border-4 border-[#FFF5E6]"
                >
                  <PieChart className="size-8" strokeWidth={1.75} aria-hidden />
                </div>
              </BlurFade>
              <BlurFade delay={0.40}>
                <h3 className="text-lg font-medium sm:text-xl">
                  Analíticas
                </h3>
              </BlurFade>
              <BlurFade delay={0.45}>
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed sm:text-base">
                    Medimos qué platos se ven, cuánto tiempo pasan en la carta y qué se ignora. Cada semana recibes un informe con <strong className="font-medium">recomendaciones accionables para mejorar.</strong>
                  </p>
                  <p className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    <span className="scale-80 hidden size-5 shrink-0 items-center justify-center rounded-full border border-2 border-gray-600 text-gray-700 sm:flex">
                      <Check className="size-2.5" strokeWidth={4} aria-hidden />
                    </span>
                    Métricas claras y sin configuración técnica
                  </p>
                  {/*
                  <Button className="w-fit mt-4" variant="secondary">
                    Saber más
                    <ArrowRight className="size-3.5" />
                  </Button>
                  */}
                </div>
              </BlurFade>
            </article>
          </div>
          <BlurFade delay={0.50}>
            <div className="mt-12 flex flex-col items-center gap-3 md:mt-14">
              <CTAButton />
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <span className="relative inline-flex shrink-0 text-slate-400" aria-hidden>
                  <CreditCard className="size-4" />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="h-px w-[130%] rotate-45 bg-current opacity-70" />
                  </span>
                </span>
                No requiere tarjeta
              </p>
            </div>
          </BlurFade>
        </div>
      </>
    </SectionContainer>
  )
}
