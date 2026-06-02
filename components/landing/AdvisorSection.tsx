"use client"

import { BadgeCheck, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { AdvisorWidget } from "../AdvisorWidget";
import { SectionContainer } from "./SectionContainer";
import Image from "next/image";

const advisorImageViewport = {
    once: false as const,
    /** Require a meaningful portion of the element in view (default is very loose). */
    amount: 0.45,
    /** Shrink the “in view” band from the bottom so the scroll trigger fires later. */
    margin: "0px 0px -22% 0px",
}

export function AdvisorSection() {
    const checkItems = [
        {
            icon: <RotateCw  className="size-5 mt-1" />,
            title: "Análisis 360º",
            desc: "Para encontrar puntos de mejoras"
        },
        {
            icon: <BadgeCheck className="size-5 mt-1" /> ,
            title: "Respaldado por estudios",
            desc: "Marco cientifico de más de 50 publicaciones"
        }
    ]
    return (
        <SectionContainer
            id="advisor"
        >
            <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-[#D0F6EA] bg-gradient-to-b from-[#F0FEE2] to-[#E2FEE2] p-5 sm:p-8 md:p-10 lg:flex-row lg:items-center lg:gap-12 lg:p-12">

                <div className="flex-1 space-y-6 lg:space-y-7">
                    <div className="relative h-[110px] w-full sm:h-[130px]">
                        <motion.div
                            className="absolute z-20 w-[150px] origin-bottom-left sm:w-[214px]"
                            initial={{ rotate: 0, bottom: -50, opacity: 0, left: 50, scale: 0.8 }}
                            whileInView={{ rotate: -10, bottom: 6, opacity: 1, left: 8, scale: 1 }}
                            viewport={advisorImageViewport}
                            transition={{
                                duration: 0.5,
                                ease: [0.7, -0.6, 0.32, 1.6]
                            }}
                        >
                            <Image
                                src="/images/advisor-widget.png"
                                alt="cercles"
                                width={300}
                                height={300}
                                className="w-full h-auto object-contain rounded-3xl border border-6 shadow-xl border-white/60"
                            />
                        </motion.div>
                        <motion.div
                            className="absolute z-10 w-[200px] origin-bottom-right sm:w-[280px]"
                            initial={{ rotate: 0, opacity: 0, bottom: -50, right: 70, scale: 0.8 }}
                            whileInView={{ rotate: 6, opacity: 1, bottom: -2, right: 6, scale: 1 }}
                            viewport={advisorImageViewport}
                            transition={{
                                delay: 0.12,
                                duration: 0.5,
                                ease: [0.7, -0.6, 0.32, 1.6]
                            }}
                        >
                            <Image
                                src="/images/advisor-checks.png"
                                alt="cercles"
                                width={300}
                                height={300}
                                className="w-full h-auto object-contain"
                            />
                        </motion.div>
                    </div>
                    <div className=" space-y-3">
                        <h3 className="plus-darker font-heading text-2xl font-medium opacity-65 sm:text-3xl">Evalua tu carta GRATIS</h3>
                        <p className="plus-darker opacity-65">Recibe un análisis completo con sugerencias prácticas y <strong className="font-semibold">recomendaciones a medida para aumentar tus ventas hasta un 30%.</strong> Como lo haría un experto.</p>
                    </div>
                    {checkItems.map((checkItem, index) => (
                        <div key={index} className="flex flex-row gap-2 plus-darker opacity-65">
                            {checkItem.icon}
                            <div className="space-y-1">
                                <div className="font-semibold">{checkItem.title}</div>
                                <div className="text-sm">{checkItem.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full lg:w-auto">
                    <AdvisorWidget />
                </div>

            </div>
        </SectionContainer>
    )
}