import type { ReactNode } from "react"
import { ItalianHtmlLang } from "./ItalianHtmlLang"

// Everything under /it is in Italian. The root layout (shared with the Spanish home) stays
// untouched: the language is declared here, on the content and for Bing, which reads
// content-language (Google decides the language from the text itself).
export default function ItalianLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="it" className="contents">
      <meta httpEquiv="content-language" content="it" />
      <ItalianHtmlLang />
      {children}
    </div>
  )
}
