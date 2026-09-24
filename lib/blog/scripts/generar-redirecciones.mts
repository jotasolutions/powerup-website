// Genera el vercel.json del proyecto de redirecciones de blog.powerup.menu (plan Fase 3, C.1): un
// proyecto de Vercel aparte, que solo atiende ese dominio, para que el blog viejo nunca llegue a
// la app de la web. Sale de content/blog/redirects.csv y de lo que está publicado.
//
// Un destino que no se publica (draft) pasa al siguiente criterio: su tema y, si tampoco se
// publica, 410. El script lo avisa; el control estricto de C.5 lo trata como error.
//
// Uso: node lib/blog/scripts/generar-redirecciones.mts <carpeta del proyecto de redirecciones>

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const SITE = "https://www.powerup.menu"
const CONTENT = path.join(process.cwd(), "content/blog")

type Route = { src: string; status: number; headers?: Record<string, string> }

const outDir = process.argv[2]
if (!outDir) {
  console.error("Uso: node lib/blog/scripts/generar-redirecciones.mts <carpeta del proyecto de redirecciones>")
  process.exit(1)
}

const frontmatter = (file: string) => matter(fs.readFileSync(file, "utf8"), {}).data
const markdownFiles = (dir: string) => fs.readdirSync(dir).filter((name) => name.endsWith(".md"))

const posts = markdownFiles(CONTENT).map((file) => {
  const data = frontmatter(path.join(CONTENT, file))
  return { slug: String(data.slug), cluster: String(data.cluster), published: data.draft === false }
})
const publishedPosts = new Set(posts.filter((post) => post.published).map((post) => post.slug))
const clusterOf = new Map(posts.map((post) => [post.slug, post.cluster]))

// Same rule as the site: a theme page exists with a finished text and at least one published post.
const publishedThemes = new Set(
  markdownFiles(path.join(CONTENT, "temas"))
    .map((file) => ({ slug: file.replace(/\.md$/, ""), data: frontmatter(path.join(CONTENT, "temas", file)) }))
    .filter(({ slug, data }) => data.draft === false && posts.some((post) => post.published && post.cluster === slug))
    .map(({ slug }) => slug),
)

const fallbacks: string[] = []

/** The published destination, or undefined for a 410. */
function resolve(from: string, target: string): string | undefined {
  const theme = /^\/blog\/tema\/([a-z0-9-]+)$/.exec(target)
  const post = /^\/blog\/([a-z0-9-]+)$/.exec(target)
  let resolved: string | undefined = target
  if (theme && !publishedThemes.has(theme[1])) resolved = undefined
  else if (post && !publishedPosts.has(post[1])) {
    const cluster = clusterOf.get(post[1])
    resolved = cluster && publishedThemes.has(cluster) ? `/blog/tema/${cluster}` : undefined
  }
  if (resolved !== target) fallbacks.push(`/${from} → ${target} no está publicado: va a ${resolved ?? "410"}`)
  return resolved
}

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const exact = (from: string) => (from === "" ? "^/$" : `^/${escape(from)}/?$`)
const redirect = (from: string, to: string | undefined): Route =>
  to ? { src: exact(from), status: 301, headers: { Location: `${SITE}${to}` } } : { src: exact(from), status: 410 }

const routes: Route[] = []
const covered = new Set<string>()

const [header = "", ...rows] = fs.readFileSync(path.join(CONTENT, "redirects.csv"), "utf8").split(/\r?\n/).filter((line) => line.trim())
const columns = header.split(",").map((column) => column.trim())
const [origin, status, destination] = ["slug_origen", "status_code", "destino"].map((name) => columns.indexOf(name))

for (const row of rows) {
  const cells = row.split(",").map((cell) => cell.trim())
  const from = cells[origin] === "/" ? "" : cells[origin].replace(/^\/+|\/+$/g, "")
  if (from.endsWith("/*")) {
    routes.push({ src: `^/${escape(from.slice(0, -1))}.*$`, status: 410 })
    continue
  }
  covered.add(from)
  routes.push(redirect(from, cells[status] === "301" ? resolve(from, cells[destination].replace(/(.)\/+$/, "$1")) : undefined))
}

// The kept posts keep their slug: old URL → the same slug under /blog.
for (const post of posts) {
  if (!covered.has(post.slug)) routes.push(redirect(post.slug, resolve(post.slug, `/blog/${post.slug}`)))
}

// Anything else is a 404. /.well-known/ stays out so Vercel can validate the domain's certificate.
routes.push({ src: "^/(?!\\.well-known/).*$", status: 404 })

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(outDir, "vercel.json"),
  `${JSON.stringify({ $schema: "https://openapi.vercel.sh/vercel.json", routes }, null, 2)}\n`,
)

const count = (code: number) => routes.filter((route) => route.status === code).length
console.log(`vercel.json: ${routes.length} reglas (${count(301)} × 301, ${count(410)} × 410 y el 404 final)`)
if (fallbacks.length) {
  console.warn(`\n${fallbacks.length} destinos no publicados pasaron al siguiente criterio:`)
  for (const line of fallbacks) console.warn(`- ${line}`)
}
