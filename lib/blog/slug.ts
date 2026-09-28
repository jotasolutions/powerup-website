/** "¿Qué es el food cost?" → "que-es-el-food-cost" (github-slugger would keep the accents). */
export function asciiSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
