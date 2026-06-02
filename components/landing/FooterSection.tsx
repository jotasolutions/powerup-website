import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"

export function FooterSection() {
  return (
    <SectionContainer className="bg-gradient-to-b from-white to-[#DEF8FF] via-[#DEF8FF]">
      <div className="space-y-10">
        <div className="space-y-4 border-b border-[#CFF5FF] pb-8 border-solid border-b-2">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title max-w-1/2">
              La carta es la palanca mas potente para impulsar las ventas de los restaurantes
            </h2>
          </BlurFade>
          <CTAButton />
        </div>
        <div className="grid gap-8 text-sm md:grid-cols-4 border-b border-[#CFF5FF] pb-8 border-solid border-b-2">
          <div>
            <p className="font-medium text-lg">PowerUp Menu</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium ">Recursos</p>
            <p>Aprende a vender mas</p>
            <p>Prensa</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Soporte</p>
            <p>Contacto</p>
            <p>Ayuda</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Legal</p>
            <p>Aviso legal</p>
            <p>Terminos y condiciones</p>
            <p>Cookies</p>
          </div>
        </div>
        <p className="text-xs plus-darker opacity-60">© 2026 PowerUP Menu. Todos los derechos reservados</p>
      </div>
    </SectionContainer>
  )
}
