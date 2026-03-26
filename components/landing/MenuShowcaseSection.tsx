import { SectionContainer } from "@/components/landing/SectionContainer"

export function MenuShowcaseSection() {
  return (
    <SectionContainer>
      <div className="space-y-8 text-center">
        <h2 className="font-heading text-3xl text-slate-900 md:text-4xl">Esta puede ser tu carta</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="h-96 rounded-2xl border border-slate-200 bg-slate-100" />
          <div className="h-96 rounded-2xl border border-slate-200 bg-slate-100" />
          <div className="h-96 rounded-2xl border border-slate-200 bg-slate-100" />
        </div>
        <button className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary">
          Ver carta
        </button>
      </div>
    </SectionContainer>
  )
}
