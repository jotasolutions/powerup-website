"use client"

import dynamic from "next/dynamic"
import { advisorCopy } from "@/components/advisor-copy"
import { AdvisorPressSeal } from "@/components/landing/AdvisorProof"
import { BorderBeam } from "@/components/landing/BorderBeam"

// Same pieces and placeholder as the blog's dialog (app/blog/_components/AdvisorDialog.tsx)
const AdvisorWidget = dynamic(() => import("@/components/AdvisorWidget").then((module) => module.AdvisorWidget), {
  ssr: false,
  loading: () => (
    <div className="h-[490.5px] w-full max-w-[400px] rounded-xl border border-slate-200 bg-white min-[372px]:h-[470.5px] min-[470px]:h-[450.5px] sm:h-[510.5px]" />
  ),
})

export function AdvisorEmbed() {
  return (
    <>
      <BorderBeam>
        <AdvisorWidget />
      </BorderBeam>
      <AdvisorPressSeal label={advisorCopy.es.section.pressLabel} />
    </>
  )
}
