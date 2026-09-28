const WORDS_PER_MINUTE = 200

export function readingMinutes(markdown: string): number {
  const text = markdown
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
  const words = text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
