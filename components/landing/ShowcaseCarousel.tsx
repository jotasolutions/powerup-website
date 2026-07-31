"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { ANALYTICS_EVENTS, trackAttrs, trackEvent, type AnalyticsEventName } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { BlurFade } from "../ui/blur-fade"
import { Button } from "../ui/button"

export type ShowcaseItem = {
  src: string
  image: string
  url?: string
}

type ShowcaseCarouselProps = {
  sectionId: string
  title: string
  items: readonly ShowcaseItem[]
  sectionClassName?: string
  ctaLabel?: string
  slideTracking?: {
    eventName?: AnalyticsEventName
    location: string
    urlParamName?: string
  }
  ctaTracking?: {
    eventName?: AnalyticsEventName
    location: string
    label: string
  }
}

export function ShowcaseCarousel({
  sectionId,
  title,
  items,
  sectionClassName,
  ctaLabel,
  slideTracking,
  ctaTracking,
}: ShowcaseCarouselProps) {
  const [selectedItem, setSelectedItem] = useState(1)
  const touchStartX = useRef<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const firstSlideIndex = 0
  const lastSlideIndex = items.length - 1
  const slideWidth = 251
  const slideGap = 72
  const slideStep = slideWidth + slideGap
  const swipeThreshold = 40

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      void video?.play()
    })
  }, [])

  useEffect(() => {
    if (!slideTracking) return

    const item = items[selectedItem]
    if (!item) return

    const urlParamName = slideTracking.urlParamName ?? "item_url"
    trackEvent(slideTracking.eventName ?? ANALYTICS_EVENTS.MENU_SHOWCASE_SLIDE, {
      slide_index: selectedItem,
      location: slideTracking.location,
      [urlParamName]: item.url,
    })
  }, [items, selectedItem, slideTracking])

  const goPrev = () => setSelectedItem((current) => Math.max(firstSlideIndex, current - 1))
  const goNext = () => setSelectedItem((current) => Math.min(lastSlideIndex, current + 1))

  return (


    <div className="relative w-full px-2 sm:px-6">
      <button
        type="button"
        aria-label="Slide anterior"
        className={cn(
          "absolute left-0 top-1/2 z-30 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 transition-colors sm:size-10",
          selectedItem > firstSlideIndex ? "hover:bg-slate-200" : "pointer-events-none opacity-40"
        )}
        onClick={goPrev}
      >
        <ChevronLeft className="size-5 text-slate-700" strokeWidth={2} aria-hidden />
      </button>

      <button
        type="button"
        aria-label="Siguiente slide"
        className={cn(
          "absolute right-0 top-1/2 z-30 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 transition-colors sm:size-10",
          selectedItem < lastSlideIndex ? "hover:bg-slate-200" : "pointer-events-none opacity-40"
        )}
        onClick={goNext}
      >
        <ChevronRight className="size-5 text-slate-700" strokeWidth={2} aria-hidden />
      </button>

      <div
        className="overflow-hidden"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return

          const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current
          const deltaX = touchStartX.current - touchEndX
          touchStartX.current = null

          if (Math.abs(deltaX) < swipeThreshold) return
          if (deltaX > 0) goNext()
          if (deltaX < 0) goPrev()
        }}
      >
        <div
          className="flex px-[calc(50%-125.5px)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            gap: `${slideGap}px`,
            transform: `translateX(-${selectedItem * slideStep}px)`,
          }}
        >
          {items.map((item, index) => {
            const isActive = index === selectedItem
            const isVideo = /\.mp4($|\?)/i.test(item.src)
            const mediaClassName = cn(
              "absolute inset-y-[10%] left-[10%] z-10 h-[80%] w-[80%] rounded-[1.9rem] object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isActive ? "grayscale-0 opacity-100 scale-100" : "grayscale opacity-35 scale-80"
            )

            return (
              <div key={`${item.src}-${index}`} className="w-[251px] shrink-0 pb-8 sm:pb-10">
                <div className="relative aspect-[15/32] w-[251px]">
                  {isVideo ? (
                    <video
                      ref={(element) => {
                        videoRefs.current[index] = element
                      }}
                      className={mediaClassName}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={item.src} type="video/mp4" />
                      Tu navegador no soporta el video.
                    </video>
                  ) : (
                    <Image
                      src={item.src}
                      alt="Ejemplo de web de restaurante"
                      width={201}
                      height={434}
                      className={mediaClassName}
                      sizes="201px"
                      priority={isActive}
                    />
                  )}
                  <Image
                    src={item.image}
                    alt="iPhone frame"
                    fill
                    className={cn(
                      "pointer-events-none z-20 object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive ? "opacity-100 scale-100" : "opacity-35 scale-80"
                    )}
                    sizes="251px"
                    priority={isActive}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {items[selectedItem]?.url && ctaLabel ? (
        <Link
          href={items[selectedItem].url}
          target="_blank"
          rel="noopener noreferrer"
          {...trackAttrs(ctaTracking?.eventName ?? ANALYTICS_EVENTS.OUTBOUND_CLICK, {
            label: ctaTracking?.label ?? ctaLabel,
            location: ctaTracking?.location,
            linkUrl: items[selectedItem].url,
          })}
        >
          <Button variant="outline" className="mt-3">
            {ctaLabel} <ExternalLink className="size-4" />
          </Button>
        </Link>
      ) : null}
    </div>

  )
}
