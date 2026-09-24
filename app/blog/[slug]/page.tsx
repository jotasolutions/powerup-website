import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAuthor, isPerson, type Author } from "@/lib/blog/authors"
import { BLOG_PATH, clusterPath, markdownPath, postPath } from "@/lib/blog/config"
import { blogMetadata } from "@/lib/blog/metadata"
import { getPost, getRelatedPosts, getVisiblePosts } from "@/lib/blog/posts"
import { renderPostBody } from "@/lib/blog/render"
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/blog/structured-data"
import { getCluster } from "@/lib/blog/taxonomy"
import { Breadcrumbs, type Crumb } from "../_components/Breadcrumbs"
import { FaqSection, GEO_SECTION_IDS, KeyPoints, ShortAnswer, Sources } from "../_components/GeoBlocks"
import { JsonLd } from "../_components/JsonLd"
import { PostByline } from "../_components/PostByline"
import { PostGrid, PostThumb } from "../_components/PostCards"
import { AdvisorPromoSidebar } from "../_components/AdvisorPromo"
import { BottomCta, InlineCta } from "../_components/PostCta"
import styles from "../_components/prose.module.css"
import { container } from "../_components/styles"
import { TableOfContents } from "../_components/TableOfContents"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getVisiblePosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const cluster = getCluster(post.cluster)
  return blogMetadata({
    path: postPath(post.slug),
    title: { absolute: post.seo_title },
    description: post.seo_description,
    noindex: post.draft,
    markdownPath: markdownPath(post.slug),
    article: {
      publishedTime: post.fecha_publicacion,
      modifiedTime: post.fecha_modificacion,
      authors: [getAuthor(post.autor)?.name ?? "PowerUp Menu"],
      section: cluster.hub ? cluster.label : undefined,
    },
  })
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  const cluster = getCluster(post.cluster)
  const author = getAuthor(post.autor) as Author
  const reviewer = post.revisado_por ? getAuthor(post.revisado_por) : undefined
  const rendered = await renderPostBody(post, [...Object.values(GEO_SECTION_IDS), "toc-title", "sigue-leyendo"])
  if (!rendered) notFound()
  const { html, toc } = rendered
  const tocItems = [
    ...toc,
    ...(post.faq ? [{ id: GEO_SECTION_IDS.faq, text: "Preguntas frecuentes", level: 2 as const }] : []),
    ...(post.fuentes ? [{ id: GEO_SECTION_IDS.sources, text: "Fuentes", level: 2 as const }] : []),
  ]
  const crumbs: Crumb[] = [
    { name: "Blog", path: BLOG_PATH },
    ...(cluster.hub ? [{ name: cluster.label, path: clusterPath(cluster.slug) }] : []),
  ]
  const related = getRelatedPosts(post)

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post, author, isPerson(reviewer) ? reviewer : undefined, cluster)} />
      <JsonLd
        data={breadcrumbJsonLd([
          ...crumbs.map((crumb) => ({ name: crumb.name, path: crumb.path as string })),
          { name: post.title, path: postPath(post.slug) },
        ])}
      />
      {post.faq && <JsonLd data={faqPageJsonLd(post.faq, postPath(post.slug))} />}

      <div className={`${container} pt-8`}>
        <Breadcrumbs items={crumbs} />
      </div>

      {/* The article spans both columns as a subgrid so its header runs full width while the
          aside sits next to the body, outside <article>. Both are pinned to explicit rows:
          otherwise auto-placement pushes the article below the aside. */}
      <div className={`${container} mt-5 grid grid-cols-1 gap-x-14 lg:grid-cols-[minmax(0,1fr)_320px]`}>
        <article className="col-span-full grid grid-cols-subgrid lg:row-span-2 lg:row-start-1 lg:grid-rows-subgrid">
          <header className="col-span-full grid items-center gap-8 md:grid-cols-2">
            <div className="flex max-w-[640px] flex-col gap-[18px]">
              <h1 className="font-heading text-[clamp(28px,3.4vw,42px)] font-medium leading-[1.15] tracking-tight text-pretty text-slate-900">
                {post.title}
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">{post.excerpt}</p>
              <PostByline post={post} />
            </div>
            <PostThumb post={post} className="aspect-[4/3] rounded-[24px]" priority sizes="(max-width: 768px) 100vw, 560px" />
          </header>
          <div className="flex min-w-0 max-w-[680px] flex-col gap-8 pt-12">
            {post.respuesta_corta && <ShortAnswer text={post.respuesta_corta} />}
            {post.puntos_clave && <KeyPoints items={post.puntos_clave} />}
            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
            {post.faq && <FaqSection items={post.faq} />}
            {post.fuentes && <Sources items={post.fuentes} />}
          </div>
        </article>
        {/* The Advisor card goes on every article, Maestro ones included: the product is always present. */}
        <aside className="flex flex-col gap-5 pt-10 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-2 lg:self-start lg:pt-12">
          <TableOfContents items={tocItems} />
          <AdvisorPromoSidebar />
        </aside>
        {post.cta === "soft" && (
          <div className="pt-10 lg:col-start-1">
            <InlineCta post={post} />
          </div>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="sigue-leyendo" className={`${container} flex flex-col gap-6 pb-6 pt-16`}>
          <h2 id="sigue-leyendo" className="font-heading text-2xl font-medium tracking-tight text-slate-900">
            Sigue leyendo
          </h2>
          <PostGrid posts={related} compact />
        </section>
      )}
      <BottomCta post={post} />
    </>
  )
}
