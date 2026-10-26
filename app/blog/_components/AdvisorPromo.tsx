import { QrCode } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdvisorTrigger } from "./AdvisorDialog"
import { AdvisorStoryMini } from "./AdvisorStoryMini"
import { buttonAdvisor, eyebrow } from "./styles"
import { blogUiCopy } from "@/lib/blog/ui-copy"
import type { Locale } from "@/lib/locale"

function GradientFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] bg-gradient-to-b from-[#92E0B8] to-white p-[3px] shadow-xl">
      <div className={cn("h-full rounded-[21px] bg-[linear-gradient(180deg,#DFFFEA,#FFFFFF_60%,#FFFFFF)]", className)}>{children}</div>
    </div>
  )
}

export function AdvisorPromoWide() {
  return (
    // The animation goes under the pitch, at the card's full width: beside it, the three steps
    // under the animation had no room to breathe.
    <div className="@container">
      <GradientFrame className="flex flex-col gap-6 p-4 sm:p-8">
        <div className="flex flex-col gap-3">
          <p className={eyebrow}>Advisor · Análisis con IA</p>
          <h2 className="font-heading text-[26px] font-medium leading-tight tracking-tight text-slate-900">¿Qué nota tiene tu carta?</h2>
          <p className="text-[15px] leading-relaxed text-slate-600">
            Sube tu carta actual y recibe una nota del 1 al 10 con acciones concretas para vender más.
          </p>
          <AdvisorTrigger className={cn(buttonAdvisor, "self-start")}>
            <QrCode />
            Analizar mi carta
          </AdvisorTrigger>
        </div>
        <AdvisorStoryMini variant="full" className="mx-auto max-w-[600px] p-3 sm:p-5" />
      </GradientFrame>
    </div>
  )
}

export function AdvisorPromoSidebar({ locale = "es" }: { locale?: Locale }) {
  const copy = blogUiCopy[locale]
  return (
    <GradientFrame className="flex flex-col items-start gap-3 p-[22px]">
      {/* In the sticky aside of a short window the Advisor animation would squeeze the contents
          list out; the pitch and the button always stay. */}
      <AdvisorStoryMini variant="score" className="max-w-[320px] self-center px-1 lg:[@media(max-height:720px)]:hidden" />
      <p className={eyebrow}>{copy.advisorEyebrow}</p>
      <p className="font-heading text-xl font-medium leading-tight tracking-tight text-slate-900">{copy.advisorTitle}</p>
      <p className="text-sm leading-normal text-slate-600">{copy.advisorText}</p>
      <AdvisorTrigger className={cn(buttonAdvisor, "h-10 px-4")}>{copy.advisorButton}</AdvisorTrigger>
    </GradientFrame>
  )
}
