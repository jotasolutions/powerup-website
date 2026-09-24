import "server-only"

import { absoluteUrl, postPath } from "./config"
import { getVisiblePosts } from "./posts"

/** "## Blog" section for llms.txt. Links point to the HTML pages (which carry the CTAs), never to /blog/md. */
export function blogLlmsSection(): string {
  const posts = getVisiblePosts()
  if (posts.length === 0) return ""
  const lines = posts.map((post) => `- [${post.title}](${absoluteUrl(postPath(post.slug))}): ${post.excerpt}`)
  return `## Blog\n${lines.join("\n")}\n\n`
}
