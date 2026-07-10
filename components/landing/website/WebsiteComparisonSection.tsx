"use client"

import { AlertTriangle, Check, X } from "lucide-react"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"
import { websiteComparisonRows, type WebsiteComparisonRow } from "./website-section-data"

function ComparisonSymbol({ value }: { value: WebsiteComparisonRow["wordpress"] }) {
  if (value === "yes") {
    return <Check className="size-5 text-emerald-600" strokeWidth={2.5} aria-label="Incluido" />
  }

  if (value === "warning") {
    return (
      <AlertTriangle className="size-5 text-amber-500" strokeWidth={2.2} aria-label="Parcialmente" />
    )
  }

  return <X className="size-5 text-red-500" strokeWidth={2.5} aria-label="No incluido" />
}

export function WebsiteComparisonSection() {
  return (
    <SectionContainer id="website-comparison">
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title text-center">Lo que necesitas de una web, sin complicaciones</h2>
        </BlurFade>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[740px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-4 text-sm font-medium text-slate-500 sm:px-6 sm:text-base">
                  Característica
                </th>
                <th className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:text-base">
                  Wordpress
                </th>
                <th className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:text-base">
                  Tradicional
                </th>
                <th className="bg-primary/5 px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:text-base">
                  Nuestra solución
                </th>
              </tr>
            </thead>
            <tbody>
              {websiteComparisonRows.map((row, index) => (
                <tr
                  key={row.feature}
                  className={`border-b border-slate-100 last:border-b-0 ${index % 2 === 1 ? "bg-slate-50/60" : ""}`}
                >
                  <td className="px-4 py-4 text-sm font-medium text-slate-800 sm:px-6 sm:text-base">
                    {row.feature}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <ComparisonSymbol value={row.wordpress} />
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <ComparisonSymbol value={row.traditional} />
                  </td>
                  <td className="bg-primary/5 px-4 py-4 sm:px-6">
                    <ComparisonSymbol value={row.powerup} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <CTAButton label="Pruébalo gratis" location="website_comparison" />
        </div>
      </div>
    </SectionContainer>
  )
}
