"use client"

import { ShowcaseCarousel } from "@/components/landing/ShowcaseCarousel"
import { websiteShowcaseItems } from "./website-section-data"
import { SectionContainer } from "../SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"

export function WebsiteShowcaseSection() {
  return (
    <SectionContainer id="website-showcase" className="bg-gradient-to-b from-white via-[#E2FEFD]  to-white">
      <div className="space-y-10 text-center sm:space-y-14 md:space-y-20">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="landing-section-title text-2xl md:text-3xl lg:text-4xl max-w-lg mx-auto">
            Así de bien puede verse la web de tu restaurante
          </h2>
        </BlurFade>
        <ShowcaseCarousel
          sectionId="website-examples"
          sectionClassName="bg-[#f4f4f4]"
          title="Así de bien puede verse la web de tu restaurante"
          items={websiteShowcaseItems}
        />
      </div>
    </SectionContainer>
  )
}
