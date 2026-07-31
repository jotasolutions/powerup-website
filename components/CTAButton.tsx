"use client";

import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics";
import {
  useAttributedCtaUrl,
  useCtaLabel,
  useIsWebsiteLanding,
} from "@/lib/attribution";
import type { ReactNode } from "react";
import { QrCode } from "lucide-react";
import Link from "next/link";

type CTAButtonProps = {
  location?: string;
  label?: string;
  icon?: ReactNode;
  /** Overrides the default CTA destination (sign-up or website wizard). */
  href?: string;
  target?: string;
};

export function CTAButton({
  location,
  label,
  icon = <QrCode className="size-4" />,
  href,
  target = "_blank",
}: CTAButtonProps) {
  const ctaUrl = useAttributedCtaUrl(href);
  const resolvedLabel = useCtaLabel(label);
  const isWebsiteLanding = useIsWebsiteLanding();
  const resolvedIcon = isWebsiteLanding ? null : icon;

  return (
    <Link
      href={ctaUrl}
      target={target}
      rel="noopener noreferrer"
      {...trackAttrs(ANALYTICS_EVENTS.SIGN_UP_CLICK, {
        label: resolvedLabel,
        location,
        linkUrl: ctaUrl,
      })}
    >
      <Button className="w-full sm:w-auto h-13 sm:h-10">
        {resolvedIcon}
        {resolvedLabel}
      </Button>
    </Link>
  );
}
