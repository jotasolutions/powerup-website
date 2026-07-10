export type PricingFeatureIcon =
  | "calendar"
  | "link"
  | "book-open"
  | "plus"
  | "tag"
  | "languages"
  | "layout"
  | "video"
  | "calendar-check"
  | "box"
  | "users"
  | "globe"
  | "bar-chart"
  | "file-text"
  | "map-pin"
  | "headphones"
  | "pencil"
  | "upload"
  | "qr-code"
  | "smartphone"
  | "clock"
  | "mail"

export type PricingPlanFeatureItem = {
  title: string
  description: string
  icon: PricingFeatureIcon
}

export type PricingProIconVariant = "sell" | "professional" | "analytics"

export type PricingProFeatureItem = PricingPlanFeatureItem

export type PricingProFeatureGroup = {
  title: string
  description: string
  iconVariant: PricingProIconVariant
  bordered?: boolean
  items: PricingProFeatureItem[]
}

export type PricingValueCard = {
  title: string
  description: string
  imageUrl: string
  imageBottom?: boolean
  imageWide?: boolean
  className?: string
}

export type ComparisonCell =
  | { type: "yes" }
  | { type: "no" }
  | { type: "text"; value: string }

export type ComparisonRow = {
  feature: string
  pro: ComparisonCell
  free: ComparisonCell
}

export const pricingTrialSteps = [
  { step: "1", label: "Regístrate y crea tu carta" },
  { step: "2", label: "Disfruta un mes del plan Pro" },
] as const

export const pricingTrialChoices = [
  { step: "A", label: "Suscríbete para no perder funciones" },
  { step: "B", label: "Sigue con el plan gratis" },
] as const

export const pricingTrialBullets = [
  "Sin introducir tarjeta",
  "Te cargamos nosotros los platos",
  "Carta lista para usar en 24h",
] as const

export const pricingFreeIncludes: PricingPlanFeatureItem[] = [
  {
    title: "Carta digital básica",
    description: "Tu menú online, moderno y editable desde cualquier lugar.",
    icon: "layout",
  },
  {
    title: "Gestión en tiempo real",
    description: "Cambia precios, platos y disponibilidad al momento.",
    icon: "pencil",
  },
  {
    title: "Hasta 3 idiomas",
    description: "Llega a turistas con traducciones automáticas.",
    icon: "languages",
  },
  {
    title: "Analíticas básicas",
    description: "Consulta visitas y uso general de tu carta.",
    icon: "bar-chart",
  },
  {
    title: "Importación rápida",
    description: "Sube PDF, fotos o importa desde Uber Eats y Just Eat.",
    icon: "upload",
  },
  {
    title: "QR listo para imprimir",
    description: "Genera códigos QR para mesas y cartelería.",
    icon: "qr-code",
  },
  {
    title: "Edición desde móvil",
    description: "Gestiona tu carta desde el panel en cualquier dispositivo.",
    icon: "smartphone",
  },
  {
    title: "Carta lista en 24h",
    description: "Te ayudamos a montarla si tu caso es más complejo.",
    icon: "clock",
  },
  {
    title: "Sin permanencia",
    description: "Gratis para siempre, sin compromiso ni tarjeta.",
    icon: "tag",
  },
  {
    title: "Soporte por email",
    description: "Resolvemos tus dudas cuando las necesites.",
    icon: "mail",
  },
]

export const pricingProGroups: PricingProFeatureGroup[] = [
  {
    title: "Vende más y atrae más clientes",
    description:
      "Herramientas para aumentar el ticket medio, destacar promociones y llegar a más comensales.",
    iconVariant: "sell",
    bordered: true,
    items: [
      {
        title: "Programar platos y secciones",
        description: "Activa ofertas por horario, día o stock sin reimprimir la carta.",
        icon: "calendar",
      },
      {
        title: "Venta cruzada",
        description: "Recomienda maridajes y acompañamientos mientras el cliente decide.",
        icon: "link",
      },
      {
        title: "Menús cerrados",
        description: "Presenta menús del día y opciones cerradas con claridad y orden.",
        icon: "book-open",
      },
      {
        title: "Ingredientes extra",
        description: "Añade suplementos y extras directamente en la carta para vender más.",
        icon: "plus",
      },
      {
        title: "Promociones",
        description: "Destaca platos, campañas y ofertas en el momento clave de la visita.",
        icon: "tag",
      },
      {
        title: "Multi idioma",
        description: "Tu carta en varios idiomas para que cada cliente entienda al instante.",
        icon: "languages",
      },
    ],
  },
  {
    title: "Una experiencia mucho más profesional",
    description:
      "Diseño, contenido y funciones premium para que tu carta transmita la calidad de tu local.",
    iconVariant: "professional",
    items: [
      {
        title: "Pantalla de bienvenida",
        description: "Recibe al comensal con una primera impresión cuidada y coherente con tu marca.",
        icon: "layout",
      },
      {
        title: "Videos de platos",
        description: "Muestra tus platos en movimiento para despertar más apetito y confianza.",
        icon: "video",
      },
      {
        title: "Botón de reservas",
        description: "Facilita que reserven mesa sin salir de la carta digital.",
        icon: "calendar-check",
      },
      {
        title: "Realidad aumentada",
        description: "Deja que vean los platos en 3D sobre la mesa antes de pedir.",
        icon: "box",
      },
      {
        title: "Sección equipo",
        description: "Presenta a tu equipo y refuerza la confianza en tu restaurante.",
        icon: "users",
      },
      {
        title: "Página web incluida (solo plan anual)",
        description: "Tu web profesional, autogestionable y siempre alineada con tu carta.",
        icon: "globe",
      },
    ],
  },
  {
    title: "Datos y rendimiento del restaurante",
    description:
      "Métricas claras e informes accionables para mejorar tu carta semana a semana.",
    iconVariant: "analytics",
    items: [
      {
        title: "Analíticas avanzadas",
        description: "Descubre qué platos miran más, cuánto tiempo pasan y qué se ignora.",
        icon: "bar-chart",
      },
      {
        title: "Informes semanales",
        description: "Recibe recomendaciones concretas para priorizar mejoras cada semana.",
        icon: "file-text",
      },
      {
        title: "Conecta tu menú a Google Maps",
        description: "Mantén tu carta sincronizada con la ficha donde te buscan.",
        icon: "map-pin",
      },
      {
        title: "Soporte prioritario",
        description: "Resolvemos tus dudas con prioridad cuando más lo necesitas.",
        icon: "headphones",
      },
    ],
  },
]

export const pricingValueCards: PricingValueCard[] = [
  {
    title: "Aumentas tus ventas sin esfuerzo",
    description:
      "Maridajes, extras y promociones trabajan solos mientras el cliente decide qué pedir.",
    imageUrl: "/images/features/features-bento-4.png",
    imageWide: true,
    className: "md:col-span-2",
  },
  {
    title: "Entiendes mejor a tu público",
    description:
      "Descubre qué platos miran, cuánto tiempo pasan en la carta y qué se ignora.",
    imageUrl: "/images/features/features-bento-1.png",
    className: "md:col-span-2",
  },
  {
    title: "Cuesta menos de un café al día",
    description:
      "Un plan Pro que se amortiza con pocos extras o maridajes vendidos al mes.",
    imageUrl: "/images/features/features-bento-3.png",
    className: "md:col-span-2",
  },
  {
    title: "Atraes más clientes desde Google",
    description:
      "Mantén tu carta y ficha alineadas con lo que buscan en Maps y en la web.",
    imageUrl: "/images/features/features-bento-5.png",
    imageBottom: true,
    imageWide: true,
    className: "md:col-span-3",
  },
  {
    title: "Tu carta se ve profesional y moderna",
    description:
      "Colores, tipografías y bloques que encajan con la imagen de tu restaurante.",
    imageUrl: "/images/features/features-bento-2.png",
    imageBottom: true,
    className: "md:col-span-3",
  },
]

export const pricingComparisonRows: ComparisonRow[] = [
  { feature: "Carta digital", pro: { type: "yes" }, free: { type: "yes" } },
  { feature: "Promociones", pro: { type: "yes" }, free: { type: "no" } },
  { feature: "Venta cruzada", pro: { type: "yes" }, free: { type: "no" } },
  { feature: "Idiomas", pro: { type: "text", value: "Ilimitados" }, free: { type: "text", value: "Hasta 3" } },
  { feature: "Menús cerrados", pro: { type: "yes" }, free: { type: "no" } },
  { feature: "Pantalla de bienvenida", pro: { type: "yes" }, free: { type: "no" } },
  { feature: "Analíticas", pro: { type: "text", value: "Avanzadas" }, free: { type: "text", value: "Básicas" } },
  { feature: "Informes semanales", pro: { type: "yes" }, free: { type: "no" } },
  { feature: "Sincroniza con Google Maps", pro: { type: "yes" }, free: { type: "no" } },
  {
    feature: "Página web incluida",
    pro: { type: "text", value: "Plan anual" },
    free: { type: "no" },
  },
]
