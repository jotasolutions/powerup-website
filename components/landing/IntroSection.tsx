import { SectionContainer } from "@/components/landing/SectionContainer"
import { TextReveal } from "../ui/text-reveal"
import ScrollRevealParagraph from "../ui/smoothui/scroll-reveal-paragraph"

export function IntroSection() {
  return (
    <SectionContainer>
      <div className="  md:items-center py-12">
        <div className="space-y-4 ">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Tu carta es tu escaparate
          </p>

          <ScrollRevealParagraph
            className="text-foreground"
            paragraph="Tu carta es el momento en el que el cliente decide cuanto va a gastar. Si la
              optimizas, vendes mas. Aplicamos ingenieria de menu y analisis de datos en tu carta
              digital para que venda mas sin que tengas que ser experto."
          />
          <p className="text-sm text-slate-500">Confiado por equipos de crecimiento y hosteleria.</p>
        </div>
      </div>
    </SectionContainer>
  )
}
