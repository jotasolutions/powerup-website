'use client'
import { SectionContainer } from "@/components/landing/SectionContainer"
import { attractFeatures } from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"
import { motion, useReducedMotion } from "motion/react"
import { BlurFade } from "../ui/blur-fade"
import { RevealCard } from "@/components/landing/RevealPrimitives"
import { revealEase, revealViewport } from "@/lib/motion"

export function AttractPeopleSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <SectionContainer>
      <div className="space-y-8 sm:space-y-10">
        <div className="space-y-3 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">Atrae a mas gente</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Haz que te encuentren, te comparen y te elijan antes de venir.
            </p>
          </BlurFade>
        </div>
        <div className="grid gap-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {attractFeatures.map((item, index) => (
            <RevealCard
              key={item.title}
              index={index}
              title={item.title}
              description={item.description}
              animation={item.animation}
              cardClassName="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#F0FFF5] to-[#CBFFDC] sm:h-[258px]"
            />
          ))}
        </div>
        <motion.div
          className="space-y-2 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.5, ease: revealEase, delay: 0.35 }}
        >
          <CTAButton />
        </motion.div>
      </div>
    </SectionContainer>
  )
}
