// Frontmatter dates are calendar dates parsed as UTC midnight; formatting in another time
// zone would shift them a day.
const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export const formatDate = (date: Date) => dateFormatter.format(date)
export const isoDate = (date: Date) => date.toISOString().slice(0, 10)
