import { SectionContainer } from "@/components/landing/SectionContainer"
import { CookieSettingsLink } from "@/components/CookieSettingsLink"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"
import Link from "next/link"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { COMPANY } from "@/lib/company"
import type { Locale } from "@/lib/locale"
import { footerCopy, whatsappUrlFor } from "./home-copy"

// A server component, so the page passes its language (the blog and the Spanish pages use the default).
export function FooterSection({ locale = "es" }: { locale?: Locale }) {
  const copy = footerCopy[locale]
  const whatsappUrl = whatsappUrlFor(locale)
  return (
    <SectionContainer id="footer" className="bg-gradient-to-b from-white to-[#DEF8FF] via-[#DEF8FF]">
      <div className="space-y-8 sm:space-y-10">
        <div className="space-y-4 border-b border-solid border-[#CFF5FF] pb-8 border-b-2">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="max-w-xl text-2xl font-medium max-w-md">
              {copy.title}
            </h2>
          </BlurFade>
          <CTAButton />
        </div>
        <div className="grid gap-8 border-b border-solid border-[#CFF5FF] pb-8 text-sm sm:grid-cols-2 md:grid-cols-4 border-b-2">
          <div className="space-y-2">
            <p className="font-medium text-lg">{COMPANY.brandName}</p>
            <p className="text-xs leading-relaxed opacity-80">{COMPANY.legalName}</p>
            <p className="text-xs leading-relaxed opacity-80">CIF {COMPANY.cif}</p>
            <p className="text-xs leading-relaxed opacity-80">{COMPANY.addressDisplay}</p>
            <p className="text-xs leading-relaxed opacity-80">
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </p>
            <p className="text-xs leading-relaxed opacity-80">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, {
                  label: "whatsapp",
                  location: "footer",
                  linkUrl: whatsappUrl,
                })}
              >
                WhatsApp {COMPANY.telephoneDisplay}
              </a>
            </p>
          </div>
          {copy.showBlogLinks ? (
            <div className="space-y-2">
              <p className="font-medium ">{copy.resources}</p>
              <p>
                <Link
                  href="/blog"
                  {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, {
                    label: "Blog",
                    location: "footer",
                    linkUrl: "/blog",
                  })}
                >
                  Blog
                </Link>
              </p>
              <p>
                <Link
                  href="/blog/ingenieria-de-menu-para-restaurantes"
                  {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, {
                    label: "Ingeniería de menú",
                    location: "footer",
                    linkUrl: "/blog/ingenieria-de-menu-para-restaurantes",
                  })}
                >
                  Ingeniería de menú
                </Link>
              </p>
              <p>
                <Link
                  href="/blog/costo-de-comida"
                  {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, {
                    label: "Costo de comida",
                    location: "footer",
                    linkUrl: "/blog/costo-de-comida",
                  })}
                >
                  Costo de comida
                </Link>
              </p>
              <p>
                <Link
                  href="/blog/carta-restaurante"
                  {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, {
                    label: "Carta de restaurante",
                    location: "footer",
                    linkUrl: "/blog/carta-restaurante",
                  })}
                >
                  Carta de restaurante
                </Link>
              </p>
            </div>
          ) : null}
          <div className="space-y-2">
            <p className="font-medium">{copy.support}</p>
            <p>
              <a href={`mailto:${COMPANY.email}`}>{copy.contact}</a>
            </p>
            <p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, {
                  label: "whatsapp-ayuda",
                  location: "footer",
                  linkUrl: whatsappUrl,
                })}
              >
                {copy.help}
              </a>
            </p>
          </div>
          <div className="space-y-2 flex flex-col gap-0">
            <p className="font-medium">{copy.legal}</p>

            <Link
              href="/terms"
              {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, {
                label: copy.terms,
                location: "footer",
                linkUrl: "/terms",
              })}
            >
              {copy.terms}
            </Link>
            <Link
              href="/privacy"
              {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, {
                label: copy.privacy,
                location: "footer",
                linkUrl: "/privacy",
              })}
            >
              {copy.privacy}
            </Link>
            <CookieSettingsLink />
          </div>
        </div>
        <p className="text-xs plus-darker opacity-60">
          © 2026 {COMPANY.brandName}. {copy.rights}
        </p>
      </div>
    </SectionContainer>
  )
}
