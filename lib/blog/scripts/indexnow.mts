/**
 * Tells IndexNow (Bing and the other search engines that use it) which blog URLs changed, so they
 * don't wait until they reread the sitemap. The key is public by design: it's served from
 * public/blog/<KEY>.txt, and from there it only covers URLs under https://www.powerup.menu/blog/.
 * Never delete that file: the search engines recheck it.
 *
 *   node lib/blog/scripts/indexnow.mts --cambios <commit antes> <commit después>
 *   node lib/blog/scripts/indexnow.mts --todo
 *   node lib/blog/scripts/indexnow.mts <url> [...]
 *
 * --cambios compares the posts and theme texts of two commits; .github/workflows/indexnow.yml runs
 * it once Vercel has published a push to main. --todo sends every blog URL in the production
 * sitemap. Add --prueba to see what would be sent without sending it.
 *
 * No dependencies, so the workflow runs it without npm ci.
 */
import { execFileSync } from "node:child_process"

const SITE = "https://www.powerup.menu"
const SCOPE = `${SITE}/blog/`
const KEY = "46de667ba7df7448a4be81e7a520c80b"
const KEY_LOCATION = `${SCOPE}${KEY}.txt`
const ENDPOINT = "https://api.indexnow.org/indexnow"
const USER_AGENT = "Mozilla/5.0 (compatible; PowerUpBlogIndexNow/1.0)"
const ATTEMPTS = 6
const RETRY_DELAY_MS = 30_000

// What production has to answer before a URL is sent.
const PUBLISHED: readonly number[] = [200]
const WITHDRAWN: readonly number[] = [404, 410]
const EITHER: readonly number[] = [...PUBLISHED, ...WITHDRAWN]

// The meanings documented at indexnow.org.
const RESPONSES: Record<number, string> = {
  200: "recibido",
  202: "recibido; la clave se está validando",
  400: "formato no válido",
  403: "clave no válida: no la encuentran o no coincide",
  422: "alguna URL no es de este host o no está bajo /blog/",
  429: "demasiados avisos (posible spam)",
}

type Candidate = { url: string; accepts: readonly number[] }

// In GitHub Actions these lines also show up in the run's summary.
const warn = (message: string) => console.log(process.env.GITHUB_ACTIONS ? `::warning::${message}` : `AVISO: ${message}`)

function fail(message: string): never {
  console.error(process.env.GITHUB_ACTIONS ? `::error::${message}` : `ERROR: ${message}`)
  process.exit(1)
}

function usage(): never {
  console.error(
    "Uso: node lib/blog/scripts/indexnow.mts --cambios <commit antes> <commit después> | --todo | <url> [...]  [--prueba]",
  )
  process.exit(2)
}

function git(...args: string[]): string {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
}

function verifiedCommit(ref: string): string {
  try {
    return git("rev-parse", "--verify", `${ref}^{commit}`).trim()
  } catch {
    fail(`"${ref}" no es un commit de este repo`)
  }
}

// The same paths as postPath() and clusterPath() in lib/blog/config.ts.
function urlFor(file: string): string | undefined {
  const post = file.match(/^content\/blog\/([^/]+)\.md$/)
  if (post) return `${SCOPE}${post[1]}`
  const theme = file.match(/^content\/blog\/temas\/([^/]+)\.md$/)
  if (theme) return `${SCOPE}tema/${theme[1]}`
  return undefined
}

// Same rule as the site: only an explicit `draft: false` publishes, because the schema defaults to true.
function isPublished(commit: string, file: string): boolean {
  let source: string
  try {
    source = git("show", `${commit}:${file}`)
  } catch {
    return false // The file doesn't exist in that commit.
  }
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ""
  return /^draft:\s*false\s*$/im.test(frontmatter)
}

function changedCandidates(before: string, after: string): Candidate[] {
  const candidates: Candidate[] = []
  for (const file of git("diff", "--name-only", "--no-renames", before, after, "--", "content/blog").split("\n")) {
    const url = urlFor(file)
    if (!url) continue
    if (isPublished(after, file)) candidates.push({ url, accepts: PUBLISHED })
    // Unpublished since the last deploy (deleted or back to draft): sent too, so the engines drop it.
    else if (isPublished(before, file)) candidates.push({ url, accepts: WITHDRAWN })
    else console.log(`  borrador  ${url}`)
  }
  return candidates
}

async function sitemapUrls(): Promise<string[]> {
  const response = await fetch(`${SITE}/sitemap.xml`, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(15_000),
  })
  if (!response.ok) fail(`sitemap.xml responde ${response.status}`)
  const xml = await response.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()).filter((url) => url.startsWith(SCOPE))
}

async function statusOf(url: string): Promise<number> {
  try {
    const response = await fetch(url, {
      redirect: "manual",
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(15_000),
    })
    return response.status
  } catch {
    return 0
  }
}

// Production has to show the change already; the retries cover a deploy that is still settling.
async function confirmed({ url, accepts }: Candidate): Promise<boolean> {
  for (let attempt = 1; ; attempt++) {
    const status = await statusOf(url)
    if (accepts.includes(status)) {
      console.log(`  ${status === 200 ? "publicada" : "retirada "} ${status}  ${url}`)
      return true
    }
    if (attempt === ATTEMPTS) {
      warn(`${url} responde ${status || "sin respuesta"} y se esperaba ${accepts.join(" o ")}: no se avisa`)
      return false
    }
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
  }
}

async function keyIsPublished(): Promise<boolean> {
  try {
    const response = await fetch(KEY_LOCATION, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(15_000),
    })
    return response.ok && (await response.text()).trim() === KEY
  } catch {
    return false
  }
}

const args = process.argv.slice(2)
const dryRun = args.includes("--prueba")
const [mode, ...rest] = args.filter((arg) => arg !== "--prueba")

let candidates: Candidate[]
if (mode === "--cambios") {
  if (rest.length !== 2) usage()
  const [before, after] = rest.map(verifiedCommit)
  console.log(`Cambios en el blog entre ${before.slice(0, 7)} y ${after.slice(0, 7)}:`)
  candidates = changedCandidates(before, after)
} else if (mode === "--todo") {
  console.log("Todas las URLs del blog en el sitemap de producción:")
  candidates = (await sitemapUrls()).map((url) => ({ url, accepts: PUBLISHED }))
} else if (mode) {
  const urls = [mode, ...rest]
  const outside = urls.filter((url) => !url.startsWith(SCOPE))
  if (outside.length > 0) fail(`la clave solo cubre ${SCOPE}: ${outside.join(" ")}`)
  console.log("URLs pedidas:")
  candidates = urls.map((url) => ({ url, accepts: EITHER }))
} else {
  usage()
}

if (candidates.length === 0) {
  console.log("\nNada que avisar.")
  process.exit(0)
}

const urls: string[] = []
for (const candidate of candidates) {
  if (await confirmed(candidate)) urls.push(candidate.url)
}
// A URL left out means production doesn't show what the content says: worth a look, so the run fails.
const skipped = candidates.length - urls.length

if (dryRun || urls.length === 0) {
  console.log(
    dryRun
      ? `\n--prueba: se avisaría de ${urls.length} URL(s). No se envía nada.`
      : "\nNinguna URL está lista para avisar.",
  )
  process.exit(skipped > 0 ? 1 : 0)
}

if (!(await keyIsPublished())) fail(`la clave no está publicada en ${KEY_LOCATION} o no coincide; no se envía nada`)

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": USER_AGENT },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  signal: AbortSignal.timeout(30_000),
})
const meaning = RESPONSES[response.status] ?? "respuesta inesperada"
if (response.status !== 200 && response.status !== 202) {
  fail(`IndexNow responde ${response.status} (${meaning}): ${(await response.text()).slice(0, 500)}`)
}
console.log(`\nIndexNow: ${urls.length} URL(s) avisadas. Respuesta ${response.status}: ${meaning}.`)
process.exit(skipped > 0 ? 1 : 0)
