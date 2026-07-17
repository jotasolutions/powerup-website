"use client"

import { ANALYTICS_EVENTS } from "@/lib/analytics"
import { ShowcaseCarousel } from "./ShowcaseCarousel"
import { SectionContainer } from "./SectionContainer"
import { BlurFade } from "@/components/ui/blur-fade"

const showcaseItems = [
  {
    src: "/videos/cartas-demo/1080.mp4",
    url: "https://carta.powerup.menu/1018-pizza-las-rozas?utm_source=homepage",
    image: "/videos/iphone17-sage.png"
  },
  {
    src: "/videos/cartas-demo/arau.mp4",
    url: "https://carta.powerup.menu/arau-grilled-brunch?utm_source=homepage",
    image: "/videos/iphone17-black.png"
  },
  {
    src: "/videos/cartas-demo/casa-mediterrania.mp4",
    url: "https://carta.powerup.menu/casa-mediterrania?utm_source=homepage",
    image: "/videos/iphone17-black.png"
  },
  {
    src: "/videos/cartas-demo/chipa.mp4",
    url: "https://carta.powerup.menu/empanadas-chipa?utm_source=homepage",
    image: "/videos/iphone17-black.png"
  },
  {
    src: "/videos/cartas-demo/goyos.mp4",
    url: "https://carta.powerup.menu/restaurante-goyos?utm_source=homepage",
    image: "/videos/iphone17-sage.png"
  },
  {
    src: "/videos/cartas-demo/marisa.mp4",
    url: "https://carta.powerup.menu/taberna-marisa?utm_source=homepage",
    image: "/videos/iphone17-white.png"
  },
  {
    src: "/videos/cartas-demo/rinconcito.mp4",
    url: "https://carta.powerup.menu/restaurante-el-rinconcito-de-doa-juanita?utm_source=homepage",
    image: "/videos/iphone17-sage.png"
  },
  {
    src: "/videos/cartas-demo/trattoria.mp4",
    url: "https://carta.powerup.menu/trattoria-piemontese?utm_source=homepage",
    image: "/videos/iphone17-black.png"
  },
  {
    src: "/videos/cartas-demo/tropico.mp4",
    url: "https://carta.powerup.menu/trpico-brunch-barcelona-balmes?utm_source=homepage",
    image: "/videos/iphone17-sage.png"
  },
] as const

export function MenuShowcaseSection() {
  return (
    <SectionContainer id="menu-showcase" className="bg-gradient-to-b from-white via-[#E2FEFD]  to-white">
      <div className="space-y-10 text-center sm:space-y-14 md:space-y-20">
        <BlurFade inView inViewMargin="-80px">
          <h2 className="section-title text-2xl md:text-3xl lg:text-4xl max-w-lg mx-auto">
            Esta puede ser tu carta
          </h2>
        </BlurFade>
        <ShowcaseCarousel
          sectionId="menu-showcase"
          title="Esta puede ser tu carta"
          items={showcaseItems}
          ctaLabel="Ver carta"
          slideTracking={{
            eventName: ANALYTICS_EVENTS.MENU_SHOWCASE_SLIDE,
            location: "menu_showcase",
            urlParamName: "menu_url",
          }}
          ctaTracking={{
            eventName: ANALYTICS_EVENTS.MENU_SHOWCASE_CLICK,
            location: "menu_showcase",
            label: "Ver carta",
          }}
        />
      </div>
    </SectionContainer>
  )
}
