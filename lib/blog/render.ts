import "server-only"

import { getClusterTexts } from "./clusters"
import { withProductionFallbackAsync } from "./isolation"
import { getLinkContext } from "./links"
import { renderMarkdown } from "./markdown"
import { warnOnce, type Post } from "./posts"
import type { ClusterSlug } from "./taxonomy"

/** Returns undefined when a post fails to render in production, so its page is left out instead of failing the build. */
export async function renderPostBody(post: Post, reservedIds: string[]) {
  const rendered = await withProductionFallbackAsync(
    `${post.slug}.md no se pudo renderizar`,
    () => renderMarkdown(post.body, { links: getLinkContext(), reservedIds, campaign: post.slug }),
    () => undefined,
  )
  for (const warning of rendered?.warnings ?? []) warnOnce(`${post.slug}.md: ${warning}`)
  return rendered
}

/** Undefined when there is no text, or when it fails to render in production. */
export async function renderClusterText(slug: ClusterSlug, reservedIds: string[]) {
  const text = getClusterTexts().get(slug)
  if (!text) return undefined
  const rendered = await withProductionFallbackAsync(
    `temas/${slug}.md no se pudo renderizar`,
    () => renderMarkdown(text.body, { links: getLinkContext(), reservedIds, campaign: `tema-${slug}` }),
    () => undefined,
  )
  if (!rendered) return undefined
  for (const warning of rendered.warnings) warnOnce(`temas/${slug}.md: ${warning}`)
  return { ...text, ...rendered }
}
