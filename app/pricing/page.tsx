import type { Metadata } from "next"
import { getPricingDataAction } from "@/app/actions/pricing"
import { FooterSection } from "@/components/landing/FooterSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { IntroSection } from "@/components/landing/IntroSection"
import { NavMenu } from "@/components/landing/NavMenu"
import { PricingSection } from "@/components/landing/PricingSection"
import { PricingComparisonSection } from "@/components/landing/pricing/PricingComparisonSection"
import { PricingFreeIncludesSection } from "@/components/landing/pricing/PricingFreeIncludesSection"
import { PricingProIncludesSection } from "@/components/landing/pricing/PricingProIncludesSection"
import { PricingTrialSection } from "@/components/landing/pricing/PricingTrialSection"
import { PricingValueSection } from "@/components/landing/pricing/PricingValueSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"

export const metadata: Metadata = {
  title: "Precios | PowerUp Menu",
  description:
    "Compara los planes Free y Pro de PowerUp Menu. Prueba 30 días gratis sin tarjeta y elige el plan que mejor encaje con tu restaurante.",
  alternates: {
    canonical: "https://carta.powerup.menu/pricing",
  },
}

export default async function PricingPage() {
  const pricingData = await getPricingDataAction()

  return (
    <main className="bg-white text-slate-900">
      <NavMenu />
      <PricingSection
        monthlyPrice={pricingData.monthlyPrice}
        yearlyPrice={pricingData.yearlyPrice}
        monthlyPriceInCents={pricingData.monthlyPriceInCents}
        yearlyPriceInCents={pricingData.yearlyPriceInCents}
      />
      <PricingTrialSection />
      <PricingFreeIncludesSection />
      <PricingProIncludesSection />
      <PricingValueSection />
      <IntroSection paragraph="Crea tu carta y potencia las ventas con ingredientes extras y maridando platos. Con esos cambios en pocos días ya habrás amortizado el precio del plan Pro" />
      <PricingComparisonSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <FooterSection />
    </main>
  )
}
