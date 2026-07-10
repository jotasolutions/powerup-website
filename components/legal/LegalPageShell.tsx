import type { ReactNode } from "react"
import { FooterSection } from "@/components/landing/FooterSection"
import { NavMenu } from "@/components/landing/NavMenu"
import { SectionContainer } from "@/components/landing/SectionContainer"

type LegalPageShellProps = {
  title: string
  children: ReactNode
}

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <div className="bg-white text-slate-900">
      <NavMenu />
      <SectionContainer>
        <div className="max-w-4xl space-y-8">
          <h1 className="section-title">{title}</h1>
          <div className="space-y-8 section-paragraph [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-slate-900 [&_h2]:font-medium [&_h2]:md:text-2xl [&_h3]:font-heading [&_h3]:text-lg [&_h3]:text-slate-900 [&_h3]:font-medium [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_li]:leading-relaxed">
            {children}
          </div>
        </div>
      </SectionContainer>
      <FooterSection />
    </div>
  )
}
