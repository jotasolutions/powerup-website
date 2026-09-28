import Link from "next/link"
import { BLOG_PATH, clusterPath } from "@/lib/blog/config"
import type { Cluster, ClusterSlug } from "@/lib/blog/taxonomy"
import { cn } from "@/lib/utils"

function Chip({ href, active, children }: { href: string; active: boolean; children: string }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-[34px] items-center rounded-full border px-3.5 text-[13px] font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-slate-700 hover:border-primary",
      )}
    >
      {children}
    </Link>
  )
}

/** Real links to each cluster page: a client-side filter would be invisible to crawlers. */
export function ClusterChips({ clusters, active }: { clusters: Cluster[]; active?: ClusterSlug }) {
  return (
    <nav aria-label="Temas del blog">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Chip href={BLOG_PATH} active={!active}>
            Todos
          </Chip>
        </li>
        {clusters.map((cluster) => (
          <li key={cluster.slug}>
            <Chip href={clusterPath(cluster.slug)} active={cluster.slug === active}>
              {cluster.label}
            </Chip>
          </li>
        ))}
      </ul>
    </nav>
  )
}
