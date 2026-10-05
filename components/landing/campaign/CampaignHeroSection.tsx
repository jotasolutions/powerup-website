"use client"

import Image from "next/image"

import { CTAButton } from "@/components/CTAButton"
import { LazyLottie } from "@/components/landing/LazyLottie"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { attractFeatures } from "@/components/landing/section-data"
import { BlurFade } from "@/components/ui/blur-fade"
import { Highlighter } from "@/components/ui/highlighter"
import { campaignLandings, type CampaignLandingKey } from "./campaign-landing-data"

function HeroVisual({ landing }: { landing: CampaignLandingKey }) {
  const { visual } = campaignLandings[landing].hero

  if (visual.kind === "image") {
    return (
      <Image
        src={visual.src}
        alt={visual.alt}
        width={visual.width}
        height={visual.height}
        sizes="(max-width: 1023px) calc(100vw - 56px), 540px"
        className="absolute inset-0 h-full w-full object-cover object-top"
        priority
      />
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#F0FFF5] to-[#CBFFDC] px-6 pb-16">
      <LazyLottie
        animation={attractFeatures[0].animation}
        loop
        className="relative w-full max-w-[460px]"
      />
    </div>
  )
}

export function CampaignHeroSection({ landing }: { landing: CampaignLandingKey }) {
  const { hook, titleStart, titleHighlight, description, badge } = campaignLandings[landing].hero

  return (
    <SectionContainer id={`${landing}-hero`} className="pt-8 md:pt-12 bg-gradient-to-b from-[#E2FEFD] to-white">
      <div className="flex flex-col-reverse items-center gap-8 md:grid md:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <BlurFade inView inViewMargin="-80px">
            <h1 className="text-center md:text-left font-heading text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-tight">
              {titleStart}{" "}
              <Highlighter action="circle" color="#FF9800" delay={1000}>
                {titleHighlight}
              </Highlighter>
            </h1>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph text-center md:text-left md:max-w-[90%]">{description}</p>
          </BlurFade>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTAButton />
          </div>
          <BlurFade inView inViewMargin="-80px" delay={0.18}>
            <p className="text-center md:text-left text-xs text-slate-600 sm:text-base">{badge}</p>
          </BlurFade>
        </div>
        <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-4xl bg-slate-100">
          <HeroVisual landing={landing} />
          <p className="absolute inset-x-4 bottom-4 z-10 mx-auto w-fit whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-center font-heading text-base font-medium text-slate-900 shadow-lg sm:text-2xl md:bottom-6">
            {hook} <span aria-hidden>🤔</span>
          </p>
        </div>
      </div>
    </SectionContainer>
  )
}
