"use client"

import Image from "next/image"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"

export function WebsiteOutstandSection() {
  return (
    <SectionContainer id="website-outstand">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center md:gap-10">
        <div className="relative aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/tropico-website-mockup.png"
            alt="Vista destacada de web restaurante"
            fill
            className="object-cover"
            sizes="220px"
          />
        </div>
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title">Diseñada para que te elijan a ti</h2>
        </BlurFade>
        <p className="section-paragraph max-w-2xl">
          Creamos experiencias que atraen, fidelizan y convierten visitantes en clientes reales.
        </p>
        <CTAButton label="Pruébalo gratis" location="website_outstand" />
      </div>
    </SectionContainer>
  )
}
