import Image from "next/image"
import { CTAButton } from "@/components/CTAButton"
import { ANALYTICS_EVENTS } from "@/lib/analytics/events"
import { trackAttrs } from "@/lib/analytics/attributes"
import { exampleMenuUrl } from "@/lib/blog/config"
import type { Post } from "@/lib/blog/posts"
import { cn } from "@/lib/utils"
import { AdvisorPromoSidebar } from "./AdvisorPromo"
import { CircledWord } from "./CircledWord"
import { MaestroLink, SignUpTextLink } from "./CtaLinks"
import { buttonPrimary, buttonSecondary, eyebrow } from "./styles"

// `destino_comercial` says where the CTA goes, `cta` how strong it is:
//   soft   → text link after the article
//   medium → bottom banner
//   strong → sidebar card (Advisor for PowerUp, a Maestro card for Maestro) + bottom banner

export function SidebarCta({ post }: { post: Post }) {
  if (post.cta !== "strong") return null
  if (post.destino_comercial === "powerup") return <AdvisorPromoSidebar />
  return (
    <div className="flex flex-col items-start gap-3 rounded-[22px] border border-border bg-[#F8F0FF] p-[22px]">
      <p className={eyebrow}>Maestro · Consultoría</p>
      <p className="font-heading text-xl font-medium leading-tight tracking-tight text-slate-900">Consultoría de rentabilidad para tu restaurante</p>
      <p className="text-sm leading-normal text-slate-600">Food cost, carta y estrategia de precios, con el equipo de Maestro.</p>
      <MaestroLink campaign={post.slug} className={cn(buttonPrimary, "h-10 px-4")}>
        Conocer Maestro
      </MaestroLink>
    </div>
  )
}

export function InlineCta({ post }: { post: Post }) {
  if (post.cta !== "soft") return null
  const link = "font-medium text-primary underline underline-offset-4 hover:text-slate-900"
  return (
    <p className="max-w-[680px] border-t border-border pt-6 text-[17px] leading-relaxed text-slate-700">
      {post.destino_comercial === "powerup" ? (
        <>
          ¿Quieres aplicarlo en tu restaurante?{" "}
          <SignUpTextLink label="Crea tu carta digital gratis" className={link}>
            Crea tu carta digital gratis con PowerUp Menu
          </SignUpTextLink>
          .
        </>
      ) : (
        <>
          ¿Quieres revisar la rentabilidad de tu carta?{" "}
          <MaestroLink campaign={post.slug} className={link}>
            Conoce Maestro, la consultoría de rentabilidad de PowerUp Menu
          </MaestroLink>
          .
        </>
      )}
    </p>
  )
}

export function BottomCta({ post }: { post: Post }) {
  if (post.cta === "soft") return null
  const exampleUrl = exampleMenuUrl(post.slug)

  return (
    <section className="mx-auto mt-10 w-full max-w-[1200px] px-4">
      <div className="hero-container grid items-center gap-6 overflow-hidden rounded-3xl px-6 py-8 sm:px-10 sm:py-12 md:grid-cols-[minmax(0,1fr)_auto]">
        {post.destino_comercial === "powerup" ? (
          <>
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-[clamp(26px,3vw,36px)] font-medium leading-tight tracking-tight text-slate-900">
                Convierte tu carta en una máquina de <CircledWord>ventas</CircledWord>
              </h2>
              <p className="font-heading text-[17px] leading-relaxed text-slate-700">
                PowerUp Free es gratis para siempre. Sin conocimiento técnico.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <CTAButton location="blog" />
                <a
                  href={exampleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonSecondary}
                  {...trackAttrs(ANALYTICS_EVENTS.EXAMPLE_MENU_CLICK, {
                    label: "Ver carta de ejemplo",
                    location: "blog",
                    linkUrl: exampleUrl,
                  })}
                >
                  Ver carta de ejemplo
                </a>
              </div>
            </div>
            <Image
              src="/images/carta-mockup2.png"
              alt="Carta digital de PowerUp Menu en el móvil"
              width={376}
              height={258}
              className="w-full max-w-[380px] justify-self-center"
            />
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <p className={eyebrow}>Maestro · Consultoría</p>
            <h2 className="font-heading text-[clamp(26px,3vw,36px)] font-medium leading-tight tracking-tight text-slate-900">
              Consultoría de rentabilidad para tu restaurante
            </h2>
            <p className="font-heading text-[17px] leading-relaxed text-slate-700">
              Maestro es el servicio de consultoría de rentabilidad de PowerUp Menu: food cost, carta y estrategia de precios.
            </p>
            <MaestroLink campaign={post.slug} className={cn(buttonPrimary, "self-start")}>
              Conocer Maestro
            </MaestroLink>
          </div>
        )}
      </div>
    </section>
  )
}
