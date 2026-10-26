import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AdvisorPromoSidebar } from "@/app/blog/_components/AdvisorPromo"
import { Breadcrumbs, type Crumb } from "@/app/blog/_components/Breadcrumbs"
import { FaqSection, GEO_SECTION_IDS, KeyPoints, ShortAnswer, Sources } from "@/app/blog/_components/GeoBlocks"
import { JsonLd } from "@/app/blog/_components/JsonLd"
import { PostByline } from "@/app/blog/_components/PostByline"
import { PostThumb } from "@/app/blog/_components/PostCards"
import { BottomCta } from "@/app/blog/_components/PostCta"
import styles from "@/app/blog/_components/prose.module.css"
import { container } from "@/app/blog/_components/styles"
import { TableOfContents } from "@/app/blog/_components/TableOfContents"
import { getAuthor, isPerson, type Author } from "@/lib/blog/authors"
import { ITALIAN_BLOG_PATH, italianPostPath, postPath } from "@/lib/blog/config"
import { blogMetadata } from "@/lib/blog/metadata"
import { getItalianPost, getVisibleItalianPosts } from "@/lib/blog/posts"
import { renderPostBody } from "@/lib/blog/render"
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/blog/structured-data"
import { getCluster } from "@/lib/blog/taxonomy"
import { blogUiCopy } from "@/lib/blog/ui-copy"
import { ItalianPostCard } from "../ItalianPostCard"

// The Italian article page: the Spanish article's layout (app/blog/[slug]/page.tsx) with Italian
// texts, /it/blog paths and hreflang to the Spanish post it adapts. No .md export or feed yet.
type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getVisibleItalianPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getItalianPost((await params).slug)
  if (!post) return {}
  return blogMetadata({
    path: italianPostPath(post.slug),
    title: { absolute: post.seo_title },
    description: post.seo_description,
    noindex: post.draft,
    locale: "it_IT",
    languages: { es: postPath(post.traduzione_di), it: italianPostPath(post.slug) },
    article: {
      publishedTime: post.fecha_publicacion,
      modifiedTime: post.fecha_modificacion,
      authors: [getAuthor(post.autor)?.name ?? "PowerUp Menu"],
    },
  })
}

export default async function ItalianPostPage({ params }: Props) {
  const post = getItalianPost((await params).slug)
  if (!post) notFound()

  const copy = blogUiCopy.it
  const path = italianPostPath(post.slug)
  const author = getAuthor(post.autor) as Author
  const reviewer = post.revisado_por ? getAuthor(post.revisado_por) : undefined
  const rendered = await renderPostBody(post, [...Object.values(GEO_SECTION_IDS), "toc-title", "continua-a-leggere"])
  if (!rendered) notFound()
  const { html, toc } = rendered
  const tocItems = [
    ...toc,
    ...(post.faq ? [{ id: GEO_SECTION_IDS.faq, text: copy.faq, level: 2 as const }] : []),
    ...(post.fuentes ? [{ id: GEO_SECTION_IDS.sources, text: copy.sources, level: 2 as const }] : []),
  ]
  const crumbs: Crumb[] = [{ name: "Blog", path: ITALIAN_BLOG_PATH }]
  const related = getVisibleItalianPosts().filter((other) => other.slug !== post.slug).slice(0, 3)
  // The Spanish theme name isn't shown in Italian, so the article carries no section.
  const cluster = { ...getCluster(post.cluster), hub: false }

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd(post, author, isPerson(reviewer) ? reviewer : undefined, cluster, { path, inLanguage: "it-IT" })}
      />
      <JsonLd data={breadcrumbJsonLd([...crumbs.map((crumb) => ({ name: crumb.name, path: crumb.path as string })), { name: post.title, path }])} />
      {post.faq && <JsonLd data={faqPageJsonLd(post.faq, path)} />}

      <div className={`${container} pt-8`}>
        <Breadcrumbs items={crumbs} locale="it" />
      </div>

      <div className={`${container} mt-5 grid grid-cols-1 gap-x-14 lg:grid-cols-[minmax(0,1fr)_320px]`}>
        <article className="col-span-full grid grid-cols-subgrid lg:row-span-2 lg:row-start-1 lg:grid-rows-subgrid">
          <header className="col-span-full grid items-center gap-8 md:grid-cols-2">
            <div className="flex max-w-[640px] flex-col gap-[18px]">
              <h1 className="font-heading text-[clamp(28px,3.4vw,42px)] font-medium leading-[1.15] tracking-tight text-pretty text-slate-900">
                {post.title}
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">{post.excerpt}</p>
              <PostByline post={post} locale="it" />
            </div>
            <PostThumb post={post} className="aspect-[4/3] rounded-[24px]" priority sizes="(max-width: 767px) calc(100vw - 80px), 520px" />
          </header>
          <div className="flex min-w-0 max-w-[680px] flex-col gap-8 pt-12">
            {post.respuesta_corta && <ShortAnswer text={post.respuesta_corta} locale="it" />}
            {post.puntos_clave && <KeyPoints items={post.puntos_clave} locale="it" />}
            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
            {post.faq && <FaqSection items={post.faq} locale="it" />}
            {post.fuentes && <Sources items={post.fuentes} locale="it" />}
          </div>
        </article>
        <aside className="flex flex-col gap-5 pt-10 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-2 lg:mt-12 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:pt-0">
          <TableOfContents items={tocItems} locale="it" />
          <div className="lg:shrink-0">
            <AdvisorPromoSidebar locale="it" />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="continua-a-leggere" className={`${container} flex flex-col gap-6 pb-6 pt-16`}>
          <h2 id="continua-a-leggere" className="font-heading text-2xl font-medium tracking-tight text-slate-900">
            {copy.keepReading}
          </h2>
          <ul className="grid gap-8 md:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug}>
                <ItalianPostCard post={other} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <BottomCta post={post} locale="it" />
    </>
  )
}
