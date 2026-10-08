"use client"

import { useEffect, useState } from "react"
import { AdminCarousel } from "@/components/landing/AdminCarousel"
import { AdminMobileCarousel } from "@/components/landing/AdminMobileCarousel"
import { SectionContainer } from "@/components/landing/SectionContainer"
import {
  adminCarouselSlides,
  adminMobileCarouselSlides,
} from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"

const MD_MIN_WIDTH = "(min-width: 768px)"

/**
 * Mobile and desktop carousels used to ship together in the HTML (one hidden with CSS).
 * The first paint keeps only the mobile one; the desktop carousel mounts after hydration when
 * the viewport is md and up, so the initial document stays lighter without a different HTML for crawlers.
 */
export function AdminSection() {
  const [showDesktopCarousel, setShowDesktopCarousel] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(MD_MIN_WIDTH)
    const sync = () => setShowDesktopCarousel(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  return (
    <SectionContainer
      id="admin"
      className="bg-gradient-to-b from-white via-[#E2FEFD] to-white py-16 md:py-20 "
    >
      <div className="space-y-10 md:space-y-12">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="section-title">Gestión rápida y sencilla</h2>
          </BlurFade>
          <BlurFade inView inViewMargin="-80px" delay={0.12}>
            <p className="section-paragraph">
              Gestiona tu carta en segundos, desde cualquier dispositivo
            </p>
          </BlurFade>
        </div>

        <div className="md:hidden">
          <AdminMobileCarousel slides={adminMobileCarouselSlides} />
        </div>

        <div className="hidden md:block">
          {showDesktopCarousel ? (
            <AdminCarousel slides={adminCarouselSlides} />
          ) : (
            <div
              className="mx-auto w-full max-w-6xl px-2 py-6 sm:px-10 md:px-[5rem] md:py-8"
              aria-hidden
            >
              <div className="mb-4 h-6 rounded bg-slate-100/80" />
              <div className="aspect-[958/524] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl" />
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <CTAButton />
        </div>
      </div>
    </SectionContainer>
  )
}
