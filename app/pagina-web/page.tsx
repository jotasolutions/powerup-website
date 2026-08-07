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
import { WebsiteAnalyticsSection } from "@/components/landing/website/WebsiteAnalyticsSection"
import { WebsitePagesSection } from "@/components/landing/website/WebsitePagesSection"

import { WebsiteShowcaseSection } from "@/components/landing/website/WebsiteShowcaseSection"
import { WebsitePricingSection } from "@/components/landing/website/WebsitePricingSection"
import { WebsitePainPointSection } from "@/components/landing/website/WebsitePainPointSection"
import { BigTextSection } from "@/components/landing/BigTextSection"

export const metadata: Metadata = {
  title: "Página web para restaurantes | PowerUp Menu",
  description:
    "Crea una web moderna para tu restaurante en minutos, sin diseñadores ni código. Incluida con PowerUp Pro anual.",
  alternates: {
    canonical: "/pagina-web",
  },
}

export default async function WebsitePage() {
  const pricingData = await getPricingDataAction()

  return (
    <main className="relative bg-white text-slate-900">
      {/* Fondo detrás del nav: no envolver el sticky o deja de pegarse al salir del wrapper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[#E2FEFD]"
      />
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
      <TestimonialsSection />
      <WebsiteComparisonSection />
      <WebsitePricingSection
        yearlyPrice={pricingData.yearlyPrice}
        yearlyPriceInCents={pricingData.yearlyPriceInCents}
      />
    
      <FooterSection />
    </main>
  )
}
