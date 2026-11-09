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
  { icon: UtensilsCrossed, label: "Foto de platos" },
  { icon: Clapperboard, label: "Vídeo y reels" },
  { icon: Store, label: "Locales y equipo" },
]

const STEPS = [
  { icon: ClipboardList, title: "Rellenas el formulario" },
  { icon: Search, title: "Revisamos tu portfolio" },
  { icon: Mail, title: "Te escribimos si encaja" },
]

export default function ColaboradoresPage() {
  return (
    <main className="relative bg-white text-slate-900">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-center px-7 sm:px-6 md:px-8 lg:px-10">
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

      {/* The hero fills the first screen below the logo (100svh minus the 4rem header): text on
          top, the photo takes whatever height is left, and the button stays visible at the bottom. */}
      <section
        id="colaboradores-hero"
        data-track-section="colaboradores-hero"
        data-track-location="colaboradores-hero"
        className="w-full bg-gradient-to-b from-[#E2FEFD] to-white px-5 sm:px-6"
      >
        <div className="mx-auto flex h-[calc(100svh-4rem)] max-h-[960px] min-h-[540px] max-w-3xl flex-col items-center gap-3 pb-5 pt-1 text-center sm:gap-5 sm:pb-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white">
            <MapPin className="size-4" aria-hidden />
            Se buscan colaboradores
          </p>
          <h1 className="text-balance font-heading text-[2rem] font-semibold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            ¿Eres fotógrafo o videomaker en{" "}
            <span className="underline decoration-[#FF9800] decoration-[5px] underline-offset-[8px]">
              Valencia
            </span>
            ?
          </h1>
          <p className="max-w-2xl text-balance text-base font-medium leading-snug text-slate-800 sm:text-xl">
            Buscamos colaboradores para proyectos gastronómicos. Déjanos tu portfolio y te
            escribimos.
          </p>
          <div className="relative min-h-[150px] w-full flex-1 overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src="/images/colaboradores/tacos-mesa-roja.jpg"
              alt="Plato de tacos sobre una mesa metálica roja, con una mano exprimiendo lima"
              fill
              sizes="min(calc(100vw - 40px), 768px)"
              className="object-cover object-[center_65%]"
              priority
            />
            <ul
              className="absolute inset-x-2 bottom-2 flex flex-wrap justify-center gap-1.5 sm:bottom-4 sm:gap-2"
              aria-label="Qué buscamos"
            >
              {WHAT_WE_LOOK_FOR.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-md sm:gap-2 sm:px-4 sm:py-2 sm:text-base"
                >
                  <Icon className="size-4 text-[#1d5a7a]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full flex-col items-center gap-1.5">
            <Button asChild className="h-13 w-full from-[#246b90] to-[#1d5a7a] text-base font-semibold sm:h-12 sm:w-auto sm:px-8">
              <a href="#formulario">
                <Camera className="size-5" aria-hidden />
                Enviar mi portfolio
              </a>
            </Button>
            <p className="text-sm font-medium text-slate-700">2 minutos</p>
          </div>
        </div>
      </section>

      <SectionContainer id="colaboradores-como-funciona" className="!pt-10">
        <h2 className="text-center font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Cómo funciona</h2>
        <ol className="mx-auto mt-8 grid max-w-md gap-4 md:max-w-none md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title }, i) => (
            <li key={title} className="flex items-center justify-center gap-4 rounded-3xl bg-[#E2FEFD] p-6">
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
          <h2 className="text-center font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Cuéntanos sobre ti</h2>
          <p className="mt-2 text-center text-lg font-medium text-slate-800">Son 2 minutos. Todos los campos son obligatorios.</p>
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
