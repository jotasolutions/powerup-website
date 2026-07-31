import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const ATTRIBUTION_STORAGE_KEY = "powerup_attribution"
export const SIGN_UP_URL = "https://admin.powerup.menu/sign-up"
export const WEBSITE_WIZARD_URL = "https://powerup-website-wizard.vercel.app/"
export const WEBSITE_CTA_LABEL = "Crear mi web gratis"
export const DEFAULT_CTA_LABEL = "Crear carta gratis"

export function isWebsiteLandingPath(pathname: string | null): boolean {
  return Boolean(pathname?.startsWith("/pagina-web"))
}

export type AttributionParams = Record<string, string>

export function getStoredAttribution(): AttributionParams {
  if (typeof window === "undefined") return {}

  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return {}

    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {}

    const result: AttributionParams = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string") result[key] = value
    }
    return result
  } catch {
    return {}
  }
}

export function captureAttributionFromSearch(search: string): void {
  if (typeof window === "undefined") return

  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`)
  if ([...params.keys()].length === 0) return

  const incoming: AttributionParams = {}
  params.forEach((value, key) => {
    incoming[key] = value
  })

  try {
    const merged = { ...getStoredAttribution(), ...incoming }
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // Ignore quota / private mode errors
  }
}

export function appendAttributionParams(baseUrl: string): string {
  const stored = getStoredAttribution()
  const entries = Object.entries(stored)
  if (entries.length === 0) return baseUrl

  try {
    const url = new URL(baseUrl)
    for (const [key, value] of entries) {
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value)
      }
    }
    return url.toString()
  } catch {
    return baseUrl
  }
}

export function useAttributedUrl(baseUrl: string): string {
  const [url, setUrl] = useState(baseUrl)

  useEffect(() => {
    // Capture current URL params first so this href is race-free with AttributionCapture
    captureAttributionFromSearch(window.location.search)
    setUrl(appendAttributionParams(baseUrl))
  }, [baseUrl])

  return url
}

/** Sign-up on most pages; website wizard on /pagina-web. Optional href overrides. */
export function useAttributedCtaUrl(href?: string): string {
  const pathname = usePathname()
  const defaultUrl = isWebsiteLandingPath(pathname)
    ? WEBSITE_WIZARD_URL
    : SIGN_UP_URL
  return useAttributedUrl(href ?? defaultUrl)
}

export function useCtaLabel(label?: string): string {
  const pathname = usePathname()
  if (isWebsiteLandingPath(pathname)) return WEBSITE_CTA_LABEL
  return label ?? DEFAULT_CTA_LABEL
}

export function useIsWebsiteLanding(): boolean {
  return isWebsiteLandingPath(usePathname())
}
