import type { PricingData } from "@/app/actions/pricing"
import { faqs } from "@/components/landing/section-data"
import { faqPageJsonLd, organizationNode } from "@/lib/blog/structured-data"
import { SITE_URL } from "@/lib/site"

const SOFTWARE_ID = `${SITE_URL}/#software`
const PRICING_URL = `${SITE_URL}/pricing`

function centsToPrice(amountInCents: number) {
  return (amountInCents / 100).toFixed(2)
}

// Prices come from Stripe (same source as the visible pricing cards). The site shows them
// "+ IVA", so every paid offer declares valueAddedTaxIncluded: false.
function paidOffer(name: string, amountInCents: number, currency: string, unitCode: "MON" | "ANN") {
  const price = centsToPrice(amountInCents)
  return {
    "@type": "Offer",
    name,
    url: PRICING_URL,
    price,
    priceCurrency: currency,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price,
      priceCurrency: currency,
      unitCode,
      valueAddedTaxIncluded: false,
    },
  }
}

export function softwareApplicationJsonLd(pricing: PricingData) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: "PowerUp Menu",
    url: `${SITE_URL}/`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Carta digital QR para restaurantes que ayuda a vender más desde la carta: venta cruzada, promociones, traducciones, analíticas y sincronización con Google Maps.",
    publisher: organizationNode(),
    offers: [
      {
        "@type": "Offer",
        name: "PowerUp Free",
        url: PRICING_URL,
        price: "0",
        priceCurrency: pricing.currency,
      },
      paidOffer("PowerUp Pro (mensual)", pricing.monthlyPriceInCents, pricing.currency, "MON"),
      paidOffer("PowerUp Pro (anual)", pricing.yearlyPriceInCents, pricing.currency, "ANN"),
    ],
  }
}

// FAQ shown on the homepage (FaqSection), so the FAQPage only marks up visible content.
export function homeFaqJsonLd() {
  return faqPageJsonLd(
    faqs.map((item) => ({ pregunta: item.question, respuesta: item.answer })),
    "/",
  )
}
