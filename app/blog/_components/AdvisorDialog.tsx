"use client"

import dynamic from "next/dynamic"
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { advisorCopy } from "@/components/advisor-copy"
import { AdvisorPressSeal } from "@/components/landing/AdvisorProof"
import { BorderBeam } from "@/components/landing/BorderBeam"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import styles from "./advisor-dialog.module.css"
import { blogUiCopy } from "@/lib/blog/ui-copy"
import { useLocale } from "@/lib/locale"

const AdvisorWidget = dynamic(() => import("@/components/AdvisorWidget").then((module) => module.AdvisorWidget), {
  ssr: false,
  // Same heights as the home's placeholder (AdvisorSection): the form's first step, 360 to 1440 px wide.
  loading: () => (
    <div className="h-[490.5px] w-full max-w-[400px] rounded-xl border border-slate-200 bg-white min-[372px]:h-[470.5px] min-[470px]:h-[450.5px] sm:h-[510.5px]" />
  ),
})

const OpenAdvisorContext = createContext<() => void>(() => {})

/**
 * One Advisor instance per page, mounted only while the dialog is open: the widget loads
 * Google Maps on mount and uses fixed DOM ids, so it can't be rendered once per card.
 */
export function AdvisorDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openAdvisor = useCallback(() => setOpen(true), [])
  const locale = useLocale()
  const copy = blogUiCopy[locale]

  useEffect(() => {
    if (!open) return
    document.body.classList.add(styles.advisorOpen)
    return () => document.body.classList.remove(styles.advisorOpen)
  }, [open])

  return (
    <OpenAdvisorContext.Provider value={openAdvisor}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(nextOpen, details) => {
          const target = details.event?.target
          if (!nextOpen && target instanceof Element && target.closest(".pac-container")) {
            details.cancel()
            return
          }
          setOpen(nextOpen)
        }}
      >
        {/* As on the home: the green light around the form and the press seal under it. */}
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-3 overflow-y-auto bg-transparent p-0 ring-0 sm:max-w-[404px]">
          <DialogTitle className="sr-only">{copy.advisorDialogTitle}</DialogTitle>
          {open && (
            <>
              <BorderBeam>
                <AdvisorWidget />
              </BorderBeam>
              <AdvisorPressSeal label={advisorCopy[locale].section.pressLabel} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </OpenAdvisorContext.Provider>
  )
}

export function AdvisorTrigger({ className, children }: { className?: string; children: ReactNode }) {
  const openAdvisor = useContext(OpenAdvisorContext)
  return (
    <button
      type="button"
      onClick={openAdvisor}
      className={className}
      {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, { label: "advisor", location: "blog" })}
    >
      {children}
    </button>
  )
}
