import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getClusterPages, getClusterTexts } from "@/lib/blog/clusters"
import { BLOG_PATH, clusterPath } from "@/lib/blog/config"
import { isProductionBuild } from "@/lib/blog/draft"
import { blogMetadata } from "@/lib/blog/metadata"
import { getPostsByCluster } from "@/lib/blog/posts"
import { renderClusterText } from "@/lib/blog/render"
import { breadcrumbJsonLd, collectionPageJsonLd, faqPageJsonLd } from "@/lib/blog/structured-data"
import { getTopicBlocks } from "@/lib/blog/topic-blocks"
import { cn } from "@/lib/utils"
import { AdvisorPromoWide } from "../../_components/AdvisorPromo"
import { Breadcrumbs } from "../../_components/Breadcrumbs"
import { ClusterChips } from "../../_components/ClusterChips"
import { FaqSection, GEO_SECTION_IDS } from "../../_components/GeoBlocks"
import { JsonLd } from "../../_components/JsonLd"
import { PostList } from "../../_components/PostCards"
import styles from "../../_components/prose.module.css"
import { container, pageTitle, sectionTitle } from "../../_components/styles"
import { CriteriaCards, GroupedPosts, QuickAnswer, RouteTiles, StepList, TopicIndex } from "../../_components/TopicBlocks"

type Props = { params: Promise<{ cluster: string }> }

const BLOCK_IDS = { quickAnswer: "respuesta-rapida", routes: "que-buscas", steps: "los-pasos-para-elegir" }

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
  const text = await renderClusterText(cluster.slug, [GEO_SECTION_IDS.faq, "articulos-del-tema", ...Object.values(BLOCK_IDS)])
  // In production a cluster page only exists with a finished text, so a missing one here means it
  // failed to render: the page is left out rather than published without its text.
  if (!text && isProductionBuild()) notFound()
  const description = text?.descripcion ?? `Artículos de PowerUp Menu sobre ${cluster.label.toLowerCase()}.`
  const path = clusterPath(cluster.slug)
  const blocks: Partial<ReturnType<typeof getTopicBlocks>> = text ? getTopicBlocks(cluster.slug, text, posts) : {}

  // The quick answer and the route cards go after the opening paragraph, which stays the first
  // text on the page (Google shows it as the snippet); the criteria and steps close the text,
  // under its last heading.
  const html = text?.html ?? ""
  const firstHeading = html.indexOf("<h2")
  const intro = firstHeading === -1 ? html : html.slice(0, firstHeading)
  const rest = firstHeading === -1 ? "" : html.slice(firstHeading)
  const lastHeadingId = [...rest.matchAll(/<h2[^>]*\sid="([^"]+)"/g)].at(-1)?.[1]
  const index = [
    text?.respuesta_rapida && { id: BLOCK_IDS.quickAnswer, label: "Respuesta rápida" },
    blocks.rutas?.length && { id: BLOCK_IDS.routes, label: "¿Qué buscas?" },
    text?.criterios && lastHeadingId && { id: lastHeadingId, label: "Cómo elegir" },
    blocks.grupos && { id: "articulos-del-tema", label: "Artículos" },
    text?.faq_plegable && text.faq && { id: GEO_SECTION_IDS.faq, label: "Preguntas" },
  ].filter((item) => typeof item === "object")

  return (
    <>
      <JsonLd data={collectionPageJsonLd({ path, name: cluster.label, description, posts })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: BLOG_PATH }, { name: cluster.label, path }])} />
      {text?.faq && <JsonLd data={faqPageJsonLd(text.faq, path)} />}

      <section className="bg-gradient-to-b from-[#F8F0FF] to-[#ECDFF7] pb-10 pt-12 md:pt-14">
        <div className={`${container} flex flex-col gap-5`}>
          <Breadcrumbs items={[{ name: "Blog", path: BLOG_PATH }, { name: cluster.label }]} />
          <h1 className={pageTitle}>{text?.h1 ?? cluster.label}</h1>
          <p className="max-w-[560px] text-[17px] leading-relaxed text-slate-600">{description}</p>
          <ClusterChips clusters={getClusterPages()} active={cluster.slug} />
          {index.length > 1 && <TopicIndex items={index} />}
        </div>
      </section>

      <div className={`${container} flex flex-col gap-12 pb-16 pt-10`}>
        {intro && <div className={cn(styles.prose, "max-w-[720px]")} dangerouslySetInnerHTML={{ __html: intro }} />}
        {text?.respuesta_rapida && (
          <div className="-mt-4 max-w-[720px]">
            <QuickAnswer id={BLOCK_IDS.quickAnswer} items={text.respuesta_rapida} />
          </div>
        )}
        {blocks.rutas && blocks.rutas.length > 0 && (
          <div className="max-w-[720px]">
            <RouteTiles id={BLOCK_IDS.routes} rutas={blocks.rutas} />
          </div>
        )}
        {(rest || text?.criterios || blocks.pasos) && (
          <div className="flex max-w-[720px] flex-col gap-6">
            {rest && <div className={styles.prose} dangerouslySetInnerHTML={{ __html: rest }} />}
            {text?.criterios && <CriteriaCards criterios={text.criterios} />}
            {blocks.pasos && <StepList id={BLOCK_IDS.steps} pasos={blocks.pasos} />}
          </div>
        )}
        {text?.advisor && (
          <div className="max-w-[720px]">
            <AdvisorPromoWide />
          </div>
        )}
        <section aria-labelledby="articulos-del-tema" className="flex flex-col gap-3">
          <h2 id="articulos-del-tema" className={sectionTitle}>
            Artículos sobre {cluster.label.toLowerCase()}
          </h2>
          <p className="text-[13px] text-slate-600">
            {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
          </p>
          {posts.length === 0 ? (
            <p className="text-slate-600">Todavía no hay artículos en este tema.</p>
          ) : blocks.grupos ? (
            <div className="mt-3 max-w-[720px]">
              <GroupedPosts grupos={blocks.grupos} />
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </section>
        {text?.faq && (
          <div className="max-w-[720px]">
            <FaqSection items={text.faq} collapsible={text.faq_plegable} />
          </div>
        )}
      </div>
    </>
  )
}
