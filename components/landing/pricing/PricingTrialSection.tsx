"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "@/components/CTAButton"
import { BlurFade } from "@/components/ui/blur-fade"
import {
  pricingTrialBullets,
  pricingTrialChoices,
  pricingTrialSteps,
} from "@/components/landing/pricing-section-data"
import { cn } from "@/lib/utils"
import { ChevronDown, CircleCheck, CreditCard } from "lucide-react"
import Image from "next/image"

function TrialStepCard({
  step,
  label,
  variant = "number",
}: {
  step: string
  label: string
  variant?: "number" | "choice"
}) {
  return (
    <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-md">
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-medium text-slate-900 opacity-50",
          variant === "number" ? "bg-sky-200" : "bg-teal-200"
        )}
      >
        {step}
      </span>
      <span className="text-sm font-medium text-slate-900">{label}</span>
    </div>
  )
}

export function PricingTrialSection() {
  return (
    <SectionContainer className="relative overflow-hidden bg-gradient-to-br from-lime-50 via-green-50 to-emerald-100 py-24 md:py-32">
      <Image
        src="/images/cercles.svg"
        alt=""
        width={1000}
        height={1000}
        className="pointer-events-none absolute -bottom-96 right-0 max-w-4xl opacity-40 mix-blend-overlay"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-4xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex w-full max-w-sm flex-col items-center gap-6 lg:mx-auto">
          <BlurFade inView inViewMargin="-80px" className="w-full">
            <TrialStepCard step={pricingTrialSteps[0].step} label={pricingTrialSteps[0].label} />
          </BlurFade>

          <ChevronDown className="size-4 text-slate-400" aria-hidden />

          <BlurFade inView inViewMargin="-80px" delay={0.08} className="w-full">
            <TrialStepCard step={pricingTrialSteps[1].step} label={pricingTrialSteps[1].label} />
          </BlurFade>

          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="text-center text-sm font-medium text-slate-700 opacity-60">
              Y después decide:
            </p>
          </BlurFade>

          <BlurFade inView inViewMargin="-80px" delay={0.16} className="flex w-full flex-col items-center gap-2">
            <TrialStepCard
              step={pricingTrialChoices[0].step}
              label={pricingTrialChoices[0].label}
              variant="choice"
            />
            <p className="py-1 text-center text-sm font-medium text-slate-700 opacity-60">o</p>
            <TrialStepCard
              step={pricingTrialChoices[1].step}
              label={pricingTrialChoices[1].label}
              variant="choice"
            />
          </BlurFade>
        </div>

        <div className="space-y-8">
          <BlurFade inView inViewMargin="-80px">
            <div className="relative flex size-12 items-center justify-center rounded-xl border-4 border-emerald-200/40 bg-emerald-200">
              <span className="relative inline-flex text-slate-700" aria-hidden>
                <CreditCard className="size-6" strokeWidth={1.75} />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="h-px w-full rotate-45 bg-current opacity-80" />
                </span>
              </span>
            </div>
          </BlurFade>

          <BlurFade inView inViewMargin="-80px" delay={0.08}>
            <h2 className="section-title">Empieza gratis, sin tarjeta</h2>
          </BlurFade>

          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <div className="space-y-4 text-base leading-relaxed text-slate-800">
              <p>
                Regístrate y disfruta de todas las funcionalidades para{" "}
                <strong className="font-medium">vender más durante un mes</strong>.
              </p>
              <p>
                Después decide si quieres seguir con el plan Free, Pro mensual o Pro anual.
              </p>
            </div>
          </BlurFade>

          <BlurFade inView inViewMargin="-80px" delay={0.16}>
            <ul className="space-y-3">
              {pricingTrialBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2 text-base text-slate-900">
                  <CircleCheck className="size-5 shrink-0 text-slate-800" strokeWidth={1.75} aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          </BlurFade>

          <BlurFade inView inViewMargin="-80px" delay={0.2}>
            <CTAButton />
          </BlurFade>
        </div>
      </div>
    </SectionContainer>
  )
}
