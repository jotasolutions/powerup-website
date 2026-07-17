"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/ui/blur-fade"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { websiteHeroContent } from "./website-section-data"

export function WebsiteHeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <SectionContainer id="website-hero" className="pt-8 md:pt-12 bg-gradient-to-b from-[#E2FEFD]  to-white">
      <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <BlurFade inView inViewMargin="-80px">
            <h1 className="font-heading text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl lg:text-4xl">
              {websiteHeroContent.title}
            </h1>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph max-w-[80%]">{websiteHeroContent.description}</p>
          </BlurFade>
         
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTAButton icon={null} label="Crear mi web gratis" location="website_hero" />
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
          <BlurFade inView inViewMargin="-80px" delay={0.18}>
            <p className="text-xs text-slate-600 sm:text-base">{websiteHeroContent.badge}</p>
          </BlurFade>
        </div>
        <div className="rounded-4xl p-4 relative h-[500px] overflow-hidden" style={{backgroundImage: "url('/images/brunch-restaurant.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
          <div className="absolute inset-0 bg-black opacity-20 z-10 pointer-events-none" />
          <motion.div
            className="absolute right-0 top-20 z-20"
            initial={prefersReducedMotion ? false : { y: 80, opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <Image
              src="/images/tropico-website-mockup.png"
              alt="Vista previa de la página web tipo linktree para restaurante"
              width={1500}
              height={1500}
              className="scale-105 object-contain sm:scale-110 lg:scale-140"
              priority
            />
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  )
}
