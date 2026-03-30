import { SectionContainer } from "@/components/landing/SectionContainer"
import { steps } from "@/components/landing/section-data"
import Image from "next/image"
import { CTAButton } from "../CTAButton"
export function HowItWorksSection() {
  return (
    <SectionContainer>
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="section-title">Empezar es muy facil</h2>
          <p className="section-paragraph">
            Es tan simple que podrias configurarlo tu solo. Pero te lo facilitamos aun mas.
          </p>
        </div>
        <div className="flex flex-row justify-between gap-12 relative">
          <Image src="/images/hiw-vector.svg" alt="hiw vector" width={1000} height={1000} className="absolute -top-25 left-[2%] w-8/10 h-full object-contain" />
          {steps.map((item, index) => (
            <article key={item.title} className="space-y-4 w-1/3">
              <div className="relative h-55">
                <div className={`absolute text-xl font-heading font-medium w-13 h-13  rounded-full flex items-center justify-center ${item.stepNumerClass}`}>
                  <div className="plus-darker opacity-70">{index + 1}</div>
                </div>
                <Image src={item.image} alt={item.title} width={300} height={300} className={item.imageClass} />
              </div>
              <div className="space-y-2 pr-2">
                <h3 className="text-xl font-medium text-slate-700">{item.title}</h3>
                <p className="text-base leading-6 text-slate-600">{item.description}</p>
              </div>

            </article>
          ))}
        </div>
        <div className="flex justify-center">
          <CTAButton />
        </div>
      </div>
    </SectionContainer>
  )
}
