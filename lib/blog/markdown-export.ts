import "server-only"

import { getAuthor } from "./authors"
import { absoluteUrl, postPath } from "./config"
import { isoDate } from "./format"
import { rewriteMarkdownLinks } from "./legacy-links"
import { getLinkContext, type Post } from "./posts"

/** Plain-Markdown version of a post for /blog/md/<slug>; it points back to the HTML page as canonical. */
export function postToMarkdown(post: Post): string {
  const author = getAuthor(post.autor)
  const parts = [
    `# ${post.title}`,
    post.excerpt,
    `${author?.name ?? "PowerUp Menu"} · ${isoDate(post.fecha_publicacion)} · Versión web: ${absoluteUrl(postPath(post.slug))}`,
  ]
  if (post.respuesta_corta) parts.push(`## En pocas palabras\n\n${post.respuesta_corta}`)
  if (post.puntos_clave) parts.push(`## Puntos clave\n\n${post.puntos_clave.map((point) => `- ${point}`).join("\n")}`)
  parts.push(rewriteMarkdownLinks(post.body.trim(), getLinkContext()))
  if (post.faq) {
    parts.push(`## Preguntas frecuentes\n\n${post.faq.map((item) => `### ${item.pregunta}\n\n${item.respuesta}`).join("\n\n")}`)
  }
  if (post.fuentes) parts.push(`## Fuentes\n\n${post.fuentes.map((source) => `- [${source.titulo}](${source.url})`).join("\n")}`)
  return `${parts.join("\n\n")}\n`
}
