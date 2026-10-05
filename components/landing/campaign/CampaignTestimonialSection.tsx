"use client"

import Image from "next/image"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"
import { campaignLandings, type CampaignLandingKey } from "./campaign-landing-data"

// One client story in large, the one that backs the landing's argument. The texts and photos are the
// same as in TestimonialsSection.
export function CampaignTestimonialSection({ landing }: { landing: CampaignLandingKey }) {
  const { result, review, place, userName, userImage, logo, bgImage } =
    campaignLandings[landing].testimonial

  return (
    <SectionContainer
      id={`${landing}-testimonio`}
      className="bg-gradient-to-b from-white via-[#E2FEFD] to-white"
    >
      <div className="mx-auto grid max-w-2xl items-center gap-8 md:gap-10 lg:max-w-none lg:grid-cols-2 lg:gap-12">
        <div className="relative h-[220px] w-full sm:h-[320px] lg:h-[400px]">
          <Image
            src={bgImage}
            alt={place}
            fill
            sizes="(max-width: 1023px) min(calc(100vw - 56px), 672px), 540px"
            className="rounded-3xl object-cover"
          />
          <div className="absolute bottom-4 left-4 h-[72px] w-[72px] overflow-hidden rounded-xl sm:h-[88px] sm:w-[88px]">
            <Image src={logo} alt={place} width={100} height={100} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="space-y-6">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title text-balance">{result}</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.1}>
            <blockquote className="text-lg font-medium leading-relaxed text-slate-900 sm:text-xl">
              &ldquo;{review}&rdquo;
            </blockquote>
          </BlurFade>
          <div className="flex items-center gap-4">
            <div className="h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full">
              <Image src={userImage} alt={userName} width={100} height={100} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-gray-500">{place}</p>
            </div>
          </div>
          <CTAButton />
        </div>
      </div>
    </SectionContainer>
  )
}
