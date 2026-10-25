import Image from "next/image"
import { BadgeCheck, RotateCw } from "lucide-react"

// Why to trust the Advisor. The press seal sits right under the form, where people decide; it's
// the outlet that wrote about this very service (the article the blog's PressSection cites).
// Not a link on purpose: it should build trust, not send people away from the form.
export function AdvisorPressSeal() {
    return (
        <div className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
            Como se vio en
            <Image
                src="/images/press/profesional-horeca.png"
                alt="Profesional Horeca"
                width={496}
                height={82}
                className="h-5 w-auto grayscale"
            />
        </div>
    )
}

// The two claims the section always made, as a quiet line under the intro.
export function AdvisorClaims() {
    return (
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
    )
}
