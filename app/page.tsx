import { AboutSection } from "@/components/landing/AboutSection"
import { AnalyticsSection } from "@/components/landing/AnalyticsSection"
import { AttractPeopleSection } from "@/components/landing/AttractPeopleSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { FooterSection } from "@/components/landing/FooterSection"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { IntroSection } from "@/components/landing/IntroSection"
import { MenuShowcaseSection } from "@/components/landing/MenuShowcaseSection"
import { PricingSection } from "@/components/landing/PricingSection"
import { SellMoreSection } from "@/components/landing/SellMoreSection"
import { AdminSection } from "@/components/landing/AdminSection"
import { DifferentiationSection } from "@/components/landing/DifferentiationSection"
import { AdvisorSection } from "@/components/landing/AdvisorSection"
import { WebsiteSection } from "@/components/landing/WebsiteSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { getPricingDataAction } from "@/app/actions/pricing"

export default async function Home() {
  const pricingData = await getPricingDataAction()

  return (
    <main className="bg-white text-slate-900">
      <HeroSection />
      <IntroSection />
      <SellMoreSection />
      <AttractPeopleSection />
      <AnalyticsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AdminSection />
      <DifferentiationSection />
      <AdvisorSection/>
      <WebsiteSection/>
      <TestimonialsSection/>
      <MenuShowcaseSection />
      <PricingSection
        monthlyPrice={pricingData.monthlyPrice}
        yearlyPrice={pricingData.yearlyPrice}
        monthlyPriceInCents={pricingData.monthlyPriceInCents}
        yearlyPriceInCents={pricingData.yearlyPriceInCents}
      />
      <FaqSection />
      <AboutSection />
      <FooterSection />
    </main>
  )
}
