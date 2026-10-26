import { COMPANY } from "@/lib/company"
import type { Locale } from "@/lib/locale"

// Texts of the home sections that /it reuses, per language. The Spanish is what the home already
// showed; the Italian was reviewed by Fede (doc «Home en italiano: textos para revisar», 25-10-2026).
// Card and step texts follow the order of `sellMoreFeatures` and `steps` in section-data.ts.

export const navCopy = {
  es: {
    items: [
      { label: "Evalúa tu carta", href: "/#advisor" },
      { label: "Página web", href: "/pagina-web" },
      { label: "Precios", href: "/pricing" },
    ],
    homeHref: "/",
    login: "Login",
    cta: "Crea tu carta",
    navLabel: "Navegación principal",
    mobileNavLabel: "Navegación principal mobile",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  it: {
    items: [{ label: "Valuta il tuo menù", href: "/it#advisor" }],
    homeHref: "/it",
    login: "Accedi",
    cta: "Crea il tuo menù",
    navLabel: "Navigazione principale",
    mobileNavLabel: "Navigazione principale mobile",
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
  },
} satisfies Record<Locale, unknown>

export const heroCopy = {
  es: {
    titleStart: "Convierte la carta digital",
    titleMiddle: "de tu restaurante en una máquina de",
    titleHighlight: "ventas",
    titleEnd: "",
    subtitle: "Ingeniería de menú y neuromarketing para vender más a través de la carta digital. Sin conocimiento técnico.",
    exampleMenu: "Ver carta de ejemplo",
    ratingLabel: "Excellent",
    seeExample: "Ver ejemplo",
    imageAlt: "Carta digital de un restaurante en el móvil",
  },
  it: {
    titleStart: "Trasforma il tuo menù digitale",
    titleMiddle: "nel tuo alleato principale per",
    titleHighlight: "vendere di più",
    titleEnd: "nel tuo ristorante",
    subtitle: "Il menù digitale con QR code che usa menu engineering e neuromarketing per farti vendere di più. Crealo gratis, senza competenze tecniche.",
    exampleMenu: "Guarda un menù di esempio",
    ratingLabel: "Eccellente",
    seeExample: "Guarda l'esempio",
    imageAlt: "Menù digitale di un ristorante sullo smartphone",
  },
} satisfies Record<Locale, unknown>

export const sellMoreCopy = {
  es: {
    title: "Vende más sin esfuerzo",
    paragraph: "Tu carta le da al cliente los motivos para gastar más. Sola.",
    features: null,
  },
  it: {
    title: "Vendi di più senza fatica",
    paragraph: "Il tuo menù dà al cliente i motivi per spendere di più. Da solo.",
    features: [
      {
        title: "Suggerisci l'abbinamento per ogni piatto",
        description: "Consiglia in automatico il vino o il contorno giusto mentre il cliente sceglie.",
      },
      {
        title: "Proponi ingredienti extra",
        description: "Aggiungi extra e supplementi direttamente nel menù per alzare lo scontrino medio.",
      },
      {
        title: "Pop-up che si fanno notare",
        description: "Metti in evidenza piatti, promozioni o campagne nel momento giusto.",
      },
    ],
  },
} satisfies Record<Locale, { features: { title: string; description: string }[] | null } & Record<string, unknown>>

export const howItWorksCopy = {
  es: {
    title: "Empezar es muy fácil",
    paragraph: "Es tan simple que podrías configurarlo tú solo. Pero te lo facilitamos aún más.",
    steps: null,
  },
  it: {
    title: "Come creare il tuo menù digitale con QR code",
    paragraph: "È così semplice che potresti configurarlo da solo. Ma te lo rendiamo ancora più facile.",
    steps: [
      {
        title: "Registrati e aggiungi il tuo ristorante",
        description: "Scegli il tuo locale da Google Maps o indica che è un'apertura nuova.",
      },
      {
        title: "Carica il tuo menù attuale",
        description: "Mandacelo in PDF, in foto o da un altro fornitore: lo convertiamo noi.",
      },
      {
        title: "Pubblica e ottimizza",
        description: "Metti online il tuo menù digitale e applica i consigli per vendere di più dal primo giorno.",
      },
    ],
  },
} satisfies Record<Locale, { steps: { title: string; description: string }[] | null } & Record<string, unknown>>

export const showcaseCopy = {
  es: {
    title: "Esta puede ser tu carta",
    cta: "Ver carta",
    // The items' own alt texts are Spanish already.
    altFor: null,
    previous: "Slide anterior",
    next: "Siguiente slide",
  },
  it: {
    title: "Questo può essere il tuo menù digitale",
    cta: "Guarda il menù",
    altFor: (restaurant: string) => `Menù digitale di ${restaurant} sullo smartphone`,
    previous: "Slide precedente",
    next: "Slide successiva",
  },
} satisfies Record<Locale, unknown>

type FaqCopyItem = { question: string; answer: string }

export const faqCopy = {
  es: {
    title: "Te estarás preguntando",
    // Spanish questions live in section-data.ts (`faqs`), shared with the home's FAQ JSON-LD.
    items: null,
    helpTitle: "¿Sigues con dudas?",
    // Fede answers the Spanish WhatsApp himself, as in the floating bubble (WhatsAppBubble.tsx).
    helpPhoto: "/images/about-fede.png",
    helpPhotoAlt: "Fede, CEO de PowerUp",
    helpText: "Escríbeme por WhatsApp y te contesto yo mismo. Fede, CEO de PowerUp.",
    helpButton: "Pregúntame",
  },
  it: {
    title: "Forse ti stai chiedendo",
    items: (prices: { monthly: string; yearly: string }): FaqCopyItem[] => [
      {
        question: "Cos'è PowerUp Menu e che differenza c'è con un menù in PDF o di carta?",
        answer:
          "PowerUp Menu è il tuo menù digitale: lo modifichi da solo in pochi secondi, senza tipografia né aiuto tecnico. Già questo lo distingue da un PDF o da un menù di carta. E non serve solo a essere bello: è pensato per aiutarti a vendere di più.",
      },
      {
        question: "Come funziona il menù digitale con QR code?",
        answer:
          "Il cliente inquadra il QR code sul tavolo e vede il menù sullo smartphone, senza scaricare nessuna app, anche nella sua lingua. Tu lo aggiorni dal telefono in pochi secondi: prezzi, piatti esauriti, promozioni.",
      },
      {
        question: "Chi configura il mio menù e quanto ci vuole?",
        answer:
          "Lo configuri da solo: importa il menù direttamente da Uber Eats o Just Eat (così arrivano anche le foto dei piatti) oppure carica una foto o un PDF. Se il tuo caso è più complesso, il nostro team te lo prepara gratis in 24-48 ore lavorative.",
      },
      {
        question: "Posso cambiare prezzi, piatti e disponibilità da solo, in qualsiasi momento?",
        answer:
          "Sì, subito e senza attese. Dario, di Spaccanapoli, ha fatto più di 9.000 modifiche dallo smartphone invece di chiamare la tipografia.",
      },
      {
        question: "I miei clienti ordineranno e pagheranno dal menù, o continueranno a ordinare al cameriere?",
        answer:
          "PowerUp Menu non gestisce ordini né pagamenti: l'ordine lo prende sempre il tuo cameriere, come oggi. Fa invece due cose. Fuori dal locale, ti aiuta a farti trovare su Google e sulle IA che la gente usa per decidere dove mangiare. Dentro, mentre i clienti scelgono, li aiuta a notare quello che ti conviene di più vendere, per alzare lo scontrino medio.",
      },
      {
        question: "Quanto costa il menù digitale? C'è un piano gratis?",
        answer: `Il piano Free è gratis per sempre: menù digitale fino a 3 lingue e statistiche di base, con pubblicità non invasiva del settore della ristorazione. Il piano Pro costa ${prices.monthly} al mese: toglie la pubblicità e aggiunge più lingue e strumenti per vendere di più, come consigli e promozioni. Con il pagamento annuale (${prices.yearly} all'anno) include anche il tuo sito web.`,
      },
    ],
    helpTitle: "Hai ancora dubbi?",
    helpPhoto: "/images/about-jordi.png",
    helpPhotoAlt: "Jordi Puig",
    helpText: "Scrivici su WhatsApp: rispondiamo in italiano.",
    helpButton: "Scrivici",
  },
} satisfies Record<Locale, unknown>

export const footerCopy = {
  es: {
    title: "La carta es la palanca más potente para impulsar las ventas de los restaurantes",
    resources: "Recursos",
    // The Spanish footer links to the blog and three of its posts; /it has no Italian posts yet.
    showBlogLinks: true,
    support: "Soporte",
    contact: "Contacto",
    help: "Ayuda",
    legal: "Legal",
    terms: "Términos y condiciones",
    privacy: "Política de privacidad",
    rights: "Todos los derechos reservados",
  },
  it: {
    title: "Il menù è la leva più potente per far crescere le vendite di un ristorante",
    resources: "Risorse",
    showBlogLinks: false,
    support: "Assistenza",
    contact: "Contatti",
    help: "Assistenza WhatsApp",
    legal: "Note legali",
    terms: "Termini e condizioni",
    privacy: "Privacy policy",
    rights: "Tutti i diritti riservati",
  },
} satisfies Record<Locale, unknown>

/** WhatsApp link per language: the Italian one opens with an Italian greeting, so an Italian contact shows at a glance. */
export function whatsappUrlFor(locale: Locale): string {
  if (locale === "es") return COMPANY.whatsappUrl
  return `https://wa.me/${COMPANY.telephone.replace("+", "")}?text=${encodeURIComponent("Ciao, ho una domanda su PowerUp Menu")}`
}
