"use client"

import { Check } from "lucide-react"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"
import { websitePricingMenuItems, websitePricingWebItems } from "./website-section-data"

function BundleCard({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: readonly { title: string; description: string }[]
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="space-y-2">
        <h3 className="text-xl font-medium text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600 sm:text-base">{description}</p>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-slate-700">
              <Check className="size-3" strokeWidth={2.75} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900 sm:text-base">{item.title}</p>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

type WebsitePricingSectionProps = {
  yearlyPrice: string
  yearlyPriceInCents: number
}

export function WebsitePricingSection({ yearlyPrice, yearlyPriceInCents }: WebsitePricingSectionProps) {
  const monthlyEquivalent = yearlyPriceInCents / 12 / 100
  const monthlyFormatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(monthlyEquivalent)
    .replace(/\s/g, "")

  return (
    <SectionContainer id="website-pricing">
      <div className="mx-auto max-w-5xl space-y-8 rounded-3xl bg-[#f2f2f2] p-5 sm:p-8 md:space-y-10">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title text-center">Incluida gratis en tu plan Pro Actual</h2>
        </BlurFade>
        <div className="grid gap-4">
          <BundleCard
            title="Carta Digital / Pedidos"
            description="Tu carta moderna y optimizada para aumentar ventas."
            items={websitePricingMenuItems}
          />
          <div className="text-center text-3xl font-medium text-slate-700">+</div>
          <BundleCard
            title="Web Profesional"
            description="Tu sitio del restaurante, autogestionable y siempre al día."
            items={websitePricingWebItems}
          />
        </div>
        <div className="space-y-3 text-center">
          <p className="font-heading text-2xl font-medium text-slate-900 sm:text-3xl">
            PowerUp Pro anual {yearlyPrice}
          </p>
          <p className="text-sm text-slate-600 sm:text-base">
            Equivale a {monthlyFormatted}/mes y la web está incluida sin coste extra.
          </p>
        </div>
        <div className="flex justify-center">
          <CTAButton label="Crear mi web" location="website_pricing" />
        </div>
      </div>
    </SectionContainer>
  )
}
