"use client";

import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackAttrs } from "@/lib/analytics";
import type { ReactNode } from "react";
import { QrCode } from "lucide-react";
import Link from "next/link";

const SIGN_UP_URL = "https://admin.powerup.menu/sign-up";

type CTAButtonProps = {
  location?: string;
  label?: string;
  icon?: ReactNode;
};

export function CTAButton({
  location,
  label = "Crear carta gratis",
  icon = <QrCode className="size-4" />,
}: CTAButtonProps) {
  return (
    <Link
      href={SIGN_UP_URL}
      target="_blank"
      rel="noopener noreferrer"
      {...trackAttrs(ANALYTICS_EVENTS.SIGN_UP_CLICK, {
        label,
        location,
        linkUrl: SIGN_UP_URL,
      })}
    >
      <Button className="w-full sm:w-auto h-13 sm:h-10">
        {icon}
        {label}
      </Button>
    </Link>
  );
}
