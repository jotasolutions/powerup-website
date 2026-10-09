import { SectionContainer } from "@/components/landing/SectionContainer"
import ScrollRevealParagraph from "../ui/smoothui/scroll-reveal-paragraph"

const defaultParagraph =
  "Tu carta es el momento en el que el cliente decide cuánto va a gastar. Si la optimizas, vendes más. Aplicamos ingeniería de menú y análisis de datos en tu carta digital para que venda más sin que tengas que ser experto."

type IntroSectionProps = {
  paragraph?: string
  showImages?: boolean
  // Campaign landings: the sticky box is only as tall as the text, so the text starts right after the
  // hero instead of in the middle of a full-screen box, and the track is shorter. The text sticks at
  // 22dvh and the reveal ends while it's still stuck.
  compact?: boolean
}

export function BigTextSection({
  paragraph = defaultParagraph,
  showImages = true,
  compact = false,
}: IntroSectionProps) {
  return (
    <SectionContainer id="texto-grande" className="py-0 md:py-0 lg:py-0">
      <div className={compact ? "pb-6 md:pb-8" : "py-6 md:py-8"}>
        <div className="space-y-4 relative">
          <ScrollRevealParagraph
            className="text-foreground mx-auto max-w-4xl text-center"
            trackClassName={compact ? "min-h-[140vh]" : "min-h-[300vh]"}
            stickyClassName={compact ? "sticky top-[22dvh] relative" : undefined}
            revealProgress={compact ? 0.38 : 0.6}
            revealStart={compact ? 0 : 0.12}
            paragraph={paragraph}
            showImages={showImages}
          />
        </div>
      </div>
    </SectionContainer>
  )
}
