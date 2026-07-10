export const revealEase = [0.22, 1, 0.36, 1] as const

export const revealViewport = {
  once: true,
  margin: "0px 0px -80px 0px",
} as const

export const textReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
} as const

export const uiSpring = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.4,
}

export const cardStagger = (index: number) => 0.3 * index

export const textStagger = (cardDelay: number, offset: 0.18 | 0.32) =>
  cardDelay + offset

export function motionProps<T extends object>(
  prefersReducedMotion: boolean | null,
  props: T
) {
  return prefersReducedMotion ? ({} as Partial<T>) : props
}
