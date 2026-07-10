'use client'

import { SectionContainer } from "@/components/landing/SectionContainer"
import { analyticsFeatures } from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"
import { RevealCard } from "@/components/landing/RevealPrimitives"


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
            <RevealCard
              key={item.title}
              index={index}
              title={item.title}
              description={item.description}
              animation={item.animation}
              cardClassName="relative flex items-end overflow-hidden rounded-2xl bg-gradient-to-b from-[#F8F0FF] to-[#ecdff7] sm:h-[258px]"
              lottieClassName="relative z-20 w-full"
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
