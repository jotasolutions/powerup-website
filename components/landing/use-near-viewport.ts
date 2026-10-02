"use client"

import { useEffect, useState, type RefObject } from "react"

/**
 * True once the element comes within `rootMargin` of the viewport, and it stays true.
 * An element inside a `display: none` parent never counts as near, so content that is hidden
 * at this screen size never loads.
 */
export function useNearViewport(ref: RefObject<Element | null>, rootMargin = "100% 0px") {
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isNear) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        setIsNear(true)
      },
      { rootMargin }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin, isNear])

  return isNear
}
