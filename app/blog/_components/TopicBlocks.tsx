import { ArrowLeftRight, Euro, Gift, Languages, MapPin, QrCode, Scale, Search, Store, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { Fragment, type ReactNode } from "react"
import type { ClusterTextFrontmatter, TOPIC_ICONS } from "@/lib/blog/schema"
import { postPath } from "@/lib/blog/config"
import { INLINE_LINK, type PostGroup } from "@/lib/blog/topic-blocks"
import { sectionTitle } from "./styles"

// The scannable blocks of a theme page: the same words as the text, laid out to be skimmed.

const ICONS: Record<(typeof TOPIC_ICONS)[number], LucideIcon> = {
  comparar: Scale,
  precio: Euro,
  gratis: Gift,
  qr: QrCode,
  local: Store,
  idiomas: Languages,
  google: MapPin,
  seo: Search,
  cambiar: ArrowLeftRight,
}

const link = "font-medium text-primary underline-offset-2 hover:underline"
const card = "rounded-2xl border border-border bg-white"

export function TopicIndex({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="En esta página" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
      <span className="text-slate-500">En esta página:</span>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className="font-medium text-slate-700 underline-offset-2 hover:text-primary hover:underline">
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export function QuickAnswer({ id, items }: { id: string; items: NonNullable<ClusterTextFrontmatter["respuesta_rapida"]> }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <h2 id={id} className="text-sm font-semibold text-slate-600">
        Respuesta rápida
      </h2>
      <dl className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.etiqueta} className="rounded-2xl bg-secondary p-4">
            <dt className="text-[13px] text-slate-600">{item.etiqueta}</dt>
            <dd className="mt-1 text-[15px] font-medium leading-snug text-slate-900">{item.valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function RouteTiles({ id, rutas }: { id: string; rutas: NonNullable<ClusterTextFrontmatter["rutas"]> }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className={sectionTitle}>
        ¿Qué buscas?
      </h2>
      {/* One row per card on phones (icon beside the text), cards in a grid from sm up. */}
      <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3">
        {rutas.map((ruta) => {
          const Icon = ICONS[ruta.icono]
          return (
            <li key={ruta.href}>
              <Link
                href={ruta.href}
                className={`${card} flex h-full gap-3 p-3.5 transition-colors hover:border-primary/40 hover:bg-secondary sm:flex-col sm:gap-2 sm:p-4`}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-medium leading-snug text-slate-900">{ruta.titulo}</span>
                  <span className="text-sm leading-snug text-slate-600">{ruta.texto}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function CriteriaCards({ criterios }: { criterios: NonNullable<ClusterTextFrontmatter["criterios"]> }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {criterios.map((item) => (
        <li key={item.criterio} className={`${card} flex flex-col gap-1.5 p-4`}>
          <h3 className="font-heading text-[17px] font-medium text-slate-900">{item.criterio}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{item.que_mirar}</p>
          <p className="mt-auto border-t border-border pt-2 text-sm font-medium text-primary">{item.pregunta}</p>
        </li>
      ))}
    </ul>
  )
}

function withLinks(texto: string): ReactNode[] {
  const parts: ReactNode[] = []
  let last = 0
  for (const match of texto.matchAll(INLINE_LINK)) {
    parts.push(texto.slice(last, match.index))
    parts.push(
      <Link key={match.index} href={match[2]} className={link}>
        {match[1]}
      </Link>,
    )
    last = match.index + match[0].length
  }
  parts.push(texto.slice(last))
  return parts
}

export function StepList({ id, pasos }: { id: string; pasos: { texto: string }[] }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h3 id={id} className="font-heading text-xl font-medium text-slate-900">
        Los pasos para elegir
      </h3>
      <ol className="flex flex-col gap-3">
        {pasos.map((paso, index) => (
          <li key={paso.texto} className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <p className="pt-0.5 leading-relaxed text-slate-700">
              {withLinks(paso.texto).map((part, i) => (
                <Fragment key={i}>{part}</Fragment>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function GroupedPosts({ grupos }: { grupos: PostGroup[] }) {
  return (
    <div className="flex flex-col gap-8">
      {grupos.map((grupo) => (
        <section key={grupo.titulo} className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-slate-600">
            {grupo.titulo} <span className="font-normal text-slate-500">· {grupo.posts.length}</span>
          </h3>
          <ul className="flex flex-col">
            {grupo.posts.map((post) => (
              <li key={post.slug}>
                <Link href={postPath(post.slug)} className="group flex flex-col gap-0.5 border-b border-border py-3">
                  <span className="font-heading text-[17px] font-medium leading-snug text-slate-900 group-hover:text-primary">
                    {post.title}
                  </span>
                  <span className="line-clamp-1 text-sm text-slate-600">{post.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
