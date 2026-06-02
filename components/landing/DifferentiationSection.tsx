"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { ArrowRight, Brain, Check, CreditCard, PieChart } from "lucide-react"
import { motion } from "motion/react"
import { CTAButton } from "../CTAButton"
import Image from "next/image"
import { Button } from "../ui/button"
import { BlurFade } from "../ui/blur-fade"

/** Must match mockup `transition.duration` so the brain scales after the slide ends. */
const MOCKUP_SLIDE_DURATION_S = 1.2

export function DifferentiationSection() {
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
                initial={{ opacity: 1, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: MOCKUP_SLIDE_DURATION_S, ease: [0.22, 1, 0.36, 1] }}
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
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  delay: 0.7,
                  type: "spring",
                  stiffness: 380,
                  damping: 20,
                  mass: 0.85,
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
            <article className="flex flex-col gap-4">
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
                <p className="text-sm leading-relaxed sm:text-base">
                  Aplicamos principios como efecto ancla, orden estratégico de categorías, nombres descriptivos y resaltado inteligente para <strong className="font-medium">aumentar el ticket medio de forma natural.</strong>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="scale-80 flex size-5 shrink-0 items-center justify-center rounded-full text-gray-700 border border-gray-600 border-2">
                    <Check className="size-2.5" strokeWidth={4} aria-hidden />
                  </span>
                  Basado en más de 80 estudios científicos
                </p>
                <Button className="mt-4 w-fit" variant="secondary">
                  Saber más
                  <ArrowRight className="size-3.5" />
                </Button>
              </BlurFade>
            </article>
            <article className="flex flex-col gap-4">
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
                <p className="text-sm leading-relaxed sm:text-base">
                  Medimos qué platos se ven, cuánto tiempo pasan en la carta y qué se ignora. Cada semana recibes un informe con <strong className="font-medium">recomendaciones accionables para mejorar.</strong>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="scale-80 flex size-5 shrink-0 items-center justify-center rounded-full text-gray-700 border border-gray-600 border-2">
                    <Check className="size-2.5" strokeWidth={4} aria-hidden />
                  </span>
                  Métricas claras y sin configuración técnica
                </p>
                <Button className="w-fit mt-4" variant="secondary">
                  Saber más
                  <ArrowRight className="size-3.5" />
                </Button>
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
