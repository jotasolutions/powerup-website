"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "@/components/CTAButton"
import { BlurFade } from "@/components/ui/blur-fade"
import {
  pricingComparisonRows,
  type ComparisonCell,
} from "@/components/landing/pricing-section-data"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

function ComparisonCellContent({ cell }: { cell: ComparisonCell }) {
  if (cell.type === "yes") {
    return <Check className="size-5 text-emerald-600" strokeWidth={2.5} aria-label="Incluido" />
  }

  if (cell.type === "no") {
    return <X className="size-5 text-red-500" strokeWidth={2.5} aria-label="No incluido" />
  }

  return <span className="text-sm font-medium text-slate-700 sm:text-base">{cell.value}</span>
}

export function PricingComparisonSection() {
  return (
    <SectionContainer className="bg-white">
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title text-center">Comparativa</h2>
        </BlurFade>

        <BlurFade inView inViewMargin="-80px" delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-4 text-sm font-medium text-slate-500 sm:px-6 sm:text-base">
                    Característica
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:text-base">
                    PowerUp Pro
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:text-base">
                    PowerUp Gratis
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingComparisonRows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-slate-100 last:border-b-0",
                      index % 2 === 1 && "bg-slate-50/60"
                    )}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-slate-800 sm:px-6 sm:text-base">
                      {row.feature}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <ComparisonCellContent cell={row.pro} />
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <ComparisonCellContent cell={row.free} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BlurFade>

        <BlurFade inView inViewMargin="-80px">
          <div className="flex flex-col items-center gap-3">
            <CTAButton />
            <p className="text-sm text-slate-500">No requiere tarjeta</p>
          </div>
        </BlurFade>
      </div>
    </SectionContainer>
  )
}
