import { SectionContainer } from "@/components/landing/SectionContainer"

const plans = [
  {
    name: "PowerUp Pro",
    subtitle: "Todas las herramientas para potenciar las ventas hasta un 30% mas",
    price: "24,90EUR/mes",
    details: "+ IVA",
    bullets: [
      "Gestion de tu carta en tiempo real",
      "Analiticas avanzadas",
      "Caracteristicas para vender mas",
      "Sitio web del restaurante incluido en plan anual",
    ],
  },
  {
    name: "PowerUp Free",
    subtitle: "Una carta digital basica para gestionar tu menu",
    price: "Gratis",
    details: "Para siempre",
    bullets: [
      "Gestion de tu carta en tiempo real",
      "Analiticas basicas",
      "Caracteristicas para vender mas",
    ],
  },
]

export function PricingSection() {
  return (
    <SectionContainer className="bg-slate-50">
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="font-heading text-3xl text-slate-900 md:text-4xl">Planes de precios</h2>
          <p className="text-lg text-slate-700">
            Te regalamos 30 dias de prueba de PowerUp Pro y luego decides.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.name} className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="font-heading text-3xl text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-lg leading-8 text-slate-600">{plan.subtitle}</p>
              <p className="mt-6 text-3xl font-semibold text-slate-900">{plan.price}</p>
              <p className="text-sm text-slate-500">{plan.details}</p>
              <ul className="mt-6 space-y-3 text-base text-slate-700">
                {plan.bullets.map((bullet) => (
                  <li key={bullet}>- {bullet}</li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                Crear carta gratis
              </button>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
