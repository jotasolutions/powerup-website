import { SectionContainer } from "@/components/landing/SectionContainer"

export function AboutSection() {
  return (
    <SectionContainer className="bg-slate-50">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h2 className="font-heading text-3xl text-slate-900 md:text-4xl">
            Construido por especialistas en ventas y restauracion
          </h2>
          <p className="text-lg leading-8 text-slate-600">
            PowerUp nace de la combinacion entre tecnologia y estrategia gastronomica. Unimos
            ingenieria de menu, marketing y desarrollo de producto para ayudar a restaurantes a
            vender mas con su carta digital.
          </p>
          <p className="text-sm font-medium text-slate-700">
            Startup espanola acelerada por Lanzadera
          </p>
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            Crear carta gratis
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-44 rounded-2xl bg-slate-200" />
          <div className="h-44 rounded-2xl bg-slate-200" />
          <div className="h-44 rounded-2xl bg-slate-200" />
          <div className="h-44 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </SectionContainer>
  )
}
