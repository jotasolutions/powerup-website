"use client"

import { type ReactNode } from "react"
import { Check, Globe, QrCode } from "lucide-react"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"
import { Highlighter } from "@/components/ui/highlighter"
import { cn } from "@/lib/utils"

type WebsitePricingSectionProps = {
  yearlyPrice: string
  yearlyPriceInCents: number
}

function FeatureIconBox({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-md text-white",
        className
      )}
    >
      {children}
    </div>
  )
}

function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 text-sm leading-snug text-slate-800">
      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={2.5} aria-hidden />
      <span>{children}</span>
    </li>
  )
}

export function WebsitePricingSection({
  yearlyPrice,
  yearlyPriceInCents,
}: WebsitePricingSectionProps) {
  const monthlyEquivalent = yearlyPriceInCents / 12 / 100
  const monthlyFormatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(monthlyEquivalent)
    .replace(/\s/g, "")

  return (
    <SectionContainer
      id="website-pricing"
      className="bg-gradient-to-b from-white via-[#E2FEFD] to-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-14">
        <div className="space-y-4 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">La web incluida en tu plan Pro anual</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Te regalamos{" "}
              <Highlighter action="underline" color="#FF9800">
                30 días de prueba
              </Highlighter>{" "}
              de PowerUp Pro. Carta digital y web profesional, sin coste extra.
            </p>
          </BlurFade>
        </div>

        <BlurFade inView inViewMargin="-60px" delay={0.08}>
          <div className="rounded-3xl bg-gradient-to-b from-[#92E0B8] to-white p-[3px] shadow-xl">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[19px] bg-gradient-to-b from-[#DFFFEA] via-[#ffffff] to-white p-5 sm:p-6 md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h3 className="plus-darker font-heading text-xl font-semibold text-slate-900 opacity-80 sm:text-2xl">
                    PowerUp Pro anual
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-slate-800">
                    Carta digital avanzada y web del restaurante incluidas en un solo plan
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    {monthlyFormatted}
                    <span className="text-lg font-semibold">/mes</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    {yearlyPrice}/año · Facturado anual + IVA
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sn font-medium text-slate-800">Incluye:</p>

              <div className="mb-6 mt-2 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-gray-100/50 p-4">
                  <div className="flex gap-3">
                    <FeatureIconBox className="bg-[#CEEDB8]">
                      <QrCode className="size-6 text-green-600" strokeWidth={2} />
                    </FeatureIconBox>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-semibold text-slate-900">Carta Digital Avanzada</p>
                      <p className="text-xs text-slate-600 sm:text-sm">
                        Tu carta, moderna y diseñada para vender más
                      </p>
                      <ul className="mt-4 space-y-2">
                        <ListItem>Gestión de tu carta en tiempo real</ListItem>
                        <ListItem>Analíticas avanzadas</ListItem>
                        <ListItem>Características para vender más</ListItem>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-gray-100/50 p-4">
                  <div className="flex gap-3">
                    <FeatureIconBox className="bg-[#FFEBAB]">
                      <Globe className="size-6 text-[#FBBD8A]" strokeWidth={2} />
                    </FeatureIconBox>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-semibold text-slate-900">Sitio web del restaurante</p>
                      <p className="text-xs text-slate-600 sm:text-sm">
                        Tu web profesional, sin diseñadores y siempre actualizada
                      </p>
                      <ul className="mt-4 space-y-2">
                        <ListItem>Autogestionable sin desarrolladores</ListItem>
                        <ListItem>Páginas ilimitadas</ListItem>
                        <ListItem>Incluido con tu plan anual</ListItem>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex md:justify-center w-full">
                <CTAButton label="Crear mi web" location="website_pricing" />
              </div>
            </article>
          </div>
        </BlurFade>
      </div>
    </SectionContainer>
  )
}
