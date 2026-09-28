/**
 * Escapes `<` in serialized JSON-LD so a literal `</script>` in the data can't
 * break out of the surrounding <script type="application/ld+json"> tag.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
