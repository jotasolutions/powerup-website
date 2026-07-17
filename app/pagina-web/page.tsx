import type { Metadata } from "next"

import { getPricingDataAction } from "@/app/actions/pricing"
import { FooterSection } from "@/components/landing/FooterSection"
import { NavMenu } from "@/components/landing/NavMenu"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { WebsiteBenefitsSection } from "@/components/landing/website/WebsiteBenefitsSection"
import { WebsiteBuilderSection } from "@/components/landing/website/WebsiteBuilderSection"
import { WebsiteComparisonSection } from "@/components/landing/website/WebsiteComparisonSection"
import { WebsiteFinalCtaSection } from "@/components/landing/website/WebsiteFinalCtaSection"
import { WebsiteHeroSection } from "@/components/landing/website/WebsiteHeroSection"
import { WebsiteOutstandSection } from "@/components/landing/website/WebsiteOutstandSection"
import { WebsitePricingSection } from "@/components/landing/website/WebsitePricingSection"
import {
  WebsiteAnalyticsSection,
  WebsitePagesSection,
  WebsiteWelcomeSection,
} from "@/components/landing/website/WebsiteSplitSections"
import { WebsiteShowcaseSection } from "@/components/landing/website/WebsiteShowcaseSection"
import { PricingSection } from "@/components/landing/PricingSection"
import { WebsitePainPointSection } from "@/components/landing/website/WebsitePainPointSection"
import { BigTextSection } from "@/components/landing/BigTextSection"

export const metadata: Metadata = {
  title: "Página web para restaurantes | PowerUp Menu",
  description:
    "Crea una web moderna para tu restaurante en minutos, sin diseñadores ni código. Incluida con PowerUp Pro anual.",
  alternates: {
    canonical: "https://carta.powerup.menu/pagina-web",
  },
}

export default async function WebsitePage() {
  const pricingData = await getPricingDataAction()

  return (
    <main className="bg-white text-slate-900">
      <NavMenu />
      <WebsiteHeroSection />
      <WebsitePainPointSection />
      <BigTextSection showImages={false} paragraph="La página de tu restaurante debería posicionarte en Google y tener algunos enlaces. Para eso no necesitas pagar cientos de euros para que un estudio te haga una a medida. Nosotros la incluímos con la carta QR" />
      <WebsiteBenefitsSection />
      <WebsiteShowcaseSection />
      <WebsiteOutstandSection />
      <WebsitePagesSection />
      <WebsiteAnalyticsSection />
      <WebsiteBuilderSection />
      <WebsiteWelcomeSection />
      <TestimonialsSection />
      <WebsiteComparisonSection />
      <PricingSection
        monthlyPrice={pricingData.monthlyPrice}
        yearlyPrice={pricingData.yearlyPrice}
        monthlyPriceInCents={pricingData.monthlyPriceInCents}
        yearlyPriceInCents={pricingData.yearlyPriceInCents}
      />
      <WebsiteFinalCtaSection />
      <FooterSection />
    </main>
  )
}
