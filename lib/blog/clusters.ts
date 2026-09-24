import "server-only"

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { cache } from "react"
import { z } from "zod"
import { isProductionBuild } from "./draft"
import { getLinkContext, getPostsByCluster, warnOnce } from "./posts"
import { renderMarkdown } from "./markdown"
import { clusterTextSchema, type ClusterTextFrontmatter } from "./schema"
import { HUB_CLUSTERS, isHubCluster, type Cluster, type ClusterSlug } from "./taxonomy"

const TEXTS_DIR = path.join(process.cwd(), "content/blog/temas")

export type ClusterText = ClusterTextFrontmatter & { body: string }

function loadClusterTexts(): Map<ClusterSlug, ClusterText> {
  const texts = new Map<ClusterSlug, ClusterText>()
  if (!fs.existsSync(TEXTS_DIR)) return texts
  const errors: string[] = []

  for (const file of fs.readdirSync(TEXTS_DIR).filter((name) => name.endsWith(".md"))) {
    const slug = file.replace(/\.md$/, "")
    if (!isHubCluster(slug)) {
      errors.push(`temas/${file}: "${slug}" no es un clúster con página`)
      continue
    }
    const { data, content } = matter(fs.readFileSync(path.join(TEXTS_DIR, file), "utf8"))
    const parsed = clusterTextSchema.safeParse(data)
    if (!parsed.success) errors.push(`temas/${file}:\n${z.prettifyError(parsed.error)}`)
    else texts.set(slug, { ...parsed.data, body: content })
  }

  if (errors.length > 0) throw new Error(`Textos de clúster inválidos:\n\n${errors.join("\n\n")}`)
  return texts
}

export const getClusterTexts = cache(loadClusterTexts)

/**
 * In production a cluster page exists only with a finished (non-draft) editorial text and at
 * least one published post; elsewhere every hub is generated so it can be reviewed.
 */
export function getClusterPages(): Cluster[] {
  if (!isProductionBuild()) return [...HUB_CLUSTERS]
  return HUB_CLUSTERS.filter((cluster) => {
    const text = getClusterTexts().get(cluster.slug)
    return Boolean(text && !text.draft && getPostsByCluster(cluster.slug).length > 0)
  })
}

export async function renderClusterText(slug: ClusterSlug, reservedIds: string[]) {
  const text = getClusterTexts().get(slug)
  if (!text) return undefined
  const rendered = await renderMarkdown(text.body, { links: getLinkContext(), reservedIds })
  for (const warning of rendered.warnings) warnOnce(`temas/${slug}.md: ${warning}`)
  return { ...text, ...rendered }
}
