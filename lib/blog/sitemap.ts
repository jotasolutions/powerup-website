import "server-only"

import type { MetadataRoute } from "next"
import { getClusterPages } from "./clusters"
import { BLOG_PATH, ITALIAN_BLOG_PATH, absoluteUrl, authorPath, clusterPath, italianPostPath, postPath } from "./config"
import { withProductionFallback } from "./isolation"
import { getAuthorPages, getPostsByCluster, getPostsByPerson, getVisibleItalianPosts, getVisiblePosts, type Post } from "./posts"

function lastModified(posts: Post[]) {
  if (posts.length === 0) return {}
  return { lastModified: new Date(Math.max(...posts.map((post) => post.fecha_modificacion.getTime()))) }
}

/** In production a failure here leaves the blog out of the sitemap; the rest of the site's sitemap is still built. */
export function blogSitemapEntries(): MetadataRoute.Sitemap {
  return withProductionFallback("Sitemap del blog", buildSitemapEntries, (): MetadataRoute.Sitemap => [])
}

/** /it/blog and its posts, each pointing at the Spanish post it adapts. Same fallback as the Spanish blog. */
export function italianBlogSitemapEntries(): MetadataRoute.Sitemap {
  return withProductionFallback("Sitemap del blog italiano", buildItalianSitemapEntries, (): MetadataRoute.Sitemap => [])
}

function buildItalianSitemapEntries(): MetadataRoute.Sitemap {
  const posts = getVisibleItalianPosts()
  if (posts.length === 0) return []

  return [
    { url: absoluteUrl(ITALIAN_BLOG_PATH), ...lastModified(posts), changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: absoluteUrl(italianPostPath(post.slug)),
      lastModified: post.fecha_modificacion,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: { es: absoluteUrl(postPath(post.traduzione_di)) } },
    })),
  ]
}

function buildSitemapEntries(): MetadataRoute.Sitemap {
  const posts = getVisiblePosts()
  if (posts.length === 0) return []

  return [
    { url: absoluteUrl(BLOG_PATH), ...lastModified(posts), changeFrequency: "weekly", priority: 0.8 },
    ...getClusterPages().map((cluster) => ({
      url: absoluteUrl(clusterPath(cluster.slug)),
      ...lastModified(getPostsByCluster(cluster.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...getAuthorPages().map((person) => {
      const { authored, reviewed } = getPostsByPerson(person.id)
      return {
        url: absoluteUrl(authorPath(person.id)),
        ...lastModified([...authored, ...reviewed]),
        changeFrequency: "monthly" as const,
        priority: 0.4,
      }
    }),
    ...posts.map((post) => ({
      url: absoluteUrl(postPath(post.slug)),
      lastModified: post.fecha_modificacion,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
