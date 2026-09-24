import Link from "next/link"
import { listingPath } from "@/lib/blog/config"
import { cn } from "@/lib/utils"

const item = "inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-border px-3 transition-colors hover:border-primary"

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Paginación" className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-700">
      {page > 1 && (
        <Link href={listingPath(page - 1)} className={item}>
          ← Más recientes
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
        <Link
          key={number}
          href={listingPath(number)}
          aria-current={number === page ? "page" : undefined}
          className={cn(item, number === page && "border-primary bg-primary text-primary-foreground")}
        >
          {number}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={listingPath(page + 1)} className={item}>
          Anteriores →
        </Link>
      )}
    </nav>
  )
}
