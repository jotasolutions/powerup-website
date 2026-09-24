import "server-only"

import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

// --primary (oklch(0.576 0.097 234.5) in app/globals.css) converted to sRGB: next/og can't parse oklch.
const PRIMARY = "#3482AA"
// next/og (Satori) reads TTF/OTF but not WOFF2.
const FONTS_DIR = path.join(process.cwd(), "lib/blog/fonts")

async function loadFonts() {
  const [medium, semibold] = await Promise.all([
    readFile(path.join(FONTS_DIR, "Poppins-Medium.ttf")),
    readFile(path.join(FONTS_DIR, "Poppins-SemiBold.ttf")),
  ])
  return [
    { name: "Poppins", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Poppins", data: semibold, weight: 600 as const, style: "normal" as const },
  ]
}

function QrIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="16" width="5" height="5" rx="1" />
      <rect x="16" y="3" width="5" height="5" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}

export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundImage: "linear-gradient(180deg, #DEF8FF 0%, #FFFFFF 75%)",
          fontFamily: "Poppins",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 18,
              backgroundColor: PRIMARY,
              transform: "rotate(11deg)",
            }}
          >
            <QrIcon />
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: "#334155" }}>{eyebrow}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 58 : 68,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#0F172A",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 500, color: "#475569" }}>
          <div style={{ display: "flex" }}>PowerUp Menu</div>
          <div style={{ display: "flex", color: PRIMARY }}>powerup.menu/blog</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  )
}
