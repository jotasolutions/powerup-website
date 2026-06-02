"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { BlurFade } from "../ui/blur-fade"

const showcaseItems = [
  {
    src: "/videos/recording1.mp4",
    url: "https://www.youtube.com/recording1",
    image: "/videos/iphone17-black.png"
  },
  {
    src: "/videos/recording2.mp4",
    url: "https://www.youtube.com/recording2",
    image: "/videos/iphone17-sage.png"
  },
  {
    src: "/videos/recording3.mp4",
    url: "https://www.youtube.com/recording3",
    image: "/videos/iphone17-blue.png"
  },
  {
    src: "/videos/recording3.mp4",
    url: "https://www.youtube.com/recording3",
    image: "/videos/iphone17-sage.png"
  },
  {
    src: "/videos/recording3.mp4",
    url: "https://www.youtube.com/recording3",
    image: "/videos/iphone17-black.png"
  },
] as const

export function MenuShowcaseSection() {
  const [selectedItem, setSelectedItem] = useState(1)
  const touchStartX = useRef<number | null>(null)
  const firstSlideIndex = 0
  const lastSlideIndex = showcaseItems.length - 1
  const slideWidth = 251
  const slideGap = 72
  const slideStep = slideWidth + slideGap
  const swipeThreshold = 40

  const goPrev = () => setSelectedItem((current) => Math.max(firstSlideIndex, current - 1))
  const goNext = () => setSelectedItem((current) => Math.min(lastSlideIndex, current + 1))

  return (
    <SectionContainer>
      <div className="space-y-10 text-center sm:space-y-14 md:space-y-20">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title">Esta puede ser tu carta</h2>
        </BlurFade>

        <div className="relative w-full px-2 sm:px-6">
          <button
            type="button"
            aria-label="Slide anterior"
            className={cn(
              "absolute left-0 top-1/2 z-30 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 transition-colors sm:size-10",
              selectedItem > firstSlideIndex
                ? "hover:bg-slate-200"
                : "pointer-events-none opacity-40"
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
              selectedItem < lastSlideIndex
                ? "hover:bg-slate-200"
                : "pointer-events-none opacity-40"
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
              {showcaseItems.map((item, index) => (
                <div key={`${item.src}-${index}`} className="w-[251px] shrink-0 pb-8 sm:pb-10">
                  <div className="relative aspect-[15/32] w-[251px]">
                    {/**
                     * Keep only current and adjacent slides warm to reduce decoding work.
                     */}
                    {(() => {
                      const distanceFromActive = Math.abs(index - selectedItem)
                      const isActive = distanceFromActive === 0
                      const isNearActive = distanceFromActive <= 1

                      return (
                        <>
                          <video
                            className={cn(
                              "absolute inset-y-[10.5%] left-[10%] z-10 h-[80%] w-[80%] rounded-[1.9rem] object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              isActive ? "grayscale-0 opacity-100 scale-100" : "grayscale opacity-35 scale-80"
                            )}
                            autoPlay={isActive}
                            muted
                            loop
                            playsInline
                            preload={isNearActive ? "metadata" : "none"}
                          >
                            <source src={item.src} type="video/mp4" />
                            Tu navegador no soporta el video.
                          </video>
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
                        </>
                      )
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showcaseItems[selectedItem] && (
            <Link href={showcaseItems[selectedItem].url} target="_blank">
              <Button variant="outline" className="mt-3">
                Ver carta <ExternalLink className="size-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </SectionContainer>
  )
}
