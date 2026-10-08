import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { getAuthor, isPerson, type Author } from "@/lib/blog/authors"
import { authorPath } from "@/lib/blog/config"
import { formatDate, isoDate } from "@/lib/blog/format"
import type { Post } from "@/lib/blog/posts"

function AuthorName({ author }: { author: Author }) {
  if (!isPerson(author)) return <span className="font-semibold text-slate-900">{author.name}</span>
  return (
    <Link href={authorPath(author.id)} className="font-semibold text-slate-900 underline-offset-2 hover:underline">
      {author.name}
    </Link>
  )
}

function AuthorAvatar({ author }: { author: Author }) {
  if (author.kind === "person") {
    return <Image src={author.photo} alt={author.name} width={36} height={36} className="size-9 rounded-full bg-slate-200 object-cover" />
  }
  if (author.kind === "organization") {
    return (
      <span className="flex size-9 items-center justify-center rounded-full bg-primary">
        <Image src="/images/isotipo-negativo.png" alt={author.name} width={18} height={18} className="size-[18px] object-contain" />
      </span>
    )
  }
  return null
}

/**
 * Each item carries its "·" in a 28px slot in front, so the dot wraps with the item and no line
 * ends in one. The row below is shifted one slot left inside a clipping box, so the dot that would
 * start a wrapped line falls outside it and no line starts with one either.
 */
function Separated({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center whitespace-nowrap">
      <span aria-hidden className="w-7 text-center">
        ·
      </span>
      {children}
    </span>
  )
}

export function PostByline({ post }: { post: Post }) {
  // Author references are validated when the posts load.
  const author = getAuthor(post.autor) as Author
  const reviewer = post.revisado_por ? getAuthor(post.revisado_por) : undefined
  const original = post.autor_original ? getAuthor(post.autor_original) : undefined
  const updated = isoDate(post.fecha_modificacion) !== isoDate(post.fecha_publicacion)

  return (
    <div className="flex flex-col gap-2 text-[13px] text-slate-600">
      {/* The vertical padding (cancelled by the negative margin) keeps focus rings inside the clip. */}
      <div className="-my-1 overflow-hidden py-1">
        <div className="-ml-7 flex flex-wrap items-center gap-y-1.5">
          <span className="ml-7 flex items-center gap-x-3">
            <AuthorAvatar author={author} />
            <AuthorName author={author} />
          </span>
          <Separated>
            <time dateTime={isoDate(post.fecha_publicacion)}>{formatDate(post.fecha_publicacion)}</time>
          </Separated>
          {updated && (
            <Separated>
              <span>
                Actualizado el <time dateTime={isoDate(post.fecha_modificacion)}>{formatDate(post.fecha_modificacion)}</time>
              </span>
            </Separated>
          )}
          <Separated>
            <span>{post.readingMinutes} min de lectura</span>
          </Separated>
        </div>
      </div>
      {isPerson(reviewer) && (
        <p>
          Revisado por <AuthorName author={reviewer} />, {reviewer.jobTitle} de PowerUp Menu
        </p>
      )}
      {original && (
        <p>
          Basado en el original de <AuthorName author={original} />
        </p>
      )}
    </div>
  )
}
