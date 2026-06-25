import { SectionContainer } from "@/components/landing/SectionContainer"
import { faqs } from "@/components/landing/section-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Button } from "../ui/button"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"
import Image from "next/image"

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
        <aside className="h-fit w-full rounded-2xl border border-slate-200 p-4 space-y-4   lg:w-[300px] ">
        <div className="relative size-8 shrink-0">
              <Image src="/images/about-jordi.png" alt="about 1" width={32} height={32} className="rounded-full size-8" />
              <div className="absolute bottom-0 right-0 size-3 border border-white border-2 translate-x-1/4 translate-y-1/4 rounded-full border border-white bg-green-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-dm font-semibold text-slate-900 sm:text-base">¿Sigues con dudas?</h3>
            <p className="text-sm leading-5 text-slate-600 ">
              Nuestro equipo respondera todas tus preguntas en un momento.
            </p>
          </div>
          <Button variant="whatsapp" className="w-full">
            <Image src="/icons/whatsapp-icon.svg" alt="whatsapp" width={16} height={16} />

            Pregúntanos
          </Button>
        </aside>
      </div>
      <div className="flex justify-center mt-12">
        <CTAButton />
      </div>
    </SectionContainer>
  )
}
