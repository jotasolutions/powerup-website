import type { Metadata } from "next"

import { AttractPeopleSection } from "@/components/landing/AttractPeopleSection"
import { BigTextSection } from "@/components/landing/BigTextSection"
import { CampaignDetailSection } from "@/components/landing/campaign/CampaignDetailSection"
import { CampaignHeroSection } from "@/components/landing/campaign/CampaignHeroSection"
import { CampaignTestimonialSection } from "@/components/landing/campaign/CampaignTestimonialSection"
import { campaignLandings } from "@/components/landing/campaign/campaign-landing-data"
import { FooterSection } from "@/components/landing/FooterSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { MenuShowcaseSection } from "@/components/landing/MenuShowcaseSection"
import { NavMenu } from "@/components/landing/NavMenu"
import { PricingTrialSection } from "@/components/landing/pricing/PricingTrialSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"

const landing = campaignLandings.visibilidad

// Landing for paid ads only (Meta test round 1, branch H1). It stays out of Google so it doesn't
// compete with the home: noindex, and it isn't in the sitemap or the menu.
export const metadata: Metadata = {
  title: landing.metaTitle,
  description: landing.metaDescription,
  alternates: {
    canonical: "/visibilidad",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function VisibilidadPage() {
  return (
    <main className="relative bg-white text-slate-900">
      {/* Fondo detrás del nav: no envolver el sticky o deja de pegarse al salir del wrapper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[#E2FEFD]"
      />
      <NavMenu />
      <CampaignHeroSection landing="visibilidad" />
      <BigTextSection showImages={false} paragraph={landing.bigText} compact />
      <AttractPeopleSection />
      <CampaignDetailSection landing="visibilidad" />
      <CampaignTestimonialSection landing="visibilidad" />
      <MenuShowcaseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingTrialSection />
      <FooterSection />
    </main>
  )
}
