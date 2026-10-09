import { SectionContainer } from "@/components/landing/SectionContainer"
import ScrollRevealParagraph from "../ui/smoothui/scroll-reveal-paragraph"

const defaultParagraph =
  "Tu carta es el momento en el que el cliente decide cuánto va a gastar. Si la optimizas, vendes más. Aplicamos ingeniería de menú y análisis de datos en tu carta digital para que venda más sin que tengas que ser experto."

type IntroSectionProps = {
  paragraph?: string
  showImages?: boolean
  // Campaign landings: a shorter sticky box and scroll track, so there's less empty space after the
  // hero and less scrolling before the next section. The reveal ends while the text is still stuck.
  compact?: boolean
}

export function BigTextSection({
  paragraph = defaultParagraph,
  showImages = true,
  compact = false,
}: IntroSectionProps) {
  return (
    <SectionContainer id="texto-grande" className="py-0 md:py-0 lg:py-0">
      <div className="py-6 md:py-8">
        <div className="space-y-4 relative">
          <ScrollRevealParagraph
            className="text-foreground mx-auto max-w-4xl text-center"
            trackClassName={compact ? "min-h-[160vh]" : "min-h-[300vh]"}
            stickyClassName={
              compact ? "sticky top-[15dvh] flex min-h-[70dvh] items-center relative" : undefined
            }
            revealProgress={compact ? 0.4 : 0.6}
            revealStart={compact ? 0 : 0.12}
            paragraph={paragraph}
            showImages={showImages}
          />
        </div>
      </div>
    </SectionContainer>
  )
}
