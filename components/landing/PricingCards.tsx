"use client"

import { type ReactNode, useState } from "react"
import Image from "next/image"
import NumberFlow from "@number-flow/react"
import { ArrowRight, Check, Globe, QrCode, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CTAButton } from "../CTAButton"
import { AnimatedTabs } from "../ui/animated-tabs"

type Billing = "annual" | "monthly"

type PricingCardsProps = {
  monthlyPriceInCents: number
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

function ListItem({
  status,
  children,
}: {
  status: "yes" | "partial" | "no"
  children: ReactNode
}) {
  return (
    <li className="flex gap-2 text-sm leading-snug text-slate-800">
      {status === "yes" && (
        <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={2.5} aria-hidden />
      )}
      {status === "partial" && (
        <Check className="mt-0.5 size-4 shrink-0 text-amber-500" strokeWidth={2.5} aria-hidden />
      )}
      {status === "no" && <X className="mt-0.5 size-4 shrink-0 text-red-500" strokeWidth={2.5} aria-hidden />}
      <span>{children}</span>
    </li>
  )
}

export function PricingCards({ monthlyPriceInCents, yearlyPriceInCents }: PricingCardsProps) {
  const [billing, setBilling] = useState<Billing>("annual")
  const yearlyCostIfMonthly = monthlyPriceInCents * 12
  const annualMonthlyEquivalentInCents = yearlyPriceInCents / 12
  const currentPriceInEuros =
    (billing === "annual" ? annualMonthlyEquivalentInCents : monthlyPriceInCents) / 100
  const annualDiscountPercent =
    yearlyCostIfMonthly > 0
      ? Math.max(0, Math.round(((yearlyCostIfMonthly - yearlyPriceInCents) / yearlyCostIfMonthly) * 100))
      : 0

  return (
    <>
      <div className="relative mt-2 w-fit mx-auto">
        <Image
          src="/images/free-website-overlay.png"
          alt="free website overlay"
          width={100}
          height={100}
          className="absolute -top-2 -left-30 h-auto w-[120px]"
        />
        <AnimatedTabs
          value={billing}
          onValueChange={(value) => {
            setBilling(value as Billing)
          }}
          tabs={[
            { label: "Pago anual", value: "annual" },
            { label: "Pago mensual", value: "monthly" },
          ]}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#92E0B8] to-white p-[3px] shadow-xl">
          <article className="relative flex h-full flex-col overflow-hidden rounded-[19px] bg-gradient-to-b from-[#DFFFEA] via-[#ffffff] to-white p-6 md:p-8">
            {billing === "annual" && annualDiscountPercent > 0 && (
              <span className="absolute right-4 top-6 mb-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {annualDiscountPercent}% descuento
              </span>
            )}
            <div className="space-y-2">
              <h3 className="plus-darker font-heading text-2xl font-semibold text-slate-900 opacity-80">
                PowerUp Pro
              </h3>
              <p className="max-w-sm text-base leading-relaxed text-slate-800">
                Todas las herramientas para potenciar las ventas hasta un 30% más
              </p>
            </div>
            <div className="mt-5">
              <p className="text-2xl font-semibold tracking-tight text-slate-900">
                <NumberFlow
                  value={currentPriceInEuros}
                  locales="es-ES"
                  format={{
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }}
                />
                <span className="text-lg font-semibold">/mes</span>
              </p>
              <p className="text-xs text-slate-500">{billing === "annual" ? "Facturado anual + IVA" : "+ IVA"}</p>
            </div>

            <p className="mt-6 text-xs font-medium text-slate-500">Incluye:</p>

            <div className="mb-6 mt-2 space-y-1">
              <div className="boder-slate-200 rounded-xl border bg-gray-100/50 p-4">
                <div className="flex gap-3">
                  <FeatureIconBox className="bg-[#CEEDB8]">
                    <QrCode className="size-6 text-green-600" strokeWidth={2} />
                  </FeatureIconBox>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-semibold text-slate-900">Carta Digital Avanzada</p>
                    <p className="text-sm text-slate-600">Tu carta, moderna y diseñada para vender más</p>
                    <ul className="mt-4 space-y-2">
                      <ListItem status="yes">Gestión de tu carta en tiempo real</ListItem>
                      <ListItem status="yes">Analíticas avanzadas</ListItem>
                      <ListItem status="yes">Características para vender más</ListItem>
                    </ul>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-4 w-full border-slate-300 bg-white text-primary shadow-none hover:bg-slate-50"
                >
                  Ver todas las características
                </Button>
              </div>

              {billing === "annual" && (
                <>
                  <div className="flex justify-center py-0.5">
                    <span className="text-lg font-medium text-slate-800" aria-hidden>
                      +
                    </span>
                  </div>

                  <div className="boder-slate-200 rounded-xl border bg-gray-100/50 p-4">
                    <div className="flex gap-3">
                      <FeatureIconBox className="bg-[#FFEBAB]">
                        <Globe className="size-6 text-[#FBBD8A]" strokeWidth={2} />
                      </FeatureIconBox>
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="font-semibold text-slate-900">Sitio web del restaurante</p>
                        <p className="text-sm text-slate-600">
                          Tu web profesional, sin diseñadores y siempre actualizada
                        </p>
                        <ul className="mt-4 space-y-2">
                          <ListItem status="yes">Autogestionable sin desarrolladores</ListItem>
                          <ListItem status="yes">Páginas ilimitadas</ListItem>
                          <ListItem status="yes">Incluido con tu plan anual</ListItem>
                        </ul>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="mt-4 w-full border-slate-300 bg-white text-primary shadow-none hover:bg-slate-50"
                    >
                      Conoce la página web
                    </Button>
                  </div>
                </>
              )}
            </div>

            <CTAButton />
          </article>
        </div>

        <div className="text-center space-y-4">
          <article className="relative flex flex-col overflow-hidden rounded-2xl text-left border border-slate-200/80 bg-white p-6 shadow-xl md:p-8">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-semibold text-slate-900">PowerUp Free</h3>
              <p className="max-w-sm text-base leading-relaxed text-slate-800">
                Una carta digital básica para gestionar tu menú
              </p>
            </div>
            <div className="mt-5">
              <p className="text-2xl font-semibold tracking-tight text-slate-900">Gratis</p>
              <p className="text-xs text-slate-500">Para siempre</p>
            </div>

            <p className="mt-6 text-xs font-medium text-slate-500">Incluye:</p>

            <div className="mb-6 mt-2 space-y-1">
              <div className="boder-slate-200 rounded-xl border bg-gray-100/50 p-4">
                <div className="flex gap-3">
                  <FeatureIconBox className="bg-[#CEEDB8]">
                    <QrCode className="size-6 text-green-600" strokeWidth={2} />
                  </FeatureIconBox>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-semibold text-slate-900">Carta Digital Básica</p>
                    <p className="text-sm text-slate-600">Tu carta, moderna y diseñada para vender más</p>
                    <ul className="mt-4 space-y-2">
                      <ListItem status="yes">Gestión de tu carta en tiempo real</ListItem>
                      <ListItem status="partial">Analíticas básicas</ListItem>
                      <ListItem status="no">Características para vender más</ListItem>
                    </ul>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-4 w-full border-slate-300 bg-white text-primary shadow-none hover:bg-slate-50"
                >
                  Ver todas las características
                </Button>
              </div>
            </div>

            <CTAButton />
          </article>
          <Button variant="link">Ver las diferencias entre Pro y Free <ArrowRight className="size-4" /></Button>
        </div>
      </div>
    </>
  )
}
