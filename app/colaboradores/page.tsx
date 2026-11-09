import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Camera, ClipboardList, Clapperboard, MapPin, Search, Store, UtensilsCrossed, Mail } from "lucide-react"

import { TallyEmbed } from "@/components/colaboradores/TallyEmbed"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { Button } from "@/components/ui/button"

// Landing for the ads that look for food photographers and videomakers in Valencia (Meta,
// November 2026). It isn't about selling PowerUp, so it never loads GTM (see
// components/GoogleTagManager.tsx): its visitors stay out of the Meta pixel's audiences.
// Indexable, but not in the sitemap or the menu. No links to the rest of the site except the
// privacy policy, so the form is the only thing to do here.

// Tally form «Colaboradores de foto y vídeo gastronómico · Valencia» (tally.so/r/kb9Bro).
const TALLY_FORM_ID = "kb9Bro"

const TITLE = "Fotógrafos y videomakers gastronómicos en Valencia | PowerUp Menu"
const DESCRIPTION =
  "Buscamos colaboradores de fotografía y vídeo gastronómico en Valencia y alrededores. Déjanos tu portfolio y tu tarifa."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/colaboradores",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/colaboradores",
    images: [{ url: "/images/colaboradores/tacos-mesa-roja.jpg", width: 1121, height: 1403 }],
  },
}

const WHAT_WE_LOOK_FOR = [
  { icon: UtensilsCrossed, title: "Foto de platos", text: "Platos, bebidas y producto." },
  { icon: Clapperboard, title: "Vídeo y reels", text: "Piezas cortas para redes." },
  { icon: Store, title: "Locales y equipo", text: "El ambiente y las personas." },
]

const STEPS = [
  { icon: ClipboardList, title: "Rellenas el formulario" },
  { icon: Search, title: "Revisamos tu portfolio" },
  { icon: Mail, title: "Te escribimos si encaja" },
]

export default function ColaboradoresPage() {
  return (
    <main className="relative bg-white text-slate-900">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center px-7 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <Image src="/images/isotipo-negativo.png" alt="" width={20} height={20} className="object-contain" />
          </div>
          <Image
            src="/images/powerup-logo.png"
            alt="PowerUp Menu"
            width={130}
            height={32}
            className="h-3 w-auto object-contain"
            priority
          />
        </div>
      </header>

      <SectionContainer id="colaboradores-hero" className="!pt-6 md:!pt-10 bg-gradient-to-b from-[#E2FEFD] to-white">
        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="w-full max-w-2xl space-y-6 lg:max-w-none">
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white">
              <MapPin className="size-4" aria-hidden />
              Se buscan colaboradores
            </p>
            <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              ¿Eres fotógrafo o videomaker en{" "}
              <span className="underline decoration-[#FF9800] decoration-[6px] underline-offset-[10px]">
                Valencia
              </span>
              ?
            </h1>
            <p className="text-lg font-medium leading-relaxed text-slate-800 sm:text-xl">
              Buscamos colaboradores para proyectos gastronómicos. Déjanos tu portfolio y te
              escribimos.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="h-13 w-full from-[#246b90] to-[#1d5a7a] text-base font-semibold sm:h-12 sm:w-auto sm:px-6">
                <a href="#formulario">
                  <Camera className="size-5" aria-hidden />
                  Enviar mi portfolio
                </a>
              </Button>
              <p className="text-center font-medium text-slate-700 sm:text-left">2 minutos</p>
            </div>
          </div>
          <div className="relative h-[360px] w-full max-w-2xl overflow-hidden rounded-4xl bg-slate-100 sm:h-[460px] lg:h-[560px] lg:max-w-none">
            <Image
              src="/images/colaboradores/tacos-mesa-roja.jpg"
              alt="Plato de tacos sobre una mesa metálica roja, con una mano exprimiendo lima"
              fill
              sizes="(max-width: 1023px) min(calc(100vw - 56px), 672px), 540px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer id="colaboradores-que-buscamos" className="!pt-4">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Qué buscamos</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {WHAT_WE_LOOK_FOR.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <Icon className="size-7 text-primary" aria-hidden />
              <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-1 text-lg text-slate-800">{text}</p>
            </li>
          ))}
        </ul>
      </SectionContainer>

      <SectionContainer id="colaboradores-como-funciona" className="!pt-0">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Cómo funciona</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title }, i) => (
            <li key={title} className="flex items-center gap-4 rounded-3xl bg-[#E2FEFD] p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-slate-950">
                <Icon className="size-5 shrink-0 text-primary" aria-hidden />
                {title}
              </h3>
            </li>
          ))}
        </ol>
      </SectionContainer>

      <SectionContainer id="formulario" className="!pt-0 scroll-mt-4">
        <div className="mx-auto max-w-2xl rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Cuéntanos sobre ti</h2>
          <p className="mt-2 text-lg font-medium text-slate-800">Son 2 minutos. Todos los campos son obligatorios.</p>
          <div className="mt-6">
            <TallyEmbed formId={TALLY_FORM_ID} title="Formulario para colaboradores de foto y vídeo" />
          </div>
        </div>
      </SectionContainer>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-700">
        © PowerUp Menu ·{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-slate-950">
          Política de privacidad
        </Link>
      </footer>
    </main>
  )
}
