"use client"

import Image from "next/image"
import type { ComponentType } from "react"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"
import { websiteBenefitsLeft, websiteBenefitsRight } from "./website-section-data"

function BenefitCard({
  title,
  description,
  align = "left",
  icon: Icon,
}: {
  title: string
  description: string
  align?: "left" | "right"
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
}) {
  const isRight = align === "right"

  return (
    <article className={`flex items-start gap-4 ${isRight ? "text-right" : "text-left"}`}>
      {!isRight ? (
        <span className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-slate-50">
          <Icon className="size-6 text-slate-800" strokeWidth={1.8} />
        </span>
      ) : null}
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      {isRight ? (
        <span className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-slate-50">
          <Icon className="size-6 text-slate-800" strokeWidth={1.8} />
        </span>
      ) : null}
    </article>
  )
}

export function WebsiteBenefitsSection() {
  return (
    <SectionContainer id="website-benefits">
      <div className="space-y-10 md:space-y-12">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title mx-auto max-w-3xl text-center">
            Una web hecha para restaurantes, no para programadores
          </h2>
        </BlurFade>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <div className="space-y-6">
            {websiteBenefitsLeft.map((item) => (
              <BenefitCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                align="right"
              />
            ))}
          </div>
          <div className="mx-auto w-full max-w-[260px]">
            <div className="relative mx-auto aspect-[9/18] w-full overflow-hidden rounded-[2.5rem] border-8 border-slate-900 bg-slate-100">
              <Image
                src="/images/tropico-website-mockup.png"
                alt="Ejemplo de web para restaurante"
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
          </div>
          <div className="space-y-6">
            {websiteBenefitsRight.map((item) => (
              <BenefitCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                align="left"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <CTAButton label="Pruébalo gratis" location="website_benefits" />
        </div>
      </div>
    </SectionContainer>
  )
}
