import type { Metadata } from "next"
import type { ReactNode } from "react"
import { FooterSection } from "@/components/landing/FooterSection"
import { NavMenu } from "@/components/landing/NavMenu"
import { BLOG_NAME } from "@/lib/blog/config"
import { AdvisorDialogProvider } from "./_components/AdvisorDialog"

// Canonical, RSS link, Open Graph and robots are set per page through blogMetadata():
// a page that sets its own `alternates` or `openGraph` replaces the layout's whole object.
export const metadata: Metadata = {
  title: { template: `%s | ${BLOG_NAME}`, default: BLOG_NAME },
  // Search Console ownership (Fede's Google account); Google rechecks it, so don't remove it.
  // It also verifies blog.powerup.menu: Google follows that home's 301 to /blog to find the tag.
  verification: { google: "ntm9aSSyTmW9zG-OLq8FHIWLbQSRw8f5M5NyB_Ad23Y" },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <AdvisorDialogProvider>
      <div className="flex flex-1 flex-col bg-white text-slate-900">
        <NavMenu prefetchLinks={false} />
        {children}
        <FooterSection />
      </div>
    </AdvisorDialogProvider>
  )
}
