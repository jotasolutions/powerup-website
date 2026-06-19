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
    <section id="hero-section" className="w-full px-3 pb-6 pt-3  sm:px-4 md:pb-10 md:pt-4 max-w-[1500px] mx-auto">
      <div className="hero-container relative mx-auto w-full overflow-hidden rounded-3xl p-4 pb-2 sm:pb-4 sm:px-6 sm:pb-0 sm:pt-8 md:px-10 lg:px-14">

        <div className="absolute hidden  -top-20 w-[700px] h-full z-20 md:block md:-top-[130px] md:-right-40 md:scale-70 lg:-right-26 lg:-top-20 lg:scale-80  xl:scale-100 xl:right-0 xl:top-0">
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
            className="absolute right-[105px] top-[100px] z-10 w-[170px] hidden lg:block"
          />
          <DelayedLottie
            delayMs={400}
            animationData={widget2}
            loop={false}
            style={{ width: '290px', height: 'auto' }}
            className="absolute  z-30 w-[160px] top-[290px] w-[320px] hidden lg:block"
          />
          <DelayedLottie
            delayMs={800}
            animationData={widget3}
            loop={false}
            style={{ width: '290px', height: 'auto' }}
            className="absolute lg:top-[480px]  lg:right-[360px]  z-40 w-[150px] hidden md:block md:-bottom-[200px] md:right-[350px]"
          />
          <DelayedLottie
            delayMs={1200}
            animationData={widget4}
            loop={false}
            style={{ width: '300px', height: 'auto' }}
            className="absolute lg:bottom-[100px] lg:right-[10px] z-40 w-[160px] hidden md:block md:bottom-[100px] md:right-[100px]"
          />
        </div>
        <div className="relative z-20 mx-auto pt-4 sm:pt-0 flex max-w-6xl flex-col gap-6 md:gap-8 max-w-[390px] sm:max-w-[500px] md:max-w-[100%] md:min-h-[350px] lg:min-h-[500px] xl:min-h-[677px] lg:flex-row lg:items-center lg:gap-10">
          <motion.div
            className="block md:hidden w-full max-w-[320px] mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/images/mobile-hero2.png"
              alt="hand"
              width={1000}
              height={1000}
              className="w-full"
            />
          </motion.div>
          <div className="space-y-5 lg:max-w-xl lg:space-y-6">
            <BlurFade>
              <h1 className="text-center max-w-[300px] mx-auto sm:max-w-none md:mx-0 font-heading text-2xl leading-8 font-medium  text-black md:text-3xl md:text-left md:leading-10 md:max-w-[400px] lg:leading-12 lg:max-w-[520px] lg:text-4xl xl:leading-14 xl:text-5xl xl:max-w-[590px]">
                Convierte la carta
                <div className="mx-2 inline-block rotate-11 rounded-sm md:rounded-md bg-primary p-1.5 shadow-lg sm:mx-3">
                  <QrCode className="size-4 md:size-6 text-white sm:size-7" />
                </div>
                de tu restaurante en una maquina de <span className="mx-0.5"></span>
                <Highlighter action="circle" color="#FF9800" delay={1500} >
                  ventas
                </Highlighter>
              </h1>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="text-center text-base  sm:text-sm leading-6 md:text-left md:max-w-lg md:leading-7 xl:max-w-lg font-heading md:text-base  md:leading-7 text-slate-700  md:text-base lg:text-lg xl:text-xl">
                Ingenieria de menu y neuromarketing para vender más a traves de la carta digital.
                Sin conocimiento tecnico.
              </p>
            </BlurFade>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center justify-center md:justify-start">
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
                    className={buttonVariants({ variant: "secondary", className: "w-full sm:min-w-40 sm:w-auto h-13 sm:h-10" })}
                  >
                    Ver carta de ejemplo
                  </Link>

                </div>
              </BlurFade>
            </div>
            <BlurFade delay={0.9}>
              <div className="flex items-center gap-3 justify-center md:justify-start">

                <div className="flex -space-x-2">
                  <Image src="/images/testimonials/marisa/logo.png" alt="Excellent" width={28} height={28} className="object-contain size-7 rounded-full" />
                  <Image src="/images/testimonials/taberna-casera/logo.webp" alt="Excellent" width={28} height={28} className="object-contain size-7 rounded-full" />
                  <Image src="/images/testimonials/arau/logo.png" alt="Excellent" width={28} height={28} className="object-contain size-7 rounded-full" />
                  <Image src="/images/testimonials/goyos/logo.png" alt="Excellent" width={28} height={28} className="object-contain size-7 rounded-full" />
                </div>
                <p className="text-lg md:text-2xl font-semibold text-slate-900">4.5</p>
                <div className="scale-75 -ml-3 md:scale-100 md:-ml-0">
                  <p className="text-xs font-semibold text-slate-700">Excellent</p>
                  <p className="text-xs tracking-wide text-emerald-700">★★★★★</p>
                </div>

              </div>
            </BlurFade>
          </div>
          


        </div>
        <motion.div
          className="absolute bottom-3 right-3 z-30 hidden origin-center flex-col items-center gap-2 rounded-lg bg-slate-800 p-3 text-white lg:flex"
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
          className="h-3 sm:h-4 w-auto object-contain"
        />
        <Image
          src="/images/companies/aws-logo.svg"
          alt="AWS"
          width={76}
          height={24}
          className="h-3 sm:h-4 w-auto object-contain"
        />
        <Image
          src="/images/companies/orbita.png"
          alt="Orbita"
          width={94}
          height={24}
          className="hidden sm:block w-auto object-contain"
        />
        <Image
          src="/images/companies/stripe.svg"
          alt="Stripe"
          width={88}
          height={24}
          className="h-3 sm:h-4 w-auto object-contain"
        />
        <Image
          src="/images/companies/lanzadera.svg"
          alt="Lanzadera"
          width={122}
          height={24}
          className="h-3 sm:h-4 w-auto object-contain"
        />
      </motion.div>
    </section>
  )
}
