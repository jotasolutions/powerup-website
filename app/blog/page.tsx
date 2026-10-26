import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getClusterPages } from "@/lib/blog/clusters"
import { BLOG_DESCRIPTION, BLOG_NAME, BLOG_PATH } from "@/lib/blog/config"
import { blogMetadata } from "@/lib/blog/metadata"
import { getListingPage } from "@/lib/blog/posts"
import { collectionPageJsonLd } from "@/lib/blog/structured-data"
import { AdvisorPromoWide } from "./_components/AdvisorPromo"
import { BlogHero } from "./_components/BlogHero"
import { ClientQuote } from "./_components/ClientQuote"
import { JsonLd } from "./_components/JsonLd"
import { ListingSection } from "./_components/ListingSection"
import { PressSection } from "./_components/PressSection"
import { container } from "./_components/styles"

export const metadata: Metadata = blogMetadata({
  path: BLOG_PATH,
  title: { absolute: `${BLOG_NAME}: ideas para que tu carta venda más` },
  description: BLOG_DESCRIPTION,
})

export default function BlogHomePage() {
  const { featured, posts, totalPages } = getListingPage(1)
  if (!featured) notFound()

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({ path: BLOG_PATH, name: BLOG_NAME, description: BLOG_DESCRIPTION, posts: [featured, ...posts] })}
      />
      <BlogHero featured={featured} />
      <ListingSection title="Últimos artículos" posts={posts} clusters={getClusterPages()} page={1} totalPages={totalPages} />
      <section className="mt-10 bg-gradient-to-b from-[#F0FFF5] to-[#CBFFDC] py-12 md:py-16">
        <div className={container}>
          {/* A customer's words beside the Advisor, as in the blog's first design. On phones the
              Advisor comes first, so the quote never pushes the button down. */}
          <div className="mx-auto grid max-w-[760px] gap-6 lg:max-w-none lg:grid-cols-[1fr_1.25fr] lg:items-stretch">
            <div className="order-last lg:order-none">
              <ClientQuote />
            </div>
            <AdvisorPromoWide />
          </div>
        </div>
      </section>
      <PressSection />
    </>
  )
}
