"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics"
import { useAttributedCtaUrl, useAttributedUrl } from "@/lib/attribution"
import { maestroUrl } from "@/lib/blog/config"

/** Text-link version of CTAButton: same sign-up URL with stored UTMs and the same SIGN_UP_CLICK event. */
export function SignUpTextLink({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  const href = useAttributedCtaUrl()
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...trackAttrs(ANALYTICS_EVENTS.SIGN_UP_CLICK, { label, location: "blog", linkUrl: href })}
    >
      {children}
    </Link>
  )
}

/** Maestro is another site: blog UTMs, plus any stored attribution params it doesn't already set. */
export function MaestroLink({
  campaign,
  content,
  className,
  children,
}: {
  campaign: string
  /** utm_content: where in the article the link sits ("banner", "enlace-final"). */
  content: string
  className?: string
  children: ReactNode
}) {
  const href = useAttributedUrl(maestroUrl(campaign, content))
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...trackAttrs(ANALYTICS_EVENTS.OUTBOUND_CLICK, { label: "maestro", location: "blog", linkUrl: href })}
    >
      {children}
    </a>
  )
}
