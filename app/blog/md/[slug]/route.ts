import { absoluteUrl, postPath } from "@/lib/blog/config"
import { withProductionFallback } from "@/lib/blog/isolation"
import { postToMarkdown } from "@/lib/blog/markdown-export"
import { getPost, getVisiblePosts } from "@/lib/blog/posts"

export const dynamic = "force-static"
export const dynamicParams = false

// Same source as /blog/[slug], so a draft hidden there can't leak here.
export function generateStaticParams() {
  return getVisiblePosts().map((post) => ({ slug: post.slug }))
}

// Only a canonical pointing at the HTML page: combining it with X-Robots-Tag noindex would
// send search engines two conflicting signals.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  const markdown = post
    ? withProductionFallback(`${post.slug}.md (versión Markdown)`, () => postToMarkdown(post), () => undefined)
    : undefined
  if (!post || markdown === undefined) return new Response("Not found", { status: 404 })
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${absoluteUrl(postPath(post.slug))}>; rel="canonical"`,
    },
  })
}
