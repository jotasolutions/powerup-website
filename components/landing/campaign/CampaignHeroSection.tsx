"use client"

import { Fragment } from "react"
import Image from "next/image"
import { Sparkle } from "lucide-react"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
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
        sizes="(max-width: 1023px) min(calc(100vw - 56px), 672px), 540px"
        className="absolute inset-0 h-full w-full object-cover object-top"
        priority
      />
    )
  }

  // The bottom padding leaves room for the hook pill.
  return (
    <div
      role="img"
      aria-label={visual.alt}
      className="absolute inset-0 flex flex-col justify-center gap-4 bg-gradient-to-b from-[#F8FAFC] to-[#ECF8FF] px-5 pb-20 sm:gap-6 sm:px-10 sm:pb-24"
    >
      <p className="max-w-[85%] self-end rounded-3xl rounded-br-md bg-slate-800 px-4 py-2.5 text-sm text-white sm:px-6 sm:py-4 sm:text-xl">
        {visual.question}
      </p>
      <div className="flex max-w-[95%] items-end gap-2 sm:gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 sm:size-11">
          <Sparkle className="size-4 sm:size-5" aria-hidden />
        </span>
        <p className="rounded-3xl rounded-bl-md bg-white px-4 py-2.5 text-sm text-slate-800 shadow-xl sm:px-6 sm:py-4 sm:text-xl">
          {visual.answerStart}{" "}
          {visual.places.map((place, i) => (
            <Fragment key={place}>
              {i > 0 && (i === visual.places.length - 1 ? " y " : ", ")}
              <b className="font-semibold text-slate-900">{place}</b>
            </Fragment>
          ))}
          .
        </p>
      </div>
    </div>
  )
}

export function CampaignHeroSection({ landing }: { landing: CampaignLandingKey }) {
  const { hook, titleStart, titleHighlight, description, badge } = campaignLandings[landing].hero

  return (
    <SectionContainer id={`${landing}-hero`} className="pt-8 md:pt-12 bg-gradient-to-b from-[#E2FEFD] to-white">
      {/* Until lg it's one column with the picture first, so the ad's hook (on the picture) comes
          before the headline, as in the ad. */}
      <div className="flex flex-col-reverse items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
        <div className="w-full max-w-2xl space-y-6 lg:max-w-none">
          <BlurFade inView inViewMargin="-80px">
            <h1 className="text-balance text-center lg:text-left font-heading text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-tight">
              {titleStart}{" "}
              <Highlighter action="circle" color="#FF9800" delay={1000}>
                {titleHighlight}
              </Highlighter>
            </h1>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph text-center lg:text-left lg:max-w-[90%]">{description}</p>
          </BlurFade>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <CTAButton />
          </div>
          <BlurFade inView inViewMargin="-80px" delay={0.18}>
            <p className="text-center lg:text-left text-xs text-slate-600 sm:text-base">{badge}</p>
          </BlurFade>
        </div>
        <div className="relative w-full max-w-2xl h-[300px] sm:h-[400px] lg:h-[500px] lg:max-w-none overflow-hidden rounded-4xl bg-slate-100">
          <HeroVisual landing={landing} />
          <p className="absolute inset-x-4 bottom-4 z-10 mx-auto w-fit whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-center font-heading text-base font-medium text-slate-900 shadow-lg sm:text-2xl md:bottom-6">
            {hook} <span aria-hidden>🤔</span>
          </p>
        </div>
      </div>
    </SectionContainer>
  )
}
