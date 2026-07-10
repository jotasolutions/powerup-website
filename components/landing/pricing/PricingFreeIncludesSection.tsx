"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "@/components/CTAButton"
import { BlurFade } from "@/components/ui/blur-fade"
import { pricingFreeIncludes } from "@/components/landing/pricing-section-data"
import { PricingFeatureCard } from "./PricingFeatureCard"

export function PricingFreeIncludesSection() {
  return (
    <SectionContainer className="bg-white">
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-14">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">Lo que incluye el plan Gratis</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Todo lo esencial para digitalizar tu carta y empezar a gestionarla tú mismo, sin coste
              ni permanencia.
            </p>
          </BlurFade>
        </div>

        <BlurFade inView inViewMargin="-80px" delay={0.16}>
          <div className="grid w-full gap-3 sm:grid-cols-2">
            {pricingFreeIncludes.map((item) => (
              <PricingFeatureCard key={item.title} item={item} iconVariant="free" />
            ))}
          </div>
        </BlurFade>

        <BlurFade inView inViewMargin="-80px">
          <div className="flex justify-center pt-4">
            <CTAButton />
          </div>
        </BlurFade>
      </div>
    </SectionContainer>
  )
}
