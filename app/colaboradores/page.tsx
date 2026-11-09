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

// TODO(colaboradores): replace with the Tally form id once the form exists.
const TALLY_FORM_ID = "TALLY_FORM_ID"

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
  {
    icon: UtensilsCrossed,
    title: "Foto de platos y producto",
    text: "Platos, bebidas y producto, listos para cartas digitales, webs y redes.",
  },
  {
    icon: Clapperboard,
    title: "Vídeo y reels",
    text: "Piezas cortas para Instagram y TikTok: el plato, la cocina, el servicio.",
  },
  {
    icon: Store,
    title: "Locales y equipo",
    text: "El ambiente del restaurante y las personas que lo hacen posible.",
  },
]

const STEPS = [
  { icon: ClipboardList, title: "Rellenas el formulario", text: "Dos minutos: tus datos, tu tarifa y tu portfolio." },
  { icon: Search, title: "Revisamos tu trabajo", text: "Miramos tu portfolio y la experiencia que nos cuentes." },
  { icon: Mail, title: "Te escribimos si encaja", text: "Cuando haya un proyecto que encaje contigo, te contactamos." },
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
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
              <MapPin className="size-4 text-primary" aria-hidden />
              Colaboradores · Valencia y alrededores
            </p>
            <h1 className="text-balance font-heading text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-tight">
              ¿Eres fotógrafo/a o videomaker{" "}
              <span className="underline decoration-[#FF9800] decoration-4 underline-offset-[10px]">
                gastronómico
              </span>{" "}
              en Valencia?
            </h1>
            <p className="section-paragraph lg:max-w-[90%]">
              Buscamos colaboradores de foto y vídeo para proyectos con restaurantes en Valencia y
              hasta 20 km alrededor. Somos un equipo internacional: déjanos tu portfolio y tu tarifa, y
              te escribimos si encaja.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="h-13 w-full sm:h-10 sm:w-auto">
                <a href="#formulario">
                  <Camera className="size-4" aria-hidden />
                  Enviar mi portfolio
                </a>
              </Button>
              <p className="text-center text-sm text-slate-600 sm:text-left">Dos minutos · Sin compromiso</p>
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
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">Qué buscamos</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {WHAT_WE_LOOK_FOR.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <Icon className="size-6 text-primary" aria-hidden />
              <h3 className="mt-4 font-heading text-lg font-medium">{title}</h3>
              <p className="mt-2 text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </SectionContainer>

      <SectionContainer id="colaboradores-como-funciona" className="!pt-0">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">Cómo funciona</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex gap-4 rounded-3xl bg-[#E2FEFD] p-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="flex items-center gap-2 font-heading text-lg font-medium">
                  <Icon className="size-5 text-primary" aria-hidden />
                  {title}
                </h3>
                <p className="mt-2 text-slate-600">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </SectionContainer>

      <SectionContainer id="formulario" className="!pt-0 scroll-mt-4">
        <div className="mx-auto max-w-2xl rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">Cuéntanos sobre ti</h2>
          <p className="mt-2 text-slate-600">
            Todos los campos son obligatorios. Para el portfolio, mejor un enlace; si no tienes, puedes
            subir archivos.
          </p>
          <div className="mt-6">
            <TallyEmbed formId={TALLY_FORM_ID} title="Formulario para colaboradores de foto y vídeo" />
          </div>
        </div>
      </SectionContainer>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © PowerUp Menu ·{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-slate-700">
          Política de privacidad
        </Link>
      </footer>
    </main>
  )
}
