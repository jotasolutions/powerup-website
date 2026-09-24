import { SITE_URL } from "@/lib/site"
import type { Author, PersonAuthor } from "./authors"
import { absoluteUrl, authorPath, postPath } from "./config"
import type { Post } from "./posts"
import type { FaqItem } from "./schema"
import type { Cluster } from "./taxonomy"

// Same @id as the Organization node on the homepage (app/page.tsx). Search engines evaluate
// each page on its own, so every reference repeats name, url and logo instead of a bare @id.
const ORGANIZATION_ID = `${SITE_URL}/#organization`

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "PowerUp Menu",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icons/apple-icon-180x180.png`,
  }
}

export function personNode(person: PersonAuthor) {
  const url = absoluteUrl(authorPath(person.id))
  return {
    "@type": "Person",
    "@id": `${url}#person`,
    name: person.name,
    url,
    jobTitle: person.jobTitle,
    image: absoluteUrl(person.photo),
    sameAs: person.sameAs,
    worksFor: organizationNode(),
  }
}

function authorNode(author: Author) {
  if (author.kind === "person") return personNode(author)
  if (author.kind === "signature") return { "@type": "Person", name: author.name }
  return organizationNode()
}

export function blogPostingJsonLd(post: Post, author: Author, reviewer: PersonAuthor | undefined, cluster: Cluster) {
  const path = postPath(post.slug)
  const url = absoluteUrl(path)
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.seo_description,
    image: absoluteUrl(post.image ?? `${path}/opengraph-image`),
    datePublished: post.fecha_publicacion.toISOString(),
    dateModified: post.fecha_modificacion.toISOString(),
    inLanguage: "es-ES",
    keywords: post.keyword_principal,
    ...(cluster.hub ? { articleSection: cluster.label } : {}),
    author: authorNode(author),
    publisher: organizationNode(),
    // reviewedBy is only defined on WebPage, not on BlogPosting.
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
      url,
      ...(reviewer ? { reviewedBy: personNode(reviewer) } : {}),
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqPageJsonLd(faq: FaqItem[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pregunta,
      acceptedAnswer: { "@type": "Answer", text: item.respuesta },
    })),
  }
}

export function collectionPageJsonLd({
  path,
  name,
  description,
  posts,
}: {
  path: string
  name: string
  description: string
  posts: Post[]
}) {
  const url = absoluteUrl(path)
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name,
    description,
    inLanguage: "es-ES",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "PowerUp Menu", url: `${SITE_URL}/` },
    publisher: organizationNode(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(postPath(post.slug)),
        name: post.title,
      })),
    },
  }
}

export function profilePageJsonLd(person: PersonAuthor) {
  const url = absoluteUrl(authorPath(person.id))
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url,
    url,
    name: person.name,
    inLanguage: "es-ES",
    mainEntity: { ...personNode(person), description: person.bioLong },
  }
}
