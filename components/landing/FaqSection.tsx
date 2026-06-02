import { SectionContainer } from "@/components/landing/SectionContainer"
import { faqs } from "@/components/landing/section-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { MessagesSquare } from "lucide-react"
import { Button } from "../ui/button"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"

export function FaqSection() {
  return (
    <SectionContainer >
      <BlurFade inView inViewMargin="-80px">
        <h2 className="section-title">Te estaras preguntando</h2>
      </BlurFade>
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-10 lg:gap-12">
        <aside className="flex-1">
          <Accordion  >
            {faqs.map((question, index) => (
              <AccordionItem value={`question-${index}`} key={index}>
                <AccordionTrigger>{question.question}</AccordionTrigger>
                <AccordionContent>
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </aside>
        <aside className="h-fit w-full rounded-2xl border border-slate-200 p-5 space-y-5 sm:p-6 md:w-[320px] lg:w-[380px] md:space-y-6">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-xl text-white bg-[#D6FFC3] border border-3 border-[#E6FFEB]">
            <MessagesSquare className="text-[#479E3B] size-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">¿Sigues con dudas?</h3>
            <p className="text-sm leading-6 text-slate-600 sm:text-base">
              Nuestro equipo respondera todas tus preguntas en un momento.
            </p>
          </div>
          <Button variant="outline" size="lg" className="w-full">
            Preguntanos
          </Button>
        </aside>
      </div>
      <div className="flex justify-center mt-12">
        <CTAButton />
      </div>
    </SectionContainer>
  )
}
