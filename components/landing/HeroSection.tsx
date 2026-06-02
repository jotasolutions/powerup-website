'use client'
import { Button } from "@/components/ui/button"
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
    <section id="hero-section" className="w-full px-3 pb-6 pt-3 sm:px-4 md:pb-10 md:pt-4">
      <div className="hero-container relative mx-auto w-full overflow-hidden rounded-3xl px-4 pt-6 sm:px-6 sm:pb-0 sm:pt-8 md:px-10 lg:px-14">
        <div className="relative z-20 mx-auto flex max-w-6xl flex-col gap-8 lg:min-h-[677px] lg:flex-row lg:items-center lg:gap-10">
          <div className="space-y-5 lg:max-w-xl lg:space-y-6">
            <BlurFade>
              <h1 className="max-w-[590px] font-heading text-3xl leading-tight font-medium text-black sm:text-4xl lg:text-5xl">
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
              <p className="max-w-lg font-heading text-base font-medium leading-7 text-slate-700 sm:text-lg sm:leading-8 lg:text-xl">
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
                <Button variant="secondary" className="w-full sm:min-w-40 sm:w-auto">
                  Ver carta de ejemplo
                </Button>
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
                <p className="text-2xl font-semibold text-slate-900">4.4</p>
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
          <div className="hidden md:block relative w-full min-h-[330px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[620px] lg:flex-1">
            <Image
              src="/images/hero/hero-hand-4.png"
              alt="hand"
              width={1000}
              height={1000}
              className="absolute bottom-0 right-0 z-30 h-auto w-[310px] object-contain sm:w-[420px] md:w-[500px] lg:w-[550px]"
            />
            <Lottie
              animationData={widget1}
              loop={false}
              autoplay={true}
              style={{ width: '320px', height: 'auto' }}
              className="absolute right-[145px] top-[24px] z-30 w-[170px] sm:right-[190px] sm:top-[42px] sm:w-[230px] md:right-[260px] md:top-[70px] md:w-[280px] lg:right-[270px] lg:top-[90px] lg:w-[320px]"
            />
            <DelayedLottie
              delayMs={400}
              animationData={widget2}
              loop={false}
              style={{ width: '320px', height: 'auto' }}
              className="absolute right-[178px] top-[112px] z-10 w-[160px] sm:right-[255px] sm:top-[175px] sm:w-[220px] md:right-[335px] md:top-[265px] md:w-[260px] lg:right-[365px] lg:top-[290px] lg:w-[320px]"
            />
            <DelayedLottie
              delayMs={800}
              animationData={widget3}
              loop={false}
              style={{ width: '320px', height: 'auto' }}
              className="absolute bottom-0 right-[165px] z-40 w-[150px] sm:right-[220px] sm:w-[210px] md:right-[275px] md:w-[250px] lg:right-[300px] lg:w-[320px]"
            />
            <DelayedLottie
              delayMs={1200}
              animationData={widget4}
              loop={false}
              style={{ width: '320px', height: 'auto' }}
              className="absolute bottom-0 right-[-10px] z-40 w-[160px] sm:right-[10px] sm:w-[220px] md:right-[-10px] md:w-[260px] lg:right-[-20px] lg:w-[320px]"
            />
          </div>
        </div>
        <Image
          src="/images/hero-lines.svg"
          alt="cercles"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay z-10 opacity-40"
        />
      </div>
      <div className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-2 opacity-70 md:justify-between">
        <Image
          src="/images/companies/google-cloud.svg"
          alt="Google Cloud"
          width={132}
          height={24}
          className="h-5 w-auto object-contain"
        />
        <Image
          src="/images/companies/aws-logo.svg"
          alt="AWS"
          width={76}
          height={24}
          className="h-5 w-auto object-contain"
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
          className="h-5 w-auto object-contain"
        />
        <Image
          src="/images/companies/lanzadera.svg"
          alt="Lanzadera"
          width={122}
          height={24}
          className="h-5 w-auto object-contain"
        />
      </div>
    </section>
  )
}
