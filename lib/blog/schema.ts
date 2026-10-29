import { z } from "zod"
import { CLUSTER_SLUGS } from "./taxonomy"

/** Would collide with the blog's own routes (/blog/tema, /blog/autor, /blog/md, ...) or its image folders in public/blog. */
export const RESERVED_SLUGS: readonly string[] = ["tema", "autor", "md", "feed.xml", "pagina", "portadas", "figuras"]

const text = z.string().trim().min(1)
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "solo minúsculas sin acentos, números y guiones")

// A blog page, optionally with an anchor ("/blog/mejores-cartas-digitales-qr#cinco-preguntas").
const blogHref = z.string().regex(/^\/blog\/[a-z0-9/-]+(?:#[a-z0-9-]+)?$/, "enlace interno del blog")

/** The icons a theme's route cards may use; TopicBlocks maps each name to a lucide-react icon. */
export const TOPIC_ICONS = ["comparar", "precio", "gratis", "qr", "local", "idiomas", "google", "seo", "cambiar"] as const

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

const postFields = {
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
}

type PostFields = z.infer<z.ZodObject<typeof postFields>>

function checkPost(post: PostFields, ctx: z.RefinementCtx) {
  if (post.image && !post.image_alt) {
    ctx.addIssue({ code: "custom", path: ["image_alt"], message: "obligatorio cuando hay image" })
  }
  if (!post.draft && !post.revisado_por) {
    ctx.addIssue({ code: "custom", path: ["revisado_por"], message: "obligatorio para publicar (draft: false)" })
  }
  if (post.fecha_modificacion && post.fecha_modificacion < post.fecha_publicacion) {
    ctx.addIssue({ code: "custom", path: ["fecha_modificacion"], message: "no puede ser anterior a fecha_publicacion" })
  }
  // Like revisado_por, the GEO blocks are part of finishing a post: a draft may lack them.
  if (!post.draft) {
    for (const field of GEO_FIELDS[post.content_strategy]) {
      if (post[field] === undefined) {
        ctx.addIssue({ code: "custom", path: [field], message: `obligatorio para publicar con content_strategy: ${post.content_strategy}` })
      }
    }
  }
}

export const postFrontmatterSchema = z.strictObject(postFields).superRefine(checkPost)

/** Italian posts (content/blog-it): the same fields plus the Spanish post they adapt, for hreflang. */
export const italianPostFrontmatterSchema = z
  .strictObject({ ...postFields, traduzione_di: slug })
  .superRefine(checkPost)

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>
export type ItalianPostFrontmatter = z.infer<typeof italianPostFrontmatterSchema>

export const clusterTextSchema = z.strictObject({
  descripcion: text,
  // The broad term: posts take the more specific searches (unique across posts and themes).
  keyword_principal: text,
  seo_title: text.optional(),
  // The page heading, when the theme's label alone ("Carta digital") is broader than the search.
  h1: text.optional(),
  // The Advisor card between the text and the article list.
  advisor: z.boolean().default(false),
  draft: z.boolean().default(true),
  faq: z.array(faqItem).min(1).optional(),
  // Scannable blocks (app/blog/_components/TopicBlocks.tsx). Each one is optional, so a theme
  // without them keeps the plain layout.
  respuesta_rapida: z.array(z.strictObject({ etiqueta: text, valor: text })).min(1).optional(),
  rutas: z.array(z.strictObject({ titulo: text, texto: text, href: blogHref, icono: z.enum(TOPIC_ICONS) })).min(1).optional(),
  criterios: z.array(z.strictObject({ criterio: text, que_mirar: text, pregunta: text })).min(1).optional(),
  // A step may link inside the blog with "[texto](/blog/...)"; nothing else is parsed.
  pasos: z.array(z.strictObject({ texto: text })).min(1).optional(),
  grupos: z.array(z.strictObject({ titulo: text, slugs: z.array(slug).min(1) })).min(1).optional(),
  faq_plegable: z.boolean().default(false),
})

export type ClusterTextFrontmatter = z.infer<typeof clusterTextSchema>
