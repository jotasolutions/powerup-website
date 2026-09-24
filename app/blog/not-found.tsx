import { QrCode } from "lucide-react"
import Link from "next/link"
import { BLOG_PATH } from "@/lib/blog/config"
import { CircledWord } from "./_components/CircledWord"
import { buttonPrimary, buttonSecondary, pageTitle } from "./_components/styles"

export default function BlogNotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-gradient-to-b from-white via-[#DEF8FF] to-white px-6 py-20">
      <div className="flex max-w-[520px] flex-col items-center gap-5 text-center">
        <span aria-hidden className="inline-flex rotate-[11deg] rounded-[10px] bg-primary p-4 text-primary-foreground shadow-lg">
          <QrCode className="size-10" />
        </span>
        <p className="font-heading text-sm font-medium tracking-[0.08em] text-slate-600">ERROR 404</p>
        <h1 className={pageTitle}>
          Este plato no está en la <CircledWord>carta</CircledWord>
        </h1>
        <p className="text-[17px] leading-relaxed text-slate-600">
          La página que buscas se ha movido o ya no existe. Te recomendamos empezar por los últimos artículos.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Link href={BLOG_PATH} className={buttonPrimary}>
            Volver al blog
          </Link>
          <Link href="/" className={buttonSecondary}>
            Ir a PowerUp Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
