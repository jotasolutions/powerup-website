import "server-only"

import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import { z } from "zod"
import { AUTHORS, getAuthor, isPerson, type PersonAuthor } from "./authors"
import { POSTS_PER_PAGE } from "./config"
import { isProductionBuild } from "./draft"
import { imagePathProblem } from "./images"
import { readMarkdownFile, reportContentErrors, withProductionFallback } from "./isolation"
import { readingMinutes } from "./reading-time"
import { postFrontmatterSchema, type PostFrontmatter } from "./schema"
import { getCluster } from "./taxonomy"

const CONTENT_DIR = path.join(process.cwd(), "content/blog")
const SEO_TITLE_MAX = 60

export type Post = Omit<PostFrontmatter, "fecha_modificacion"> & {
  fecha_modificacion: Date
  body: string
  readingMinutes: number
}

const warned = new Set<string>()
export function warnOnce(message: string) {
  if (warned.has(message)) return
  warned.add(message)
  console.warn(`[blog] ${message}`)
}

function checkAuthorRefs(post: PostFrontmatter, file: string, errors: string[]) {
  if (!getAuthor(post.autor)) errors.push(`${file}: autor "${post.autor}" no existe en lib/blog/authors.ts`)
  if (post.autor_original && !getAuthor(post.autor_original)) {
    errors.push(`${file}: autor_original "${post.autor_original}" no existe en lib/blog/authors.ts`)
  }
  if (post.revisado_por && !isPerson(getAuthor(post.revisado_por))) {
    errors.push(`${file}: revisado_por "${post.revisado_por}" tiene que ser una persona con ficha completa en lib/blog/authors.ts`)
  }
}

function loadPosts(): Post[] {
  const files = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
  const errors: string[] = []
  const posts: Post[] = []

  for (const file of files) {
    const source = readMarkdownFile(path.join(CONTENT_DIR, file), file, errors)
    if (!source) continue
    const { data, content } = source
    const parsed = postFrontmatterSchema.safeParse(data)
    if (!parsed.success) {
      errors.push(`${file}:\n${z.prettifyError(parsed.error)}`)
      continue
    }
    const post = parsed.data
    const fileErrors: string[] = []
    if (file !== `${post.slug}.md`) fileErrors.push(`${file}: el slug "${post.slug}" no coincide con el nombre del archivo`)
    checkAuthorRefs(post, file, fileErrors)
    if (fileErrors.length > 0) {
      errors.push(...fileErrors)
      continue
    }
    const coverProblem = post.image ? imagePathProblem(post.image) : undefined
    if (coverProblem) {
      // Fails outside production; in production the post goes on with its cluster's tint.
      errors.push(`${file}: image ${coverProblem}`)
      post.image = undefined
      post.image_alt = undefined
    }
    if (post.seo_title.length > SEO_TITLE_MAX) {
      warnOnce(`${file}: seo_title de ${post.seo_title.length} caracteres (recomendado ≤ ${SEO_TITLE_MAX})`)
    }
    const readable = [
      post.respuesta_corta,
      ...(post.puntos_clave ?? []),
      content,
      ...(post.faq ?? []).flatMap((item) => [item.pregunta, item.respuesta]),
    ]
    posts.push({
      ...post,
      fecha_modificacion: post.fecha_modificacion ?? post.fecha_publicacion,
      body: content,
      readingMinutes: readingMinutes(readable.filter(Boolean).join("\n")),
    })
  }

  const slugByKeyword = new Map<string, string>()
  const valid = posts.filter((post) => {
    const keyword = post.keyword_principal.toLowerCase()
    const other = slugByKeyword.get(keyword)
    if (!other) {
      slugByKeyword.set(keyword, post.slug)
      return true
    }
    errors.push(`keyword_principal "${post.keyword_principal}" repetida en ${other}.md y ${post.slug}.md`)
    return false
  })

  reportContentErrors("Contenido del blog inválido", errors)
  return valid.sort((a, b) => b.fecha_publicacion.getTime() - a.fecha_publicacion.getTime())
}

export const getAllPosts = cache(() => withProductionFallback("Posts del blog", loadPosts, (): Post[] => []))

/** Drafts are hidden only in production; see isProductionBuild(). */
export const getVisiblePosts = cache(() =>
  getAllPosts().filter((post) => !post.draft || !isProductionBuild()),
)

export function getPost(slug: string): Post | undefined {
  return getVisiblePosts().find((post) => post.slug === slug)
}

export function getPostsByCluster(cluster: string): Post[] {
  return getVisiblePosts().filter((post) => post.cluster === cluster)
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getVisiblePosts().filter((candidate) => candidate.slug !== post.slug)
  const sameCluster = getCluster(post.cluster).hub ? others.filter((candidate) => candidate.cluster === post.cluster) : []
  const rest = others.filter((candidate) => !sameCluster.includes(candidate))
  return [...sameCluster, ...rest].slice(0, limit)
}

export function getListingPage(page: number) {
  const [featured, ...rest] = getVisiblePosts()
  const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE))
  const posts = rest.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  return { featured, posts, totalPages }
}

export function getPostsByPerson(id: string) {
  const posts = getVisiblePosts()
  return {
    authored: posts.filter((post) => post.autor === id),
    reviewed: posts.filter((post) => post.revisado_por === id && post.autor !== id),
  }
}

/** Author pages: complete person entries that sign or review a visible post (all of them outside production, for review). */
export function getAuthorPages(): PersonAuthor[] {
  const people = AUTHORS.filter(isPerson)
  if (!isProductionBuild()) return people
  const posts = getVisiblePosts()
  return people.filter((person) => posts.some((post) => post.autor === person.id || post.revisado_por === person.id))
}
