import "server-only"

import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { withProductionFallbackAsync } from "./isolation"

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

// The header's isotipo and wordmark. The wordmark only exists at 237×25, so it is drawn at that
// size: scaling it up would blur it.
const LOGO = { width: 237, height: 25 }

async function pngDataUri(publicPath: string) {
  const data = await readFile(path.join(process.cwd(), "public", publicPath))
  return `data:image/png;base64,${data.toString("base64")}`
}

/** In production a failure returns a 404 for this image instead of failing the build. */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }): Promise<Response> {
  return withProductionFallbackAsync(
    `Imagen para redes de "${title}"`,
    async () => {
      const image = await buildOgImage({ eyebrow, title })
      // The image renders while its body is read: read it here, so a failure lands in this
      // fallback instead of in Next's prerender.
      return new Response(await image.arrayBuffer(), { headers: image.headers })
    },
    () => new Response("Not found", { status: 404 }),
  )
}

async function buildOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [fonts, isotipo, logo] = await Promise.all([
    loadFonts(),
    pngDataUri("images/isotipo-negativo.png"),
    pngDataUri("images/powerup-logo.png"),
  ])
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
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> only. */}
            <img src={isotipo} alt="" width={42} height={42} />
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, fontWeight: 500, color: "#475569" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> only. */}
          <img src={logo} alt="PowerUp Menu" width={LOGO.width} height={LOGO.height} />
          <div style={{ display: "flex", color: PRIMARY }}>powerup.menu/blog</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  )
}
