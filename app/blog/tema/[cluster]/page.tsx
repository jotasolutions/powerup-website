import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getClusterPages, getClusterTexts, renderClusterText } from "@/lib/blog/clusters"
import { BLOG_PATH, clusterPath } from "@/lib/blog/config"
import { blogMetadata } from "@/lib/blog/metadata"
import { getPostsByCluster } from "@/lib/blog/posts"
import { breadcrumbJsonLd, collectionPageJsonLd, faqPageJsonLd } from "@/lib/blog/structured-data"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "../../_components/Breadcrumbs"
import { ClusterChips } from "../../_components/ClusterChips"
import { FaqSection, GEO_SECTION_IDS } from "../../_components/GeoBlocks"
import { JsonLd } from "../../_components/JsonLd"
import { PostList } from "../../_components/PostCards"
import styles from "../../_components/prose.module.css"
import { container, pageTitle, sectionTitle } from "../../_components/styles"

type Props = { params: Promise<{ cluster: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getClusterPages().map((cluster) => ({ cluster: cluster.slug }))
}

function findClusterPage(slug: string) {
  return getClusterPages().find((cluster) => cluster.slug === slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cluster = findClusterPage((await params).cluster)
  if (!cluster) return {}
  const text = getClusterTexts().get(cluster.slug)
  return blogMetadata({
    path: clusterPath(cluster.slug),
    title: text?.seo_title ? { absolute: text.seo_title } : cluster.label,
    description: text?.descripcion ?? `Artículos de PowerUp Menu sobre ${cluster.label.toLowerCase()}.`,
    noindex: !text || text.draft,
  })
}

export default async function ClusterPage({ params }: Props) {
  const cluster = findClusterPage((await params).cluster)
  if (!cluster) notFound()

  const posts = getPostsByCluster(cluster.slug)
  const text = await renderClusterText(cluster.slug, [GEO_SECTION_IDS.faq, "articulos-del-tema"])
  const description = text?.descripcion ?? `Artículos de PowerUp Menu sobre ${cluster.label.toLowerCase()}.`
  const path = clusterPath(cluster.slug)

  return (
    <>
      <JsonLd data={collectionPageJsonLd({ path, name: cluster.label, description, posts })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: BLOG_PATH }, { name: cluster.label, path }])} />
      {text?.faq && <JsonLd data={faqPageJsonLd(text.faq, path)} />}

      <section className="bg-gradient-to-b from-[#F8F0FF] to-[#ECDFF7] pb-10 pt-12 md:pt-14">
        <div className={`${container} flex flex-col gap-5`}>
          <Breadcrumbs items={[{ name: "Blog", path: BLOG_PATH }, { name: cluster.label }]} />
          <h1 className={pageTitle}>{cluster.label}</h1>
          <p className="max-w-[560px] text-[17px] leading-relaxed text-slate-600">{description}</p>
          <ClusterChips clusters={getClusterPages()} active={cluster.slug} />
        </div>
      </section>

      <div className={`${container} flex flex-col gap-12 pb-16 pt-10`}>
        {text && <div className={cn(styles.prose, "max-w-[720px]")} dangerouslySetInnerHTML={{ __html: text.html }} />}
        <section aria-labelledby="articulos-del-tema" className="flex flex-col gap-3">
          <h2 id="articulos-del-tema" className={sectionTitle}>
            Artículos sobre {cluster.label.toLowerCase()}
          </h2>
          <p className="text-[13px] text-slate-600">
            {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
          </p>
          {posts.length > 0 ? <PostList posts={posts} /> : <p className="text-slate-600">Todavía no hay artículos en este tema.</p>}
        </section>
        {text?.faq && (
          <div className="max-w-[720px]">
            <FaqSection items={text.faq} />
          </div>
        )}
      </div>
    </>
  )
}
