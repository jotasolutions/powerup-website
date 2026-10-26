import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AdvisorPromoSidebar } from "@/app/blog/_components/AdvisorPromo"
import { container, pageTitle } from "@/app/blog/_components/styles"
import { ITALIAN_BLOG_NAME, ITALIAN_BLOG_PATH } from "@/lib/blog/config"
import { blogMetadata } from "@/lib/blog/metadata"
import { getVisibleItalianPosts } from "@/lib/blog/posts"
import { ItalianPostCard } from "./ItalianPostCard"

const DESCRIPTION =
  "Guide pratiche sul menù digitale con QR code per ristoranti: come crearlo, cosa deve contenere e come farlo vendere di più. Scritte per chi gestisce un locale."

export const metadata: Metadata = blogMetadata({
  path: ITALIAN_BLOG_PATH,
  title: { absolute: `${ITALIAN_BLOG_NAME}: guide sul menù digitale` },
  description: DESCRIPTION,
  locale: "it_IT",
})

// A short list while there are few Italian posts: no pagination or themes yet.
export default function ItalianBlogPage() {
  const posts = getVisibleItalianPosts()
  if (posts.length === 0) notFound()

  return (
    <div className={`${container} flex flex-col gap-10 pb-16 pt-10`}>
      <header className="flex max-w-[720px] flex-col gap-3">
        <h1 className={pageTitle}>{ITALIAN_BLOG_NAME}</h1>
        <p className="text-lg leading-relaxed text-slate-600">{DESCRIPTION}</p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ul className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <ItalianPostCard post={post} />
            </li>
          ))}
        </ul>
        <aside>
          <AdvisorPromoSidebar locale="it" />
        </aside>
      </div>
    </div>
  )
}
