import { SectionContainer } from "@/components/landing/SectionContainer"
import { CTAButton } from "../CTAButton"
import Image from "next/image"

export function AboutSection() {
  return (
    <SectionContainer >
      <div className="grid gap-13 md:grid-cols-2 md:items-center">
        <div className="space-y-4 col-span-1">
          <h2 className="section-title">
            Construido por especialistas en ventas y restauracion
          </h2>
          <p className="section-paragraph">
            PowerUp nace de la combinacion entre tecnologia y estrategia gastronomica. Unimos
            ingenieria de menu, marketing y desarrollo de producto para ayudar a restaurantes a
            vender mas con su carta digital.
          </p>
          <p className="text-sm font-medium text-slate-700">
            Startup espanola acelerada por Lanzadera
          </p>
          <CTAButton />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row  justify-center gap-5" >
            <Image src="/images/about-fede.png" alt="about 1" width={170} height={170} className="bg-slate-200 w-[170px] aspect-square object-cover rounded-2xl -rotate-7 shadow-2xl" />
            <div className="mt-5">
              <div className="font-medium">Federico Bello</div>
              <div className="text-sm text-slate-800">Director</div>
            </div>
          </div>
          <div className="flex flex-row  justify-end gap-5" >
            <div className="flex flex-col items-end mt-8">
              <div className="font-medium">Dani jimenez</div>
              <div className="text-sm text-slate-800">Tecnologia</div>
            </div>
            <Image src="/images/about-dani.png" alt="about 1" width={170} height={170} className="bg-slate-200 w-[170px] aspect-square object-cover rounded-2xl shadow-2xl rotate-4" />

          </div>
          <div className="flex flex-row  justify-start gap-5 items-end pl-8 -mt-13" >
            <Image src="/images/about-jordi.png" alt="about 1" width={170} height={170} className="bg-slate-200 w-[170px] aspect-square object-cover rounded-2xl -rotate-3 shadow-2xl" />
            <div className="mb-3">
              <div className="font-medium">Jordi Puig</div>
              <div className="text-sm text-slate-800">Consultor gastronómico</div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
