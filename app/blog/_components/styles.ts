// buttonVariants lives in a "use client" module, so server components can't call it.
const button =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06)] transition-all [&_svg]:size-4"

export const buttonPrimary = `${button} bg-gradient-to-b from-primary/90 to-primary text-primary-foreground hover:brightness-110`
export const buttonSecondary = `${button} bg-secondary text-slate-900 hover:bg-slate-100`
export const buttonAdvisor = `${button} bg-[#25946F] text-white hover:bg-[#25946F]/90`

export const container = "mx-auto w-full max-w-[1200px] px-5 md:px-6"
export const eyebrow = "text-xs font-semibold uppercase tracking-[0.04em] text-primary"
export const pageTitle = "font-heading font-medium leading-[1.15] tracking-tight text-slate-900 text-[clamp(28px,3.4vw,40px)]"
export const sectionTitle = "font-heading text-2xl font-medium tracking-tight text-slate-900 md:text-[30px]"
