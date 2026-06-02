"use client"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "../CTAButton"
import Image from "next/image"
import { BlurFade } from "../ui/blur-fade"
import { motion } from "motion/react";

const aboutImageViewport = {
  once: false as const,
  /** Require a meaningful portion of the element in view (default is very loose). */
  amount: 0.45,
  /** Shrink the “in view” band from the bottom so the scroll trigger fires later. */
  margin: "0px 0px -22% 0px",
}

export function AboutSection() {
  return (
    <SectionContainer >
      <div className="grid gap-13 md:grid-cols-2 md:items-center">
        <div className="space-y-4 col-span-1">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">
              Construido por especialistas en ventas y restauracion
            </h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              PowerUp nace de la combinacion entre tecnologia y estrategia gastronomica. Unimos
              ingenieria de menu, marketing y desarrollo de producto para ayudar a restaurantes a
              vender mas con su carta digital.
            </p>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.24}>
            <p className="text-sm font-medium text-slate-700">
              Startup espanola acelerada por Lanzadera
            </p>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.36}>
            <CTAButton />
          </BlurFade>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row  justify-center gap-5" >
            <motion.div
              className=""
              initial={{ rotate: 7, bottom: -50, opacity: 0, left: 50, scale: 0.5 }}
              whileInView={{ rotate: -7, bottom: 10, opacity: 1, left: 20, scale: 1 }}
              viewport={aboutImageViewport}
              transition={{
                duration: 0.5,
                ease: [0.7, -0.6, 0.32, 1.6]
              }}
            >
              <Image src="/images/about-fede.png" alt="about 1" width={170} height={170} className="bg-slate-200 w-[170px] aspect-square object-cover rounded-2xl -rotate-7 shadow-2xl" />
            </motion.div>
            <motion.div
              initial={{ y: 10, opacity: 0, filter: `blur(6px)` }}
              whileInView={{ y: -6, opacity: 1, filter: `blur(0px)` }}
              viewport={aboutImageViewport}

              transition={{
                delay: 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
            >

              <div className="mt-5">
                <div className="font-medium">Federico Bello</div>
                <div className="text-sm text-slate-800">Director</div>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-row  justify-end gap-5" >
            <motion.div
              initial={{ y: 10, opacity: 0, filter: `blur(6px)` }}
              whileInView={{ y: -6, opacity: 1, filter: `blur(0px)` }}
              viewport={aboutImageViewport}

              transition={{
                delay: 0.2,
                duration: 0.5,
                ease: "easeOut",
              }}
            >

              <div className="flex flex-col items-end mt-8">
                <div className="font-medium">Dani jimenez</div>
                <div className="text-sm text-slate-800">Tecnologia</div>
              </div>
            </motion.div>
            <motion.div
              className=""
              initial={{ rotate: -7, bottom: -50, opacity: 0, left: 50, scale: 0.5 }}
              whileInView={{ rotate: 4, bottom: 10, opacity: 1, left: 20, scale: 1 }}
              viewport={aboutImageViewport}
              transition={{
                duration: 0.5,
                ease: [0.7, -0.6, 0.32, 1.6],
                delay: 0.12
              }}
            >
              <Image src="/images/about-dani.png" alt="about 1" width={170} height={170} className="bg-slate-200 w-[170px] aspect-square object-cover rounded-2xl shadow-2xl " />
            </motion.div>
          </div>
          <div className="flex flex-row  justify-start gap-5 items-end pl-8 -mt-13" >
            <motion.div
              className=""
              initial={{ rotate: 7, bottom: -50, opacity: 0, left: 50, scale: 0.5 }}
              whileInView={{ rotate: -3, bottom: 10, opacity: 1, left: 20, scale: 1 }}
              viewport={aboutImageViewport}
              transition={{
                duration: 0.5,
                ease: [0.7, -0.6, 0.32, 1.6],
                delay: 0.24
              }}
            >
              <Image src="/images/about-jordi.png" alt="about 1" width={170} height={170} className="bg-slate-200 w-[170px] aspect-square object-cover rounded-2xl shadow-2xl" />
            </motion.div>
            <motion.div
              initial={{ y: 10, opacity: 0, filter: `blur(6px)` }}
              whileInView={{ y: -6, opacity: 1, filter: `blur(0px)` }}
              viewport={aboutImageViewport}

              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeOut",
              }}
            >

              <div className="mb-3">
                <div className="font-medium">Jordi Puig</div>
                <div className="text-sm text-slate-800">Consultor gastronómico</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
