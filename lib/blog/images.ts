import "server-only"

import fs from "node:fs"
import path from "node:path"

const PUBLIC_DIR = path.join(process.cwd(), "public")

/**
 * What is wrong with an image path a post uses, or undefined when it is fine: every image has to
 * be a file in public/. Existence is only checked where public/ is on disk (locally and in every
 * build, where the blog's pages are generated); a deployed function doesn't ship public/.
 */
export function imagePathProblem(src: string): string | undefined {
  if (!src.startsWith("/") || src.startsWith("//")) return `${src}: solo se admiten imágenes de public/ (ruta que empiece por /)`
  if (!fs.existsSync(PUBLIC_DIR)) return undefined
  let relative: string
  try {
    relative = decodeURIComponent(src.split(/[?#]/, 1)[0])
  } catch {
    return `${src}: ruta mal codificada`
  }
  const file = path.join(PUBLIC_DIR, relative)
  if (!file.startsWith(PUBLIC_DIR + path.sep)) return `${src}: la ruta sale de public/`
  if (!fs.existsSync(file)) return `${src}: no existe en public/`
  return undefined
}

function isPositiveSize(value: unknown): boolean {
  return Number(value) > 0
}

/**
 * The same check for an <img> in a post's body, which also needs width and height, so the text
 * doesn't jump while it loads, and alternative text.
 */
export function bodyImageProblem(properties: Record<string, unknown>): string | undefined {
  const src = String(properties.src ?? "")
  const pathProblem = imagePathProblem(src)
  if (pathProblem) return pathProblem
  if (!isPositiveSize(properties.width) || !isPositiveSize(properties.height)) return `${src}: falta width o height`
  if (String(properties.alt ?? "").trim() === "") return `${src}: falta el texto alternativo (alt)`
  return undefined
}
