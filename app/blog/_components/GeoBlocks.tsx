import { Check } from "lucide-react"
import type { FaqItem, Fuente } from "@/lib/blog/schema"
import styles from "./prose.module.css"
import { eyebrow } from "./styles"

// Section ids rendered outside the Markdown body; the heading pass skips them to avoid duplicates.
export const GEO_SECTION_IDS = { keyPoints: "puntos-clave", faq: "preguntas-frecuentes", sources: "fuentes" }

export function ShortAnswer({ text }: { text: string }) {
  return (
    <div className="rounded-[18px] bg-[#DEF8FF] px-6 py-5">
      <p className={eyebrow}>En pocas palabras</p>
      <p className="mt-2 font-heading text-lg font-medium leading-snug text-slate-900">{text}</p>
    </div>
  )
}

export function KeyPoints({ items }: { items: string[] }) {
  return (
    <section aria-labelledby={GEO_SECTION_IDS.keyPoints} className="rounded-[18px] border border-border p-6">
      <h2 id={GEO_SECTION_IDS.keyPoints} className="font-heading text-lg font-medium text-slate-900">
        Puntos clave
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

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby={GEO_SECTION_IDS.faq} className={styles.prose}>
      <h2 id={GEO_SECTION_IDS.faq}>Preguntas frecuentes</h2>
      {items.map((item) => (
        <div key={item.pregunta}>
          <h3>{item.pregunta}</h3>
          <p>{item.respuesta}</p>
        </div>
      ))}
    </section>
  )
}

export function Sources({ items }: { items: Fuente[] }) {
  return (
    <section aria-labelledby={GEO_SECTION_IDS.sources} className={styles.prose}>
      <h2 id={GEO_SECTION_IDS.sources}>Fuentes</h2>
      <ol>
        {items.map((item) => (
          <li key={item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.titulo}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
