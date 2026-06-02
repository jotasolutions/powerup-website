import type { ReactNode } from "react"

type SectionContainerProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function SectionContainer({ id, className, children }: SectionContainerProps) {
  return (
    <section id={id} className={`w-full py-12 md:py-20 lg:py-24 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-7 sm:px-6 md:px-8 lg:px-10">{children}</div>
    </section>
  )
}
