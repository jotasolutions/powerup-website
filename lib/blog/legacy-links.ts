import "server-only"

import fs from "node:fs"
import path from "node:path"
import { absoluteUrl } from "./config"

export type LinkContext = {
  publishedSlugs: ReadonlySet<string>
  /** Old WordPress slug → new path, from content/blog/redirects.csv (301 rows). */
  redirects: ReadonlyMap<string, string>
  /** Old WordPress slugs marked DESCARTAR (410): no destination. */
  discarded: ReadonlySet<string>
}

export type LinkAction =
  | { type: "keep" }
  | { type: "rewrite"; href: string }
  | { type: "unwrap" }
  | { type: "unresolved" }

const LEGACY_BLOG = /^https?:\/\/blog\.powerup\.menu(?=[/?#]|$)/i
const MAIN_SITE = /^https?:\/\/(?:www\.)?powerup\.menu(?=[/?#]|$)/i

export function isLegacyUpload(src: string): boolean {
  return /\/wp-content\//i.test(src)
}

export function resolveLink(href: string, context: LinkContext): LinkAction {
  if (LEGACY_BLOG.test(href)) {
    const segments = new URL(href).pathname.split("/").filter(Boolean)
    if (segments.length === 0) return { type: "rewrite", href: "/blog" }
    if (segments[0] === "wp-content") return { type: "unwrap" }
    if (segments.length === 1) {
      const [slug] = segments
      if (context.publishedSlugs.has(slug)) return { type: "rewrite", href: `/blog/${slug}` }
      const target = context.redirects.get(slug)
      if (target) return { type: "rewrite", href: target }
      if (context.discarded.has(slug)) return { type: "unwrap" }
    }
    return { type: "unresolved" }
  }
  if (MAIN_SITE.test(href)) {
    const url = new URL(href)
    return { type: "rewrite", href: `${url.pathname}${url.search}${url.hash}` }
  }
  return { type: "keep" }
}

const REDIRECTS_FILE = path.join(process.cwd(), "content/blog/redirects.csv")

function lastSegment(value: string): string | undefined {
  const pathname = /^https?:\/\//i.test(value) ? new URL(value).pathname : value
  return pathname.split("/").filter(Boolean).pop()
}

function toPath(value: string): string {
  return MAIN_SITE.test(value) ? new URL(value).pathname : value
}

/** Reads redirects.csv (columns origen, destino, código) when it exists. */
export function loadRedirectMap(): Pick<LinkContext, "redirects" | "discarded"> {
  const redirects = new Map<string, string>()
  const discarded = new Set<string>()
  if (!fs.existsSync(REDIRECTS_FILE)) return { redirects, discarded }

  const [header = "", ...rows] = fs.readFileSync(REDIRECTS_FILE, "utf8").split(/\r?\n/).filter(Boolean)
  const columns = header.split(",").map((column) => column.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))
  const [origen, destino, codigo] = ["origen", "destino", "codigo"].map((name) => columns.indexOf(name))

  for (const row of rows) {
    const cells = row.split(",").map((cell) => cell.trim())
    const slug = lastSegment(cells[origen] ?? "")
    if (!slug) continue
    if (cells[codigo] === "410") discarded.add(slug)
    else if (cells[destino] && !cells[destino].startsWith("categoria:")) redirects.set(slug, toPath(cells[destino]))
  }
  return { redirects, discarded }
}

const absolutize = (href: string) => (href.startsWith("/") ? absoluteUrl(href) : href)

/** Same rules as the HTML pipeline, applied to Markdown source for the /blog/md/<slug> version. */
export function rewriteMarkdownLinks(markdown: string, context: LinkContext): string {
  return markdown
    .replace(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, src: string) =>
      isLegacyUpload(src) ? "" : match.replace(src, absolutize(src)),
    )
    .replace(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi, (match, src: string) =>
      isLegacyUpload(src) ? "" : match.replace(src, absolutize(src)),
    )
    .replace(/(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, label: string, href: string) => {
      const action = resolveLink(href, context)
      if (action.type === "unwrap") return label
      return `[${label}](${absolutize(action.type === "rewrite" ? action.href : href)})`
    })
    .replace(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (match, href: string, label: string) => {
      const action = resolveLink(href, context)
      if (action.type === "unwrap") return label
      return action.type === "rewrite" ? match.replace(href, absolutize(action.href)) : match
    })
}
