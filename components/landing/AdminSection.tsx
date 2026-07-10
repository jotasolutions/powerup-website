import { AdminCarousel } from "@/components/landing/AdminCarousel"
import { AdminMobileCarousel } from "@/components/landing/AdminMobileCarousel"
import { SectionContainer } from "@/components/landing/SectionContainer"
import {
  adminCarouselSlides,
  adminMobileCarouselSlides,
} from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"

export function AdminSection() {
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
          <AdminCarousel slides={adminCarouselSlides} />
        </div>
        <div className="flex justify-center">
          <CTAButton />
        </div>
      </div>
    </SectionContainer>
  )
}
