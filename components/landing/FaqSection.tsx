import { SectionContainer } from "@/components/landing/SectionContainer"
import { faqs } from "@/components/landing/section-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Button } from "../ui/button"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"
import Image from "next/image"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import type { Locale } from "@/lib/locale"
import { faqCopy, whatsappUrlFor } from "./home-copy"

// A server component, so the page passes its language. Italian answers quote the Pro plan's
// price, which the page already reads from Stripe for the pricing data.
export function FaqSection({
  locale = "es",
  prices,
}: {
  locale?: Locale
  prices?: { monthly: string; yearly: string }
}) {
  const copy = faqCopy[locale]
  const questions = copy.items && prices ? copy.items(prices) : faqs
  return (
    <SectionContainer id="preguntas">
      <BlurFade inView inViewMargin="-80px">
        <h2 className="section-title">{copy.title}</h2>
      </BlurFade>
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-10 lg:gap-12">
        <aside className="flex-1">
          <Accordion  >
            {questions.map((question, index) => (
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
              <Image src={copy.helpPhoto} alt={copy.helpPhotoAlt} width={32} height={32} className="rounded-full size-8 object-cover" />
              <div className="absolute bottom-0 right-0 size-3 border border-white border-2 translate-x-1/4 translate-y-1/4 rounded-full border border-white bg-green-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-dm font-semibold text-slate-900 sm:text-base">{copy.helpTitle}</h3>
            <p className="text-sm leading-5 text-slate-600 ">
              {copy.helpText}
            </p>
          </div>
          <Button variant="whatsapp" className="w-full" asChild>
            <a
              href={whatsappUrlFor(locale)}
              target="_blank"
              rel="noopener noreferrer"
              {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "whatsapp" })}
            >
              <Image src="/icons/whatsapp-icon.svg" alt="WhatsApp" width={16} height={16} />

              {copy.helpButton}
            </a>
          </Button>
        </aside>
      </div>
      <div className="flex justify-center mt-12">
        <CTAButton />
      </div>
    </SectionContainer>
  )
}
