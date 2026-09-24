import { BLOG_NAME } from "@/lib/blog/config"
import { renderOgImage } from "@/lib/blog/og-image"

export const alt = BLOG_NAME
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({ eyebrow: BLOG_NAME, title: "Ideas para que tu carta venda más" })
}
