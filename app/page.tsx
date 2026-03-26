import { AboutSection } from "@/components/landing/AboutSection"
import { AnalyticsSection } from "@/components/landing/AnalyticsSection"
import { AttractPeopleSection } from "@/components/landing/AttractPeopleSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { FooterSection } from "@/components/landing/FooterSection"
import { HeroSection } from "@/components/landing/HeroSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { IntroSection } from "@/components/landing/IntroSection"
import { MenuShowcaseSection } from "@/components/landing/MenuShowcaseSection"
import { PricingSection } from "@/components/landing/PricingSection"
import { SellMoreSection } from "@/components/landing/SellMoreSection"

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <HeroSection />
      <IntroSection />
      <SellMoreSection />
      <AttractPeopleSection />
      <AnalyticsSection />
      <HowItWorksSection />
      <MenuShowcaseSection />
      <PricingSection />
      <FaqSection />
      <AboutSection />
      <FooterSection />
    </main>
  )
}
