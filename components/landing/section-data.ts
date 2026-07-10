import feature1 from '../../public/images/features/feature1.json'
import feature2 from '../../public/images/features/feature2.json'
import feature3 from '../../public/images/features/feature3.json'
import feature4 from '../../public/images/features/feature4.json'
import feature5 from '../../public/images/features/feature5.json'
import feature6 from '../../public/images/features/feature6.json'
import reports from '../../public/images/features/reports.json'
import mostViewedDishes from '../../public/images/features/most-viewed.json'
import campaigns from '../../public/images/features/campaigns.json'

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
    animation: reports,
  },
  {
    title: "Entiende cómo usan tu carta",
    description:
      "Descubre qué productos miran más y qué bloques generan más interacción.",
    animation: mostViewedDishes
  },
  {
    title: "Píxeles para campañas rentables",
    description:
      "Activa campañas con mejor segmentación apoyándote en datos reales de intención.",
    animation: campaigns
  },
]

export const featuresBento = [
  {
    title: "Traducciones automáticas con IA",
    description:
      "Tu carta en varios idiomas sin trabajo manual: el cliente elige y entiende cada plato al instante.",
    imageUrl: "/images/features/features-bento-1.png",
  },
  {
    title: "Realidad aumentada",
    description:
      "Muestra platos en 3D sobre la mesa para que decidan con los ojos antes de pedir.",
    imageUrl: "/images/features/features-bento-2.png",
    imageBottom: true,
  },
  {
    title: "Colores y diseño personalizado",
    description:
      "Adapta la carta a tu marca con tipografías, paleta y bloques que encajan con tu local.",
    imageUrl: "/images/features/features-bento-3.png",
    imageBottom: true,
  },
  {
    title: "Platos y promociones dinámicas programables",
    description:
      "Programa ofertas por horario, día o stock y actualiza la carta sin reimprimir nada.",
    imageUrl: "/images/features/features-bento-4.png",
    imageWide: true,
  },
  {
    title: "Optimiza tu visibilidad online en Google Maps",
    description:
      "Mantén datos y carta alineados con lo que buscan en Maps y en la ficha de tu negocio.",
    imageUrl: "/images/features/features-bento-5.png",
    imageBottom: true,
    imageWide: true,
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
    src: "/videos/admin-demo/create-promo.mp4",
    alt: "Panel de administración: creación de promociones",
    width: 889,
    height: 483,
    title: "Crea promociones",
  },
  {
    src: "/videos/admin-demo/cross-selling.mp4",
    alt: "Panel de administración: cross-selling",
    width: 3020,
    height: 1658,
    title: "Añade maridaje a los platos",
  },
  {
    src: "/videos/admin-demo/dishes-visibility.mp4",
    alt: "Panel de administración: activación de platos",
    width: 3020,
    height: 1658,
    title: "Activa o desactiva platos",
  },
  {
    src: "/videos/admin-demo/extra-ingredients.mp4",
    alt: "Panel de administración: añadir extras",
    width: 3020,
    height: 1658,
    title: "Añade extras a los platos",
  },
  {
    src: "/videos/admin-demo/reorder.mp4",
    alt: "Panel de administración: reordenación de platos",
    width: 3020,
    height: 1658,
    title: "Reordena tu carta",
  },
  {
    src: "/videos/admin-demo/schedule.mp4",
    alt: "Panel de administración: programación de platos o secciones",
    width: 3020,
    height: 1658,
    title: "Programa tus platos o secciones",
  },
  {
    src: "/videos/admin-demo/website.mp4",
    alt: "Panel de administración: edición de página web",
    width: 3020,
    height: 1658,
    title: "Edita tu página web",
  },
] as const

export type AdminCarouselSlide = (typeof adminCarouselSlides)[number]

export const adminMobileCarouselSlides = [
  {
    src: "/videos/admin-demo-mobile/add-promo.mp4",
    alt: "Panel de administración móvil: creación de promociones",
    title: "Crea promociones",
    frame: "/videos/iphone17-black.png",
  },
  {
    src: "/videos/admin-demo-mobile/cross-selling.mp4",
    alt: "Panel de administración móvil: cross-selling",
    title: "Añade maridaje a los platos",
    frame: "/videos/iphone17-black.png",
  },
  {
    src: "/videos/admin-demo-mobile/activate-dish.mp4",
    alt: "Panel de administración móvil: activación de platos",
    title: "Activa o desactiva platos",
    frame: "/videos/iphone17-black.png",
  },
  {
    src: "/videos/admin-demo-mobile/extra-ingredient.mp4",
    alt: "Panel de administración móvil: añadir extras",
    title: "Añade extras a los platos",
    frame: "/videos/iphone17-black.png",
  },
  {
    src: "/videos/admin-demo-mobile/reorder-dishes.mp4",
    alt: "Panel de administración móvil: reordenación de platos",
    title: "Reordena tu carta",
    frame: "/videos/iphone17-black.png",
  },
] as const

export type AdminMobileCarouselSlide = (typeof adminMobileCarouselSlides)[number]

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
    question: "¿Qué es PowerUp Menu y en qué se diferencia de tener la carta en PDF o papel?",
    answer:
      "PowerUp Menu es tu carta digital: la editas tú mismo en segundos, sin imprenta ni ayuda técnica — eso ya te diferencia de un PDF o una carta en papel. Y no se queda en mostrar bonito: está pensada para ayudarte a vender más.",
  },
  {
    question: "¿Quién configura mi carta y cuánto tarda en estar lista?",
    answer:
      "La configuras tú mismo: importa tu carta directamente desde Uber Eats o Just Eat —así se traen también las fotos de los platos— o sube una foto o PDF. Si tu caso es más complejo, nuestro equipo te la monta sin coste en 24-48 horas laborables.",
  },
  {
    question: "¿Puedo cambiar precios, platos y disponibilidad yo mismo, en cualquier momento?",
    answer:
      "Sí, al momento y sin esperas. Dario, de Spaccanapoli, ha hecho más de 9.000 cambios desde el móvil en vez de llamar a la imprenta.",
  },
  {
    question: "¿Mis clientes van a pedir y pagar desde la carta, o van a seguir pidiendo al camarero?",
    answer:
      "PowerUp Menu no gestiona pedidos ni pagos — el pedido lo sigue tomando tu camarero, igual que ahora. Lo que sí hace es doble: fuera del restaurante, ayuda a que te encuentren en Google y en las IA que la gente usa para buscar dónde comer; dentro, mientras tus clientes deciden, les ayuda a fijarse en lo que más te interesa vender, para subir el ticket medio.",
  },
  {
    question: "¿Puedo personalizar el diseño de mi carta con mis colores y mi marca?",
    answer:
      "Sí, puedes personalizar colores y aspectos básicos tú mismo. Si quieres un diseño más a medida, trabajamos contigo directamente con nuestro equipo de diseño.",
  },
  {
    question: "¿Qué diferencia hay entre el plan gratuito y el Pro?",
    answer:
      "El plan Free es gratis para siempre: carta digital con hasta 3 idiomas y estadísticas simples de uso, con publicidad no invasiva del sector hostelero. El plan Pro quita la publicidad y añade más idiomas, herramientas para vender más como recomendaciones y promociones, y si lo pagas al año, tu propia página web.",
  },
]
