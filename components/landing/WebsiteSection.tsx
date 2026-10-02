"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { WebsiteWidgetsMockup } from "@/components/landing/WebsiteWidgetsMockup"
import { Check, CreditCard } from "lucide-react"
import Link from "next/link"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { Button } from "../ui/button"
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
      <div className="flex flex-col-reverse items-center gap-8 md:gap-10 lg:grid lg:grid-cols-2 lg:gap-12">
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
              {/* Goes to another page of this site, so it counts as navigation, not as a sign-up. */}
              <Link
                href="/pagina-web"
                {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, { label: "Más información de la web" })}
              >
                <Button className="w-full sm:w-auto h-13 sm:h-10">Más información de la web</Button>
              </Link>
            
            </div>
          </div>
        </div>

        <WebsiteWidgetsMockup />
      </div>
    </SectionContainer>
  )
}
