"use client"

import { cn } from "@/lib/utils"
import { animate, motion, useReducedMotion } from "motion/react"
import Image from "next/image"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

const WIDGETS = [
  {
    src: "/images/website-button-1.png",
    alt: "Widget botón de reseñas",
    className: "top-[33%] left-[10%]",
  },
  {
    src: "/images/website-button-4.png",
    alt: "Widget redes sociales",
    className: "top-[20%] right-[3%]",
  },
  {
    src: "/images/website-button-2.png",
    alt: "Widget cómo llegar",
    className: "bottom-[10%] left-[10%]",
  },
  {
    src: "/images/website-button-3.png",
    alt: "Widget horario de apertura",
    className: "bottom-[20%] right-[10%]",
  },
] as const

type Point = { x: number; y: number }

type Geometry = {
  widgets: Point[]
  center: Point
}

const HAND_GRAB_OFFSET = { x: 14, y: -10 }

/** At rest widgets sit flat; they tilt only while the hand drags them. */
const REST_ROTATE_DEG = 0
const DRAG_ROTATE_DEG = 8

export function WebsiteWidgetsMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const widget0Ref = useRef<HTMLDivElement>(null)
  const widget1Ref = useRef<HTMLDivElement>(null)
  const widget2Ref = useRef<HTMLDivElement>(null)
  const widget3Ref = useRef<HTMLDivElement>(null)
  const widgetRefs = useMemo(
    () => [widget0Ref, widget1Ref, widget2Ref, widget3Ref] as const,
    [],
  )
  const handRef = useRef<HTMLDivElement>(null)
  const [geometry, setGeometry] = useState<Geometry | null>(null)
  const reduceMotion = useReducedMotion()

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const cr = container.getBoundingClientRect()
    if (cr.width < 16 || cr.height < 16) return

    const widgets: Point[] = widgetRefs.map((ref) => {
      const el = ref.current
      if (!el) return { x: cr.width / 2, y: cr.height / 2 }
      const r = el.getBoundingClientRect()
      return {
        x: r.left - cr.left + r.width / 2,
        y: r.top - cr.top + r.height / 2,
      }
    })

    const center = {
      x: cr.width * 0.5,
      y: cr.height * 0.44,
    }

    setGeometry({ widgets, center })
  }, [widgetRefs])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  useEffect(() => {
    if (reduceMotion || !geometry) return

    const { widgets: wpos, center } = geometry

    const widgets = widgetRefs.map((r) => r.current).filter(Boolean) as HTMLDivElement[]
    const hand = handRef.current
    if (!hand || widgets.length !== 4) return

    let cancelled = false
    let pauseTimer: ReturnType<typeof setTimeout> | undefined

    const easeOut = [0.22, 1, 0.36, 1] as const
    const easeDrag = [0.4, 0, 0.2, 1] as const

    async function loop() {
      while (!cancelled) {
        await animate(hand, { opacity: 0 }, { duration: 0.15 })

        await Promise.all(
          widgets.map((w) =>
            animate(
              w,
              {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                rotate: REST_ROTATE_DEG,
              },
              { duration: 0.35, ease: easeOut },
            ),
          ),
        )

        for (let i = 0; i < 4; i++) {
          if (cancelled) return

          const w = widgets[i]
          const start = wpos[i]
          const dx = center.x - start.x
          const dy = center.y - start.y

          const grabX = start.x + HAND_GRAB_OFFSET.x
          const grabY = start.y + HAND_GRAB_OFFSET.y

          await animate(
            hand,
            {
              opacity: 1,
              left: grabX,
              top: grabY,
            },
            { duration: 0.38, ease: easeOut },
          )

          if (cancelled) return

          await Promise.all([
            animate(
              w,
              { x: dx, y: dy, rotate: DRAG_ROTATE_DEG },
              { duration: 0.62, ease: easeDrag },
            ),
            animate(
              hand,
              {
                left: grabX + dx,
                top: grabY + dy,
              },
              { duration: 0.62, ease: easeDrag },
            ),
          ])

          if (cancelled) return

          await animate(
            w,
            { opacity: 0, scale: 0.42 },
            { duration: 0.22, ease: "easeIn" },
          )

          await animate(
            w,
            {
              x: 0,
              y: 0,
              opacity: 0,
              scale: 1,
              rotate: REST_ROTATE_DEG,
            },
            { duration: 0 },
          )
        }

        await new Promise<void>((resolve) => {
          pauseTimer = setTimeout(() => {
            pauseTimer = undefined
            resolve()
          }, 520)
        })
      }
    }

    loop()

    return () => {
      cancelled = true
      if (pauseTimer) clearTimeout(pauseTimer)
    }
  }, [geometry, reduceMotion, widgetRefs])

  return (
    <div ref={containerRef} className="relative mx-auto w-full">
      <Image
        src="/images/tropico-website-mockup.png"
        alt="Vista previa de la página web tipo linktree para restaurante"
        width={1500}
        height={1500}
        className="relative z-20 mx-auto h-auto w-full scale-120 object-contain"
        onLoad={measure}
        priority
      />

      {WIDGETS.map((w, i) => (
        <motion.div
          key={w.src}
          ref={widgetRefs[i]}
          className={cn(
            "absolute z-30 w-[132px] rounded-lg shadow-xl",
            w.className,
          )}
          initial={{ rotate: REST_ROTATE_DEG, opacity: 1, x: 0, y: 0 }}
          style={{ x: 0, y: 0 }}
        >
          <Image
            src={w.src}
            alt={w.alt}
            width={200}
            height={200}
            className="h-auto w-full rounded-lg object-contain"
            onLoad={measure}
          />
        </motion.div>
      ))}

      {!reduceMotion && (
        <motion.div
          ref={handRef}
          className="pointer-events-none absolute left-0 top-0 z-40 w-[36px] -translate-x-1/2 -translate-y-1/2"
          initial={false}
          style={{
            left: 0,
            top: 0,
            opacity: 0,
          }}
          aria-hidden
        >
          <Image
            src="/images/drag-hand.png"
            alt=""
            width={60}
            height={60}
            className="h-auto w-full object-contain drop-shadow-md scale-70"
          />
        </motion.div>
      )}
    </div>
  )
}
