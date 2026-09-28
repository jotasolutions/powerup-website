import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getClusterPages } from "@/lib/blog/clusters"
import { BLOG_DESCRIPTION, BLOG_PATH, listingPath } from "@/lib/blog/config"
import { blogMetadata } from "@/lib/blog/metadata"
import { getListingPage } from "@/lib/blog/posts"
import { Breadcrumbs } from "../../_components/Breadcrumbs"
import { ListingSection } from "../../_components/ListingSection"
import { container } from "../../_components/styles"

type Props = { params: Promise<{ n: string }> }

export const dynamicParams = false

/** Page 1 is /blog itself; only 2..N exist here. */
export function generateStaticParams() {
  const { totalPages } = getListingPage(1)
  return Array.from({ length: totalPages - 1 }, (_, index) => ({ n: String(index + 2) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params
  return blogMetadata({
    path: listingPath(Number(n)),
    title: `Todos los artículos, página ${n}`,
    description: BLOG_DESCRIPTION,
  })
}

export default async function ListingPage({ params }: Props) {
  const page = Number((await params).n)
  const { posts, totalPages } = getListingPage(page)
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound()

  return (
    <>
      <div className={`${container} pt-8`}>
        <Breadcrumbs items={[{ name: "Blog", path: BLOG_PATH }, { name: `Página ${page}` }]} />
      </div>
      <ListingSection
        headingAs="h1"
        title={`Todos los artículos · página ${page}`}
        posts={posts}
        clusters={getClusterPages()}
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
