import { SectionContainer } from "@/components/landing/SectionContainer"
import { attractFeatures, ctaCopy } from "@/components/landing/section-data"

export function AttractPeopleSection() {
  return (
    <SectionContainer className="bg-slate-50">
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="font-heading text-3xl text-slate-900 md:text-4xl">Atrae a mas gente</h2>
          <p className="text-lg text-slate-700">
            Haz que te encuentren, te comparen y te elijan antes de venir.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {attractFeatures.map((item) => (
            <article key={item.title} className="space-y-4">
              <div className="h-56 rounded-2xl border border-sky-100 bg-sky-50" />
              <h3 className="text-2xl font-medium text-slate-700">{item.title}</h3>
              <p className="text-lg leading-8 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="space-y-2 text-center">
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            {ctaCopy.primary}
          </button>
          <p className="text-sm text-slate-500">{ctaCopy.note}</p>
        </div>
      </div>
    </SectionContainer>
  )
}
