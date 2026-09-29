import type { ConsentCategories, ConsentState } from "./types"

const STORAGE_KEY = "cookie-consent"
const VISITOR_ID_KEY = "cookie-consent-visitor-id"

/**
 * Consent choice shared with the other powerup.menu sites: the website wizard
 * (alta-pagina-web.powerup.menu) reads and writes the same cookie, with the
 * same format, so a visitor chooses once. It holds only the yes/no per
 * category, the consent version and when it was chosen — no identifier.
 */
const SHARED_COOKIE_NAME = "pu_consent"
const SHARED_COOKIE_DOMAIN = "powerup.menu"
const SHARED_COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60

export interface SharedConsent {
  /** Consent version */
  v: string
  /** Analytics */
  a: 0 | 1
  /** Marketing */
  m: 0 | 1
  /** Preferences */
  p: 0 | 1
  /** When it was chosen (ms since epoch) */
  t: number
}

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Get or create a visitor ID
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") {
    return generateUUID()
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY)
  if (!visitorId) {
    visitorId = generateUUID()
    localStorage.setItem(VISITOR_ID_KEY, visitorId)
  }
  return visitorId
}

/**
 * Get default consent categories (all false except necessary)
 */
export function getDefaultCategories(): ConsentCategories {
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  }
}

/**
 * Get all categories accepted
 */
export function getAllAcceptedCategories(): ConsentCategories {
  return {
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  }
}

/**
 * Save consent state to localStorage and to the shared cookie
 */
export function saveConsentState(state: ConsentState): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  writeSharedConsentCookie(state)
}

/**
 * Load consent state from localStorage
 */
export function loadConsentState(): ConsentState | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as ConsentState
  } catch {
    return null
  }
}

/**
 * Clear consent state from localStorage and the shared cookie
 */
export function clearConsentState(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
  clearSharedConsentCookie()
}

function sharedCookieAttributes(maxAgeSeconds: number): string {
  const { hostname, protocol } = window.location
  const onSharedDomain =
    hostname === SHARED_COOKIE_DOMAIN || hostname.endsWith(`.${SHARED_COOKIE_DOMAIN}`)

  return [
    "Path=/",
    `Max-Age=${maxAgeSeconds}`,
    "SameSite=Lax",
    onSharedDomain ? `Domain=${SHARED_COOKIE_DOMAIN}` : null,
    protocol === "https:" ? "Secure" : null,
  ]
    .filter(Boolean)
    .join("; ")
}

function isSharedConsent(value: unknown): value is SharedConsent {
  if (!value || typeof value !== "object") return false
  const record = value as Record<string, unknown>
  const isFlag = (flag: unknown) => flag === 0 || flag === 1

  return (
    typeof record.v === "string" &&
    isFlag(record.a) &&
    isFlag(record.m) &&
    isFlag(record.p) &&
    typeof record.t === "number" &&
    Number.isFinite(record.t)
  )
}

/**
 * Write the consent choice to the cookie shared with the other powerup.menu sites
 */
export function writeSharedConsentCookie(state: ConsentState): void {
  if (typeof window === "undefined") return

  try {
    const chosenAt = state.lastUpdated ? Date.parse(state.lastUpdated) : NaN
    const value: SharedConsent = {
      v: state.consentVersion,
      a: state.categories.analytics ? 1 : 0,
      m: state.categories.marketing ? 1 : 0,
      p: state.categories.preferences ? 1 : 0,
      t: Number.isFinite(chosenAt) ? chosenAt : Date.now(),
    }
    document.cookie = `${SHARED_COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(value)
    )}; ${sharedCookieAttributes(SHARED_COOKIE_MAX_AGE_SECONDS)}`
  } catch {
    // The shared cookie must never break the banner
  }
}

/**
 * Read the consent choice from the cookie shared with the other powerup.menu sites
 */
export function readSharedConsentCookie(): SharedConsent | null {
  if (typeof window === "undefined") return null

  try {
    const prefix = `${SHARED_COOKIE_NAME}=`
    const raw = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix))
    if (!raw) return null

    const parsed: unknown = JSON.parse(decodeURIComponent(raw.slice(prefix.length)))
    return isSharedConsent(parsed) ? parsed : null
  } catch {
    return null
  }
}

/**
 * Remove the shared consent cookie
 */
export function clearSharedConsentCookie(): void {
  if (typeof window === "undefined") return

  try {
    document.cookie = `${SHARED_COOKIE_NAME}=; ${sharedCookieAttributes(0)}`
  } catch {
    // The shared cookie must never break the banner
  }
}

/**
 * Pick the most recent choice for the current consent version, between this
 * site's localStorage and the shared cookie (a choice made on another
 * powerup.menu site). Returns null when there is no valid choice.
 */
export function pickLatestConsentState(
  local: ConsentState | null,
  shared: SharedConsent | null,
  consentVersion: string
): ConsentState | null {
  const localState = local && local.consentVersion === consentVersion ? local : null
  const sharedState: ConsentState | null =
    shared && shared.v === consentVersion
      ? {
          hasConsented: true,
          categories: {
            necessary: true,
            analytics: shared.a === 1,
            marketing: shared.m === 1,
            preferences: shared.p === 1,
          },
          lastUpdated: new Date(shared.t).toISOString(),
          consentVersion: shared.v,
          visitorId: local?.visitorId ?? "",
        }
      : null

  if (localState && sharedState && shared) {
    const localChosenAt = localState.lastUpdated ? Date.parse(localState.lastUpdated) : NaN
    return Number.isFinite(localChosenAt) && localChosenAt >= shared.t ? localState : sharedState
  }

  return localState ?? sharedState
}

/**
 * Calculate expiration date
 */
export function calculateExpirationDate(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

/**
 * Check if consent has expired
 */
export function isConsentExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date()
}

/**
 * Check if a script is a Google service script
 * Detects Google Analytics, Google Tag Manager, Google Ads, etc.
 */
export function isGoogleScript(script: { src?: string; content?: string }): boolean {
  // Check if src URL contains Google domains (case-insensitive)
  if (script.src) {
    const srcLower = script.src.toLowerCase()
    const googleDomains = [
      "googletagmanager.com",
      "google-analytics.com",
      "googleadservices.com",
      "google.com/analytics",
      "google.com/ads",
      "doubleclick.net",
      "googleapis.com/gtag",
    ]
    
    // Check if any Google domain is present in the URL
    // Use better matching to avoid false positives (e.g., "fakegoogletagmanager.com")
    const isGoogleDomain = googleDomains.some((domain) => {
      const domainLower = domain.toLowerCase()
      // For full domains, check for domain boundaries (preceded by . or // or start of string)
      if (domainLower.includes("/")) {
        // For paths like "google.com/analytics", just check if it's included
        return srcLower.includes(domainLower)
      } else {
        // For domains, check for proper domain boundaries
        // Match: .googletagmanager.com or //googletagmanager.com or googletagmanager.com/
        const domainPattern = new RegExp(
          `(^|//|\\.)${domainLower.replace(/\./g, "\\.")}(/|:|$|\\?)`,
          "i"
        )
        return domainPattern.test(srcLower)
      }
    })
    
    if (isGoogleDomain) {
      return true
    }
  }

  // Check if inline content contains Google-specific code (case-insensitive)
  // This is checked as a fallback if src doesn't match, or if no src is provided
  if (script.content) {
    const contentLower = script.content.toLowerCase()
    const googlePatterns = [
      "googletagmanager.com",
      "google-analytics.com",
      "gtag(",
      "datalayer",
      "ga(",
      "google-analytics",
    ]
    return googlePatterns.some((pattern) => contentLower.includes(pattern.toLowerCase()))
  }

  return false
}
