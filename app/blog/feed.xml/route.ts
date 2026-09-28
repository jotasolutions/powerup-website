import { BLOG_DESCRIPTION, BLOG_NAME, BLOG_PATH, FEED_PATH, absoluteUrl, postPath } from "@/lib/blog/config"
import { getVisiblePosts } from "@/lib/blog/posts"
import { getCluster } from "@/lib/blog/taxonomy"

export const dynamic = "force-static"

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

export function GET() {
  const posts = getVisiblePosts()
  const items = posts.map((post) => {
    const url = absoluteUrl(postPath(post.slug))
    const cluster = getCluster(post.cluster)
    return [
      "<item>",
      `<title>${escapeXml(post.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${post.fecha_publicacion.toUTCString()}</pubDate>`,
      `<description>${escapeXml(post.excerpt)}</description>`,
      cluster.hub ? `<category>${escapeXml(cluster.label)}</category>` : "",
      "</item>",
    ].join("")
  })
  const lastBuildDate = posts.length
    ? `<lastBuildDate>${new Date(Math.max(...posts.map((post) => post.fecha_modificacion.getTime()))).toUTCString()}</lastBuildDate>`
    : ""

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>',
    `<title>${escapeXml(BLOG_NAME)}</title>`,
    `<link>${absoluteUrl(BLOG_PATH)}</link>`,
    `<description>${escapeXml(BLOG_DESCRIPTION)}</description>`,
    "<language>es-ES</language>",
    `<atom:link href="${absoluteUrl(FEED_PATH)}" rel="self" type="application/rss+xml"/>`,
    lastBuildDate,
    ...items,
    "</channel></rss>",
  ].join("\n")

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
