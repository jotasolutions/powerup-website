"use client"

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react"
import type { LottieComponentProps } from "lottie-react"
import { useNearViewport } from "./use-near-viewport"

export type LottieAnimation = {
  load: () => Promise<{ default: unknown }>
  /** The animation's own width / height (its `w` and `h`), so its box has the right size before it loads. */
  ratio: number
}

type LazyLottieProps = Omit<LottieComponentProps, "animationData" | "className" | "style"> & {
  animation: LottieAnimation
  className?: string
  style?: CSSProperties
}

type Loaded = { Lottie: ComponentType<LottieComponentProps>; animationData: unknown }

/**
 * Lottie that downloads the library and its animation only when its box gets within a screen of
 * the viewport. Until then an empty box with the animation's proportions holds its place, so nothing
 * moves when it arrives; then it renders exactly what `<Lottie>` rendered before.
 * Pass `onDOMLoaded` to know when `lottieRef` can play it.
 */
export function LazyLottie({ animation, className, style, ...lottieProps }: LazyLottieProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const isNear = useNearViewport(boxRef)
  const [loaded, setLoaded] = useState<Loaded | null>(null)

  useEffect(() => {
    if (!isNear) return
    let cancelled = false
    Promise.all([import("lottie-react"), animation.load()])
      .then(([lottie, data]) => {
        if (!cancelled) setLoaded({ Lottie: lottie.default, animationData: data.default })
      })
      // Without the animation the box just stays empty.
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [isNear, animation])

  if (!loaded) {
    return <div ref={boxRef} className={className} style={{ aspectRatio: animation.ratio, ...style }} />
  }
  return <loaded.Lottie {...lottieProps} animationData={loaded.animationData} className={className} style={style} />
}
