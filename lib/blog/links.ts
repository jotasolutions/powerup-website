import "server-only"

import { cache } from "react"
import { getClusterPages } from "./clusters"
import { reportContentErrors, withProductionFallback } from "./isolation"
import { destinationExists, loadRedirectRules, type LinkContext, type RedirectRules } from "./legacy-links"
import { getAllPosts, getVisiblePosts } from "./posts"
import { HUB_CLUSTERS } from "./taxonomy"

const NO_RULES: RedirectRules = { redirects: new Map(), discarded: new Set(), discardedPrefixes: [] }

/** Destinations must exist as a post (draft or not) or a theme; in production a broken rule is dropped. */
function loadValidRedirectRules(): RedirectRules {
  const errors: string[] = []
  const rules = loadRedirectRules(errors)
  const posts = new Set(getAllPosts().map((post) => post.slug))
  const themes = new Set<string>(HUB_CLUSTERS.map((cluster) => cluster.slug))
  const redirects = new Map(
    [...rules.redirects].filter(([from, to]) => {
      if (destinationExists(to, posts, themes)) return true
      errors.push(`redirects.csv: el destino de "${from || "/"}" (${to}) no existe en el blog`)
      return false
    }),
  )
  reportContentErrors("Mapa de redirecciones inválido", errors)
  return { ...rules, redirects }
}

export const getLinkContext = cache(
  (): LinkContext => ({
    publishedSlugs: new Set(getVisiblePosts().map((post) => post.slug)),
    postClusters: new Map(getAllPosts().map((post) => [post.slug, post.cluster])),
    publishedClusters: new Set(getClusterPages().map((cluster) => cluster.slug)),
    ...withProductionFallback("redirects.csv", loadValidRedirectRules, () => NO_RULES),
  }),
)
