import { z } from "zod"
import { CLUSTER_SLUGS } from "./taxonomy"

/** Would collide with the blog's own routes (/blog/tema, /blog/autor, /blog/md, ...). */
export const RESERVED_SLUGS: readonly string[] = ["tema", "autor", "md", "feed.xml", "pagina"]

const text = z.string().trim().min(1)
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "solo minúsculas sin acentos, números y guiones")

const faqItem = z.strictObject({ pregunta: text, respuesta: text })
export type FaqItem = z.infer<typeof faqItem>

// Format only: whether the URL responds is checked by lib/blog/scripts/check-fuentes.mts before
// publishing, and whether the source says what the post claims is confirmed by `revisado_por`.
const fuente = z.strictObject({ titulo: text, url: z.url({ protocol: /^https?$/ }) })
export type Fuente = z.infer<typeof fuente>

const GEO_FIELDS = {
  "google-first": [],
  hybrid: ["respuesta_corta", "puntos_clave", "fuentes"],
  "llm-first": ["respuesta_corta", "puntos_clave", "fuentes", "faq"],
} as const

export const postFrontmatterSchema = z
  .strictObject({
    title: text,
    slug: slug.refine((value) => !RESERVED_SLUGS.includes(value), "slug reservado por una ruta del blog"),
    seo_title: text,
    seo_description: text,
    excerpt: text,
    cluster: z.enum(CLUSTER_SLUGS),
    keyword_principal: text,
    content_strategy: z.enum(["google-first", "hybrid", "llm-first"]),
    destino_comercial: z.enum(["powerup", "maestro"]),
    cta: z.enum(["soft", "medium", "strong"]),
    fecha_publicacion: z.coerce.date(),
    fecha_modificacion: z.coerce.date().optional(),
    autor: slug,
    autor_original: slug.optional(),
    revisado_por: slug.optional(),
    draft: z.boolean().default(true),
    image: z.string().startsWith("/").optional(),
    image_alt: text.optional(),
    respuesta_corta: text.optional(),
    puntos_clave: z.array(text).min(1).optional(),
    faq: z.array(faqItem).min(1).optional(),
    fuentes: z.array(fuente).min(1).optional(),
  })
  .superRefine((post, ctx) => {
    if (post.image && !post.image_alt) {
      ctx.addIssue({ code: "custom", path: ["image_alt"], message: "obligatorio cuando hay image" })
    }
    if (!post.draft && !post.revisado_por) {
      ctx.addIssue({ code: "custom", path: ["revisado_por"], message: "obligatorio para publicar (draft: false)" })
    }
    if (post.fecha_modificacion && post.fecha_modificacion < post.fecha_publicacion) {
      ctx.addIssue({ code: "custom", path: ["fecha_modificacion"], message: "no puede ser anterior a fecha_publicacion" })
    }
    for (const field of GEO_FIELDS[post.content_strategy]) {
      if (post[field] === undefined) {
        ctx.addIssue({ code: "custom", path: [field], message: `obligatorio con content_strategy: ${post.content_strategy}` })
      }
    }
  })

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>

export const clusterTextSchema = z.strictObject({
  descripcion: text,
  seo_title: text.optional(),
  draft: z.boolean().default(true),
  faq: z.array(faqItem).min(1).optional(),
})

export type ClusterTextFrontmatter = z.infer<typeof clusterTextSchema>
