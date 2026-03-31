"use client"

import { differentiationPillars } from "@/components/landing/section-data"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { cn } from "@/lib/utils"
import { ArrowRight, Brain, Check, CreditCard, PieChart } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { CTAButton } from "../CTAButton"
import Image from "next/image"
import { Button } from "../ui/button"

const iconMap = {
  neuromarketing: Brain,
  analytics: PieChart,
} as const

const iconBgClass = {
  neuromarketing: "bg-[#FFE8DC] text-[#C45C2A]",
  analytics: "bg-[#FFF4D0] text-[#B8860B]",
} as const

/** Must match mockup `transition.duration` so the brain scales after the slide ends. */
const MOCKUP_SLIDE_DURATION_S = 1.2

export function DifferentiationSection() {
  return (
    <SectionContainer
      id="diferenciacion"
      className="bg-gradient-to-b from-[#EFF9FF] to-white py-14 md:py-20 relative"
    >
      <>
        <Image
          src="/images/cercles.svg"
          alt="cercles"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay z-10"
        />

        <div className="rounded-3xl max-w-5xl mx-auto border border-slate-200/80 bg-white p-8  md:p-12 lg:p-14 z-20 relative">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="relative h-56 overflow-hidden -mt-30">
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
                  className="mx-auto h-auto w-[375px] rounded-xl object-contain"
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
                  className="mx-auto h-auto w-[100px] object-contain drop-shadow-xl "
                  priority
                />
              </motion.div>
            </div>
            <h2 className="section-title ">
              La carta que piensa como tú venderías
            </h2>
            <p className="section-paragraph  max-w-xl mx-auto">
              No solo digitalizamos tu carta. Optimizamos cómo se presentan y medimos qué
              funciona para mejorarlo continuamente.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-12 lg:gap-16">
            <article className="flex flex-col gap-4">
              <div
                className="flex size-16 items-center justify-center rounded-2xl bg-[#FFCCBE] text-[#C45C2A] border-4 border-[#FFEFE9]"
              >
                <Brain className="size-8" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="text-xl font-medium ">
                Neuromarketing
              </h3>
              <p className="text-base leading-relaxed">
                Aplicamos principios como efecto ancla, orden estratégico de categorías, nombres descriptivos y resaltado inteligente para <strong className="font-medium">aumentar el ticket medio de forma natural.</strong>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <span className="scale-80 flex size-5 shrink-0 items-center justify-center rounded-full text-gray-700 border border-gray-600 border-2">
                  <Check className="size-2.5" strokeWidth={4} aria-hidden />
                </span>
                Basado en más de 80 estudios científicos
              </p>
              <Button  className="w-fit mt-4" variant="secondary">
                Saber más
                <ArrowRight className="size-3.5" />
              </Button>
            </article>
            <article className="flex flex-col gap-4">
              <div
                className="flex size-16 items-center justify-center rounded-2xl bg-[#FFE6BE] text-[#C89746] border-4 border-[#FFF5E6]"
              >
                <PieChart className="size-8" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="text-xl font-medium ">
                Analíticas
              </h3>
              <p className="text-base leading-relaxed">
                Medimos qué platos se ven, cuánto tiempo pasan en la carta y qué se ignora. Cada semana recibes un informe con <strong className="font-medium">recomendaciones accionables para mejorar.</strong>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <span className="scale-80 flex size-5 shrink-0 items-center justify-center rounded-full text-gray-700 border border-gray-600 border-2">
                  <Check className="size-2.5" strokeWidth={4} aria-hidden />
                </span>
                Métricas claras y sin configuración técnica
              </p>
              <Button  className="w-fit mt-4" variant="secondary">
                Saber más
                <ArrowRight className="size-3.5" />
              </Button>
            </article>
          </div>

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
        </div>
      </>
    </SectionContainer>
  )
}
