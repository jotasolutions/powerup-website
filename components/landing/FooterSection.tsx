import { SectionContainer } from "@/components/landing/SectionContainer"
import { CookieSettingsLink } from "@/components/CookieSettingsLink"
import { CTAButton } from "../CTAButton"
import { BlurFade } from "../ui/blur-fade"
import Link from "next/link"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { COMPANY } from "@/lib/company"

export function FooterSection() {
  return (
    <SectionContainer id="footer" className="bg-gradient-to-b from-white to-[#DEF8FF] via-[#DEF8FF]">
      <div className="space-y-8 sm:space-y-10">
        <div className="space-y-4 border-b border-solid border-[#CFF5FF] pb-8 border-b-2">
          <BlurFade inView inViewMargin="-80px">
            <h2 className="max-w-xl text-2xl font-medium max-w-md">
              La carta es la palanca más potente para impulsar las ventas de los restaurantes
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
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, {
                  label: "whatsapp",
                  location: "footer",
                  linkUrl: COMPANY.whatsappUrl,
                })}
              >
                WhatsApp {COMPANY.telephoneDisplay}
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium ">Recursos</p>
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
            <p>Aprende a vender más</p>
            <p>Prensa</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Soporte</p>
            <p>
              <a href={`mailto:${COMPANY.email}`}>Contacto</a>
            </p>
            <p>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, {
                  label: "whatsapp-ayuda",
                  location: "footer",
                  linkUrl: COMPANY.whatsappUrl,
                })}
              >
                Ayuda
              </a>
            </p>
          </div>
          <div className="space-y-2 flex flex-col gap-0">
            <p className="font-medium">Legal</p>

            <Link
              href="/terms"
              {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, {
                label: "Términos y condiciones",
                location: "footer",
                linkUrl: "/terms",
              })}
            >
              Términos y condiciones
            </Link>
            <Link
              href="/privacy"
              {...trackAttrs(ANALYTICS_EVENTS.NAV_CLICK, {
                label: "Política de privacidad",
                location: "footer",
                linkUrl: "/privacy",
              })}
            >
              Política de privacidad
            </Link>
            <CookieSettingsLink />
          </div>
        </div>
        <p className="text-xs plus-darker opacity-60">
          © 2026 {COMPANY.brandName}. Todos los derechos reservados
        </p>
      </div>
    </SectionContainer>
  )
}
