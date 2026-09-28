import "server-only"

import fs from "node:fs"
import matter from "gray-matter"
import { isProductionBuild } from "./draft"

// The blog must never break the build of the rest of the site. Content errors fail loudly
// locally and in the PR's automatic check, where they get fixed; in production the broken
// piece is left out with a warning in the build log and the build carries on.

export function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

const warned = new Set<string>()
function warnSkipped(label: string, detail: string) {
  const message = `[blog] ${label} (omitido en producción; el build sigue):\n${detail}`
  if (warned.has(message)) return
  warned.add(message)
  console.warn(message)
}

/** Throws with every error outside production; in production only warns, since callers leave invalid entries out. */
export function reportContentErrors(title: string, errors: string[]): void {
  if (errors.length === 0) return
  const detail = errors.join("\n\n")
  if (!isProductionBuild()) throw new Error(`${title}:\n\n${detail}`)
  warnSkipped(title, detail)
}

/** Outside production errors propagate; in production they are logged and `fallback()` is returned instead. */
export function withProductionFallback<T, F = T>(label: string, run: () => T, fallback: () => F): T | F {
  if (!isProductionBuild()) return run()
  try {
    return run()
  } catch (error) {
    warnSkipped(label, describeError(error))
    return fallback()
  }
}

export async function withProductionFallbackAsync<T, F = T>(
  label: string,
  run: () => Promise<T>,
  fallback: () => F,
): Promise<T | F> {
  if (!isProductionBuild()) return run()
  try {
    return await run()
  } catch (error) {
    warnSkipped(label, describeError(error))
    return fallback()
  }
}

/** Reads a Markdown file with its frontmatter; malformed YAML is recorded in `errors` instead of throwing. */
export function readMarkdownFile(filePath: string, label: string, errors: string[]) {
  try {
    // Passing options turns off gray-matter's cache, which would otherwise remember a file whose
    // YAML failed to parse as one with empty frontmatter, and report the wrong error next time.
    return matter(fs.readFileSync(filePath, "utf8"), {})
  } catch (error) {
    errors.push(`${label}: no se pudo leer el archivo (${describeError(error)})`)
    return undefined
  }
}
