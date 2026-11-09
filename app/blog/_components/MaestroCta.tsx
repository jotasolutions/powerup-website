import { Archivo_Black } from "next/font/google"
import Image from "next/image"
import type { Post } from "@/lib/blog/posts"
import { MaestroLink } from "./CtaLinks"
import styles from "./maestro-cta.module.css"

// Maestro's display font, loaded only where this banner renders (articles with
// `destino_comercial: maestro`). No preload, so the home and PowerUp articles never fetch it.
const maestroDisplay = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-maestro-display",
  display: "swap",
  preload: false,
})

// The banner after articles that lead to Maestro, in Maestro's style (cream, black borders, hard
// shadows, the cut-out photo) so the reader recognises the site they are about to open. Images
// are copies of maestro-web/public/img, so a change there never breaks the blog.
export function MaestroCta({ post }: { post: Post }) {
  return (
    <section className={`${styles.section} ${maestroDisplay.variable}`}>
      <div className={styles.card}>
        <figure className={styles.photo}>
          <Image
            src="/blog/maestro/fede.webp"
            alt="Federico Bello, de Maestro"
            width={742}
            height={720}
            sizes="(min-width: 768px) 252px, 198px"
            className={styles.fig}
          />
        </figure>
        <div className={styles.text}>
          <div className={styles.brand}>
            <Image src="/blog/maestro/maestro-isotipo.webp" alt="" width={36} height={36} className={styles.isotipo} />
            <p className={styles.kicker}>Maestro · Consultoría</p>
          </div>
          <h2 className={styles.title}>Consultoría de rentabilidad para tu restaurante</h2>
          <p className={styles.lead}>
            Maestro es el servicio de consultoría de rentabilidad de PowerUp Menu: food cost, carta y estrategia de precios.
          </p>
          <MaestroLink campaign={post.slug} content="banner" className={styles.button}>
            Conocer Maestro
          </MaestroLink>
        </div>
      </div>
    </section>
  )
}
