import { SectionContainer } from "@/components/landing/SectionContainer"
import {  featuresBento } from "@/components/landing/section-data"
import { Button } from "@/components/ui/button"
import { CreditCard, QrCode } from "lucide-react"
import Link from "next/link"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"

function FeatureCard({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 rounded-2xl p-2 ${className ?? ""}`}
    >
      <div className="min-h-[224px] flex-1  md:min-h-[224px] bg-gradient-to-b from-[#F7F7F9] to-[#EFF6FF] rounded-xl border border-slate-100" aria-hidden />
      <div className="flex flex-1 flex-col gap-1  p-3">
        <h3 className="font-heading text-base font-medium">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 ">{description}</p>
      </div>
    </article>
  )
}

export function FeaturesSection() {
  const topRow = featuresBento.slice(0, 3)
  const bottomRow = featuresBento.slice(3)

  return (
    <SectionContainer
      id="features"

    >
      <div className="space-y-10 md:space-y-12">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">
              La carta digital más completa
            </h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Aplicamos ingeniería de menú, marketing gastronómico y diseño optimizado
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-3">
          {topRow.map((item) => (
            <FeatureCard key={item.title} {...item} className="md:col-span-2" />
          ))}
          {bottomRow.map((item) => (
            <FeatureCard key={item.title} {...item} className="md:col-span-3" />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 pt-2">
          <Link
            href="#"
            className="text-base font-medium text-primary transition-colors hover:text-primary/90 hover:underline"
          >
            Ver todas las características →
          </Link>
          <div className="flex flex-col items-center gap-3">
            <CTAButton />
            
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
