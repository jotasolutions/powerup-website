"use client"

import Image from "next/image"

import { WebsiteSplitSection } from "./WebsiteSplitSection"
import {

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
