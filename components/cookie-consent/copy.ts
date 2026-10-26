import type { Locale } from "@/lib/locale"

type CategoryText = { title: string; description: string }

// Texts of the cookie banner, its settings dialog and the categories, per language; /it shows the Italian ones.
export const cookieCopy = {
  es: {
    banner: "Usamos cookies en este sitio web para rendimiento, personalización y marketing.",
    moreInfo: "Más información en nuestra política de cookies.",
    customize: "Personalizar cookies",
    rejectAll: "Rechazar todo",
    acceptAll: "Aceptar todo",
    settingsTitle: "Configuración de cookies",
    settingsDescription: "Gestiona tus preferencias de cookies a continuación.",
    required: "Obligatorias",
    save: "Guardar preferencias",
    privacyBefore: "Consulta nuestra",
    privacyLink: "política de privacidad",
    categories: {
      necessary: {
        title: "Necesarias",
        description: "Cookies esenciales para el funcionamiento del sitio web. No se pueden desactivar.",
      },
      analytics: {
        title: "Analíticas",
        description: "Cookies que nos ayudan a entender cómo los visitantes interactúan con el sitio.",
      },
      marketing: {
        title: "Marketing",
        description: "Cookies utilizadas para publicidad y seguimiento en distintos sitios web.",
      },
      preferences: {
        title: "Preferencias",
        description: "Cookies que recuerdan tu configuración y preferencias.",
      },
    },
  },
  it: {
    banner: "Usiamo i cookie su questo sito per prestazioni, personalizzazione e marketing.",
    moreInfo: "Maggiori informazioni nella nostra cookie policy.",
    customize: "Personalizza i cookie",
    rejectAll: "Rifiuta tutto",
    acceptAll: "Accetta tutto",
    settingsTitle: "Impostazioni dei cookie",
    settingsDescription: "Gestisci qui le tue preferenze sui cookie.",
    required: "Obbligatori",
    save: "Salva le preferenze",
    privacyBefore: "Leggi la nostra",
    privacyLink: "privacy policy",
    categories: {
      necessary: {
        title: "Necessari",
        description: "Cookie essenziali per il funzionamento del sito. Non si possono disattivare.",
      },
      analytics: {
        title: "Statistici",
        description: "Cookie che ci aiutano a capire come i visitatori usano il sito.",
      },
      marketing: {
        title: "Marketing",
        description: "Cookie usati per la pubblicità e il tracciamento su più siti web.",
      },
      preferences: {
        title: "Preferenze",
        description: "Cookie che ricordano le tue impostazioni e preferenze.",
      },
    },
  },
} satisfies Record<Locale, Record<string, unknown> & { categories: Record<string, CategoryText> }>
