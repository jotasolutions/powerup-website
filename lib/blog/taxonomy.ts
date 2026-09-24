export const CLUSTER_SLUGS = [
  "ingenieria-de-menu",
  "rentabilidad-y-costes",
  "psicologia-y-precios",
  "carta-digital",
  "casos-practicos",
  "fuera-de-foco",
] as const

export type ClusterSlug = (typeof CLUSTER_SLUGS)[number]

export type Cluster = {
  slug: ClusterSlug
  label: string
  tint: string
  /** Has its own /blog/tema page and navigation chip. */
  hub: boolean
}

// fuera-de-foco has no hub page or chip: a hub for scattered topics signals low topical focus.
export const CLUSTERS: readonly Cluster[] = [
  { slug: "ingenieria-de-menu", label: "Ingeniería de menú", tint: "#FFEBAB", hub: true },
  { slug: "rentabilidad-y-costes", label: "Rentabilidad y costes", tint: "#DFFFEA", hub: true },
  { slug: "psicologia-y-precios", label: "Psicología y precios", tint: "#F8F0FF", hub: true },
  { slug: "carta-digital", label: "Carta digital", tint: "#DEF8FF", hub: true },
  { slug: "casos-practicos", label: "Casos prácticos", tint: "#CEEDB8", hub: true },
  { slug: "fuera-de-foco", label: "Fuera de foco", tint: "#F1F5F9", hub: false },
]

export const HUB_CLUSTERS = CLUSTERS.filter((cluster) => cluster.hub)

export function getCluster(slug: ClusterSlug): Cluster {
  const cluster = CLUSTERS.find((candidate) => candidate.slug === slug)
  if (!cluster) throw new Error(`Unknown blog cluster: ${slug}`)
  return cluster
}

export function isHubCluster(slug: string): slug is ClusterSlug {
  return HUB_CLUSTERS.some((cluster) => cluster.slug === slug)
}
