"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

import type { AdminCarouselSlide } from "@/components/landing/section-data"
import { cn } from "@/lib/utils"
import { LazyVideo } from "./LazyVideo"
import { useNearViewport } from "./use-near-viewport"

type AdminCarouselProps = {
  slides: readonly AdminCarouselSlide[]
}

export function AdminCarousel({ slides }: AdminCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Near the screen, every slide fetches its first frame, so the next one never slides in empty.
  // Only the visible slide's video plays (LazyVideo).
  const isNear = useNearViewport(containerRef)

  return (
    <div ref={containerRef} className="admin-carousel mx-auto w-full max-w-6xl">
      <Carousel
        showArrows
        showStatus={false}
        autoPlay
        interval={7000}
        infiniteLoop
        swipeable
        showThumbs={false}
        useKeyboardArrows
        emulateTouch
        dynamicHeight={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <button
            type="button"
            aria-label={label}
            className={cn(
              "control-arrow control-prev inline-flex items-center justify-center",
              !hasPrev && "control-disabled"
            )}
            onClick={onClickHandler}
          >
            <ChevronLeft
              className="size-5 text-slate-700 md:size-6"
              strokeWidth={2}
              aria-hidden
            />
          </button>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <button
            type="button"
            aria-label={label}
            className={cn(
              "control-arrow control-next inline-flex items-center justify-center",
              !hasNext && "control-disabled"
            )}
            onClick={onClickHandler}
          >
            <ChevronRight
              className="size-5 text-slate-700 md:size-6"
              strokeWidth={2}
              aria-hidden
            />
          </button>
        )}
      >
        {slides.map((slide) => (
          <div key={slide.src} className="space-y-4 px-2 py-6 sm:px-10 md:px-[5rem] md:py-8">
            <h3 className="text-base font-medium text-slate-900">{slide.title}</h3>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl ">
             
              <LazyVideo
                src={slide.src}
                width={slide.width}
                height={slide.height}
                style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
                preloadFirstFrame={isNear}
              >
                Your browser does not support the video tag.
              </LazyVideo>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
