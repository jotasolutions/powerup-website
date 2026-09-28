// Comprueba las redirecciones de blog.powerup.menu (plan Fase 3, C.5; desde la v3.6, la función de
// CloudFront de generar-redirecciones.mts). Es el control estricto: compara cada respuesta con el mapa original
// (content/blog/redirects.csv y los posts conservados), no con el vercel.json generado. Así, una
// regla que cayó al siguiente criterio porque su destino seguía en draft sale como error.
//
// Prueba las URLs del inventario de Wayback, las del mapa y una que no existe, y comprueba:
// - 301 en un solo salto al destino del mapa, y que el destino responda 200 en la web;
// - 410 donde lo dice el mapa y 404 para lo desconocido;
// - que ninguna URL del host viejo responda 200.
// El inventario se lee de fuera del repo, y las páginas de autor se prueban sin escribir su
// nombre: en la salida salen como /author/….
//
// Uso: node lib/blog/scripts/comprobar-redirecciones.mts <dirección> <inventario> [web]
// - <dirección>: https://blog.powerup.menu, con la función ya asociada a su distribución.
// - <inventario>: seo-recovery/wayback-cdx-full.json.
// - [web]: dónde tiene que responder 200 cada destino; por defecto, https://www.powerup.menu.

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const SITE = "https://www.powerup.menu"
const CONTENT = path.join(process.cwd(), "content/blog")

type Expected = { status: 301; to: string } | { status: 404 | 410 }

const [baseArg, inventoryFile, webArg = SITE] = process.argv.slice(2)
if (!baseArg || !inventoryFile) {
  console.error("Uso: node lib/blog/scripts/comprobar-redirecciones.mts <dirección> <inventario> [web]")
  process.exit(2)
}
const base = baseArg.replace(/\/+$/, "")
const web = webArg.replace(/\/+$/, "")

// The original map, read like generar-redirecciones.mts does, but without the fallbacks.
const exact = new Map<string, Expected>()
const gonePrefixes: string[] = []
const key = (from: string) => (from === "/" ? "" : from.replace(/^\/+|\/+$/g, ""))

const [header = "", ...rows] = fs.readFileSync(path.join(CONTENT, "redirects.csv"), "utf8").split(/\r?\n/).filter((line) => line.trim())
const columns = header.split(",").map((column) => column.trim())
const [origin, status, destination] = ["slug_origen", "status_code", "destino"].map((name) => columns.indexOf(name))
for (const row of rows) {
  const cells = row.split(",").map((cell) => cell.trim())
  const from = key(cells[origin])
  if (from.endsWith("/*")) gonePrefixes.push(from.slice(0, -1))
  else exact.set(from, cells[status] === "301" ? { status: 301, to: cells[destination].replace(/(.)\/+$/, "$1") } : { status: 410 })
}
// The kept posts keep their slug: old URL → the same slug under /blog.
for (const file of fs.readdirSync(CONTENT).filter((name) => name.endsWith(".md"))) {
  const slug = String(matter(fs.readFileSync(path.join(CONTENT, file), "utf8"), {}).data.slug)
  if (!exact.has(slug)) exact.set(slug, { status: 301, to: `/blog/${slug}` })
}

function expected(pathname: string): Expected {
  const from = key(pathname)
  return exact.get(from) ?? (gonePrefixes.some((prefix) => from.startsWith(prefix)) ? { status: 410 } : { status: 404 })
}

// Wayback's CDX: the first row names the columns; "original" is the URL as it was captured.
const [cdxColumns = [], ...captures]: string[][] = JSON.parse(fs.readFileSync(inventoryFile, "utf8"))
const original = cdxColumns.indexOf("original")
if (original === -1) {
  console.error(`${inventoryFile}: no tiene la columna "original" de Wayback`)
  process.exit(2)
}
const paths = new Set(captures.map((capture) => new URL(capture[original]).pathname))
for (const from of exact.keys()) paths.add(from === "" ? "/" : `/${from}/`)
for (const prefix of gonePrefixes) paths.add(`/${prefix}comprobacion/`)
paths.add(`/comprobacion-${Date.now()}/`)

async function request(url: string): Promise<Response> {
  const init = () => ({
    redirect: "manual" as const,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; PowerUpBlogRedirectCheck/1.0)" },
    signal: AbortSignal.timeout(15_000),
  })
  const response = await fetch(url, { ...init(), method: "HEAD" })
  return response.status === 405 ? fetch(url, { ...init(), method: "GET" }) : response
}

// Several old URLs share a destination: each one is requested once.
const destinationStatus = new Map<string, Promise<number>>()
function checkDestination(to: string): Promise<number> {
  let result = destinationStatus.get(to)
  if (!result) {
    result = request(`${web}${to}`).then((response) => response.status, () => 0)
    destinationStatus.set(to, result)
  }
  return result
}

async function check(pathname: string): Promise<string | undefined> {
  const want = expected(pathname)
  let response: Response
  try {
    response = await request(`${base}${pathname}`)
  } catch (error) {
    return `no responde (${error instanceof Error ? error.message : String(error)})`
  }
  const location = response.headers.get("location")
  const got = `${response.status}${location ? ` hacia ${location}` : ""}`
  if (response.status === 200) return "responde 200: el host viejo no puede servir páginas"
  if (want.status !== 301) return response.status === want.status ? undefined : `esperaba ${want.status}, responde ${got}`
  const target = `${SITE}${want.to}`
  if (response.status !== 301 || location !== target) {
    // What generar-redirecciones.mts does when a destination is still a draft.
    const fellBack = response.status === 410 || location?.startsWith(`${SITE}/blog/tema/`)
    return `esperaba 301 hacia ${target}, responde ${got}${fellBack ? " (¿destino todavía en draft?)" : ""}`
  }
  const destinationCode = await checkDestination(want.to)
  return destinationCode === 200 ? undefined : `el destino ${web}${want.to} responde ${destinationCode || "nada"}, no 200`
}

const queue = [...paths].sort()
const failures: string[] = []
// A few requests at a time, to go easy on both hosts.
await Promise.all(
  Array.from({ length: 6 }, async () => {
    for (let pathname = queue.shift(); pathname !== undefined; pathname = queue.shift()) {
      const problem = await check(pathname)
      if (problem) failures.push(`${pathname.replace(/^\/author\/[^/]+/, "/author/…")}: ${problem}`)
    }
  }),
)

const kinds = [...paths].map((pathname) => expected(pathname).status)
const count = (code: number) => kinds.filter((kind) => kind === code).length
console.log(
  `${paths.size} URLs probadas en ${base} (${count(301)} × 301, ${count(410)} × 410, ${count(404)} × 404): ` +
    `${paths.size - failures.length} bien, ${failures.length} con error`,
)
for (const failure of failures.sort()) console.log(`- ${failure}`)
process.exit(failures.length ? 1 : 0)
