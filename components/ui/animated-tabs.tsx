"use client" 
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"

type AnimatedTab = {
  label: string
  value?: string
}

export interface AnimatedTabsProps {
  tabs: AnimatedTab[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function AnimatedTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  className,
}: AnimatedTabsProps) {
  const fallback = tabs[0]?.value ?? tabs[0]?.label ?? ""
  const [internalValue, setInternalValue] = useState(defaultValue ?? fallback)
  const activeValue = value ?? internalValue

  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const activeIndex = useMemo(
    () => tabs.findIndex((tab) => (tab.value ?? tab.label) === activeValue),
    [activeValue, tabs]
  )

  useEffect(() => {
    const updateIndicator = () => {
      const rootEl = rootRef.current
      const safeIndex = activeIndex >= 0 ? activeIndex : 0
      const activeEl = tabRefs.current[safeIndex]
      if (!rootEl || !activeEl) return

      const rootRect = rootEl.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()

      setIndicator({
        left: activeRect.left - rootRect.left,
        width: activeRect.width,
      })
    }

    updateIndicator()
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [activeIndex, tabs])

  const handleChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto inline-flex w-fit items-center rounded-full bg-[#D7EEEE] p-1",
        className
      )}
    >
      <span
        className="absolute inset-y-1 z-0 rounded-full bg-white shadow-lg transition-all duration-200 ease-out"
        style={{
          left: indicator.left,
          width: indicator.width,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex items-center gap-1">
        {tabs.map((tab, index) => {
          const tabValue = tab.value ?? tab.label
          const isActive = tabValue === activeValue

          return (
            <button
              key={tabValue}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              onClick={() => handleChange(tabValue)}
              className={cn(
                "h-8 rounded-full px-4 text-sm font-medium transition-colors hover:cursor-pointer",
                isActive ? "text-slate-900" : "plus-darker opacity-70 text-slate-900"
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}