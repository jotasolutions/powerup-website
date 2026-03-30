
export const sellMoreFeatures = [
  {
    title: "Sugiere maridaje en cada plato",
    description:
      "Recomienda automáticamente bebidas o acompañamientos ideales mientras el cliente decide.",
  },
  {
    title: "Ofrece ingredientes extra",
    description:
      "Añade extras y suplementos directamente en la carta para aumentar el ticket medio.",
  },
  {
    title: "Pop-ups que saltan a la vista",
    description:
      "Destaca platos, promociones o campañas justo en el momento clave.",
  },
]

export const attractFeatures = [
  {
    title: "Haz que ChatGPT te recomiende",
    description:
      "Optimiza tu carta para aparecer en recomendaciones y comparativas antes de la visita.",
  },
  {
    title: "Tu carta siempre actualizada en Google",
    description:
      "Sincroniza cambios para que tu información esté al día en los canales donde te buscan.",
  },
  {
    title: "Los clientes deciden desde casa",
    description:
      "Convierte la navegación previa en intención de compra con una carta más clara y persuasiva.",
  },
]

export const analyticsFeatures = [
  {
    title: "Informes semanales automáticos",
    description:
      "Recibe reportes con recomendaciones para priorizar mejoras de forma continua.",
  },
  {
    title: "Entiende cómo usan tu carta",
    description:
      "Descubre qué productos miran más y qué bloques generan más interacción.",
  },
  {
    title: "Píxeles para campañas rentables",
    description:
      "Activa campañas con mejor segmentación apoyándote en datos reales de intención.",
  },
]

export const featuresBento = [
  {
    title: "Traducciones automáticas con IA",
    description:
      "Tu carta en varios idiomas sin trabajo manual: el cliente elige y entiende cada plato al instante.",
  },
  {
    title: "Realidad aumentada",
    description:
      "Muestra platos en 3D sobre la mesa para que decidan con los ojos antes de pedir.",
  },
  {
    title: "Colores y diseño personalizado",
    description:
      "Adapta la carta a tu marca con tipografías, paleta y bloques que encajan con tu local.",
  },
  {
    title: "Platos y promociones dinámicas programables",
    description:
      "Programa ofertas por horario, día o stock y actualiza la carta sin reimprimir nada.",
  },
  {
    title: "Optimiza tu visibilidad online en Google Maps",
    description:
      "Mantén datos y carta alineados con lo que buscan en Maps y en la ficha de tu negocio.",
  },
] as const

export const steps = [
  {
    title: "Regístrate y añade tu restaurante",
    description:
      "Elige tu restaurante desde Google Maps o indica si es un restaurante nuevo.",
    image: "/images/hiw-step-1.png",
    imageClass: "object-contain absolute -left-16 -bottom-24 w-[320px] h-auto",
    stepNumerClass: "left-1/4 top-5 bg-[#C6E9FC] border border-4 border-[#ECF8FE]",
  },
  {
    title: "Sube tu carta actual",
    description:
      "Envíala como PDF, fotos o desde otros proveedores y nosotros la convertimos.",
    image: "/images/hiw-step-2.png",
    imageClass: "object-contain absolute -left-18 -bottom-34 w-[300px] h-auto",
    stepNumerClass: "right-1/4 top-1/3 bg-[#C5F5F7] border border-4 border-[#ECFCFC]",
  },
  {
    title: "Publica y optimiza",
    description:
      "Lanza tu carta digital y aplica recomendaciones para vender más desde el primer día.",
    image: "/images/hiw-step-3.png",
    imageClass: "object-contain relative w-full h-auto scale-110 absolute -bottom-8 -left-10",
    stepNumerClass: "left-1/6 top-4 bg-[#BCF5EE] border border-4 border-[#ECFCFC]",
  },
]

export const adminCarouselSlides = [
  {
    src: "/images/admin/edit_menu.mp4",
    alt: "Panel de administración: gestión del menú y previsualización",
    width: 889,
    height: 483,
    title: "Edita tu menú del día",
  },
  {
    src: "/images/admin/enable.mp4",
    alt: "Panel de administración: vista adicional del producto",
    width: 3020,
    height: 1658,
    title: "Activa o desactiva platos",
  },
  {
    src: "/images/admin/programa.mp4",
    alt: "Panel de administración: vista adicional del producto",
    width: 3020,
    height: 1658,
    title: "Programa tus platos y secciones",
  },
  {
    src: "/images/admin/reorder.mp4",
    alt: "Panel de administración: vista adicional del producto",
    width: 3020,
    height: 1658,
    title: "Reordena tu carta",
  },
  {
    src: "/images/admin/webpage.mp4",
    alt: "Panel de administración: vista adicional del producto",
    width: 3020,
    height: 1658,
    title: "Modifica tu pagina web",
  },
] as const

export type AdminCarouselSlide = (typeof adminCarouselSlides)[number]

export const faqs = [
  "¿Se pueden gestionar varios restaurantes con el mismo plan?",
  "¿Puedo añadir el menú a mi sitio web o redes sociales?",
  "¿Hay permanencia?",
  "¿Se puede pedir y pagar a través de la carta?",
  "¿La gente se tiene que descargar una app?",
  "¿Tengo que tener ya una página web para poder tener un menú digital?",
]
