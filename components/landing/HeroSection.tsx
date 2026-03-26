import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="hero-section" className="w-full px-4 pb-8 pt-4 md:pb-10">
      <div className="rounded-3xl  px-6 py-8 md:px-14  hero-container overflow-hidden relative">
        <div className="mx-auto flex flex-row max-w-6xl gap-10 items-center z-20 relative md:min-h-[580px]">
          <div className="space-y-6 w-[610px]">
            <h1 className="max-w-xl font-heading text-4xl leading-tight tracking-tight text-black">
              Convierte la carta <div className="inline-block bg-primary p-1.5 rounded-md rotate-11 shadow-lg mx-1"><QrCode className="size-7 text-white" /></div> de tu restaurante en una maquina de ventas
            </h1>
            <p className="max-w-xl text-xl leading-8 text-slate-700 font-heading">
              Ingenieria de menu y neuromarketing para <strong className="font-medium">vender más</strong> a traves de la carta digital.
              Sin conocimiento tecnico.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button className="min-w-44">
                <span className="text-base"><QrCode className="size-4" /></span>
                Crear carta gratis
              </Button>
              <Button variant="outline" className="min-w-40">
                Ver carta de ejemplo
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="size-7 rounded-full border border-slate-300 bg-slate-100" />
                <span className="size-7 rounded-full border border-slate-300 bg-slate-200" />
                <span className="size-7 rounded-full border border-slate-300 bg-slate-100" />
                <span className="size-7 rounded-full border border-slate-300 bg-slate-200" />
              </div>
              <p className="text-3xl font-semibold text-slate-900">4.4</p>
              <div>
                <p className="text-sm font-semibold text-slate-700">Excellent</p>
                <p className="text-xs tracking-wide text-emerald-700">★★★★★</p>
              </div>
            </div>
          </div>
          <div className="mx-auto   ">
           imagen aqui
          </div>
        </div>
        <Image
          src="/images/cercles.svg"
          alt="cercles"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay z-10"
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
