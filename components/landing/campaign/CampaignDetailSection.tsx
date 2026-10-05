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
      <div className="flex flex-col-reverse md:grid items-center gap-8 md:gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <BlurFade inView>
            <h2 className="section-title max-w-[460px]">{title}</h2>
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
        <div className={cn("w-full rounded-3xl overflow-hidden px-2 py-8 sm:px-4 sm:py-12", imageBackground)}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1023px) calc(100vw - 88px), 480px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </SectionContainer>
  )
}
