"use client";

import {
  CookieBanner,
  CookieConsentProvider,
  CookieSettings,
  type CategoryConfig,
} from "@/components/cookie-consent";

const cookieCategories: CategoryConfig[] = [
  {
    key: "necessary",
    title: "Necesarias",
    description:
      "Cookies esenciales para el funcionamiento del sitio web. No se pueden desactivar.",
    required: true,
  },
  {
    key: "analytics",
    title: "Analíticas",
    description:
      "Cookies que nos ayudan a entender cómo los visitantes interactúan con el sitio.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Cookies utilizadas para publicidad y seguimiento en distintos sitios web.",
  },
  {
    key: "preferences",
    title: "Preferencias",
    description: "Cookies que recuerdan tu configuración y preferencias.",
  },
];

export function CookieConsent({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider
      config={{
        consentVersion: "1.0.0",
        privacyPolicyUrl: "/privacy#cookies",
        position: "bottom-left",
        categories: cookieCategories,
      }}
    >
      {children}
      <CookieBanner />
      <CookieSettings />
    </CookieConsentProvider>
  );
}
