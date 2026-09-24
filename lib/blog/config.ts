import { SITE_URL } from "@/lib/site"

export const BLOG_NAME = "Blog de PowerUp Menu"
export const BLOG_DESCRIPTION =
  "Ingeniería de menú, neuromarketing y casos reales de restaurantes. Para dueños, no para técnicos."
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

function withBlogUtm(baseUrl: string, campaign: string) {
  const url = new URL(baseUrl)
  url.searchParams.set("utm_source", "powerup-blog")
  url.searchParams.set("utm_medium", "cta")
  url.searchParams.set("utm_campaign", campaign)
  return url.toString()
}

export const maestroUrl = (campaign: string) => withBlogUtm(MAESTRO_URL, campaign)
export const exampleMenuUrl = (campaign: string) => withBlogUtm(EXAMPLE_MENU_URL, campaign)
