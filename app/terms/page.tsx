import type { Metadata } from "next"
import { LegalPageShell } from "@/components/legal/LegalPageShell"
import { TermsContent } from "@/components/legal/terms-content"
import { websiteOpenGraph } from "@/lib/site"

const title = "Términos y condiciones | PowerUp Menu"
const description = "Términos y condiciones de uso de PowerUp Menu."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terms",
  },
  openGraph: websiteOpenGraph({ title, description, url: "/terms" }),
}

export default function TermsPage() {
  return (
    <LegalPageShell title="Términos y condiciones">
      <TermsContent />
    </LegalPageShell>
  )
}
