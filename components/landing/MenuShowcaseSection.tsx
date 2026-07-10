"use client"

import { ANALYTICS_EVENTS } from "@/lib/analytics"
import { ShowcaseCarousel } from "./ShowcaseCarousel"

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
  )
}
