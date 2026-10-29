import "server-only"

import type { ClusterText } from "./clusters"
import { reportContentErrors } from "./isolation"
import { destinationExists } from "./legacy-links"
import { getLinkContext } from "./links"
import { warnOnce, type Post } from "./posts"

/** "[texto](/blog/x)" inside a step: the only markup the scannable blocks accept. */
export const INLINE_LINK = /\[([^\]]+)\]\((\/blog\/[a-z0-9/-]+(?:#[a-z0-9-]+)?)\)/g

export type PostGroup = { titulo: string; posts: Post[] }

/**
 * The theme's blocks, checked against this build: a route card to a page that isn't published is
 * left out, like a broken link in the text (outside production the page fails instead). Posts go
 * in their groups; a published post missing from every group still shows, under "Más artículos".
 */
export function getTopicBlocks(slug: string, text: ClusterText, posts: Post[]) {
  const { publishedSlugs, publishedClusters } = getLinkContext()
  const errors: string[] = []
  const exists = (href: string, where: string) => {
    const ok = destinationExists(href.split("#")[0], publishedSlugs, publishedClusters)
    if (!ok) errors.push(`${where}: ${href} no está publicado`)
    return ok
  }

  const rutas = text.rutas?.filter((ruta) => exists(ruta.href, `rutas «${ruta.titulo}»`))
  // A step keeps its text when a link in it is broken: only the link goes.
  const pasos = text.pasos?.map((paso) => ({
    texto: paso.texto.replace(INLINE_LINK, (match, label: string, href: string) => (exists(href, "pasos") ? match : label)),
  }))

  let grupos: PostGroup[] | undefined
  if (text.grupos) {
    const bySlug = new Map(posts.map((post) => [post.slug, post]))
    const placed = new Set<string>()
    grupos = text.grupos
      .map((grupo) => ({
        titulo: grupo.titulo,
        posts: grupo.slugs.flatMap((postSlug) => {
          const post = bySlug.get(postSlug)
          if (!post) errors.push(`grupos «${grupo.titulo}»: ${postSlug} no es un post publicado de este tema`)
          else if (placed.has(postSlug)) errors.push(`grupos: ${postSlug} está en dos grupos`)
          else {
            placed.add(postSlug)
            return [post]
          }
          return []
        }),
      }))
      .filter((grupo) => grupo.posts.length > 0)
    const rest = posts.filter((post) => !placed.has(post.slug))
    if (rest.length > 0) {
      warnOnce(`temas/${slug}.md: grupos sin ${rest.map((post) => post.slug).join(", ")}; salen en «Más artículos»`)
      grupos.push({ titulo: "Más artículos", posts: rest })
    }
  }

  reportContentErrors(`temas/${slug}.md: bloques`, errors)
  return { rutas, pasos, grupos }
}
