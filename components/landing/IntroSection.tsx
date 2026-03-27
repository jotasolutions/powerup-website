import { SectionContainer } from "@/components/landing/SectionContainer"
import ScrollRevealParagraph from "../ui/smoothui/scroll-reveal-paragraph"
import Image from "next/image"

export function IntroSection() {
  return (
    <SectionContainer className="py-0">
      <div className="py-6 md:py-8">
        <div className="space-y-4 relative">


         
          <ScrollRevealParagraph
            className="text-foreground text-center max-w-4xl mx-auto"
            trackClassName="min-h-[300vh]"
            stickyClassName="sticky top-0 flex min-h-[100dvh] items-center"
            revealProgress={0.6}
            revealStart={0.12}
            paragraph="Tu carta es el momento en el que el cliente decide cuanto va a gastar. Si la
              optimizas, vendes mas. Aplicamos ingenieria de menu y analisis de datos en tu carta
              digital para que venda mas sin que tengas que ser experto."
          />
          
        </div>
      </div>
    </SectionContainer>
  )
}
