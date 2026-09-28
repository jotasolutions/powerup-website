import { QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { postPath } from "@/lib/blog/config"
import { formatDate, isoDate } from "@/lib/blog/format"
import type { Post } from "@/lib/blog/posts"
import { getCluster } from "@/lib/blog/taxonomy"
import { cn } from "@/lib/utils"
import { eyebrow } from "./styles"

/** Posts without an image fall back to their cluster's tint instead of a broken slot. */
export function PostThumb({
  post,
  className,
  sizes = "(max-width: 768px) 80vw, 380px",
  priority = false,
}: {
  post: Post
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
      style={{ backgroundColor: getCluster(post.cluster).tint }}
    >
      {post.image ? (
        <Image
          src={post.image}
          alt={post.image_alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain p-5 drop-shadow-lg"
        />
      ) : (
        <span aria-hidden className="inline-flex rotate-[11deg] rounded-xl bg-primary p-3 text-primary-foreground shadow-lg">
          <QrCode className="size-8" />
        </span>
      )}
    </div>
  )
}

export function PostEyebrow({ post, withDate = false }: { post: Post; withDate?: boolean }) {
  const cluster = getCluster(post.cluster)
  return (
    <p className={eyebrow}>
      {cluster.hub && <>{cluster.label} · </>}
      {withDate && (
        <>
          <time dateTime={isoDate(post.fecha_publicacion)}>{formatDate(post.fecha_publicacion)}</time> ·{" "}
        </>
      )}
      {post.readingMinutes} min
    </p>
  )
}

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <Link
      href={postPath(post.slug)}
      className="flex h-full flex-col gap-3.5 rounded-[20px] transition-colors md:-m-2.5 md:p-2.5 md:hover:bg-secondary"
    >
      <PostThumb post={post} className={cn("rounded-[18px]", compact ? "aspect-[16/10]" : "aspect-[4/3]")} />
      <div className="flex flex-col gap-1.5 px-1">
        <PostEyebrow post={post} />
        <h3
          className={cn(
            "font-heading font-medium leading-snug tracking-tight text-pretty text-slate-900",
            compact ? "text-[17px]" : "text-[19px]",
          )}
        >
          {post.title}
        </h3>
        {!compact && <p className="text-sm leading-relaxed text-slate-600">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

/** Horizontal scroller on mobile, grid from md up (as in the design). */
export function PostGrid({ posts, compact = false }: { posts: Post[]; compact?: boolean }) {
  return (
    <ul
      className={cn(
        "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:pb-0",
        compact
          ? "md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]"
          : "md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
      )}
    >
      {posts.map((post) => (
        <li key={post.slug} className="w-[78%] max-w-[320px] shrink-0 snap-start md:w-auto md:max-w-none">
          <PostCard post={post} compact={compact} />
        </li>
      ))}
    </ul>
  )
}

export function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={postPath(post.slug)}
      className="flex w-full max-w-[520px] flex-col overflow-hidden rounded-[24px] bg-card shadow-xl transition-transform hover:-translate-y-0.5 md:justify-self-end"
    >
      <div className="relative">
        <PostThumb post={post} className="aspect-video" priority sizes="(max-width: 768px) 100vw, 520px" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
          Destacado
        </span>
      </div>
      <div className="flex flex-col gap-2 px-[22px] pb-[22px] pt-5">
        <PostEyebrow post={post} />
        <h2 className="font-heading text-[22px] font-medium leading-tight tracking-tight text-pretty text-slate-900">
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
      </div>
    </Link>
  )
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="flex flex-col">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={postPath(post.slug)}
            className="grid grid-cols-1 items-center gap-3.5 border-b border-border py-5 transition-colors hover:bg-secondary sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6"
          >
            <PostThumb post={post} className="aspect-video rounded-2xl sm:aspect-[16/10]" sizes="(max-width: 640px) 100vw, 200px" />
            <div className="flex flex-col gap-1.5">
              <PostEyebrow post={post} withDate />
              <h3 className="font-heading text-[21px] font-medium leading-snug tracking-tight text-pretty text-slate-900">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
