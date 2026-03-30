import { AdminCarousel } from "@/components/landing/AdminCarousel"
import { SectionContainer } from "@/components/landing/SectionContainer"
import { adminCarouselSlides } from "@/components/landing/section-data"
import { CTAButton } from "../CTAButton"

export function AdminSection() {
  return (
    <SectionContainer
      id="admin"
      className="bg-gradient-to-b from-white via-[#E2FEFD] to-white py-16 md:py-20 "
    >
      <div className="space-y-10 md:space-y-12">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="section-title">Gestión rápida y sencilla</h2>
          <p className="section-paragraph">
            Gestiona tu carta en segundos, desde cualquier dispositivo
          </p>
        </div>

        <AdminCarousel slides={adminCarouselSlides} />
        <div className="flex justify-center">
          <CTAButton />
        </div>
      </div>
    </SectionContainer>
  )
}
