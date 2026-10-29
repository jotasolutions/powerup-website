import { AdvisorDialogProvider } from "@/app/blog/_components/AdvisorDialog"
import { NotFoundView } from "@/components/not-found/NotFoundView"

// Any URL the site doesn't have lands here (in Italian under /it), with no nav: just the logo.
export default function NotFound() {
  return (
    <AdvisorDialogProvider>
      <NotFoundView showLogo />
    </AdvisorDialogProvider>
  )
}
