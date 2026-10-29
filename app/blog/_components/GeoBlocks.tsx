import { Check, ChevronDown } from "lucide-react"
import type { FaqItem, Fuente } from "@/lib/blog/schema"
import styles from "./prose.module.css"
import { eyebrow, sectionTitle } from "./styles"
import { blogUiCopy } from "@/lib/blog/ui-copy"
import type { Locale } from "@/lib/locale"

// Section ids rendered outside the Markdown body; the heading pass skips them to avoid duplicates.
export const GEO_SECTION_IDS = { keyPoints: "puntos-clave", faq: "preguntas-frecuentes", sources: "fuentes" }

export function ShortAnswer({ text, locale = "es" }: { text: string; locale?: Locale }) {
  return (
    <div className="rounded-[18px] bg-[#DEF8FF] px-6 py-5">
      <p className={eyebrow}>{blogUiCopy[locale].shortAnswer}</p>
      <p className="mt-2 font-heading text-lg font-medium leading-snug text-slate-900">{text}</p>
    </div>
  )
}

export function KeyPoints({ items, locale = "es" }: { items: string[]; locale?: Locale }) {
  return (
    <section aria-labelledby={GEO_SECTION_IDS.keyPoints} className="rounded-[18px] border border-border p-6">
      <h2 id={GEO_SECTION_IDS.keyPoints} className="font-heading text-lg font-medium text-slate-900">
        {blogUiCopy[locale].keyPoints}
      </h2>
      <ul className="mt-3 flex flex-col gap-2.5 text-[15px] leading-relaxed text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check aria-hidden className="mt-1 size-4 flex-none text-[#059669]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function FaqSection({ items, locale = "es", collapsible = false }: { items: FaqItem[]; locale?: Locale; collapsible?: boolean }) {
  if (collapsible) {
    // Folded answers stay in the HTML (and in the FAQPage JSON-LD): only how they show changes.
    return (
      <section aria-labelledby={GEO_SECTION_IDS.faq} className="flex flex-col gap-3">
        <h2 id={GEO_SECTION_IDS.faq} className={sectionTitle}>
          {blogUiCopy[locale].faq}
        </h2>
        <div className="flex flex-col border-t border-border">
          {items.map((item, index) => (
            <details key={item.pregunta} open={index === 0} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-heading text-[17px] font-medium leading-snug text-slate-900">{item.pregunta}</h3>
                <ChevronDown className="mt-0.5 size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="pb-4 leading-relaxed text-slate-700">{item.respuesta}</p>
            </details>
          ))}
        </div>
      </section>
    )
  }
  return (
    <section aria-labelledby={GEO_SECTION_IDS.faq} className={styles.prose}>
      <h2 id={GEO_SECTION_IDS.faq}>{blogUiCopy[locale].faq}</h2>
      {items.map((item) => (
        <div key={item.pregunta}>
          <h3>{item.pregunta}</h3>
          <p>{item.respuesta}</p>
        </div>
      ))}
    </section>
  )
}

// Sources are citations, not endorsements: links to other sites (some are competitors in the
// comparison posts) get nofollow so they don't receive our link equity. Our own domain
// (www.powerup.menu, carta.powerup.menu) stays followed.
function sourceRel(url: string) {
  let ownSite = false
  try {
    const host = new URL(url).hostname
    ownSite = host === "powerup.menu" || host.endsWith(".powerup.menu")
  } catch {}
  return ownSite ? "noopener noreferrer" : "nofollow noopener noreferrer"
}

export function Sources({ items, locale = "es" }: { items: Fuente[]; locale?: Locale }) {
  return (
    <section aria-labelledby={GEO_SECTION_IDS.sources} className={styles.prose}>
      <h2 id={GEO_SECTION_IDS.sources}>{blogUiCopy[locale].sources}</h2>
      <ol>
        {items.map((item) => (
          <li key={item.url}>
            <a href={item.url} target="_blank" rel={sourceRel(item.url)}>
              {item.titulo}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
