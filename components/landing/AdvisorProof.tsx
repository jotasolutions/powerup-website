import Image from "next/image"
import { BadgeCheck, RotateCw } from "lucide-react"
import type { AdvisorCopy } from "../advisor-copy"

// Why to trust the Advisor. The press seal sits right under the form, where people decide; it's
// the outlet that wrote about this very service (the article the blog's PressSection cites).
// Not a link on purpose: it should build trust, not send people away from the form.
export function AdvisorPressSeal({ label }: { label: string | null }) {
    if (!label) return null
    return (
        <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white bg-white/70 py-2 pl-4 pr-5 shadow-sm shadow-[#1F4D3A]/5">
                <span className="text-xs text-slate-500">{label}</span>
                <span className="h-4 w-px bg-slate-200" aria-hidden />
                <Image
                    src="/images/press/profesional-horeca.png"
                    alt="Profesional Horeca"
                    width={496}
                    height={82}
                    className="h-[22px] w-auto"
                />
            </div>
        </div>
    )
}

// The two claims the section always made, as a quiet line under the intro.
export function AdvisorClaims({ claims }: { claims: AdvisorCopy["section"]["claims"] }) {
    const icons = [RotateCw, BadgeCheck]
    return (
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#1F4D3A]/80">
            {claims.map((claim, i) => {
                const Icon = icons[i]
                return (
                    <li key={claim} className="flex items-center gap-1.5">
                        <Icon className="size-3.5" />
                        {claim}
                    </li>
                )
            })}
        </ul>
    )
}
