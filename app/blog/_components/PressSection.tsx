import Image from "next/image"
import { ANALYTICS_EVENTS } from "@/lib/analytics/events"
import { trackAttrs } from "@/lib/analytics/attributes"
import incibeSeal from "../_assets/incibe-ventures.png"
import { container, sectionTitle } from "./styles"

// Quotes checked verbatim against each article. Outlet logos are initials on purpose:
// the design hotlinked third-party thumbnails.
const PRESS = [
  {
    outlet: "Profesional Horeca",
    initials: "PH",
    headline: "El servicio gratuito que ayuda a los restaurantes a mejorar sus cartas",
    quote:
      "“Vemos una urgente necesidad de digitalizar el sector, por eso nos centramos en ofrecer soluciones que faciliten el trabajo de los restauradores.” — Federico Bello, CEO de PowerUp Menu.",
    date: "Julio 2024",
    url: "https://www.profesionalhoreca.com/el-servicio-gratuito-que-ayuda-a-los-restaurantes-a-mejorar-sus-cartas/",
  },
  {
    outlet: "El Español · Invertia",
    initials: "EE",
    headline: "Lanzadera aglutina con más de cien startups una de las ‘hornadas’ más numerosas de talento emprendedor",
    quote: "“PowerUp Menu redefine la carta de restaurante, fusionando gestión y marketing para potenciar beneficios y satisfacción del cliente.”",
    date: "Marzo 2024",
    url: "https://www.elespanol.com/invertia/disruptores/ecosistema-startup/aceleradoras/20240304/lanzadera-aglutina-cien-startups-hornadas-numerosas-talento-emprendedor/837416302_0.html",
  },
]

const logoClass = "h-[38px] w-auto max-w-[150px] object-contain opacity-60 grayscale"

function Backers() {
  return (
    <div className="flex flex-col items-center gap-6 border-t border-border pb-2.5 pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">Respaldados por</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        <li>
          <a
            href="https://lanzadera.es/proyecto/powerup-menu/"
            target="_blank"
            rel="noopener noreferrer"
            {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "Lanzadera", location: "blog" })}
          >
            <Image src="/images/companies/lanzadera.svg" alt="Lanzadera" width={217} height={38} className={logoClass} />
          </a>
        </li>
        <li>
          <Image src="/images/companies/orbita.png" alt="Órbita Accelerator" width={144} height={38} className={logoClass} />
        </li>
        <li>
          <a
            href="https://startupvalencia.org/directory-list/listing/powerup-menu/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-lg font-semibold tracking-tight text-slate-500"
            {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "Startup Valencia", location: "blog" })}
          >
            Startup Valencia
          </a>
        </li>
        <li>
          <a
            href="https://www.incibe.es/"
            target="_blank"
            rel="noopener noreferrer"
            {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "INCIBE", location: "blog" })}
          >
            <Image src={incibeSeal} alt="Sello INCIBE Emprende Ventures" className="h-16 w-auto md:h-[84px]" />
          </a>
        </li>
      </ul>
    </div>
  )
}

export function PressSection() {
  return (
    <section className="bg-gradient-to-b from-white via-[#E2FEFD] to-white pt-12 md:pt-[72px]">
      <div className={`${container} flex flex-col gap-8`}>
        <div className="flex max-w-[760px] flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Prensa y reconocimiento</p>
          <h2 className={sectionTitle}>Lo que se dice de PowerUp fuera de casa</h2>
          <p className="mt-1 text-base leading-relaxed text-slate-700">
            Empresa valenciana acelerada y validada por los programas de referencia del ecosistema emprendedor español.
          </p>
        </div>
        <ul className="grid gap-7 md:grid-cols-2">
          {PRESS.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col gap-5 rounded-[24px] bg-card p-6 shadow-xl md:p-8"
                {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: item.outlet, location: "blog", linkUrl: item.url })}
              >
                <span className="font-heading text-[21px] font-medium leading-snug tracking-tight text-pretty text-slate-900">
                  {item.headline}
                </span>
                <span className="text-[15px] leading-relaxed text-slate-700">{item.quote}</span>
                <span className="mt-auto flex items-center gap-2.5 text-[13px] text-slate-600">
                  <span className="flex size-9 flex-none items-center justify-center rounded-full bg-[#DEF8FF] font-heading text-sm font-semibold text-primary">
                    {item.initials}
                  </span>
                  <span className="font-semibold text-slate-900">{item.outlet}</span>
                  <span aria-hidden>·</span>
                  <span>{item.date}</span>
                  <span className="ml-auto font-medium text-primary">Leer ↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Backers />
      </div>
    </section>
  )
}
