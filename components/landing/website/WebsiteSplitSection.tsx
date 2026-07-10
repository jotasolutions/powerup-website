"use client"

import type { ReactNode } from "react"
import { Check } from "lucide-react"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"

type WebsiteSplitSectionProps = {
  id: string
  title: string
  description?: string
  items: readonly string[]
  image: ReactNode
  imagePosition?: "left" | "right"
  ctaLabel?: string
}

export function WebsiteSplitSection({
  id,
  title,
  description,
  items,
  image,
  imagePosition = "left",
  ctaLabel = "Pruébalo gratis",
}: WebsiteSplitSectionProps) {
  return (
    <SectionContainer id={id}>
      <div
        className={cn(
          "grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12",
          imagePosition === "right" && "lg:[&>*:first-child]:order-2"
        )}
      >
        <div className="space-y-6">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">{title}</h2>
          </BlurFade>
          {description ? (
            <BlurFade inView inViewMargin="-80px" delay={0.1}>
              <p className="section-paragraph">{description}</p>
            </BlurFade>
          ) : null}
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-[#f7f7f7] px-4 py-3 text-sm text-slate-700 sm:text-base"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-slate-600">
                  <Check className="size-3" strokeWidth={2.75} aria-hidden />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <CTAButton label={ctaLabel} location={id} />
        </div>
        <div>{image}</div>
      </div>
    </SectionContainer>
  )
}
