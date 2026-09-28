import "server-only"

import fs from "node:fs"
import path from "node:path"
import { BLOG_PATH, absoluteUrl, clusterPath, isMaestroUrl, postPath, withBlogUtm } from "./config"

export type RedirectRules = {
  /** Old blog path (no leading or trailing slash; "" is the root) → new path, from the 301 rows. */
  redirects: ReadonlyMap<string, string>
  /** Old blog paths answered with 410: no destination. */
  discarded: ReadonlySet<string>
  /** Old blog path prefixes answered with 410 ("tag/", "author/"). */
  discardedPrefixes: readonly string[]
}

export type LinkContext = RedirectRules & {
  /** Posts published in this build. */
  publishedSlugs: ReadonlySet<string>
  /** Cluster of every post, drafts included: a link to a post that isn't published falls back to its theme. */
  postClusters: ReadonlyMap<string, string>
  /** Theme pages published in this build. */
  publishedClusters: ReadonlySet<string>
}

export type LinkAction =
  | { type: "keep" }
  | { type: "rewrite"; href: string }
  | { type: "unwrap" }
  | { type: "unresolved" }

const LEGACY_BLOG = /^https?:\/\/blog\.powerup\.menu(?=[/?#]|$)/i
const MAIN_SITE = /^https?:\/\/(?:www\.)?powerup\.menu(?=[/?#]|$)/i
const THEME_TARGET = /^\/blog\/tema\/([a-z0-9-]+)$/
const POST_TARGET = /^\/blog\/([a-z0-9-]+)$/

export function isLegacyUpload(src: string): boolean {
  return /\/wp-content\//i.test(src)
}

export function normalizeLegacyPath(value: string): string {
  return value.trim().replace(/^\/+|\/+$/g, "")
}

/**
 * A redirect target that isn't published in this build falls back to the next criterion of the
 * map: a post to its theme, and a theme to no link at all (it would be a 410).
 */
function publishedTarget(target: string, context: LinkContext): string | undefined {
  const theme = THEME_TARGET.exec(target)
  if (theme) return context.publishedClusters.has(theme[1]) ? target : undefined
  const post = POST_TARGET.exec(target)
  if (!post || context.publishedSlugs.has(post[1])) return target
  const cluster = context.postClusters.get(post[1])
  return cluster && context.publishedClusters.has(cluster) ? clusterPath(cluster) : undefined
}

export function resolveLink(href: string, context: LinkContext): LinkAction {
  if (LEGACY_BLOG.test(href)) {
    const legacyPath = normalizeLegacyPath(new URL(href).pathname)
    if (legacyPath.startsWith("wp-content/")) return { type: "unwrap" }
    const target = context.postClusters.has(legacyPath) ? postPath(legacyPath) : context.redirects.get(legacyPath)
    if (target !== undefined) {
      const resolved = publishedTarget(target, context)
      return resolved ? { type: "rewrite", href: resolved } : { type: "unwrap" }
    }
    if (legacyPath === "") return { type: "rewrite", href: BLOG_PATH }
    if (context.discarded.has(legacyPath) || context.discardedPrefixes.some((prefix) => legacyPath.startsWith(prefix))) {
      return { type: "unwrap" }
    }
    return { type: "unresolved" }
  }
  if (MAIN_SITE.test(href)) {
    const url = new URL(href)
    return { type: "rewrite", href: `${url.pathname}${url.search}${url.hash}` }
  }
  return { type: "keep" }
}

export function destinationExists(target: string, postSlugs: ReadonlySet<string>, themes: ReadonlySet<string>): boolean {
  if (target === BLOG_PATH || target === `${BLOG_PATH}/feed.xml`) return true
  const theme = THEME_TARGET.exec(target)
  if (theme) return themes.has(theme[1])
  const post = POST_TARGET.exec(target)
  return Boolean(post && postSlugs.has(post[1]))
}

const REDIRECTS_FILE = path.join(process.cwd(), "content/blog/redirects.csv")

/**
 * Reads content/blog/redirects.csv: columns slug_origen, tipo, status_code, destino, nota (the
 * note is last, so it may contain commas). `slug_origen` is the old blog path without slashes,
 * "/" for the root, and a trailing "/*" makes it a prefix. Problems go to `errors`.
 */
export function loadRedirectRules(errors: string[]): RedirectRules {
  const redirects = new Map<string, string>()
  const discarded = new Set<string>()
  const discardedPrefixes: string[] = []
  const rules = { redirects, discarded, discardedPrefixes }
  if (!fs.existsSync(REDIRECTS_FILE)) return rules

  const [header = "", ...rows] = fs.readFileSync(REDIRECTS_FILE, "utf8").split(/\r?\n/).filter((line) => line.trim())
  const columns = header.split(",").map((column) => column.trim())
  const [origin, status, destination] = ["slug_origen", "status_code", "destino"].map((name) => columns.indexOf(name))
  if (origin < 0 || status < 0 || destination < 0) {
    errors.push("redirects.csv: faltan las columnas slug_origen, status_code o destino")
    return rules
  }

  for (const [index, row] of rows.entries()) {
    const cells = row.split(",").map((cell) => cell.trim())
    const line = `redirects.csv, línea ${index + 2}`
    const from = normalizeLegacyPath(cells[origin] ?? "")
    if (!from && cells[origin] !== "/") {
      errors.push(`${line}: falta slug_origen`)
    } else if (cells[status] === "410") {
      if (from.endsWith("/*")) discardedPrefixes.push(from.slice(0, -1))
      else discarded.add(from)
    } else if (cells[status] !== "301") {
      errors.push(`${line}: status_code "${cells[status]}" no es 301 ni 410`)
    } else {
      const to = (cells[destination] ?? "").replace(/(.)\/+$/, "$1")
      if (to.startsWith(BLOG_PATH)) redirects.set(from, to)
      else errors.push(`${line}: el destino "${to}" no es una ruta del blog nuevo`)
    }
  }
  return rules
}

const absolutize = (href: string) => (href.startsWith("/") ? absoluteUrl(href) : href)

/** Same rules as the HTML pipeline, applied to Markdown source for the /blog/md/<slug> version. */
export function rewriteMarkdownLinks(markdown: string, context: LinkContext, campaign: string): string {
  const rewrite = (href: string) => {
    if (isMaestroUrl(href)) return withBlogUtm(href, campaign, "texto")
    const action = resolveLink(href, context)
    return action.type === "unwrap" ? undefined : absolutize(action.type === "rewrite" ? action.href : href)
  }
  return markdown
    .replace(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, src: string) =>
      isLegacyUpload(src) ? "" : match.replace(src, absolutize(src)),
    )
    .replace(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi, (match, src: string) =>
      isLegacyUpload(src) ? "" : match.replace(src, absolutize(src)),
    )
    .replace(/(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, label: string, href: string) => {
      const target = rewrite(href)
      return target === undefined ? label : `[${label}](${target})`
    })
    .replace(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (match, href: string, label: string) => {
      const target = rewrite(href)
      return target === undefined ? label : match.replace(href, target)
    })
}
