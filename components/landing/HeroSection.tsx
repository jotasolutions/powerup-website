'use client'
import { Button, buttonVariants } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"
import type { LottieRefCurrentProps } from "lottie-react"
import { Highlighter } from "../ui/highlighter"
import { CTAButton } from "../CTAButton"
import widget1 from "../../public/images/hero/widget1.json";
import widget2 from "../../public/images/hero/widget2.json";
import widget3 from "../../public/images/hero/widget3.json";
import widget4 from "../../public/images/hero/widget4.json";
import Lottie, { type LottieComponentProps } from "lottie-react";
import { BlurFade } from "../ui/blur-fade"
import { motion } from "motion/react"
import Link from "next/link"
import { EXAMPLE_MENU_URL, ExampleMenuQr } from "./ExampleMenuQr"

export function DelayedLottie({
  delayMs,
  ...props
}: LottieComponentProps & { delayMs: number }) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  useEffect(() => {
    const id = window.setTimeout(() => {
      lottieRef.current?.play()
    }, delayMs)
    return () => window.clearTimeout(id)
  }, [delayMs])
  return <Lottie {...props} autoplay={false} lottieRef={lottieRef} />
}

export function HeroSection() {
  return (
    <section id="hero-section" className="w-full px-3 pb-6 pt-3 sm:px-4 md:pb-10 md:pt-4 max-w-[1500px] mx-auto">
      <div className="hero-container relative mx-auto w-full overflow-hidden rounded-3xl px-4 pt-6 sm:px-6 sm:pb-0 sm:pt-8 md:px-10 lg:px-14">

        <div className="absolute  top-0 w-[700px] h-full z-20 scale-80 -right-10 xl:scale-100 xl:right-0">
            <Image
              src="/images/hero/hero-hand-8.png"
              alt="hand"
              width={1000}
              height={1000}
              className="absolute top-[180px] xl:top-[140px] -right-30 z-30  w-[650px] object-contain "
            />
          <Lottie
            animationData={widget1}
            loop={false}
            autoplay={true}
            style={{ width: '290px', height: 'auto' }}
            className="absolute right-[105px] top-[100px] z-10 w-[170px]"
          />
          <DelayedLottie
            delayMs={400}
            animationData={widget2}
            loop={false}
            style={{ width: '290px', height: 'auto' }}
            className="absolute  z-30 w-[160px] top-[290px] w-[320px]"
          />
          <DelayedLottie
            delayMs={800}
            animationData={widget3}
            loop={false}
            style={{ width: '290px', height: 'auto' }}
            className="absolute bottom-[80px]  right-[360px]  z-40 w-[150px]"
          />
          <DelayedLottie
            delayMs={1200}
            animationData={widget4}
            loop={false}
            style={{ width: '300px', height: 'auto' }}
            className="absolute bottom-[100px] right-[10px] z-40 w-[160px]"
          />
        </div>
        <div className="relative z-20 mx-auto flex max-w-6xl flex-col gap-8 lg:min-h-[677px] lg:flex-row lg:items-center lg:gap-10">
          <div className="space-y-5 lg:max-w-xl lg:space-y-6">
            <BlurFade>
              <h1 className="max-w-[590px] font-heading text-3xl leading-tight font-medium  text-black sm:text-4xl lg:text-5xl">
                Convierte la carta
                <div className="mx-2 inline-block rotate-11 rounded-md bg-primary p-1.5 shadow-lg sm:mx-3">
                  <QrCode className="size-6 text-white sm:size-7" />
                </div>
                de tu restaurante en una maquina de <span className="mx-0.5"></span>
                <Highlighter action="circle" color="#FF9800" delay={1500} >
                  ventas
                </Highlighter>
              </h1>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="max-w-lg font-heading text-base  leading-7 text-slate-700 sm:text-lg sm:leading-8 lg:text-xl">
                Ingenieria de menu y neuromarketing para vender más a traves de la carta digital.
                Sin conocimiento tecnico.
              </p>
            </BlurFade>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
              <BlurFade delay={0.6}>
                <div className="w-full sm:w-auto">
                  <CTAButton />
                </div>
              </BlurFade>
              <BlurFade delay={0.8}>
                <div className="flex w-full flex-col gap-3 sm:w-auto">
                  <Link
                    href={EXAMPLE_MENU_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "secondary", className: "w-full sm:min-w-40 sm:w-auto" })}
                  >
                    Ver carta de ejemplo
                  </Link>

                </div>
              </BlurFade>
            </div>
            <BlurFade delay={0.9}>
              <div className="flex items-center gap-3">

                <div className="flex -space-x-2">
                  <Image src="/images/testimonials/marisa/logo.png" alt="Excellent" width={28} height={28} className="object-contain size-7 rounded-full" />
                  <Image src="/images/testimonials/taberna-casera/logo.webp" alt="Excellent" width={28} height={28} className="object-contain size-7 rounded-full" />
                  <Image src="/images/testimonials/arau/logo.png" alt="Excellent" width={28} height={28} className="object-contain size-7 rounded-full" />
                  <Image src="/images/testimonials/goyos/logo.png" alt="Excellent" width={28} height={28} className="object-contain size-7 rounded-full" />
                </div>
                <p className="text-2xl font-semibold text-slate-900">4.5</p>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Excellent</p>
                  <p className="text-xs tracking-wide text-emerald-700">★★★★★</p>
                </div>

              </div>
            </BlurFade>
          </div>
          <Image
            src="/images/mobile-hero.png"
            alt="hand"
            width={1000}
            height={1000}
            className="block md:hidden"
          />


        </div>
        <motion.div
          className="absolute bottom-3 right-3 z-30 hidden origin-center flex-col items-center gap-2 rounded-lg bg-slate-800 p-3 text-white md:flex"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 2,
            type: "spring",
            stiffness: 380,
            damping: 20,
            mass: 0.85,
          }}
        >
          <p className="text-xs font-medium">Ver ejemplo</p>
          <ExampleMenuQr size={60} />
        </motion.div>
        <Image
          src="/images/hero/hero-lines2.svg"
          alt="cercles"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay z-10 opacity-40"
        />
      </div>
      <motion.div
        className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-2 md:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      >
        <Image
          src="/images/companies/google-cloud.svg"
          alt="Google Cloud"
          width={132}
          height={24}
          className="h-4 w-auto object-contain"
        />
        <Image
          src="/images/companies/aws-logo.svg"
          alt="AWS"
          width={76}
          height={24}
          className="h-4 w-auto object-contain"
        />
        <Image
          src="/images/companies/orbita.png"
          alt="Orbita"
          width={94}
          height={24}
          className="h-5 w-auto object-contain"
        />
        <Image
          src="/images/companies/stripe.svg"
          alt="Stripe"
          width={88}
          height={24}
          className="h-4 w-auto object-contain"
        />
        <Image
          src="/images/companies/lanzadera.svg"
          alt="Lanzadera"
          width={122}
          height={24}
          className="h-5 w-auto object-contain"
        />
      </motion.div>
    </section>
  )
}
