import type { TocItem } from "@/lib/blog/markdown"
import { cn } from "@/lib/utils"

/** Built from the same pass that assigns heading ids, so every link matches its heading. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null
  return (
    // min-h-0 lets the list shrink and scroll inside the article's height-capped sticky aside; the
    // list's padding, cancelled by its negative margin, keeps the links' focus rings inside the clip.
    <nav aria-labelledby="toc-title" className="flex min-h-0 flex-col gap-1.5 rounded-[18px] border border-border p-5">
      <p id="toc-title" className="mb-1.5 text-xs font-semibold uppercase tracking-[0.04em] text-slate-600">
        En este artículo
      </p>
      <ol className="-m-1 flex min-h-0 flex-col overflow-y-auto p-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 border-border py-1.5 pl-3 text-sm text-slate-600 transition-colors hover:border-primary hover:text-slate-900",
                item.level === 3 && "pl-6 text-[13px]",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
