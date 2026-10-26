import { ITALIAN_BLOG_NAME } from "@/lib/blog/config"
import { renderOgImage } from "@/lib/blog/og-image"
import { getItalianPost } from "@/lib/blog/posts"

export const alt = `Articolo del ${ITALIAN_BLOG_NAME}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getItalianPost((await params).slug)
  if (!post) return new Response("Not found", { status: 404 })
  return renderOgImage({ eyebrow: ITALIAN_BLOG_NAME, title: post.title })
}
