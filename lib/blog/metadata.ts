import type { Metadata } from "next"
import { BLOG_NAME, FEED_PATH, absoluteUrl } from "./config"

type BlogMetadataInput = {
  path: string
  title: string | { absolute: string }
  description: string
  noindex?: boolean
  markdownPath?: string
  article?: { publishedTime: Date; modifiedTime: Date; authors: string[]; section?: string }
}

/**
 * Every blog page builds its whole metadata here. Next.js replaces a parent's `alternates`,
 * `openGraph` or `robots` object wholesale when a page sets its own, so partial overrides
 * silently drop fields (that is how canonical and Open Graph broke on the rest of the site).
 */
export function blogMetadata({
  path,
  title,
  description,
  noindex = false,
  markdownPath,
  article,
}: BlogMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const ogTitle = typeof title === "string" ? title : title.absolute
  const types: Record<string, { url: string; title: string }[]> = {
    "application/rss+xml": [{ url: absoluteUrl(FEED_PATH), title: BLOG_NAME }],
  }
  if (markdownPath) types["text/markdown"] = [{ url: absoluteUrl(markdownPath), title: ogTitle }]
  const robots = { index: !noindex, follow: true, "max-image-preview": "large" as const }
  const shared = { url, title: ogTitle, description, siteName: "PowerUp Menu", locale: "es_ES" }

  return {
    title,
    description,
    alternates: { canonical: url, types },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime.toISOString(),
          modifiedTime: article.modifiedTime.toISOString(),
          authors: article.authors,
          section: article.section,
        }
      : { ...shared, type: "website" },
    twitter: { card: "summary_large_image", title: ogTitle, description },
    robots: { ...robots, googleBot: robots },
  }
}
