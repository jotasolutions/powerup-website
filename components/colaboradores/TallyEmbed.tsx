"use client"

import { useEffect, useRef } from "react"

// Tally fills its hidden fields from the URL of the embed, so the ad's UTMs are copied from this
// page's URL to the form's. Tally's script then resizes the iframe to the form's height.
const PASSED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"]
const EMBED_SCRIPT = "https://tally.so/widgets/embed.js"

type TallyWindow = Window & { Tally?: { loadEmbeds: () => void } }

export function TallyEmbed({ formId, title }: { formId: string; title: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const params = new URLSearchParams({
      alignLeft: "1",
      hideTitle: "1",
      transparentBackground: "1",
      dynamicHeight: "1",
    })
    const pageParams = new URLSearchParams(window.location.search)
    for (const key of PASSED_PARAMS) {
      const value = pageParams.get(key)
      if (value) params.set(key, value)
    }
    const src = `https://tally.so/embed/${formId}?${params.toString()}`
    iframe.dataset.tallySrc = src

    const tallyWindow = window as TallyWindow
    if (tallyWindow.Tally) {
      tallyWindow.Tally.loadEmbeds()
      return
    }
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return
    const script = document.createElement("script")
    script.src = EMBED_SCRIPT
    script.async = true
    // If the script fails to load, the form still shows, just with a fixed height.
    script.onload = () => tallyWindow.Tally?.loadEmbeds()
    script.onerror = () => {
      iframe.src = src
    }
    document.body.appendChild(script)
  }, [formId])

  return (
    <iframe
      ref={iframeRef}
      loading="lazy"
      width="100%"
      height="900"
      title={title}
      className="w-full border-0"
    />
  )
}
