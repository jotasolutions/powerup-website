import Link from "next/link"
import { blogUiCopy } from "@/lib/blog/ui-copy"
import type { Locale } from "@/lib/locale"

export type Crumb = { name: string; path?: string }

export function Breadcrumbs({ items, locale = "es" }: { items: Crumb[]; locale?: Locale }) {
  return (
    <nav aria-label={blogUiCopy[locale].breadcrumbs} className="text-[13px] text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden>›</span>}
            {item.path ? (
              <Link href={item.path} className="hover:text-slate-900">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
