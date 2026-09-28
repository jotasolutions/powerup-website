// Genera la función de CloudFront que atiende blog.powerup.menu (plan Fase 3, v3.6): las
// redirecciones del blog viejo van en la distribución de CloudFront que ya sirve ese dominio,
// sin cambiar el DNS ni crear nada en Vercel. Sale de content/blog/redirects.csv y de lo que
// está publicado.
//
// Un destino que no se publica (draft) pasa al siguiente criterio: su tema y, si tampoco se
// publica, 410. El script lo avisa; el control estricto de comprobar-redirecciones.mts lo trata
// como error.
//
// Uso: node lib/blog/scripts/generar-redirecciones.mts <archivo .js de salida>

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const SITE = "https://www.powerup.menu"
const CONTENT = path.join(process.cwd(), "content/blog")
// CloudFront Functions can't be larger than 10 KB, and the quota isn't adjustable.
const MAX_FUNCTION_BYTES = 10 * 1024

const output = process.argv[2]
if (!output) {
  console.error("Uso: node lib/blog/scripts/generar-redirecciones.mts <archivo .js de salida>")
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

/** The published destination, or null for a 410. */
function resolve(from: string, target: string): string | null {
  const theme = /^\/blog\/tema\/([a-z0-9-]+)$/.exec(target)
  const post = /^\/blog\/([a-z0-9-]+)$/.exec(target)
  let resolved: string | null = target
  if (theme && !publishedThemes.has(theme[1])) resolved = null
  else if (post && !publishedPosts.has(post[1])) {
    const cluster = clusterOf.get(post[1])
    resolved = cluster && publishedThemes.has(cluster) ? `/blog/tema/${cluster}` : null
  }
  if (resolved !== target) fallbacks.push(`/${from} → ${target} no está publicado: va a ${resolved ?? "410"}`)
  return resolved
}

// Old path without leading or trailing slashes ("" is the old home) → destination, or null for 410.
const rules: Record<string, string | null> = {}
const gonePrefixes: string[] = []

const [header = "", ...rows] = fs.readFileSync(path.join(CONTENT, "redirects.csv"), "utf8").split(/\r?\n/).filter((line) => line.trim())
const columns = header.split(",").map((column) => column.trim())
const [origin, status, destination] = ["slug_origen", "status_code", "destino"].map((name) => columns.indexOf(name))

for (const row of rows) {
  const cells = row.split(",").map((cell) => cell.trim())
  const from = cells[origin] === "/" ? "" : cells[origin].replace(/^\/+|\/+$/g, "")
  if (from.endsWith("/*")) {
    gonePrefixes.push(from.slice(0, -1))
    continue
  }
  rules[from] = cells[status] === "301" ? resolve(from, cells[destination].replace(/(.)\/+$/, "$1")) : null
}

// The kept posts keep their slug: old URL → the same slug under /blog.
for (const post of posts) {
  if (!(post.slug in rules)) rules[post.slug] = resolve(post.slug, `/blog/${post.slug}`)
}

// Plain ES5, which both CloudFront Functions runtimes accept. The request URI never carries the
// query string, and whatever the map doesn't know gets a 404.
const code = `// Redirecciones del blog viejo: blog.powerup.menu → www.powerup.menu/blog. CloudFront Function,
// evento «viewer request». Generado por lib/blog/scripts/generar-redirecciones.mts (repo
// powerup-website): no se edita a mano, se vuelve a generar.
var SITE = ${JSON.stringify(SITE)};
// Ruta vieja, sin barras al principio ni al final → destino en www, o null para 410.
var RULES = ${JSON.stringify(rules)};
// Prefijos que responden 410: etiquetas y páginas de autor del blog viejo.
var GONE = ${JSON.stringify(gonePrefixes)};

function handler(event) {
  var path = event.request.uri.replace(/^\\/+|\\/+$/g, '');
  if (Object.prototype.hasOwnProperty.call(RULES, path)) {
    var to = RULES[path];
    if (to) {
      return { statusCode: 301, statusDescription: 'Moved Permanently', headers: { location: { value: SITE + to } } };
    }
    return { statusCode: 410, statusDescription: 'Gone' };
  }
  for (var i = 0; i < GONE.length; i++) {
    if (path.indexOf(GONE[i]) === 0) return { statusCode: 410, statusDescription: 'Gone' };
  }
  return { statusCode: 404, statusDescription: 'Not Found' };
}
`

const bytes = Buffer.byteLength(code)
if (bytes > MAX_FUNCTION_BYTES) {
  console.error(`La función ocupa ${bytes} bytes: CloudFront no admite más de ${MAX_FUNCTION_BYTES}.`)
  process.exit(1)
}
fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true })
fs.writeFileSync(output, code)

const values = Object.values(rules)
console.log(
  `${output}: ${values.filter(Boolean).length} × 301, ${values.filter((value) => !value).length} × 410, ` +
    `${gonePrefixes.length} prefijos con 410 y el 404 para lo demás (${bytes} bytes de ${MAX_FUNCTION_BYTES})`,
)
if (fallbacks.length) {
  console.warn(`\n${fallbacks.length} destinos no publicados pasaron al siguiente criterio:`)
  for (const line of fallbacks) console.warn(`- ${line}`)
}
