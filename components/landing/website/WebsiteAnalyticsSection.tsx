"use client"

import Image from "next/image"

import { CTAButton } from "@/components/CTAButton"
import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import image from "next/image"
import { SectionContainer } from "../SectionContainer"
import { websiteAnalyticsItems } from "./website-section-data"

export function WebsiteAnalyticsSection() {
  return (
    <SectionContainer id="website-pages">
      <div
        className={cn(
          "grid items-center gap-8 md:gap-10 lg:grid-cols-2",

        )}
      >
        <div className="bg-purple-100 rounded-3xl overflow-hidden">
          <Image src="/images/website-landing/website-metrics.png" alt="Páginas para todo lo que necesites" width={900} height={600} />
        </div>
        <div className="space-y-6">
          <BlurFade inView>
            <h2 className="section-title max-w-[460px]">Mide lo que pasa</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.1}>
            <p className="section-paragraph">PowerUp analiza automáticamente cómo usan tu web:</p>
          </BlurFade>
          <ul className="space-y-4">
            {websiteAnalyticsItems.map((item: string) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-700 sm:text-base font-medium"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-slate-600">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <CTAButton label="Pruébalo gratis" location="website-pages" />
        </div>

      </div>
    </SectionContainer>
  )
}
