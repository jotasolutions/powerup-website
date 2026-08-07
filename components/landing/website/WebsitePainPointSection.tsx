'use client'

import { BlurFade } from "@/components/ui/blur-fade"
import { SectionContainer } from "../SectionContainer"
import { ThumbsDown } from "lucide-react"
import { CTAButton } from "@/components/CTAButton"
import Image from "next/image"

export function WebsitePainPointSection() {
    return (
        <SectionContainer id="website-pain-points" className="bg-gradient-to-b from-white via-[#ffdede] to-white py-16 md:py-20 ">
            <div className="space-y-8 sm:space-y-10 ">
                <div className="space-y-3 text-center">
                    <BlurFade inView inViewMargin="-80px">
                        <h2 className="landing-section-title max-w-lg mx-auto">Tu web actual puede estar frenando tu negocio</h2>
                    </BlurFade>

                </div>
                <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-10 lg:gap-6">
                    <div className="space-y-3 text-center col-span-5">
                        <Image className="w-full" src="/images/bad-website4.png" alt="Tu web actual puede estar frenando tu negocio" width={500} height={500} />
                    </div>
                    <div className="space-y-6 col-span-5">
                        <ul className="space-y-3">
                            <BlurFade inView inViewMargin="-80px">
                                <li className="shadow-lg flex items-start gap-3 rounded-2xl bg-[#f7f7f7] px-4 py-3 text-sm text-slate-700 sm:text-base">
                                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center">
                                        <ThumbsDown className="size-4" strokeWidth={2.75} aria-hidden />
                                    </span>
                                    <span>Se ve antigua o desordenada</span>
                                </li>
                            </BlurFade>
                            <BlurFade inView inViewMargin="-80px" delay={0.1}>
                                <li className="shadow-lg flex items-start gap-3 rounded-2xl bg-[#f7f7f7] px-4 py-3 text-sm text-slate-700 sm:text-base">
                                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center">
                                        <ThumbsDown className="size-4" strokeWidth={2.75} aria-hidden />
                                    </span>
                                    <span>No funciona bien en móvil</span>
                                </li>
                            </BlurFade>
                            <BlurFade inView inViewMargin="-80px" delay={0.2}>
                                <li className="shadow-lg flex items-start gap-3 rounded-2xl bg-[#f7f7f7] px-4 py-3 text-sm text-slate-700 sm:text-base">
                                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center">
                                        <ThumbsDown className="size-4" strokeWidth={2.75} aria-hidden />
                                    </span>
                                    <span>Te cuesta dinero cada vez que la cambias</span>
                                </li>
                            </BlurFade>
                            <BlurFade inView inViewMargin="-80px" delay={0.3}>
                                <li className="shadow-lg flex items-start gap-3 rounded-2xl bg-[#f7f7f7] px-4 py-3 text-sm text-slate-700 sm:text-base">
                                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center">
                                        <ThumbsDown className="size-4" strokeWidth={2.75} aria-hidden />
                                    </span>
                                    <span>Se queda desactualizada y a Google no le gusta</span>
                                </li>
                            </BlurFade>
                        </ul>
                        <CTAButton label="Crear mi web gratis" location="website-pain-points" icon={null} />
                    </div>
                </div>

            </div>

        </SectionContainer>
    )
}