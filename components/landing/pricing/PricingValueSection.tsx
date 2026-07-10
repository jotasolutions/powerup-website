"use client"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "@/components/CTAButton"
import { BlurFade } from "@/components/ui/blur-fade"
import { pricingValueCards } from "@/components/landing/pricing-section-data"
import Image from "next/image"
import { motion } from "motion/react"

function ValueBentoCard({
  title,
  description,
  imageUrl,
  imageBottom,
  className,
  index,
}: {
  title: string
  description: string
  imageUrl: string
  imageBottom?: boolean
  className?: string
  index: number
}) {
  const revealEase = [0.22, 1, 0.36, 1] as const

  return (
    <motion.article
      className={`flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3 ${className ?? ""}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: revealEase, delay: 0.15 * index }}
    >
      <div
        className={`flex min-h-48 flex-1 flex-col overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-b from-slate-50 to-sky-50 px-2 pt-2 sm:min-h-52${
          imageBottom ? " justify-end pb-0" : " justify-center pb-2"
        }`}
        aria-hidden
      >
        <Image
          src={imageUrl}
          alt=""
          width={836}
          height={550}
          unoptimized
          className={`h-auto w-full object-contain${imageBottom ? " object-bottom" : ""}`}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-heading text-base font-medium sm:text-lg">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </motion.article>
  )
}

export function PricingValueSection() {
  const topRow = pricingValueCards.slice(0, 3)
  const bottomRow = pricingValueCards.slice(3)

  return (
    <SectionContainer>
      <div className="space-y-10 md:space-y-12">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">Por qué merece la pena pasarse a Pro</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Aplicamos ingeniería de menú, marketing gastronómico y diseño optimizado
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6">
          {topRow.map((item, index) => (
            <ValueBentoCard key={item.title} {...item} index={index} />
          ))}
          {bottomRow.map((item, index) => (
            <ValueBentoCard key={item.title} {...item} index={index + 3} />
          ))}
        </div>

        <BlurFade inView inViewMargin="-80px">
          <div className="flex flex-col items-center gap-3 pt-2">
            <CTAButton />
            <p className="text-sm text-slate-500">No requiere tarjeta</p>
          </div>
        </BlurFade>
      </div>
    </SectionContainer>
  )
}
