"use client"

import Image from "next/image"
import { Check } from "lucide-react"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"
import { campaignLandings, type CampaignLandingKey } from "./campaign-landing-data"

export function CampaignDetailSection({ landing }: { landing: CampaignLandingKey }) {
  const { title, description, items, image, imageBackground } = campaignLandings[landing].detail

  return (
    <SectionContainer id={`${landing}-detalle`}>
      {/* One column with the picture first until lg, like on a phone */}
      <div className="flex flex-col-reverse items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="w-full max-w-2xl space-y-6 lg:max-w-none">
          <BlurFade inView>
            <h2 className="section-title text-balance max-w-[460px]">{title}</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.1}>
            <p className="section-paragraph">{description}</p>
          </BlurFade>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-700 sm:text-base font-medium"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-slate-600">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <CTAButton />
        </div>
        <div className={cn("w-full max-w-2xl rounded-3xl overflow-hidden py-6 sm:px-4 sm:py-12 lg:max-w-none", imageBackground)}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1023px) min(calc(100vw - 56px), 672px), 480px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </SectionContainer>
  )
}
