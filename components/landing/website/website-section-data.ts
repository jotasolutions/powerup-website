import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  CalendarCheck2,
  Globe,
  LayoutPanelTop,
  MonitorSmartphone,
  Paintbrush2,
  PencilRuler,
  SearchCheck,
  ShieldCheck,
  Smartphone,
} from "lucide-react"

import type { ShowcaseItem } from "@/components/landing/ShowcaseCarousel"

export const websiteHeroContent = {
  title: "Tu restaurante merece una web moderna, bonita y lista en minutos.",
  description:
    "La mejor forma de atraer clientes, vender más y dar una imagen profesional.",
  badge: "Incluida gratis con el plan Pro anual de PowerUp.",
}

export const websitePainPoints = [
  "Web lenta o desactualizada",
  "Difícil de modificar",
  "No funciona bien en móviles",
  "Diseño antiguo que no refleja tu marca",
] as const

type BenefitItem = {
  title: string
  description: string
  icon: LucideIcon
}

export const websiteBenefitsLeft: BenefitItem[] = [
  {
    title: "Diseño moderno y rápido",
    description: "Plantillas limpias y optimizadas para cargar rápido.",
    icon: Paintbrush2,
  },
  {
    title: "Menú digital actualizado",
    description: "Tu carta y tu web siempre alineadas sin trabajo duplicado.",
    icon: LayoutPanelTop,
  },
  {
    title: "Adaptado a móviles",
    description: "Se ve perfecto en móvil, tablet y ordenador desde el primer día.",
    icon: Smartphone,
  },
]

export const websiteBenefitsRight: BenefitItem[] = [
  {
    title: "Gestión sencilla de reservas",
    description: "Añade botones de reservar, llamar o WhatsApp en segundos.",
    icon: CalendarCheck2,
  },
  {
    title: "SEO para restaurantes",
    description: "Estructura pensada para aparecer mejor en Google y mapas.",
    icon: SearchCheck,
  },
  {
    title: "Soporte y actualizaciones",
    description: "Mejoras constantes sin depender de agencias externas.",
    icon: ShieldCheck,
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
  "Página de inicio, carta y contacto",
  "Información de ubicación y horarios",
  "Formulario de reserva integrado",
  "Enlace a redes sociales",
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
