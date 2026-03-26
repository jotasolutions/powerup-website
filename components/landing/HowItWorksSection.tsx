import { SectionContainer } from "@/components/landing/SectionContainer"
import { steps } from "@/components/landing/section-data"

export function HowItWorksSection() {
  return (
    <SectionContainer className="bg-slate-50">
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="font-heading text-3xl text-slate-900 md:text-4xl">Empezar es muy facil</h2>
          <p className="text-lg text-slate-700">
            Es tan simple que podrias configurarlo tu solo. Pero te lo facilitamos aun mas.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="mb-4 text-sm font-semibold text-primary">Paso {index + 1}</p>
              <h3 className="mb-3 text-2xl font-medium text-slate-800">{item.title}</h3>
              <p className="text-lg leading-8 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
