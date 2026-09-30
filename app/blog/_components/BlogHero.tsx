import { QrCode } from "lucide-react"
import Image from "next/image"
import type { Post } from "@/lib/blog/posts"
import { AdvisorTrigger } from "./AdvisorDialog"
import { CircledWord } from "./CircledWord"
import { FeaturedPostCard } from "./PostCards"
import { buttonAdvisor, buttonSecondary } from "./styles"

export function BlogHero({ featured }: { featured: Post }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-3 pt-4 sm:px-4">
      <section className="hero-container relative overflow-hidden rounded-3xl px-5 py-7 md:px-10 md:py-12">
        <Image
          src="/images/hero/hero-lines2.svg"
          alt=""
          fill
          className="pointer-events-none object-cover opacity-40 mix-blend-overlay"
        />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div className="flex max-w-[560px] flex-col gap-[22px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.04em] text-slate-700">El blog de PowerUp Menu</p>
            <h1 className="font-heading text-[clamp(30px,4vw,48px)] font-medium leading-[1.15] tracking-tight text-slate-900">
              Ideas para que tu carta
              {/* The oval reaches past the start of "venda más" in proportion to the font size, so the
                  badge's right margin scales with it (em) to keep the tilted badge off the oval. */}
              <span aria-hidden className="ml-2 mr-[calc(0.31em+4px)] inline-flex rotate-[11deg] rounded-md bg-primary p-1.5 align-middle text-primary-foreground shadow-lg">
                <QrCode className="size-6" />
              </span>
              <CircledWord>venda más</CircledWord>
            </h1>
            <p className="font-heading text-lg leading-relaxed text-slate-700">
              Ingeniería de menú, neuromarketing y casos reales de restaurantes. Para dueños, no para técnicos.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <AdvisorTrigger className={buttonAdvisor}>
                <QrCode />
                Analiza tu carta gratis
              </AdvisorTrigger>
              <a href="#articulos" className={buttonSecondary}>
                Ver todos los artículos
              </a>
            </div>
          </div>
          <FeaturedPostCard post={featured} />
        </div>
      </section>
    </div>
  )
}
