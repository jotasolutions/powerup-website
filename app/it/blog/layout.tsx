import type { Metadata } from "next"
import type { ReactNode } from "react"
import { AdvisorDialogProvider } from "@/app/blog/_components/AdvisorDialog"
import { FooterSection } from "@/components/landing/FooterSection"
import { NavMenu } from "@/components/landing/NavMenu"
import { ITALIAN_BLOG_NAME } from "@/lib/blog/config"

// The Italian blog (/it/blog) reuses the Spanish blog's parts with Italian texts. Inside /it, so the
// /it layout already declares the language.
export const metadata: Metadata = {
  title: { template: `%s | ${ITALIAN_BLOG_NAME}`, default: ITALIAN_BLOG_NAME },
}

export default function ItalianBlogLayout({ children }: { children: ReactNode }) {
  return (
    <AdvisorDialogProvider>
      <main className="flex flex-1 flex-col bg-white text-slate-900">
        <NavMenu prefetchLinks={false} />
        {children}
        <FooterSection locale="it" />
      </main>
    </AdvisorDialogProvider>
  )
}
