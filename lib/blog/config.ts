import { SITE_URL } from "@/lib/site"

export const BLOG_NAME = "Blog de PowerUp Menu"
export const BLOG_DESCRIPTION =
  "Ideas para que la carta de tu restaurante venda más: ingeniería de menú, neuromarketing y casos reales. Escrito para dueños, no para técnicos."
export const POSTS_PER_PAGE = 9

export const BLOG_PATH = "/blog"
export const FEED_PATH = `${BLOG_PATH}/feed.xml`

export const postPath = (slug: string) => `${BLOG_PATH}/${slug}`
export const clusterPath = (cluster: string) => `${BLOG_PATH}/tema/${cluster}`
export const authorPath = (id: string) => `${BLOG_PATH}/autor/${id}`
export const markdownPath = (slug: string) => `${BLOG_PATH}/md/${slug}`
export const listingPath = (page: number) =>
  page <= 1 ? BLOG_PATH : `${BLOG_PATH}/pagina/${page}`

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`

const MAESTRO_URL = "https://maestro.powerup.menu/"
const EXAMPLE_MENU_URL = "https://carta.powerup.menu/trpico-brunch-barcelona-balmes"

/** `content` tells apart where the click came from: "banner", "texto" (inside the article)… */
export function withBlogUtm(baseUrl: string, campaign: string, content?: string) {
  const url = new URL(baseUrl)
  url.searchParams.set("utm_source", "powerup-blog")
  url.searchParams.set("utm_medium", "cta")
  url.searchParams.set("utm_campaign", campaign)
  if (content) url.searchParams.set("utm_content", content)
  return url.toString()
}

export function isMaestroUrl(href: string): boolean {
  return URL.canParse(href) && new URL(href).hostname === new URL(MAESTRO_URL).hostname
}

export const maestroUrl = (campaign: string, content?: string) => withBlogUtm(MAESTRO_URL, campaign, content)
export const exampleMenuUrl = (campaign: string) => withBlogUtm(EXAMPLE_MENU_URL, campaign)
