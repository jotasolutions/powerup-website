import { usePathname } from "next/navigation"

export type Locale = "es" | "it"

/** Pages under /it are in Italian; the rest of the site is in Spanish. */
export function localeFromPath(pathname: string | null): Locale {
  return pathname === "/it" || pathname?.startsWith("/it/") ? "it" : "es"
}

/** For client components: the language of the page they're rendered on. */
export function useLocale(): Locale {
  return localeFromPath(usePathname())
}
