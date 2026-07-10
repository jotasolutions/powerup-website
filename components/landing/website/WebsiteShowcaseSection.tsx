"use client"

import { ShowcaseCarousel } from "@/components/landing/ShowcaseCarousel"
import { websiteShowcaseItems } from "./website-section-data"

export function WebsiteShowcaseSection() {
  return (
    <ShowcaseCarousel
      sectionId="website-examples"
      sectionClassName="bg-[#f4f4f4]"
      title="Así de bien puede verse la web de tu restaurante"
      items={websiteShowcaseItems}
    />
  )
}
