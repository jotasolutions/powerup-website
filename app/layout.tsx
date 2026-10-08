import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AttributionCapture } from "@/components/AttributionCapture";
import { CookieConsent } from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL, websiteOpenGraph } from "@/lib/site"


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
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
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
  openGraph: websiteOpenGraph({ title: HOME_TITLE, description: HOME_DESCRIPTION }),
  twitter: { card: "summary_large_image" },
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
          <div className="flex flex-1 flex-col">{children}</div>
          <Toaster />
        </CookieConsent>
        <SpeedInsights />
      </body>
    </html>
  );
}
