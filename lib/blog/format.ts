// Frontmatter dates are calendar dates parsed as UTC midnight; formatting in another time
// zone would shift them a day.
const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }
const dateFormatters = {
  es: new Intl.DateTimeFormat("es-ES", dateOptions),
  it: new Intl.DateTimeFormat("it-IT", dateOptions),
}

export const formatDate = (date: Date, locale: keyof typeof dateFormatters = "es") => dateFormatters[locale].format(date)
export const isoDate = (date: Date) => date.toISOString().slice(0, 10)
