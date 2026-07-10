"use client"

import Image from "next/image"

import { WebsiteSplitSection } from "./WebsiteSplitSection"
import {
  websiteAnalyticsItems,
  websitePagesItems,
  websitePainPoints,
  websiteWelcomeItems,
} from "./website-section-data"

function PlaceholderPanel({ className }: { className?: string }) {
  return (
    <div
      className={`min-h-[320px] rounded-3xl border border-slate-200 bg-slate-100 ${className ?? ""}`}
      aria-hidden
    />
  )
}

export function WebsitePainPointSection() {
  return (
    <WebsiteSplitSection
      id="website-pain-point"
      title="Tu web no puede estar frenando tu negocio"
      items={websitePainPoints}
      image={<PlaceholderPanel className="min-h-[360px]" />}
      ctaLabel="Pruébalo gratis"
    />
  )
}

export function WebsitePagesSection() {
  return (
    <WebsiteSplitSection
      id="website-pages"
      title="Páginas para todo lo que necesites"
      description="Crea páginas para promociones, temporadas o eventos sin depender de diseñadores."
      items={websitePagesItems}
      image={
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <Image
            src="/images/tropico-website-mockup.png"
            alt="Secciones de una web de restaurante"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 540px"
          />
        </div>
      }
      ctaLabel="Pruébalo gratis"
    />
  )
}

export function WebsiteAnalyticsSection() {
  return (
    <WebsiteSplitSection
      id="website-analytics"
      title="Mide el tráfico de tu web"
      description="Conoce a tus clientes y mejora tus resultados con métricas claras."
      items={websiteAnalyticsItems}
      image={<PlaceholderPanel className="min-h-[360px]" />}
      imagePosition="right"
      ctaLabel="Pruébalo gratis"
    />
  )
}

export function WebsiteWelcomeSection() {
  return (
    <WebsiteSplitSection
      id="website-welcome-screen"
      title="Una bienvenida que cuenta quién eres"
      description="Añade una pantalla inicial con tu foto, tu historia y tu mensaje de marca."
      items={websiteWelcomeItems}
      image={
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <Image
            src="/images/tropico-website-mockup.png"
            alt="Pantalla de bienvenida de web restaurante"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 540px"
          />
        </div>
      }
      imagePosition="right"
      ctaLabel="Pruébalo gratis"
    />
  )
}
