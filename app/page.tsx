import { AboutSection } from "@/components/landing/AboutSection"
import { AnalyticsSection } from "@/components/landing/AnalyticsSection"
import { AttractPeopleSection } from "@/components/landing/AttractPeopleSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { FooterSection } from "@/components/landing/FooterSection"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { MenuShowcaseSection } from "@/components/landing/MenuShowcaseSection"
import { PricingSection } from "@/components/landing/PricingSection"
import { SellMoreSection } from "@/components/landing/SellMoreSection"
import { AdminSection } from "@/components/landing/AdminSection"
import { DifferentiationSection } from "@/components/landing/DifferentiationSection"
import { AdvisorSection } from "@/components/landing/AdvisorSection"
import { WebsiteSection } from "@/components/landing/WebsiteSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { getPricingDataAction } from "@/app/actions/pricing"
import { NavMenu } from "@/components/landing/NavMenu"
import { BigTextSection } from "@/components/landing/BigTextSection"
import { SITE_URL } from "@/lib/site"
import { jsonLdScript } from "@/lib/json-ld"
import { homeFaqJsonLd, softwareApplicationJsonLd } from "@/lib/product-structured-data"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "PowerUp Menu",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icons/apple-icon-180x180.png`,
  sameAs: [
    "https://www.trustpilot.com/review/powerup.menu",
    "https://lanzadera.es/proyecto/powerup-menu/",
    "https://startupvalencia.org/directory-list/listing/powerup-menu/",
    "https://www.linkedin.com/company/powerup-menu/",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "PowerUp Menu",
  publisher: { "@id": `${SITE_URL}/#organization` },
}

export default async function Home() {
  const pricingData = await getPricingDataAction()

  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(softwareApplicationJsonLd(pricingData)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(homeFaqJsonLd()) }}
      />
      <NavMenu />
      <HeroSection />
      <BigTextSection />
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
