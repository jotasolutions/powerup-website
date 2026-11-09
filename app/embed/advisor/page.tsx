import type { Metadata } from "next"

import { AdvisorEmbed } from "./AdvisorEmbed"

// Only the Advisor form, for Maestro (maestro.powerup.menu) to show inside its own window, the way
// the blog shows it in a dialog. Nothing on www links here and it stays out of the sitemap.
export const metadata: Metadata = {
  title: "Evalúa tu carta · PowerUp Menu",
  alternates: { canonical: "/embed/advisor" },
  robots: { index: false, follow: false },
}

export default function AdvisorEmbedPage() {
  return (
    <main className="flex min-h-dvh justify-center bg-gradient-to-b from-[#F0FEE2] to-[#E2FEE2] px-4 pb-24 pt-5">
      <div className="flex w-full max-w-[404px] flex-col gap-3">
        <AdvisorEmbed />
      </div>
    </main>
  )
}
