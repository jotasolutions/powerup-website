import type { Metadata } from "next"
import { LegalPageShell } from "@/components/legal/LegalPageShell"
import { PrivacyContent } from "@/components/legal/privacy-content"

export const metadata: Metadata = {
  title: "Política de privacidad | PowerUp Menu",
  description: "Política de privacidad de PowerUp Menu.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy policy">
      <PrivacyContent />
    </LegalPageShell>
  )
}
