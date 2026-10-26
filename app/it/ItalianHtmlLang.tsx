"use client"

import { useEffect } from "react"

// The root layout renders <html lang="es"> for the whole site; /it fixes it in the browser and
// puts it back when the visitor moves on to a Spanish page.
export function ItalianHtmlLang() {
  useEffect(() => {
    document.documentElement.lang = "it"
    return () => {
      document.documentElement.lang = "es"
    }
  }, [])
  return null
}
