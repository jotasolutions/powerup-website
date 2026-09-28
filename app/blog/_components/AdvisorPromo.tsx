import { QrCode } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdvisorTrigger } from "./AdvisorDialog"
import { buttonAdvisor, eyebrow } from "./styles"

const SCORES = [
  { label: "Oferta gastronómica", value: "3.5", width: "35%", color: "#EF4444" },
  { label: "Marketing", value: "7.5", width: "75%", color: "#F59E0B" },
  { label: "Contenido", value: "5", width: "50%", color: "#F59E0B" },
  { label: "Diseño", value: "10", width: "100%", color: "#059669" },
]

/** Static illustration of an Advisor report, from the design. */
function ScoreMockup({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex w-full flex-col gap-3.5 rounded-[20px] border border-border bg-card p-[18px] shadow-xl", className)}>
      <div className="flex items-center gap-3.5">
        <div
          className="flex size-[72px] flex-none items-center justify-center rounded-full"
          style={{ background: "conic-gradient(#50B27F 0 85%, #F3F4F6 85% 100%)" }}
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-card font-heading text-xl font-semibold tracking-tight text-slate-900">
            8.5
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-xs text-slate-600">Nota de tu carta</span>
          <span className="font-heading text-[15px] font-medium leading-tight text-slate-900">Buena, con 3 mejoras claras</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {SCORES.map((score) => (
          <div key={score.label} className="grid grid-cols-[minmax(0,1fr)_44px_28px] items-center gap-2.5 text-xs text-slate-700">
            <span className="truncate">{score.label}</span>
            <span className="block h-1.5 overflow-hidden rounded-full bg-[#F3F4F6]">
              <span className="block h-full rounded-full" style={{ width: score.width, backgroundColor: score.color }} />
            </span>
            <span className="text-right font-semibold text-slate-900">{score.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GradientFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] bg-gradient-to-b from-[#92E0B8] to-white p-[3px] shadow-xl">
      <div className={cn("h-full rounded-[21px] bg-[linear-gradient(180deg,#DFFFEA,#FFFFFF_60%,#FFFFFF)]", className)}>{children}</div>
    </div>
  )
}

export function AdvisorPromoWide() {
  return (
    <div className="@container">
      <GradientFrame className="grid items-center gap-5 p-6 sm:p-8 @lg:grid-cols-[1fr_auto]">
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
        <ScoreMockup className="max-w-[250px] justify-self-start @lg:justify-self-center" />
      </GradientFrame>
    </div>
  )
}

export function AdvisorPromoSidebar() {
  return (
    <GradientFrame className="flex flex-col items-start gap-3 p-[22px]">
      <ScoreMockup className="max-w-[320px] self-center" />
      <p className={eyebrow}>Advisor · IA</p>
      <p className="font-heading text-xl font-medium leading-tight tracking-tight text-slate-900">Pon nota a tu carta en 2 minutos</p>
      <p className="text-sm leading-normal text-slate-600">Oferta, marketing, contenido y diseño. Gratis.</p>
      <AdvisorTrigger className={cn(buttonAdvisor, "h-10 px-4")}>Analizar mi carta</AdvisorTrigger>
    </GradientFrame>
  )
}
