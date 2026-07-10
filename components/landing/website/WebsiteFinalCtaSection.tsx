"use client"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"

export function WebsiteFinalCtaSection() {
  return (
    <SectionContainer
      id="website-final-cta"
      className="bg-gradient-to-b from-white via-[#DEF8FF] to-white"
    >
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title">Tu web profesional sin esfuerzo y sin coste extra</h2>
        </BlurFade>
        <p className="section-paragraph mx-auto max-w-3xl">
          Incluida en tu suscripción Pro actual. Empieza ahora y lleva tu negocio al siguiente nivel.
        </p>
        <div className="flex justify-center">
          <CTAButton label="Crear mi web" location="website_final_cta" />
        </div>
      </div>
    </SectionContainer>
  )
}
