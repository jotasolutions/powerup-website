"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "@/components/CTAButton"
import { BlurFade } from "@/components/ui/blur-fade"
import {
  pricingProGroups,
  type PricingPlanFeatureItem,
  type PricingProIconVariant,
} from "@/components/landing/pricing-section-data"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { PricingFeatureCard } from "./PricingFeatureCard"

function ProFeaturePanel({
  title,
  description,
  items,
  iconVariant,
  bordered,
  index,
}: {
  title: string
  description: string
  items: PricingPlanFeatureItem[]
  iconVariant: PricingProIconVariant
  bordered?: boolean
  index: number
}) {
  return (
    <BlurFade inView inViewMargin="-80px" delay={index * 0.08}>
      <div
        className={cn(
          "flex w-full flex-col items-center gap-8 rounded-3xl bg-white px-2 py-6 md:px-10 md:py-10",
          bordered && "border-2 border-zinc-400"
        )}
      >
        <div className="mx-auto max-w-2xl space-y-2 text-center">
          <h3 className="text-xl font-medium text-slate-900 sm:text-2xl">{title}</h3>
          <p className="text-base leading-relaxed text-slate-600">{description}</p>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-5xl">
          {items.map((item) => (
            <PricingFeatureCard key={item.title} item={item} iconVariant={iconVariant} />
          ))}
        </div>
      </div>
    </BlurFade>
  )
}

export function PricingProIncludesSection() {
  return (
    <SectionContainer className="relative overflow-hidden bg-zinc-900 py-16 md:py-20">
      <Image
        src="/images/cercles.svg"
        alt=""
        width={1000}
        height={1000}
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-30 mix-blend-overlay"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-12 md:gap-16">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Lo que incluye la versión Pro
            </h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
              Todo lo que necesitas para vender más, ofrecer una experiencia premium y tomar
              decisiones con datos reales de tu restaurante.
            </p>
          </BlurFade>
        </div>

        {pricingProGroups.map((group, index) => (
          <ProFeaturePanel
            key={group.title}
            title={group.title}
            description={group.description}
            items={group.items}
            iconVariant={group.iconVariant}
            bordered={group.bordered}
            index={index}
          />
        ))}

        <BlurFade inView inViewMargin="-80px">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="max-w-lg bg-gradient-to-r from-sky-300 via-white to-sky-200 bg-clip-text text-lg font-medium text-transparent sm:text-xl">
              Prueba el plan Pro gratis durante 30 días. Sin tarjeta.
            </p>
            <CTAButton />
          </div>
        </BlurFade>
      </div>
    </SectionContainer>
  )
}
