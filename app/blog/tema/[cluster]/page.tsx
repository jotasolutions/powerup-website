import { ArrowRight, QrCode } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
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
import { AdvisorTrigger } from "../../_components/AdvisorDialog"
import { AdvisorPromoSidebar, AdvisorPromoWide } from "../../_components/AdvisorPromo"
import { Breadcrumbs } from "../../_components/Breadcrumbs"
import { ClusterChips } from "../../_components/ClusterChips"
import { FaqSection, GEO_SECTION_IDS } from "../../_components/GeoBlocks"
import { JsonLd } from "../../_components/JsonLd"
import { PostList } from "../../_components/PostCards"
import styles from "../../_components/prose.module.css"
import { buttonAdvisor, buttonPrimary, buttonSecondary, container, eyebrow, pageTitle, sectionTitle } from "../../_components/styles"
import { TableOfContents } from "../../_components/TableOfContents"
import {
  CriteriaCards,
  GroupedPosts,
  HeroCovers,
  QuickAnswer,
  RouteTiles,
  StepList,
  TopicIndex,
} from "../../_components/TopicBlocks"

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
  const heading = text?.h1 ?? cluster.label
  const jsonLd = (
    <>
      <JsonLd data={collectionPageJsonLd({ path, name: cluster.label, description, posts })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: BLOG_PATH }, { name: cluster.label, path }])} />
      {text?.faq && <JsonLd data={faqPageJsonLd(text.faq, path)} />}
    </>
  )

  // A theme with route cards gets the scannable layout; the others keep the plain one below.
  if (text && blocks.rutas && blocks.rutas.length > 0) {
    // The quick answer and the route cards go after the opening paragraph, which stays the first
    // text of the body (Google shows it as the snippet); the criteria and steps close the text,
    // under its last heading.
    const firstHeading = text.html.indexOf("<h2")
    const intro = firstHeading === -1 ? text.html : text.html.slice(0, firstHeading)
    const rest = firstHeading === -1 ? "" : text.html.slice(firstHeading)
    const lastHeadingId = [...rest.matchAll(/<h2[^>]*\sid="([^"]+)"/g)].at(-1)?.[1]
    const index = [
      text.respuesta_rapida && { id: BLOCK_IDS.quickAnswer, label: "Respuesta rápida" },
      { id: BLOCK_IDS.routes, label: "¿Qué buscas?" },
      text.criterios && lastHeadingId && { id: lastHeadingId, label: "Cómo elegir" },
      posts.length > 0 && { id: "articulos-del-tema", label: "Artículos" },
      text.faq && { id: GEO_SECTION_IDS.faq, label: "Preguntas frecuentes" },
    ].filter((item) => typeof item === "object")
    const firstRoute = blocks.rutas[0]
    const covers = (blocks.grupos?.[0]?.posts ?? posts).filter((post) => post.image).slice(0, 3)

    return (
      <>
        {jsonLd}
        {/* A rounded panel set off from the navbar and the screen edges, not a full-bleed band. */}
        <section className="mx-2 mt-4 rounded-[28px] bg-gradient-to-b from-[#F8F0FF] to-[#ECDFF7] pb-10 pt-8 sm:mx-4 md:mt-6 md:rounded-[36px] md:pb-14 md:pt-10">
          <div className={`${container} flex flex-col gap-8`}>
            <Breadcrumbs items={[{ name: "Blog", path: BLOG_PATH }, { name: cluster.label }]} />
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
              <div className="flex max-w-[620px] flex-col gap-5">
                <p className={eyebrow}>
                  Tema · {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
                </p>
                <h1 className={pageTitle}>{heading}</h1>
                <p className="text-lg leading-relaxed text-slate-600">{description}</p>
                {/* The Advisor is the main action when the theme shows it, in its own green as
                    everywhere on the blog; the first route card is the secondary one. */}
                <div className="flex flex-wrap gap-3 pt-1">
                  {text.advisor && (
                    <AdvisorTrigger className={buttonAdvisor}>
                      <QrCode />
                      Analizar mi carta
                    </AdvisorTrigger>
                  )}
                  <Link href={firstRoute.href} className={text.advisor ? buttonSecondary : buttonPrimary}>
                    {firstRoute.titulo}
                    <ArrowRight />
                  </Link>
                </div>
              </div>
              {covers.length > 0 && <HeroCovers posts={covers} />}
            </div>
            <ClusterChips clusters={getClusterPages()} active={cluster.slug} />
            {/* From lg the index lives in the sticky aside. */}
            <div className="lg:hidden">
              <TopicIndex items={index} />
            </div>
          </div>
        </section>

        {/* As on the articles: the text on the left and, from lg, a sticky aside with the index and
            the Advisor card, which never outgrows the viewport. */}
        <div className={`${container} grid grid-cols-1 gap-x-14 pt-10 lg:grid-cols-[minmax(0,1fr)_300px]`}>
          <div className="flex min-w-0 max-w-[720px] flex-col gap-12">
            {intro && <div className={styles.prose} dangerouslySetInnerHTML={{ __html: intro }} />}
            {text.respuesta_rapida && (
              <div className="-mt-4">
                <QuickAnswer id={BLOCK_IDS.quickAnswer} items={text.respuesta_rapida} />
              </div>
            )}
            <RouteTiles id={BLOCK_IDS.routes} rutas={blocks.rutas} />
            <div className="flex flex-col gap-6">
              {rest && <div className={styles.prose} dangerouslySetInnerHTML={{ __html: rest }} />}
              {text.criterios && <CriteriaCards criterios={text.criterios} />}
              {blocks.pasos && <StepList id={BLOCK_IDS.steps} pasos={blocks.pasos} />}
            </div>
            {text.advisor && (
              <div className="lg:hidden">
                <AdvisorPromoWide />
              </div>
            )}
          </div>
          <aside className="hidden flex-col gap-5 lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100dvh-7rem)] lg:self-start">
            <TableOfContents title="En esta página" items={index.map((item) => ({ id: item.id, text: item.label, level: 2 as const }))} />
            {text.advisor && (
              <div className="shrink-0">
                <AdvisorPromoSidebar />
              </div>
            )}
          </aside>
        </div>

        {posts.length > 0 && (
          <section aria-labelledby="articulos-del-tema" className={`${container} flex flex-col gap-8 pt-16`}>
            <div className="flex flex-col gap-1">
              <h2 id="articulos-del-tema" className={sectionTitle}>
                Artículos sobre {cluster.label.toLowerCase()}
              </h2>
              <p className="text-[13px] text-slate-600">
                {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
              </p>
            </div>
            {blocks.grupos ? <GroupedPosts grupos={blocks.grupos} /> : <PostList posts={posts} />}
          </section>
        )}

        {text.faq && (
          <div className={`${container} pb-16 pt-16`}>
            <div className="max-w-[720px]">
              <FaqSection items={text.faq} collapsible={text.faq_plegable} />
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {jsonLd}

      <section className="bg-gradient-to-b from-[#F8F0FF] to-[#ECDFF7] pb-10 pt-12 md:pt-14">
        <div className={`${container} flex flex-col gap-5`}>
          <Breadcrumbs items={[{ name: "Blog", path: BLOG_PATH }, { name: cluster.label }]} />
          <h1 className={pageTitle}>{heading}</h1>
          <p className="max-w-[560px] text-[17px] leading-relaxed text-slate-600">{description}</p>
          <ClusterChips clusters={getClusterPages()} active={cluster.slug} />
        </div>
      </section>

      <div className={`${container} flex flex-col gap-12 pb-16 pt-10`}>
        {text && <div className={cn(styles.prose, "max-w-[720px]")} dangerouslySetInnerHTML={{ __html: text.html }} />}
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
          {posts.length > 0 ? <PostList posts={posts} /> : <p className="text-slate-600">Todavía no hay artículos en este tema.</p>}
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
