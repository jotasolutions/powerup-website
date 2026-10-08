import type { Metadata } from "next"
import { LegalPageShell } from "@/components/legal/LegalPageShell"
import { PrivacyContent } from "@/components/legal/privacy-content"
import { websiteOpenGraph } from "@/lib/site"

const title = "Política de privacidad | PowerUp Menu"
const description = "Política de privacidad de PowerUp Menu."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: websiteOpenGraph({ title, description, url: "/privacy" }),
}

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Política de privacidad">
      <PrivacyContent />
    </LegalPageShell>
  )
}
