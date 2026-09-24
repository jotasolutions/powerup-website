"use client"

import dynamic from "next/dynamic"
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import styles from "./advisor-dialog.module.css"

const AdvisorWidget = dynamic(() => import("@/components/AdvisorWidget").then((module) => module.AdvisorWidget), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full max-w-[400px] rounded-xl border border-slate-200 bg-white" />,
})

const OpenAdvisorContext = createContext<() => void>(() => {})

/**
 * One Advisor instance per page, mounted only while the dialog is open: the widget loads
 * Google Maps on mount and uses fixed DOM ids, so it can't be rendered once per card.
 */
export function AdvisorDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openAdvisor = useCallback(() => setOpen(true), [])

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
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto bg-transparent p-0 ring-0 sm:max-w-[400px]">
          <DialogTitle className="sr-only">Analiza tu carta gratis</DialogTitle>
          {open && <AdvisorWidget />}
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
