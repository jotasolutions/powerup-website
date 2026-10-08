import type { Metadata } from "next"
import { getPricingDataAction } from "@/app/actions/pricing"
import { FooterSection } from "@/components/landing/FooterSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { NavMenu } from "@/components/landing/NavMenu"
import { PricingSection } from "@/components/landing/PricingSection"
import { PricingComparisonSection } from "@/components/landing/pricing/PricingComparisonSection"
import { PricingFreeIncludesSection } from "@/components/landing/pricing/PricingFreeIncludesSection"
import { PricingProIncludesSection } from "@/components/landing/pricing/PricingProIncludesSection"
import { PricingTrialSection } from "@/components/landing/pricing/PricingTrialSection"
import { PricingValueSection } from "@/components/landing/pricing/PricingValueSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { BigTextSection } from "@/components/landing/BigTextSection"
import { jsonLdScript } from "@/lib/json-ld"
import { softwareApplicationJsonLd } from "@/lib/product-structured-data"
import { websiteOpenGraph } from "@/lib/site"

const title = "Precios | PowerUp Menu"
const description =
  "Compara los planes Free y Pro de PowerUp Menu. Prueba 30 días gratis sin tarjeta y elige el plan que mejor encaje con tu restaurante."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: websiteOpenGraph({ title, description, url: "/pricing" }),
}

export default async function PricingPage() {
  const pricingData = await getPricingDataAction()

  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(softwareApplicationJsonLd(pricingData)) }}
      />
      <NavMenu />
      <PricingSection
        monthlyPrice={pricingData.monthlyPrice}
        yearlyPrice={pricingData.yearlyPrice}
        monthlyPriceInCents={pricingData.monthlyPriceInCents}
        yearlyPriceInCents={pricingData.yearlyPriceInCents}
        titleAs="h1"
      />
      <PricingTrialSection />
      <PricingFreeIncludesSection />
      <PricingProIncludesSection />

      <BigTextSection 
      showImages={false}
      paragraph="Crea tu carta y potencia las ventas con ingredientes extras y maridando platos. Con esos cambios en pocos días ya habrás amortizado el precio del plan Pro" />
      <PricingComparisonSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <FooterSection />
    </main>
  )
}
