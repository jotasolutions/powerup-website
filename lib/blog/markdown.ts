import "server-only"

import type { Element, ElementContent, Root } from "hast"
import { toString } from "hast-util-to-string"
import rehypeRaw from "rehype-raw"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { SKIP, visit } from "unist-util-visit"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { isMaestroUrl, withBlogUtm } from "./config"
import { isLegacyUpload, resolveLink, type LinkContext } from "./legacy-links"
import { asciiSlug } from "./slug"

export type TocItem = { id: string; text: string; level: 2 | 3 }

export type RenderedMarkdown = { html: string; toc: TocItem[]; warnings: string[] }

// GitHub's default allowlist drops <figure>/<figcaption>, which WordPress uses for every captioned image.
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "figure", "figcaption"],
}

const HEADING_LEVELS: Record<string, number> = { h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 }
const MEDIA_TAGS = ["img", "picture", "video", "table"]
const CLOBBER_PREFIX = "user-content-"

function replaceChild(parent: Root | Element, index: number, ...nodes: ElementContent[]) {
  const children = parent.children as ElementContent[]
  children.splice(index, 1, ...nodes)
}

function containsTag(node: Element, tags: string[]): boolean {
  return node.children.some(
    (child) => child.type === "element" && (tags.includes(child.tagName) || containsTag(child, tags)),
  )
}

/** In-text links to Maestro get the same UTMs and click tracking as the Maestro CTAs. */
function tagMaestroLink(node: Element, campaign: string) {
  const href = withBlogUtm(String(node.properties.href), campaign, "texto")
  const attrs = trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "maestro", location: "blog", linkUrl: href })
  Object.assign(node.properties, { href, target: "_blank", rel: ["noopener", "noreferrer"] })
  for (const [name, value] of Object.entries(attrs)) {
    node.properties[name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())] = value
  }
}

function rewriteLegacyContent(tree: Root, links: LinkContext, campaign: string, warnings: string[]) {
  visit(tree, "element", (node, index, parent) => {
    if (!parent || index === undefined) return
    if (node.tagName === "img") {
      if (isLegacyUpload(String(node.properties.src ?? ""))) {
        replaceChild(parent, index)
        return index
      }
      node.properties.loading = "lazy"
      node.properties.decoding = "async"
      return
    }
    if (node.tagName !== "a") return
    const href = String(node.properties.href ?? "")
    if (isMaestroUrl(href)) {
      tagMaestroLink(node, campaign)
      return
    }
    const action = resolveLink(href, links)
    if (action.type === "rewrite") node.properties.href = action.href
    if (action.type === "unresolved") warnings.push(`enlace al blog viejo sin destino: ${href}`)
    if (action.type === "unwrap") {
      replaceChild(parent, index, ...node.children)
      return index
    }
  })
}

function pruneEmptyBlocks(tree: Root) {
  visit(tree, "element", (node, index, parent) => {
    if (!parent || index === undefined) return
    const empty =
      (node.tagName === "figure" && !containsTag(node, MEDIA_TAGS)) ||
      (node.tagName === "p" && toString(node).trim() === "" && !containsTag(node, MEDIA_TAGS))
    if (!empty) return
    replaceChild(parent, index)
    return index
  })
}

/**
 * remark-rehype already prefixes footnote ids with "user-content-" and rehype-sanitize prefixes
 * every id again, so the ids no longer match the footnote links ("#user-content-fn-1").
 */
function collapseDoubleClobberPrefix(tree: Root) {
  visit(tree, "element", (node) => {
    const id = node.properties.id
    if (typeof id === "string" && id.startsWith(CLOBBER_PREFIX + CLOBBER_PREFIX)) {
      node.properties.id = id.slice(CLOBBER_PREFIX.length)
    }
  })
}

function isVisuallyHidden(node: Element) {
  const className = node.properties.className
  return Array.isArray(className) && className.includes("sr-only")
}

function wrapTables(tree: Root) {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "table" || !parent || index === undefined) return
    replaceChild(parent, index, {
      type: "element",
      tagName: "div",
      properties: { dataTableWrap: "" },
      children: [node],
    })
    return SKIP
  })
}

/** Body headings start at h2: the page's only h1 is the frontmatter title. */
function addHeadingIds(tree: Root, reservedIds: string[]): TocItem[] {
  const toc: TocItem[] = []
  const used = new Set(reservedIds)
  visit(tree, "element", (node) => {
    if (node.tagName === "h1") node.tagName = "h2"
    const level = HEADING_LEVELS[node.tagName]
    // The hidden footnotes heading keeps its id: aria-describedby on every footnote ref points to it.
    if (!level || isVisuallyHidden(node)) return
    const text = toString(node).trim()
    const base = asciiSlug(text) || "seccion"
    let id = base
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`
    used.add(id)
    node.properties.id = id
    if (level === 2 || level === 3) toc.push({ id, text, level })
  })
  return toc
}

export async function renderMarkdown(
  markdown: string,
  { links, reservedIds = [], campaign }: { links: LinkContext; reservedIds?: string[]; campaign: string },
): Promise<RenderedMarkdown> {
  const warnings: string[] = []
  let toc: TocItem[] = []

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true, footnoteLabel: "Notas", footnoteBackLabel: "Volver al texto" })
    .use(rehypeRaw)
    .use(rehypeSanitize, sanitizeSchema)
    .use(() => (tree: Root) => {
      collapseDoubleClobberPrefix(tree)
      rewriteLegacyContent(tree, links, campaign, warnings)
      pruneEmptyBlocks(tree)
      wrapTables(tree)
      toc = addHeadingIds(tree, reservedIds)
    })
    .use(rehypeStringify)
    .process(markdown)

  return { html: String(file), toc, warnings }
}
