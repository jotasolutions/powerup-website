import "server-only"

import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import { z } from "zod"
import { isProductionBuild } from "./draft"
import { readMarkdownFile, reportContentErrors, withProductionFallback } from "./isolation"
import { getAllPosts, getPostsByCluster } from "./posts"
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
    const source = readMarkdownFile(path.join(TEXTS_DIR, file), `temas/${file}`, errors)
    if (!source) continue
    const parsed = clusterTextSchema.safeParse(source.data)
    if (!parsed.success) errors.push(`temas/${file}:\n${z.prettifyError(parsed.error)}`)
    else texts.set(slug, { ...parsed.data, body: source.content })
  }

  // Two URLs chasing the same search compete with each other. A clash is reported, but the text
  // stays: it's an SEO problem, not a broken page.
  const owners = new Map(getAllPosts().map((post) => [post.keyword_principal.toLowerCase(), `${post.slug}.md`]))
  for (const [slug, text] of texts) {
    const keyword = text.keyword_principal.toLowerCase()
    const owner = owners.get(keyword)
    if (owner) errors.push(`keyword_principal "${text.keyword_principal}" repetida en temas/${slug}.md y ${owner}`)
    else owners.set(keyword, `temas/${slug}.md`)
  }

  reportContentErrors("Textos de clúster inválidos", errors)
  return texts
}

export const getClusterTexts = cache(() =>
  withProductionFallback("Textos de clúster", loadClusterTexts, () => new Map<ClusterSlug, ClusterText>()),
)

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
