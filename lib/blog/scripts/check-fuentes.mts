/**
 * Checks that every URL in a post's `fuentes` responds. Run it before switching a post to
 * `draft: false` (not in the Vercel build: network checks there are slow and flaky):
 *
 *   node lib/blog/scripts/check-fuentes.mts content/blog/<slug>.md [...]
 *
 * A URL that responds does not prove the citation: whoever signs `revisado_por` still has to
 * confirm that each source says what the post claims.
 */
import { readFile } from "node:fs/promises"
import matter from "gray-matter"

const files = process.argv.slice(2)
if (files.length === 0) {
  console.error("Uso: node lib/blog/scripts/check-fuentes.mts content/blog/<slug>.md [...]")
  process.exit(2)
}

async function check(url: string): Promise<string> {
  const init = {
    redirect: "follow" as const,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; PowerUpBlogSourceCheck/1.0)" },
  }
  try {
    let response = await fetch(url, { ...init, method: "HEAD", signal: AbortSignal.timeout(15_000) })
    // Some servers fail HEAD but serve the page to GET: the cartas answer HEAD with a 500 at random.
    if (!response.ok) {
      response = await fetch(url, { ...init, method: "GET", signal: AbortSignal.timeout(15_000) })
    }
    return response.ok ? `ok ${response.status}` : `ERROR ${response.status}`
  } catch (error) {
    return `ERROR ${error instanceof Error ? error.message : String(error)}`
  }
}

let failures = 0
for (const file of files) {
  const { data } = matter(await readFile(file, "utf8"))
  const fuentes: { url?: unknown }[] = Array.isArray(data.fuentes) ? data.fuentes : []
  console.log(`\n${file}: ${fuentes.length} fuentes`)
  for (const fuente of fuentes) {
    const url = typeof fuente.url === "string" ? fuente.url : ""
    const result = url ? await check(url) : "ERROR sin url"
    if (result.startsWith("ERROR")) failures++
    console.log(`  ${result.padEnd(10)} ${url}`)
  }
}

console.log(
  failures > 0
    ? `\n${failures} fuente(s) no responden: revisarlas antes de publicar.`
    : "\nTodas las fuentes responden. Falta que quien revisa confirme que dicen lo que el post afirma.",
)
process.exit(failures > 0 ? 1 : 0)
