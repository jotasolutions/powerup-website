import { BLOG_NAME } from "@/lib/blog/config"
import { renderOgImage } from "@/lib/blog/og-image"
import { getPost } from "@/lib/blog/posts"
import { getCluster } from "@/lib/blog/taxonomy"

export const alt = `Artículo del ${BLOG_NAME}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) return new Response("Not found", { status: 404 })
  const cluster = getCluster(post.cluster)
  return renderOgImage({ eyebrow: cluster.hub ? cluster.label : BLOG_NAME, title: post.title })
}
