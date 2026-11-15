import type { Metadata } from "next"
import { BLOG_PATH, FIGURE_LICENSE_PATH, FIGURE_LICENSE_URL } from "@/lib/blog/config"
import { blogMetadata } from "@/lib/blog/metadata"
import { breadcrumbJsonLd } from "@/lib/blog/structured-data"
import { COMPANY } from "@/lib/company"
import { Breadcrumbs } from "../_components/Breadcrumbs"
import { JsonLd } from "../_components/JsonLd"
import { container, eyebrow, pageTitle, sectionTitle } from "../_components/styles"

// Every figure's ImageObject (figuresJsonLd) names this page as `acquireLicensePage`.
const TITLE = "Licencia de las figuras del blog"
const DESCRIPTION =
  "Las figuras y gráficos del blog de PowerUp Menu se publican bajo licencia CC BY 4.0: puedes reutilizarlos citando a PowerUp Menu con enlace al artículo original."

export const metadata: Metadata = blogMetadata({ path: FIGURE_LICENSE_PATH, title: TITLE, description: DESCRIPTION })

const link = "font-medium text-primary underline-offset-4 hover:underline"

export default function FigureLicensePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: BLOG_PATH }, { name: TITLE, path: FIGURE_LICENSE_PATH }])} />

      <div className={`${container} flex flex-col gap-10 pb-16 pt-8`}>
        <Breadcrumbs items={[{ name: "Blog", path: BLOG_PATH }, { name: TITLE }]} />

        <div className="flex max-w-[680px] flex-col gap-4">
          <p className={eyebrow}>Licencia</p>
          <h1 className={pageTitle}>{TITLE}</h1>
          <p className="text-[17px] leading-relaxed text-slate-700">
            Las figuras, gráficos y esquemas propios del blog de PowerUp Menu se publican bajo la licencia{" "}
            <a href={FIGURE_LICENSE_URL} target="_blank" rel="license noopener noreferrer" className={link}>
              Creative Commons Atribución 4.0 Internacional (CC BY 4.0)
            </a>
            . Son las que llevan el logo de PowerUp Menu y el pie «Gráfico: PowerUp Menu».
          </p>
        </div>

        <section aria-labelledby="como-reutilizar" className="flex max-w-[680px] flex-col gap-3">
          <h2 id="como-reutilizar" className={sectionTitle}>
            Cómo reutilizarlas
          </h2>
          <p className="text-[17px] leading-relaxed text-slate-700">
            Puedes copiarlas, compartirlas y adaptarlas en tu web, tu blog, una presentación o un trabajo, también con fines
            comerciales, sin pedirnos permiso. Solo te pedimos que:
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-[17px] leading-relaxed text-slate-700">
            <li>
              Cites a <strong>PowerUp Menu</strong> como autor de la figura.
            </li>
            <li>Enlaces al artículo del blog donde se publicó la figura.</li>
            <li>Indiques si has hecho cambios sobre la figura original.</li>
          </ul>
          <p className="text-[17px] leading-relaxed text-slate-700">
            Por ejemplo: «Gráfico: PowerUp Menu», con enlace al artículo original.
          </p>
        </section>

        <section aria-labelledby="otros-usos" className="flex max-w-[680px] flex-col gap-3">
          <h2 id="otros-usos" className={sectionTitle}>
            Otros usos
          </h2>
          <p className="text-[17px] leading-relaxed text-slate-700">
            Esta licencia cubre solo las figuras propias del blog, no los textos de los artículos, el logo ni las fotos de
            terceros. Si quieres usarlas sin citar a PowerUp Menu, o necesitas otro tipo de permiso, escríbenos a{" "}
            <a href={`mailto:${COMPANY.email}`} className={link}>
              {COMPANY.email}
            </a>
            .
          </p>
        </section>
      </div>
    </>
  )
}
