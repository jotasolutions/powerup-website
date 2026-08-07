import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AttributionCapture } from "@/components/AttributionCapture";
import { CookieConsent } from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://powerup.menu"),
  title: "Carta Digital QR - Potencia las ventas de tu restaurante",
  description: "Carta Digital QR - Potencia las ventas de tu restaurante",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icons/favicon-32x32.png"],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Carta Digital QR - Potencia las ventas de tu restaurante",
    description: "La única carta que vende por tí",
    images: "https://www.powerup.menu/wp-content/uploads/2024/01/opengraph.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <AttributionCapture />
        <Analytics/>
        <CookieConsent>
          <main>{children}</main>
          <Toaster />
        </CookieConsent>
        <SpeedInsights />
      </body>
    </html>
  );
}
