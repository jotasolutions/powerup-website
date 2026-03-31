import { ArrowBigDown, BadgeCheck, RotateCw } from "lucide-react";
import { AdvisorWidget } from "../AdvisorWidget";
import { SectionContainer } from "./SectionContainer";
import Image from "next/image"

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
                    <div className="h-[130px] w-full relative ">
                        <Image
                            src="/images/advisor-widget.png"
                            alt="cercles"
                            width={300}
                            height={300}
                            className="absolute z-20 bottom-5 left-0 w-[214px] h-auto object-contain -rotate-10 rounded-3xl border border-6 shadow-xl border-white/60"
                        />
                         <Image
                            src="/images/advisor-checks.png"
                            alt="cercles"
                            width={300}
                            height={300}
                            className="absolute z-10 bottom-2 right-5 w-[280px] h-auto object-contain rotate-6  "
                        />
                    </div>
                    <div className=" space-y-3">
                        <h3 className="font-heading font-medium text-3xl plus-darker opacity-65">Evalua tu carta GRATIS</h3>
                        <p className="plus-darker opacity-65">Recibe un análisis completo con sugerencias prácticas y <strong className="font-semibold">recomendaciones a medida para aumentar tus ventas hasta un 30%.</strong> Como lo haría un experto.</p>
                    </div>
                    {checkItems.map((checkItem, index) => (
                        <div key={index} className="flex flex-row gap-2 plus-darker opacity-65">
                            {checkItem.icon}
                            <div className="space-y-0">
                                <div className="font-semibold">{checkItem.title}</div>
                                <div>{checkItem.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <AdvisorWidget />

            </div>
        </SectionContainer>
    )
}