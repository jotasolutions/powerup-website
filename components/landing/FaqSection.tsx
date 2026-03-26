import { SectionContainer } from "@/components/landing/SectionContainer"
import { faqs } from "@/components/landing/section-data"

export function FaqSection() {
  return (
    <SectionContainer>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <h2 className="font-heading text-3xl text-slate-900 md:text-4xl">Te estaras preguntando</h2>
          <div className="space-y-3">
            {faqs.map((question) => (
              <details key={question} className="rounded-xl border border-slate-200 bg-white px-5 py-4">
                <summary className="cursor-pointer text-base font-medium text-slate-800">{question}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Te ayudamos a resolverlo en una llamada rapida con nuestro equipo.
                </p>
              </details>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-2xl bg-slate-100 p-6">
          <h3 className="text-xl font-semibold text-slate-900">Sigues con dudas?</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Nuestro equipo respondera todas tus preguntas en un momento.
          </p>
          <button className="mt-4 w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            Preguntanos
          </button>
        </aside>
      </div>
    </SectionContainer>
  )
}
