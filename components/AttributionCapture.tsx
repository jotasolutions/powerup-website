"use client"

import { captureAttributionFromSearch } from "@/lib/attribution"
import { useEffect } from "react"

export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromSearch(window.location.search)
  }, [])

  return null
}
