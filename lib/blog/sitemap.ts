import "server-only"

import type { MetadataRoute } from "next"
import { getClusterPages } from "./clusters"
import { BLOG_PATH, absoluteUrl, authorPath, clusterPath, postPath } from "./config"
import { getAuthorPages, getPostsByCluster, getPostsByPerson, getVisiblePosts, type Post } from "./posts"

function lastModified(posts: Post[]) {
  if (posts.length === 0) return {}
  return { lastModified: new Date(Math.max(...posts.map((post) => post.fecha_modificacion.getTime()))) }
}

export function blogSitemapEntries(): MetadataRoute.Sitemap {
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
