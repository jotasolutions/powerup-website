import Link from "next/link"
import { PostThumb } from "@/app/blog/_components/PostCards"
import { eyebrow } from "@/app/blog/_components/styles"
import { italianPostPath } from "@/lib/blog/config"
import { formatDate, isoDate } from "@/lib/blog/format"
import type { ItalianPost } from "@/lib/blog/posts"

// The Spanish PostCard links to /blog and shows the Spanish theme name; this one is for /it/blog.
export function ItalianPostCard({ post }: { post: ItalianPost }) {
  return (
    <Link
      href={italianPostPath(post.slug)}
      className="flex h-full flex-col gap-3.5 rounded-[20px] transition-colors md:-m-2.5 md:p-2.5 md:hover:bg-secondary"
    >
      <PostThumb post={post} className="aspect-[4/3] rounded-[18px]" />
      <div className="flex flex-col gap-1.5 px-1">
        <p className={eyebrow}>
          <time dateTime={isoDate(post.fecha_publicacion)}>{formatDate(post.fecha_publicacion, "it")}</time> · {post.readingMinutes} min
        </p>
        <h3 className="font-heading text-[19px] font-medium leading-snug tracking-tight text-pretty text-slate-900">{post.title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
      </div>
    </Link>
  )
}
