import { SITE_URL } from "@/lib/site"

/** Canonical NAP and legal identity for PowerUp Menu (Registro Mercantil). */
export const COMPANY = {
  brandName: "PowerUp Menu",
  legalName: "POWERUP MENU, SOCIEDAD LIMITADA",
  cif: "B75786459",
  email: "info@powerup.menu",
  /** E.164 — public WhatsApp / contact number used on the site. */
  telephone: "+34651332202",
  telephoneDisplay: "+34 651 332 202",
  whatsappUrl: `https://wa.me/34651332202?text=${encodeURIComponent(
    "Hola, tengo una pregunta sobre PowerUp Menu",
  )}`,
  address: {
    streetAddress: "Calle del Turia, 53, planta 0, puerta izquierda",
    addressLocality: "València",
    addressRegion: "Valencia",
    postalCode: "46008",
    addressCountry: "ES",
  },
  /** Single-line address for footer and legal pages. */
  addressDisplay:
    "Calle del Turia, 53, planta 0, puerta izquierda, 46008 València",
} as const

export function organizationJsonLdFields() {
  return {
    "@type": "Organization" as const,
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    taxID: COMPANY.cif,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icons/apple-icon-180x180.png`,
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: COMPANY.address.streetAddress,
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint" as const,
      contactType: "customer support",
      email: COMPANY.email,
      telephone: COMPANY.telephone,
      availableLanguage: ["es", "en"],
    },
  }
}
