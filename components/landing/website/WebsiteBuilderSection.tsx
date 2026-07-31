"use client"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"

export function WebsiteBuilderSection() {
  return (
    <div style={{
      backgroundImage: "url('/images/bg-header.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center",
      backgroundSize: "cover",
    }}>
      <SectionContainer
        id="website-builder"

      >


        <div className="mx-auto max-w-5xl space-y-8 text-center md:space-y-10">
          <div className="space-y-4">
            <BlurFade inView inViewMargin="-80px">
              <h2 className="section-title">Edita tu web como si fuera un Lego</h2>
            </BlurFade>
            <BlurFade inView inViewMargin="-80px" delay={0.1}>
              <p className="section-paragraph mx-auto max-w-3xl">
                Sin código, arrastra y suelta. Cambia textos, fotos y colores con un par de clics.
              </p>
            </BlurFade>
          </div>

          <div className="  border-black relative shadow-2xl mx-auto aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Demo del editor para construir páginas web"
            >
              <source
                src="/images/website-landing/demo-webpage-editor-web.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="w-full">
            <CTAButton label="Probar editor" location="website_builder" />
          </div>
        </div>

      </SectionContainer>
    </div>
  )
}
