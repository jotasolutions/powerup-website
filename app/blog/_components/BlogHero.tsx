import { QrCode } from "lucide-react"
import Image from "next/image"
import type { Post } from "@/lib/blog/posts"
import { cn } from "@/lib/utils"
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
              Ideas para que tu carta{" "}
              <span aria-hidden className="mx-2 inline-flex rotate-[11deg] rounded-md bg-primary p-1.5 align-middle text-primary-foreground shadow-lg">
                <QrCode className="size-6" />
              </span>{" "}
              <CircledWord>venda más</CircledWord>
            </h1>
            <p className="font-heading text-lg leading-relaxed text-slate-700">
              Ingeniería de menú, neuromarketing y casos reales de restaurantes. Para dueños, no para técnicos.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Guías prácticas sobre carta digital, costo de comida y cómo diseñar un menú que venda más sin complicarte con la tecnología.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {/* Full width on mobile, as the home's hero buttons. */}
              <AdvisorTrigger className={cn(buttonAdvisor, "w-full sm:w-auto")}>
                <QrCode />
                Analiza tu carta gratis
              </AdvisorTrigger>
              <a href="#articulos" className={cn(buttonSecondary, "w-full sm:w-auto")}>
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
