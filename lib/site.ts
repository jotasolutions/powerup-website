import type { Metadata } from "next"

/** Canonical origin of the public marketing website (not carta/admin subdomains). */
export const SITE_URL = "https://www.powerup.menu"

export const HOME_TITLE = "Carta Digital QR - Potencia las ventas de tu restaurante"
export const HOME_DESCRIPTION =
  "Convierte la carta digital QR de tu restaurante en una máquina de ventas. Ingeniería de menú y neuromarketing para vender más, sin conocimiento técnico."

const OG_IMAGE = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "PowerUp Menu: carta digital QR para restaurantes",
} as const

/**
 * Next.js replaces a parent's openGraph object entirely, so every page that sets its own
 * has to repeat the shared fields. Leave `url` unset on the root layout: a hardcoded "/"
 * would become the og:url of every page that inherits it.
 */
export function websiteOpenGraph(page: {
  title: string
  description: string
  url?: string
}): NonNullable<Metadata["openGraph"]> {
  return {
    title: page.title,
    description: page.description,
    ...(page.url ? { url: page.url } : {}),
    siteName: "PowerUp Menu",
    locale: "es_ES",
    type: "website",
    images: [OG_IMAGE],
  }
}
