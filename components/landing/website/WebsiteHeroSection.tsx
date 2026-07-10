"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { WebsiteWidgetsMockup } from "@/components/landing/WebsiteWidgetsMockup"
import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/ui/blur-fade"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { websiteHeroContent } from "./website-section-data"

export function WebsiteHeroSection() {
  return (
    <SectionContainer id="website-hero" className="pt-8 md:pt-12">
      <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <BlurFade inView inViewMargin="-80px">
            <h1 className="font-heading text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {websiteHeroContent.title}
            </h1>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">{websiteHeroContent.description}</p>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.18}>
            <p className="text-sm text-slate-500 sm:text-base">{websiteHeroContent.badge}</p>
          </BlurFade>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTAButton label="Empezar ahora" location="website_hero" />
            <Link
              href="#website-examples"
              {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, {
                label: "Ver ejemplo",
                location: "website_hero",
                linkUrl: "#website-examples",
              })}
            >
              <Button variant="outline" className="w-full sm:w-auto">
                Ver ejemplo <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
        <WebsiteWidgetsMockup />
      </div>
    </SectionContainer>
  )
}
