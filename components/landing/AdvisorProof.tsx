import { ArrowUpRight, BadgeCheck, RotateCw } from "lucide-react"
import { ANALYTICS_EVENTS } from "@/lib/analytics/events"
import { trackAttrs } from "@/lib/analytics/attributes"

// Why to trust the Advisor: the press piece about this very service (same article and title the
// blog's PressSection cites, checked against it), then the two claims the section always made.
// The outlet's name is set in a serif as a masthead; no third-party logo is used.
const PRESS_URL =
    "https://www.profesionalhoreca.com/el-servicio-gratuito-que-ayuda-a-los-restaurantes-a-mejorar-sus-cartas/"

export function AdvisorProof() {
    return (
        <div className="space-y-3">
            <a
                href={PRESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-white bg-white/70 p-4 shadow-sm shadow-[#1F4D3A]/5 transition-shadow hover:shadow-md sm:p-5"
                {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "Profesional Horeca", location: "advisor" })}
            >
                <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Salimos en la prensa
                    </span>
                    <span className="text-[11px] text-slate-500">Julio 2024</span>
                </div>
                <div className="mt-2 font-serif text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    Profesional Horeca
                </div>
                <p className="mt-1.5 font-serif text-[15px] leading-snug text-slate-700 italic sm:text-base">
                    «El servicio gratuito que ayuda a los restaurantes a mejorar sus cartas»
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#1E7F5F]">
                    Leer el artículo
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#1F4D3A]/80">
                <li className="flex items-center gap-1.5">
                    <RotateCw className="size-3.5" />
                    Análisis 360º de tu carta
                </li>
                <li className="flex items-center gap-1.5">
                    <BadgeCheck className="size-3.5" />
                    Marco científico de más de 50 publicaciones
                </li>
            </ul>
        </div>
    )
}
