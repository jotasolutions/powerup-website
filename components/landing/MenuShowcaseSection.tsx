"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import { SectionContainer } from "@/components/landing/SectionContainer"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

const showcaseItems = [
  { src: "/videos/recording1.mp4", url: "https://www.youtube.com/recording1" },
  { src: "/videos/recording2.mp4", url: "https://www.youtube.com/recording2" },
  { src: "/videos/recording3.mp4", url: "https://www.youtube.com/recording3" },
  { src: "/videos/recording4.mp4", url: "https://www.youtube.com/recording4" },
  { src: "/videos/recording4.mp4", url: "https://www.youtube.com/recording4" },
  { src: "/videos/recording4.mp4", url: "https://www.youtube.com/recording4" },
  { src: "/videos/recording4.mp4", url: "https://www.youtube.com/recording4" },
] as const

export function MenuShowcaseSection() {
  const [selectedItem, setSelectedItem] = useState(1)
  const firstSlideIndex = 0
  const lastSlideIndex = showcaseItems.length - 1
  const slideWidth = 251
  const slideGap = 72
  const slideStep = slideWidth + slideGap

  return (
    <SectionContainer>
      <div className="space-y-20 text-center">
        <h2 className="section-title">Esta puede ser tu carta</h2>

        <div className="relative w-full">
          <button
            type="button"
            aria-label="Slide anterior"
            className={cn(
              "absolute left-0 top-1/2 z-30 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 transition-colors",
              selectedItem > firstSlideIndex
                ? "hover:bg-slate-200"
                : "pointer-events-none opacity-40"
            )}
            onClick={() => setSelectedItem((current) => Math.max(firstSlideIndex, current - 1))}
          >
            <ChevronLeft className="size-5 text-slate-700" strokeWidth={2} aria-hidden />
          </button>

          <button
            type="button"
            aria-label="Siguiente slide"
            className={cn(
              "absolute right-0 top-1/2 z-30 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 transition-colors",
              selectedItem < lastSlideIndex
                ? "hover:bg-slate-200"
                : "pointer-events-none opacity-40"
            )}
            onClick={() => setSelectedItem((current) => Math.min(lastSlideIndex, current + 1))}
          >
            <ChevronRight className="size-5 text-slate-700" strokeWidth={2} aria-hidden />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex px-[calc(50%-125.5px)] transition-transform duration-500 ease-out"
              style={{
                gap: `${slideGap}px`,
                transform: `translateX(-${selectedItem * slideStep}px)`,
              }}
            >
              {showcaseItems.map((item, index) => (
                <div key={`${item.src}-${index}`} className="w-[251px] shrink-0 pb-10">
                  <div className="relative aspect-[15/32] w-[251px]">
                    <video
                      className={cn(
                        "absolute inset-y-[10.5%] left-[10%] z-10 h-[80%] w-[80%] rounded-[1.9rem] object-cover transition-all duration-500",
                        index === selectedItem
                          ? "grayscale-0 opacity-100 scale-100"
                          : "grayscale opacity-20 scale-80"
                      )}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={item.src} type="video/mp4" />
                      Tu navegador no soporta el video.
                    </video>
                    <Image
                      src="/videos/iphone17-frame.png"
                      alt="iPhone frame"
                      fill
                      className={cn(
                        "pointer-events-none z-20 object-contain transition-all duration-500",
                        index === selectedItem ? "opacity-100 scale-100" : "opacity-20 scale-80"
                      )}
                      sizes="251px"
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showcaseItems[selectedItem] && (
            <Link href={showcaseItems[selectedItem].url} target="_blank">
              <Button variant="outline">
                Ver carta <ExternalLink className="size-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </SectionContainer>
  )
}
