"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Settings } from "lucide-react";
import { useCookieConsent } from "./cookie-provider";

export interface CookieBannerProps {
  className?: string;
}

export function CookieBanner({ className }: CookieBannerProps) {
  const { isBannerVisible, acceptAll, rejectAll, openSettings, config } =
    useCookieConsent();

  const positionClasses = {
    bottom: "inset-x-0 bottom-0",
    top: "inset-x-0 top-0",
    "bottom-left": "bottom-5 left-5 max-w-sm",
    "bottom-right": "bottom-5 right-5 max-w-sm",
  };

  const position = config.position ?? "bottom-left";
  const isCorner = position === "bottom-left" || position === "bottom-right";

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          initial={{
            y: position.includes("top") ? -24 : 24,
            opacity: 0,
          }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: position.includes("top") ? -24 : 24,
            opacity: 0,
          }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className={cn("fixed z-50", positionClasses[position], className)}
        >
          <div
            className={cn(
              "rounded-2xl bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
              !isCorner && "mx-auto max-w-5xl border border-border"
            )}
          >
            <p className="text-sm leading-relaxed text-neutral-800">
              Usamos cookies en este sitio web para rendimiento, personalización
              y marketing.{" "}
              {config.privacyPolicyUrl && (
                <a
                  href={config.privacyPolicyUrl}
                  className="text-neutral-500 transition-colors hover:text-neutral-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Más información en nuestra política de cookies.
                </a>
              )}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={openSettings}
                className="bg-transparent"
                aria-label="Personalizar cookies"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={rejectAll}>
                Rechazar todo
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Aceptar todo
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
