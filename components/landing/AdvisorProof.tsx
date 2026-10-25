import Image from "next/image"
import { BadgeCheck, RotateCw } from "lucide-react"

// Why to trust the Advisor: the press piece about this very service (same article and title the
// blog's PressSection cites, checked against it), then the two claims the section always made.
// Not a link on purpose: it should build trust, not send people away from the form.
export function AdvisorProof() {
    return (
        <div className="space-y-3">
            <figure className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm shadow-[#1F4D3A]/5 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Salimos en la prensa
                    </span>
                    <span className="text-[11px] text-slate-500">Julio 2024</span>
                </div>
                <Image
                    src="/images/press/profesional-horeca.png"
                    alt="Profesional Horeca"
                    width={496}
                    height={82}
                    className="mt-3 h-6 w-auto sm:h-7"
                />
                <blockquote className="mt-2.5 font-serif text-[15px] leading-snug text-slate-700 italic sm:text-base">
                    «El servicio gratuito que ayuda a los restaurantes a mejorar sus cartas»
                </blockquote>
            </figure>
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
