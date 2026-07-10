"use client"

import Image from "next/image"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"

export function WebsiteBuilderSection() {
  return (
    <SectionContainer id="website-builder" className="bg-[#f4f4f4]">
      <div className="mx-auto max-w-5xl space-y-8 text-center md:space-y-10">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title">Edita tu web como si fuera un Lego</h2>
        </BlurFade>
        <p className="section-paragraph mx-auto max-w-3xl">
          Sin código, arrastra y suelta. Cambia textos, fotos y colores con un par de clics.
        </p>
        <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <Image
            src="/images/tropico-website-mockup.png"
            alt="Editor para construir páginas web"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>
        <div className="flex justify-center">
          <CTAButton label="Probar editor" location="website_builder" />
        </div>
      </div>
    </SectionContainer>
  )
}
