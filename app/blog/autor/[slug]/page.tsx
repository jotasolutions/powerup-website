import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { BLOG_PATH, authorPath } from "@/lib/blog/config"
import { blogMetadata } from "@/lib/blog/metadata"
import { getAuthorPages, getPostsByPerson } from "@/lib/blog/posts"
import { breadcrumbJsonLd, profilePageJsonLd } from "@/lib/blog/structured-data"
import { Breadcrumbs } from "../../_components/Breadcrumbs"
import { JsonLd } from "../../_components/JsonLd"
import { PostList } from "../../_components/PostCards"
import { container, eyebrow, pageTitle, sectionTitle } from "../../_components/styles"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getAuthorPages().map((person) => ({ slug: person.id }))
}

function findPerson(id: string) {
  return getAuthorPages().find((person) => person.id === id)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = findPerson((await params).slug)
  if (!person) return {}
  return blogMetadata({ path: authorPath(person.id), title: person.name, description: person.bioShort })
}

function profileLabel(url: string) {
  return new URL(url).hostname.includes("linkedin.com") ? "LinkedIn" : new URL(url).hostname
}

export default async function AuthorPage({ params }: Props) {
  const person = findPerson((await params).slug)
  if (!person) notFound()

  const { authored, reviewed } = getPostsByPerson(person.id)
  const link = "font-medium text-primary underline-offset-4 hover:underline"

  return (
    <>
      <JsonLd data={profilePageJsonLd(person)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: BLOG_PATH }, { name: person.name, path: authorPath(person.id) }])} />

      <div className={`${container} flex flex-col gap-12 pb-16 pt-8`}>
        <Breadcrumbs items={[{ name: "Blog", path: BLOG_PATH }, { name: person.name }]} />

        <div className="grid items-start gap-8 md:grid-cols-[160px_minmax(0,1fr)]">
          <Image
            src={person.photo}
            alt={person.name}
            width={160}
            height={160}
            priority
            className="size-32 rounded-3xl bg-slate-200 object-cover md:size-40"
          />
          <div className="flex max-w-[680px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className={pageTitle}>{person.name}</h1>
              <p className={eyebrow}>{person.jobTitle} de PowerUp Menu</p>
            </div>
            <p className="text-[17px] leading-relaxed text-slate-700">{person.bioLong}</p>
            <ul className="flex flex-col gap-2 text-sm text-slate-700">
              {person.sameAs.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="me noopener noreferrer" className={link}>
                    {profileLabel(url)}
                  </a>
                </li>
              ))}
              {person.mentions.map((mention) => (
                <li key={mention.url}>
                  En {mention.outlet}:{" "}
                  <a href={mention.url} target="_blank" rel="noopener noreferrer" className={link}>
                    {mention.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {authored.length > 0 && (
          <section aria-labelledby="articulos-autor" className="flex flex-col gap-3">
            <h2 id="articulos-autor" className={sectionTitle}>
              Artículos de {person.name}
            </h2>
            <PostList posts={authored} />
          </section>
        )}
        {reviewed.length > 0 && (
          <section aria-labelledby="articulos-revisados" className="flex flex-col gap-3">
            <h2 id="articulos-revisados" className={sectionTitle}>
              Artículos revisados por {person.name}
            </h2>
            <PostList posts={reviewed} />
          </section>
        )}
        {authored.length === 0 && reviewed.length === 0 && (
          <p className="text-slate-600">Todavía no hay artículos publicados de {person.name}.</p>
        )}
      </div>
    </>
  )
}
