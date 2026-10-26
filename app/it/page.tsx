import type { Metadata } from "next"
import { getPricingDataAction } from "@/app/actions/pricing"
import { AdvisorSection } from "@/components/landing/AdvisorSection"
import { BigTextSection } from "@/components/landing/BigTextSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { FooterSection } from "@/components/landing/FooterSection"
import { HeroSection } from "@/components/landing/HeroSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { MenuShowcaseSection } from "@/components/landing/MenuShowcaseSection"
import { NavMenu } from "@/components/landing/NavMenu"
import { SellMoreSection } from "@/components/landing/SellMoreSection"
import { HOME_LANGUAGES, websiteOpenGraph } from "@/lib/site"
import { faqCopy } from "@/components/landing/home-copy"
import { faqPageJsonLd } from "@/lib/blog/structured-data"
import { jsonLdScript } from "@/lib/json-ld"

// The Italian home ("Italia mínima", PLAN-ITALIA-MINIMA.md): a shorter version of the Spanish
// home with the sections that carry the pitch and the Advisor. Texts: components/landing/home-copy.ts.
const TITLE = "Menù digitale QR per ristoranti: crealo gratis | PowerUp Menu"
const DESCRIPTION =
  "Crea gratis il menù digitale con QR code del tuo ristorante e vendi di più con abbinamenti, extra e promozioni. Siamo a Valencia, ma parliamo la tua lingua."

const BIG_TEXT =
  "Il menù è il momento in cui il cliente decide quanto spendere. Se lo ottimizzi, vendi di più. Applichiamo menu engineering e analisi dei dati al tuo menù digitale, perché venda di più senza che tu debba essere un esperto. Siamo a Valencia, ma parliamo la tua lingua."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/it",
    languages: HOME_LANGUAGES,
  },
  openGraph: websiteOpenGraph({ title: TITLE, description: DESCRIPTION, url: "/it", locale: "it_IT" }),
}

export default async function ItalianHome() {
  const pricingData = await getPricingDataAction()
  const prices = { monthly: pricingData.monthlyPrice, yearly: pricingData.yearlyPrice }
  // The same questions the page shows, so Google and AI assistants read the Italian answers.
  const faqJsonLd = faqPageJsonLd(
    faqCopy.it.items(prices).map((item) => ({ pregunta: item.question, respuesta: item.answer })),
    "/it",
  )

  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <NavMenu />
      <HeroSection />
      <BigTextSection paragraph={BIG_TEXT} />
      <SellMoreSection />
      <HowItWorksSection />
      <AdvisorSection />
      <MenuShowcaseSection />
      <FaqSection locale="it" prices={prices} />
      <FooterSection locale="it" />
    </main>
  )
}
