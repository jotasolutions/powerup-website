"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { WebsiteWidgetsMockup } from "@/components/landing/WebsiteWidgetsMockup"
import { Check, CreditCard } from "lucide-react"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"

const checklist = [
  "Totalmente editable",
  "Dominio propio",
  "Páginas ilimitadas",
  "Editor simple",
] as const

export function WebsiteSection() {
  return (
    <SectionContainer id="pagina-web" >
      <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <BlurFade inView inViewMargin="-80px">
              <h2 className="section-title">
                Crea tu web tipo &quot;linktree&quot;, sin desarrolladores
              </h2>
            </BlurFade>
            <BlurFade inView inViewMargin="-80px" delay={0.12}>
              <p className="section-paragraph">
                Todo lo que necesita la web de tu restaurante, pero que finalmente
                puedes controlar tú mismo. Siempre actualizada y al mejor precio.
              </p>
            </BlurFade>
          </div>

          <ul className="space-y-2.5 sm:space-y-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-gray-700 sm:text-base"
              >
                <span className=" flex size-5 shrink-0 items-center justify-center rounded-full text-gray-700 border border-gray-600 border-2">
                  <Check className="size-2.5" strokeWidth={4} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">


            <div className="flex w-full flex-col gap-2 sm:w-auto">
              <CTAButton />
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <span
                  className="relative inline-flex shrink-0 text-slate-500"
                  aria-hidden
                >
                  <CreditCard className="size-4" />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="h-px w-[130%] rotate-45 bg-current opacity-70" />
                  </span>
                </span>
                No requiere tarjeta
              </p>
            </div>
          </div>
        </div>

        <WebsiteWidgetsMockup />
      </div>
    </SectionContainer>
  )
}
