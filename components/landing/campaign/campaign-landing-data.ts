// Copy of the two paid-campaign landings (Meta, test round 1). Both pages share one structure and
// only these texts and images change, so the A/B test compares arguments, not layouts. The hero
// repeats the ad's hook and headline. Every claim is already on the site; the source of each one
// is listed in LANDINGS.md, in the campaign folder.

export type CampaignLandingKey = "vende-mas" | "visibilidad"

type CampaignHeroVisual =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  // Generic chat, the same scene as the H1-A ad: no ChatGPT/OpenAI logo or interface.
  | { kind: "chat"; question: string; answerStart: string; places: readonly string[]; alt: string }

// A real search result, told as a dated case, never as a promise. No Google logo.
type CampaignSearchProof = {
  title: string
  text: string
  query: string
  resultTitle: string
  resultUrl: string
  source: string
}

export type CampaignLanding = {
  metaTitle: string
  metaDescription: string
  hero: {
    hook: string
    titleStart: string
    titleHighlight: string
    description: string
    badge: string
    visual: CampaignHeroVisual
  }
  bigText: string
  detail: {
    title: string
    description: string
    items: readonly string[]
    image: { src: string; alt: string; width: number; height: number }
    imageBackground: string
    proof?: CampaignSearchProof
  }
  testimonial: {
    result: string
    review: string
    place: string
    userName: string
    userImage: string
    logo: string
    bgImage: string
  }
}

const TRIAL_BADGE = "Prueba el plan Pro gratis durante 30 días. Sin tarjeta."
// The detail features are Pro: the sign-up is free and comes with 30 days of Pro.
const PRO_TRIAL_ITEM = "Todo incluido en el plan Pro: pruébalo gratis durante 30 días"

export const campaignLandings: Record<CampaignLandingKey, CampaignLanding> = {
  "vende-mas": {
    metaTitle: "Vende más desde tu carta digital | PowerUp Menu",
    metaDescription:
      "Sugiere maridaje, ofrece extras y destaca promociones en tu carta digital. Crea tu carta gratis: 30 días de Pro, sin tarjeta.",
    hero: {
      hook: "¿Tu carta se ve así?",
      titleStart: "Estás perdiendo",
      titleHighlight: "ventas",
      description:
        "Te ayudamos a solucionarlo con una carta digital que vende más. Ingeniería de menú y neuromarketing, sin conocimiento técnico.",
      badge: TRIAL_BADGE,
      visual: {
        kind: "image",
        src: "/images/landings/carta-papel-tachada.jpg",
        alt: "Carta en papel con precios tachados y corregidos a mano",
        width: 1080,
        height: 900,
      },
    },
    bigText:
      "Tu carta es el momento en el que el cliente decide cuánto va a gastar. Si la optimizas, vendes más. Aplicamos ingeniería de menú y análisis de datos en tu carta digital para que venda más sin que tengas que ser experto.",
    detail: {
      title: "La carta que piensa como tú venderías",
      description:
        "No solo digitalizamos tu carta. Optimizamos cómo se presentan los platos y medimos qué funciona para mejorarlo continuamente.",
      items: [
        "Programa platos y promociones por días y horas",
        "Descubre qué platos miran más y qué se ignora",
        "Recibe cada semana un informe con recomendaciones concretas",
        PRO_TRIAL_ITEM,
      ],
      image: {
        src: "/images/features/features-bento-4@2x.png",
        alt: "Promoción de happy hour programada por horario y por día",
        width: 1256,
        height: 550,
      },
      imageBackground: "bg-gradient-to-b from-[#ECF8FF] to-[#C1EAFF]",
    },
    testimonial: {
      result: "x1,2 de facturación en 6 meses",
      review:
        "La mejor carta digital que he probado. Me ha ayudado a vender más y a mejorar mi restaurante.",
      place: "La Taberna de Marisa",
      userName: "Marisa",
      userImage: "/images/testimonials/marisa/marisa.png",
      logo: "/images/testimonials/marisa/logo.png",
      bgImage: "/images/testimonials/marisa/bgimage.png",
    },
  },
  visibilidad: {
    metaTitle: "Haz que ChatGPT te recomiende | PowerUp Menu",
    metaDescription:
      "Optimiza tu carta para aparecer en recomendaciones y comparativas, y mantenla siempre actualizada en Google. Crea tu carta gratis: 30 días de Pro, sin tarjeta.",
    hero: {
      hook: "¿Te recomienda ChatGPT?",
      titleStart: "Haz que ChatGPT te",
      titleHighlight: "recomiende",
      description:
        "Optimiza tu carta para aparecer en recomendaciones y comparativas antes de la visita. Y mantenla siempre actualizada en Google.",
      badge: TRIAL_BADGE,
      visual: {
        kind: "chat",
        question: "¿Dónde ceno bien por aquí?",
        answerStart: "Te recomiendo",
        places: ["Casa Lola", "Bodega El Puerto", "Arrocería La Plaza"],
        alt: "Chat con una IA: alguien pregunta dónde cenar y le recomienda otros tres restaurantes",
      },
    },
    bigText:
      "La gente ya busca dónde comer en Google y en las IA. Fuera del restaurante, tu carta digital ayuda a que te encuentren, te comparen y te elijan antes de venir, sin que tengas que ser experto.",
    detail: {
      title: "Conecta tu menú a Google Maps",
      description: "Mantén tu carta sincronizada con la ficha donde te buscan.",
      items: [
        "Cambia precios y platos al momento, desde el móvil",
        "Tu carta con fotos y en varios idiomas, para que decidan desde casa",
        "Descubre qué platos miran más y qué se ignora",
        PRO_TRIAL_ITEM,
      ],
      image: {
        src: "/images/features/features-bento-5@2x.png",
        alt: "Ficha de un restaurante en Google Maps con su menú",
        width: 1256,
        height: 550,
      },
      imageBackground: "bg-gradient-to-b from-[#F0FFF5] to-[#CBFFDC]",
      // Google.es, 09-10-2026: the client's PowerUp menu is the first web result (same with four
      // other clients). Source and wording in CREATIVIDADES.md, in the campaign folder.
      proof: {
        title: "Busca «carta + tu restaurante»",
        text: "Cuando alguien busca «carta La Taberna Casera» en Google, lo primero que encuentra es su carta de PowerUp: al día, con fotos y en su idioma. No un PDF viejo ni la carta de otra web.",
        query: "carta la taberna casera",
        resultTitle: "La taberna casera - Carta digital QR",
        resultUrl: "carta.powerup.menu › taberna-casera",
        source: "Búsqueda en Google.es, octubre de 2026.",
      },
    },
    testimonial: {
      result: "Recibe visitas de ChatGPT, y lo ve en sus analíticas",
      review:
        "Un día miré las analíticas y había gente entrando desde ChatGPT. Ahora, si alguien pregunta dónde comer comida piemontesa por la zona, aparezco yo con la carta actualizada al día.",
      place: "Trattoria Piemontese",
      userName: "Paolo",
      userImage: "/images/testimonials/trattoria/paolo2.jpg",
      logo: "/images/testimonials/trattoria/logo.webp",
      bgImage: "/images/testimonials/trattoria/bgimage.png",
    },
  },
}
