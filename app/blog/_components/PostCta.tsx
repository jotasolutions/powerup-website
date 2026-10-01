import Image from "next/image"
import { CTAButton } from "@/components/CTAButton"
import { ANALYTICS_EVENTS } from "@/lib/analytics/events"
import { trackAttrs } from "@/lib/analytics/attributes"
import { exampleMenuUrl } from "@/lib/blog/config"
import type { Post } from "@/lib/blog/posts"
import { cn } from "@/lib/utils"
import { CircledWord } from "./CircledWord"
import { MaestroLink, SignUpTextLink } from "./CtaLinks"
import { buttonPrimary, buttonSecondary, eyebrow } from "./styles"

// The CTA after each article, decided per article (never per theme): the carta digital by
// default, Maestro when `destino_comercial: maestro`. `cta` only picks its form:
//   soft          → text link
//   medium/strong → banner (they look the same for now)
// The Advisor card in the sidebar and the site menu keep the product on every article.

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
          <MaestroLink campaign={post.slug} content="enlace-final" className={link}>
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
              {/* As in the home's hero: on mobile both buttons are full width and as tall as the site's
                  sign-up button (which sizes itself to its container), side by side from sm. */}
              <div className="flex flex-wrap gap-2.5">
                <div className="w-full sm:w-auto">
                  <CTAButton location="blog" />
                </div>
                <a
                  href={exampleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonSecondary, "h-13 w-full sm:h-10 sm:w-auto")}
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
            <MaestroLink campaign={post.slug} content="banner" className={cn(buttonPrimary, "self-start")}>
              Conocer Maestro
            </MaestroLink>
          </div>
        )}
      </div>
    </section>
  )
}
