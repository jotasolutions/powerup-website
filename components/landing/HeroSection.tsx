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
import { TextAnimate } from "../ui/text-animate"
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
    <section id="hero-section" className="w-full px-4 pb-8 pt-4 md:pb-10">
      <div className="rounded-3xl  px-6 p md:px-14  hero-container overflow-hidden relative w-full  mx-auto">
        <div className="mx-auto flex flex-row max-w-6xl gap-10 items-center z-20 relative md:min-h-[677px]">
          <div className="space-y-6 ">
            <BlurFade>
              <h1 className="max-w-[590px] font-heading text-4xl leading-tight  text-black font-medium">
                Convierte la carta
                <div className="inline-block bg-primary p-1.5 rounded-md rotate-11 shadow-lg mx-3">
                  <QrCode className="size-7 text-white" />
                </div>
                de tu restaurante en una maquina de <span className="mx-0.5"></span>
                <Highlighter action="circle" color="#FF9800" delay={1500} >
                  ventas
                </Highlighter>
              </h1>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="max-w-lg text-xl leading-8 text-slate-700 font-heading font-medium">
                Ingenieria de menu y neuromarketing para vender más a traves de la carta digital.
                Sin conocimiento tecnico.
              </p>
            </BlurFade>
            <div className="flex flex-wrap items-center gap-2.5">
              <BlurFade delay={0.6}>
                <CTAButton />
              </BlurFade>
              <BlurFade delay={0.8}>
                <Button variant="secondary" className="min-w-40">
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
            src="/images/hero/hero-hand-4.png"
            alt="hand"
            width={1000}
            height={1000}
            className="w-[550px] h-auto object-contain absolute bottom-0 right-0 z-30"
          />
          <Lottie
            animationData={widget1}
            loop={false}
            autoplay={true}
            style={{ width: '320px', height: 'auto' }}
            className="absolute top-[90px] right-[270px] z-30"
          />
          <DelayedLottie
            delayMs={400}
            animationData={widget2}
            loop={false}
            style={{ width: '320px', height: 'auto' }}
            className="absolute top-[290px] right-[365px] z-10"
          />
          <DelayedLottie
            delayMs={800}
            animationData={widget3}
            loop={false}
            style={{ width: '320px', height: 'auto' }}
            className="absolute bottom-[0px] right-[300px] z-40"
          />
          <DelayedLottie
            delayMs={1200}
            animationData={widget4}
            loop={false}
            style={{ width: '320px', height: 'auto' }}
            className="absolute bottom-[0px] right-[-20px] z-40"
          />
        </div>
        <Image
          src="/images/hero-lines.svg"
          alt="cercles"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay z-10 opacity-40"
        />
      </div>
      <div className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 opacity-70  px-4 py-2 md:justify-between">
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
