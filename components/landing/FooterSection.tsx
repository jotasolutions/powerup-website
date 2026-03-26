import { SectionContainer } from "@/components/landing/SectionContainer"

export function FooterSection() {
  return (
    <SectionContainer className="bg-slate-950 text-slate-200">
      <div className="space-y-10">
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <h2 className="max-w-3xl font-heading text-3xl text-white md:text-4xl">
            La carta es la palanca mas potente para impulsar las ventas de los restaurantes
          </h2>
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            Crear carta gratis
          </button>
        </div>
        <div className="grid gap-8 text-sm md:grid-cols-4">
          <div>
            <p className="font-semibold text-white">PowerUp Menu</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Recursos</p>
            <p>Aprende a vender mas</p>
            <p>Prensa</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Soporte</p>
            <p>Contacto</p>
            <p>Ayuda</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Legal</p>
            <p>Aviso legal</p>
            <p>Terminos y condiciones</p>
            <p>Cookies</p>
          </div>
        </div>
        <p className="text-xs text-slate-400">© 2026 PowerUP Menu. Todos los derechos reservados</p>
      </div>
    </SectionContainer>
  )
}
