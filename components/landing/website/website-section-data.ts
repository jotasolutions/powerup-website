import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  BookOpen,
  CalendarCheck2,
  Globe,
  Layers,
  LayoutPanelTop,
  MonitorSmartphone,
  Paintbrush2,
  PencilRuler,
} from "lucide-react"

import type { ShowcaseItem } from "@/components/landing/ShowcaseCarousel"

export const websiteHeroContent = {
  title: "Tu restaurante merece una web moderna, bonita y lista en minutos.",
  description:
    "Crea tu sitio web profesional sin diseñadores, sin plugins y sin complicarte.",
  badge: "Incluida gratis con el plan Pro anual de PowerUp.",
}


type BenefitItem = {
  title: string
  description: string
  icon: LucideIcon
  image: string
}

export const websiteBenefits: BenefitItem[] = [
  {
    title: "Diseño moderno y rápido",
    description: "Plantillas limpias y optimizadas para cargar rápido en cualquier dispositivo.",
    icon: Paintbrush2,
    image: "/images/website-feature-sections/feature1.jpeg",
  },
  {
    title: "Carta integrada (sin PDFs)",
    description: "Tu menú digital vive dentro de la web, siempre actualizado y sin archivos sueltos.",
    icon: LayoutPanelTop,
    image: "/images/website-feature-sections/feature2.jpg",
  },
  {
    title: "Páginas ilimitadas",
    description: "Crea todas las páginas que necesites: promos, eventos, menús de temporada y más.",
    icon: Layers,
    image: "/images/website-feature-sections/feature3.jpeg",
  },
  {
    title: "Pantalla de bienvenida",
    description: "Presenta tu restaurante con fotos, textos y un mensaje que conecte con tus clientes.",
    icon: BookOpen,
    image: "/images/website-feature-sections/feature4.jpeg",
  },
  {
    title: "Botón de reservar y llamar",
    description: "Convierte visitas en reservas con acciones directas en los puntos clave de tu web.",
    icon: CalendarCheck2,
    image: "/images/website-feature-sections/feature5.jpeg",
  },
  {
    title: "Dominio propio",
    description: "Publica tu web con la dirección de tu restaurante y refuerza tu marca online.",
    icon: Globe,
    image: "/images/website-feature-sections/feature7.png",
  },
]

export const websiteShowcaseItems: ShowcaseItem[] = [
  {
    src: "/videos/cartas-demo/tropico.mp4",
    image: "/videos/iphone17-sage.png",
  },
  {
    src: "/videos/cartas-demo/1080.mp4",
    image: "/videos/iphone17-black.png",
  },
  {
    src: "/videos/cartas-demo/goyos.mp4",
    image: "/videos/iphone17-white.png",
  },
  {
    src: "/videos/cartas-demo/trattoria.mp4",
    image: "/videos/iphone17-blue.png",
  },
  {
    src: "/videos/cartas-demo/marisa.mp4",
    image: "/videos/iphone17-sage.png",
  },
]

export const websitePagesItems = [
  "Páginas ilimitadas para cualquier campaña",
  "Construye cada página usando bloques",
  "Los botones que quieras: Reservar, llamar, formularios...",
  "Indexadas en Google y en ChatGPT",
] as const

export const websiteAnalyticsItems = [
  "Visitas totales y únicas",
  "Origen del tráfico (Google, Instagram...)",
  "Secciones más visitadas",
  "Reservas hechas desde la web",
] as const

export const websiteWelcomeItems = [
  "Personaliza la portada con tu historia, fotos o mensaje de marca.",
  "Haz que quien te visite entienda en segundos por qué elegir tu restaurante.",
] as const

type ComparisonValue = "yes" | "no" | "warning"

export type WebsiteComparisonRow = {
  feature: string
  wordpress: ComparisonValue
  traditional: ComparisonValue
  powerup: ComparisonValue
}

export const websiteComparisonRows: WebsiteComparisonRow[] = [
  { feature: "Diseño ágil", wordpress: "no", traditional: "warning", powerup: "yes" },
  { feature: "Fácil de editar", wordpress: "warning", traditional: "no", powerup: "yes" },
  { feature: "Coste contenido", wordpress: "no", traditional: "no", powerup: "yes" },
  { feature: "Actualizaciones", wordpress: "warning", traditional: "no", powerup: "yes" },
  { feature: "Analíticas", wordpress: "warning", traditional: "no", powerup: "yes" },
]

type PricingBundleItem = {
  title: string
  description: string
  icon: LucideIcon
}

export const websitePricingMenuItems: PricingBundleItem[] = [
  {
    title: "Fotos y vídeos que convierten",
    description: "Presenta platos y promociones con contenido visual atractivo.",
    icon: MonitorSmartphone,
  },
  {
    title: "Gestión fácil desde móvil",
    description: "Actualiza precios y platos en pocos segundos.",
    icon: PencilRuler,
  },
  {
    title: "Técnicas para vender más",
    description: "Cross-selling, promociones y recomendaciones automáticas.",
    icon: BarChart3,
  },
]

export const websitePricingWebItems: PricingBundleItem[] = [
  {
    title: "Tu web siempre actualizada",
    description: "Sin depender de terceros cada vez que quieras cambiar algo.",
    icon: Globe,
  },
  {
    title: "Páginas para campañas",
    description: "Lanza promos, eventos o menús de temporada con un clic.",
    icon: LayoutPanelTop,
  },
  {
    title: "Botones que convierten",
    description: "Reserva, llamada y formularios integrados en puntos clave.",
    icon: CalendarCheck2,
  },
]
