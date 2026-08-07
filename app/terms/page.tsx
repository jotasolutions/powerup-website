import type { Metadata } from "next"
import { LegalPageShell } from "@/components/legal/LegalPageShell"
import { TermsContent } from "@/components/legal/terms-content"

export const metadata: Metadata = {
  title: "Términos y condiciones | PowerUp Menu",
  description: "Términos y condiciones de uso de PowerUp Menu.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  return (
    <LegalPageShell title="Términos y condiciones">
      <TermsContent />
    </LegalPageShell>
  )
}
