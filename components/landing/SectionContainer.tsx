import type { ReactNode } from "react"

type SectionContainerProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function SectionContainer({ id, className, children }: SectionContainerProps) {
  return (
    <section id={id} className={`w-full py-14 md:py-32 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">{children}</div>
    </section>
  )
}
