import { SectionContainer } from "@/components/landing/SectionContainer"
import ScrollRevealParagraph from "../ui/smoothui/scroll-reveal-paragraph"

const defaultParagraph =
  "Tu carta es el momento en el que el cliente decide cuanto va a gastar. Si la optimizas, vendes mas. Aplicamos ingenieria de menú y analisis de datos en tu carta digital para que venda mas sin que tengas que ser experto."

type IntroSectionProps = {
  paragraph?: string
  showImages?: boolean
}

export function BigTextSection({ paragraph = defaultParagraph, showImages = true }: IntroSectionProps) {
  return (
    <SectionContainer className="py-0 md:py-0 lg:py-0">
      <div className="py-6 md:py-8">
        <div className="space-y-4 relative">
          <ScrollRevealParagraph
            className="text-foreground mx-auto max-w-4xl text-center"
            trackClassName="min-h-[300vh]"
            revealProgress={0.6}
            revealStart={0.12}
            paragraph={paragraph}
            showImages={showImages}
          />
        </div>
      </div>
    </SectionContainer>
  )
}
