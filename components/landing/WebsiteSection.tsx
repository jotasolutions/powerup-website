"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { WebsiteWidgetsMockup } from "@/components/landing/WebsiteWidgetsMockup"
import { Check, CreditCard } from "lucide-react"
import { CTAButton } from "../CTAButton"

const checklist = [
  "Totalmente editable",
  "Dominio propio",
  "Páginas ilimitadas",
  "Editor simple",
] as const

export function WebsiteSection() {
  return (
    <SectionContainer id="pagina-web" >
      <div className="grid items-center gap-12 lg:grid-cols-2 ">
        <div className="space-y-8 ">
          <div className="space-y-4">
            <h2 className="section-title">
              Crea tu web tipo &quot;linktree&quot;, sin desarrolladores
            </h2>
            <p className="section-paragraph">
              Todo lo que necesita la web de tu restaurante, pero que finalmente
              puedes controlar tú mismo. Siempre actualizada y al mejor precio.
            </p>
          </div>

          <ul className="space-y-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-base text-gray-700"
              >
                <span className=" flex size-5 shrink-0 items-center justify-center rounded-full text-gray-700 border border-gray-600 border-2">
                  <Check className="size-2.5" strokeWidth={4} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">


            <div className="flex flex-col gap-2">
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
