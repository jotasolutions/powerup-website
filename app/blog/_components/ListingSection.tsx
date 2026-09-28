import type { Post } from "@/lib/blog/posts"
import type { Cluster } from "@/lib/blog/taxonomy"
import { ClusterChips } from "./ClusterChips"
import { Pagination } from "./Pagination"
import { PostGrid } from "./PostCards"
import { container } from "./styles"

export function ListingSection({
  title,
  headingAs: Heading = "h2",
  posts,
  clusters,
  page,
  totalPages,
}: {
  title: string
  headingAs?: "h1" | "h2"
  posts: Post[]
  clusters: Cluster[]
  page: number
  totalPages: number
}) {
  return (
    <section id="articulos" aria-labelledby="articulos-title" className={`${container} flex scroll-mt-24 flex-col gap-7 pb-6 pt-12`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading id="articulos-title" className="font-heading text-[26px] font-medium tracking-tight text-slate-900 md:text-[30px]">
          {title}
        </Heading>
        <ClusterChips clusters={clusters} />
      </div>
      {posts.length > 0 && <PostGrid posts={posts} />}
      <Pagination page={page} totalPages={totalPages} />
    </section>
  )
}
