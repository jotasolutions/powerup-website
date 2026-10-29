import type { Locale } from "@/lib/locale"

// The title is the same on every 404 (site and blog) so GA4 can filter all of them by page_title.
// The Advisor's claims (30%, 2 minutes, the four areas) are the ones the home and the blog already make.
export const NOT_FOUND_COPY = {
  es: {
    title: "Página no encontrada · PowerUp Menu",
    eyebrow: "ERROR 404",
    headingStart: "Esta página no está en la",
    headingCircled: "carta",
    body: "Puede que el enlace esté mal escrito o que la hayamos movido. Ya que has llegado hasta aquí, aprovecha el viaje.",
    homeHref: "/",
    countdown: (seconds: number) => `Volvemos a la home en ${seconds} s.`,
    goHome: "Ir ya",
    stay: "Quedarme aquí",
    stayed: "Cuenta atrás parada. Tómate tu tiempo.",
    backHome: "Volver a la home",
    advisorEyebrow: "Gratis · En 2 minutos",
    advisorTitle: "¿Qué nota sacaría tu carta?",
    advisorText:
      "Nuestra IA la analiza en oferta, marketing, contenido y diseño, y te dice qué cambiar para vender hasta un 30% más.",
    advisorButton: "Analizar mi carta gratis",
  },
  it: {
    title: "Pagina non trovata · PowerUp Menu",
    eyebrow: "ERRORE 404",
    headingStart: "Questa pagina non è nel",
    headingCircled: "menù",
    body: "Forse il link è sbagliato o l'abbiamo spostata. Già che sei arrivato fin qui, approfittane.",
    homeHref: "/it",
    countdown: (seconds: number) => `Torniamo alla home tra ${seconds} s.`,
    goHome: "Vai subito",
    stay: "Resto qui",
    stayed: "Conto alla rovescia fermo. Prenditi il tuo tempo.",
    backHome: "Torna alla home",
    advisorEyebrow: "Gratis · In 2 minuti",
    advisorTitle: "Che voto prenderebbe il tuo menù?",
    advisorText:
      "La nostra IA lo analizza su offerta, marketing, contenuti e design e ti dice cosa cambiare per vendere fino al 30% in più.",
    advisorButton: "Analizza il mio menù gratis",
  },
} satisfies Record<Locale, unknown>
