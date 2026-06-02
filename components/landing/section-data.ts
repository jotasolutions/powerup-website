import feature1 from '../../public/images/features/feature1.json'
import feature2 from '../../public/images/features/feature2.json'
import feature3 from '../../public/images/features/feature3.json'
import feature4 from '../../public/images/features/feature4.json'
import feature5 from '../../public/images/features/feature5.json'
import feature6 from '../../public/images/features/feature6.json'

export const sellMoreFeatures = [
  {
    title: "Sugiere maridaje en cada plato",
    description:
      "Recomienda automáticamente bebidas o acompañamientos ideales mientras el cliente decide.",
      animation: feature1,
  },
  {
    title: "Ofrece ingredientes extra",
    description:
      "Añade extras y suplementos directamente en la carta para aumentar el ticket medio.",
      animation: feature2,
  },
  {
    title: "Pop-ups que saltan a la vista",
    description:
      "Destaca platos, promociones o campañas justo en el momento clave.",
      animation: feature3,
  },
]

export const attractFeatures = [
  {
    title: "Haz que ChatGPT te recomiende",
    description:
      "Optimiza tu carta para aparecer en recomendaciones y comparativas antes de la visita.",
      animation: feature4,
  },
  {
    title: "Tu carta siempre actualizada en Google",
    description:
      "Sincroniza cambios para que tu información esté al día en los canales donde te buscan.",
      animation: feature5,
  },
  {
    title: "Los clientes deciden desde casa",
    description:
      "Convierte la navegación previa en intención de compra con una carta más clara y persuasiva.",
      animation: feature6,
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
    imageClass: "absolute bottom-0 left-1/2 h-auto w-[220px] -translate-x-1/2 object-contain sm:w-[270px] md:-bottom-24 md:-left-16 md:w-[320px] md:translate-x-0",
    stepNumerClass: "left-[18%] top-5 border border-4 border-[#ECF8FE] bg-[#C6E9FC] sm:left-1/4",
  },
  {
    title: "Sube tu carta actual",
    description:
      "Envíala como PDF, fotos o desde otros proveedores y nosotros la convertimos.",
    image: "/images/hiw-step-2.png",
    imageClass: "absolute bottom-0 left-1/2 h-auto w-[210px] -translate-x-1/2 object-contain sm:w-[250px] md:-bottom-[8.5rem] md:-left-[4.5rem] md:w-[300px] md:translate-x-0",
    stepNumerClass: "right-[18%] top-1/3 border border-4 border-[#ECFCFC] bg-[#C5F5F7] sm:right-1/4",
  },
  {
    title: "Publica y optimiza",
    description:
      "Lanza tu carta digital y aplica recomendaciones para vender más desde el primer día.",
    image: "/images/hiw-step-3.png",
    imageClass: "absolute bottom-0 left-1/2 h-auto w-[220px] -translate-x-1/2 scale-105 object-contain sm:w-[260px] md:-bottom-8 md:-left-10 md:w-full md:translate-x-0 md:scale-110",
    stepNumerClass: "left-[12%] top-4 border border-4 border-[#ECFCFC] bg-[#BCF5EE] sm:left-1/6",
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

export const differentiationPillars = [
  {
    id: "neuromarketing" as const,
    title: "Neuromarketing",
    footnote: "Basado en más de 80 estudios científicos",
    segments: [
      {
        text:
          "Aplicamos principios como efecto ancla, orden estratégico de categorías, nombres descriptivos y resaltado inteligente para ",
      },
      {
        text: "aumentar el ticket medio de forma natural.",
        bold: true,
      },
    ],
  },
  {
    id: "analytics" as const,
    title: "Analíticas",
    footnote: "Métricas claras y sin configuración técnica",
    segments: [
      {
        text:
          "Medimos qué platos se ven, cuánto tiempo pasan en la carta y qué se ignora. Cada semana recibes un informe con ",
      },
      {
        text: "recomendaciones accionables para mejorar.",
        bold: true,
      },
    ],
  },
] as const

export const faqs = [
  {
    question: "¿Se pueden gestionar varios restaurantes con el mismo plan?",
    answer: "¿Se pueden gestionar varios restaurantes con el mismo plan?",
  },
  {
    question: "¿Puedo añadir el menú a mi sitio web o redes sociales?",
    answer: "¿Se pueden gestionar varios restaurantes con el mismo plan?",
  },
  {
    question: "¿Hay permanencia?",
    answer: "¿Se pueden gestionar varios restaurantes con el mismo plan?",
  },
  {
    question: "¿Se puede pedir y pagar a través de la carta?",
    answer: "¿Se pueden gestionar varios restaurantes con el mismo plan?",
  },
  {
    question: "¿La gente se tiene que descargar una app?",
    answer: "¿Se pueden gestionar varios restaurantes con el mismo plan?",
  },
  {
    question: "¿Tengo que tener ya una página web para poder tener un menú digital?",
    answer: "¿Se pueden gestionar varios restaurantes con el mismo plan?",
  }
]
