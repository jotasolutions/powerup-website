import { SectionContainer } from "@/components/landing/SectionContainer"
import { analyticsFeatures } from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"

export function AnalyticsSection() {
  return (
    <SectionContainer>
      <div className="space-y-8 sm:space-y-10">
        <div className="space-y-3 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">Conoce a tus clientes</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Toma decisiones basadas en como se comportan tus clientes.
            </p>
          </BlurFade>
        </div>
        <div className="grid gap-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {analyticsFeatures.map((item) => (
            <article key={item.title} className="space-y-4">
              <div className="h-48 rounded-2xl border border-sky-100 bg-sky-50 sm:h-56" />
              <div className="space-y-2 pr-1 sm:pr-2">
                <h3 className="text-lg font-medium text-slate-700 sm:text-xl">{item.title}</h3>
                <p className="text-base leading-relaxed text-slate-600 sm:text-base">{item.description}</p>
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
