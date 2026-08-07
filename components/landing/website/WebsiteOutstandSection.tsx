"use client"

import Image from "next/image"

import { CTAButton } from "@/components/CTAButton"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"
import { motion } from "framer-motion"
import { YELLOW_ARROW_PATH } from "@/components/ui/smoothui/scroll-reveal-paragraph"

export function WebsiteOutstandSection() {
  return (
    <SectionContainer id="website-outstand">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center md:gap-10">
        <div className="relative  w-full ">
          <div className="absolute top-3 right-[24%]">
            <motion.svg
              viewBox="0 0 168 68"
              className="hidden md:block absolute top-1/3 right-0 h-auto w-[150px] -translate-y-1/2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d={YELLOW_ARROW_PATH}
                stroke="#FFCD45"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0"
              />
              <motion.path
                d={YELLOW_ARROW_PATH}
                stroke="#FFCD45"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"

              />
            </motion.svg>
          </div>
          <Image
            src="/images/website-landing/outstand-feature.png"
            alt="Vista destacada de web restaurante"
            className="object-contain w-full max-w-lg  mx-auto"
            width={500}
            height={500}
            sizes="500px"
          />
        </div>
        <div className="space-y-4">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="landing-section-title">Diseñada para que te elijan a tí</h2>
          </BlurFade>
          <BlurFade inView >
            <p className="section-paragraph max-w-2xl">
              Tu web muestra lo que importa: fotos, carta integrada, botones claros, horarios, mapa y tu historia.
            </p>
          </BlurFade>
          <BlurFade inView >
            <p className="section-paragraph max-w-2xl">
              Todo lo que el cliente quiere ver antes de decidir dónde comer.
            </p>
          </BlurFade>
        </div>

        <div className="w-full">
          <CTAButton label="Pruébalo gratis" location="website_outstand" />
        </div>
      </div>
    </SectionContainer>
  )
}
