"use client"

import { type ReactNode, useState } from "react"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Globe, LayoutGrid, X } from "lucide-react"

type Billing = "annual" | "monthly"

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
        "flex size-10 shrink-0 items-center justify-center rounded-lg text-white",
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

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("annual")

  return (
    <SectionContainer
      id="pricing"
      className="bg-gradient-to-b from-white via-[#E2FEFD]  to-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-14">
        <div className="space-y-4 text-center">
          <h2 className="section-title">
            Planes de precios
          </h2>
          <p className="section-paragraph">
            Te regalamos 30 días de prueba de PowerUp Pro y luego decides.
          </p>

          <div
            className="mx-auto inline-flex rounded-full bg-slate-200/90 p-1 shadow-inner"
            role="group"
            aria-label="Modalidad de pago"
          >
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                billing === "annual"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Pago Anual
            </button>
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                billing === "monthly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Pago mensual
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
          {/* PowerUp Pro */}
          <article
            className={cn(
              "relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white bg-gradient-to-b from-green-100 to-white to-[300px] p-6 shadow-xl md:p-8",
            )}
          >
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-semibold text-slate-900 plus-darker opacity-70">PowerUp Pro</h3>
              <p className="text-base leading-relaxed text-slate-800 max-w-sm">
                Todas las herramientas para potenciar las ventas hasta un 30% más
              </p>
            </div>
            <div className="mt-5">
              <p className="text-2xl font-semibold tracking-tight text-slate-900">
                24,90€<span className="text-lg font-semibold">/mes</span>
              </p>
              <p className="text-xs text-slate-500">+ IVA</p>
            </div>

            <p className="mt-6 text-xs font-medium text-slate-500">Incluye:</p>

            <div className="mt-2 space-y-5">
              <div className="rounded-xl bg-slate-100/90 p-4">
                <div className="flex gap-3">
                  <FeatureIconBox className="bg-lime-500">
                    <LayoutGrid className="size-5" strokeWidth={2} />
                  </FeatureIconBox>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-semibold text-slate-900">Carta Digital Avanzada</p>
                    <p className="text-xs text-slate-600">Tu carta, moderna y diseñada para vender más</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 pl-1">
                  <ListItem status="yes">Gestión de tu carta en tiempo real</ListItem>
                  <ListItem status="yes">Analíticas avanzadas</ListItem>
                  <ListItem status="yes">Características para vender más</ListItem>
                </ul>
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

                  <div className="rounded-xl bg-slate-100/90 p-4">
                    <div className="flex gap-3">
                      <FeatureIconBox className="bg-amber-400">
                        <Globe className="size-5" strokeWidth={2} />
                      </FeatureIconBox>
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="font-semibold text-slate-900">Sitio web del restaurante</p>
                        <p className="text-xs text-slate-600">
                          Tu web profesional, sin diseñadores y siempre actualizada
                        </p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2 pl-1">
                      <ListItem status="yes">Autogestionable sin desarrolladores</ListItem>
                      <ListItem status="yes">Páginas ilimitadas</ListItem>
                      <ListItem status="yes">Incluido con tu plan anual</ListItem>
                    </ul>
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

            <Button size="lg" className="mt-8 w-full gap-2 text-base font-semibold shadow-sm">
              <LayoutGrid className="size-4" />
              Crear carta gratis
            </Button>
          </article>

          {/* PowerUp Free */}
          <article className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] md:p-8">
            <div className="space-y-1">
              <h3 className="font-heading text-2xl font-bold text-slate-900">PowerUp Free</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Una carta digital básica para gestionar tu menú
              </p>
            </div>
            <div className="mt-5">
              <p className="text-3xl font-bold tracking-tight text-slate-900">Gratis</p>
              <p className="text-sm text-slate-500">Para siempre</p>
            </div>

            <p className="mt-6 text-xs font-medium text-slate-500">Incluye:</p>

            <div className="mt-2 flex-1">
              <div className="rounded-xl bg-slate-100/90 p-4">
                <div className="flex gap-3">
                  <FeatureIconBox className="bg-lime-500">
                    <LayoutGrid className="size-5" strokeWidth={2} />
                  </FeatureIconBox>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-semibold text-slate-900">Carta Digital Básica</p>
                    <p className="text-xs text-slate-600">Tu carta, moderna y editable desde cualquier lugar</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 pl-1">
                  <ListItem status="yes">Gestión de tu carta en tiempo real</ListItem>
                  <ListItem status="partial">Analíticas básicas</ListItem>
                  <ListItem status="no">Características para vender más</ListItem>
                </ul>
                <Button
                  variant="outline"
                  className="mt-4 w-full border-slate-300 bg-white text-primary shadow-none hover:bg-slate-50"
                >
                  Ver todas las características
                </Button>
              </div>
            </div>

            <Button size="lg" className="mt-8 w-full gap-2 text-base font-semibold shadow-sm">
              <LayoutGrid className="size-4" />
              Crear carta gratis
            </Button>
          </article>
        </div>
      </div>
    </SectionContainer>
  )
}
