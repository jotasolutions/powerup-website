"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { Highlighter } from "../ui/highlighter"
import { PricingCards } from "@/components/landing/PricingCards"
type PricingSectionProps = {
  monthlyPrice: string
  yearlyPrice: string
  monthlyPriceInCents: number
  yearlyPriceInCents: number
}

export function PricingSection({
  monthlyPriceInCents,
  yearlyPriceInCents,
}: PricingSectionProps) {
  return (
    <SectionContainer
      id="pricing"
      className="bg-gradient-to-b from-white via-[#E2FEFD]  to-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-14">
        <div className="space-y-4 text-center">
          <h2 className="section-title">
            Planes de precios
          </h2>
          <p className="section-paragraph">
            Te regalamos <Highlighter action="underline" color="#FF9800">
              30 días de prueba
            </Highlighter> de PowerUp Pro y luego decides.
          </p>
        </div>
        <PricingCards
          monthlyPriceInCents={monthlyPriceInCents}
          yearlyPriceInCents={yearlyPriceInCents}
        />
      </div>
    </SectionContainer>
  )
}
