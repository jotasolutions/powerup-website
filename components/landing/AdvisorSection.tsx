"use client"

import { ArrowBigDown, BadgeCheck, RotateCw } from "lucide-react";
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
            <div className="mx-auto max-w-5xl items-center space-y-3 bg-gradient-to-b from-[#F0FEE2] to-[#E2FEE2] rounded-3xl border border-[#D0F6EA] p-12 flex flex-row gap-12">

                <div className="flex-1 space-y-7">
                    <div className="h-[130px] w-full relative">
                        <motion.div
                            className="absolute z-20   w-[214px] origin-bottom-left"
                            initial={{ rotate: 0, bottom: -50, opacity: 0, left: 50, scale: 0.8 }}
                            whileInView={{ rotate: -10, bottom: 10, opacity: 1, left: 20, scale: 1 }}
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
                            className="absolute z-10  w-[280px] origin-bottom-right"
                            initial={{ rotate: 0, opacity: 0, bottom: -50, right: 70, scale: 0.8 }}
                            whileInView={{ rotate: 6, opacity: 1, bottom: 0, right: 40, scale: 1 }}
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
                        <h3 className="font-heading font-medium text-3xl plus-darker opacity-65">Evalua tu carta GRATIS</h3>
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
                <AdvisorWidget />

            </div>
        </SectionContainer>
    )
}