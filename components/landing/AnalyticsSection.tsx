import { SectionContainer } from "@/components/landing/SectionContainer"
import { analyticsFeatures } from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"

export function AnalyticsSection() {
  return (
    <SectionContainer>
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="section-title">Conoce a tus clientes</h2>
          <p className="section-paragraph">
            Toma decisiones basadas en como se comportan tus clientes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {analyticsFeatures.map((item) => (
            <article key={item.title} className="space-y-4">
              <div className="h-56 rounded-2xl border border-sky-100 bg-sky-50" />
              <div className="space-y-2 pr-2">
                <h3 className="text-xl font-medium text-slate-700">{item.title}</h3>
                <p className="text-base leading-6 text-slate-600">{item.description}</p>
              </div>

            </article>
          ))}
        </div>
        <div className="space-y-2 text-center">
          <CTAButton />
        </div>
      </div>
    </SectionContainer>
  )
}
