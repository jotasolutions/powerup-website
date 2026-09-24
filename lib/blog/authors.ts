/** Has a public author page. Only people whose name, role, bio and photo are confirmed. */
export type PersonAuthor = {
  kind: "person"
  id: string
  name: string
  jobTitle: string
  bioShort: string
  bioLong: string
  photo: string
  sameAs: string[]
  mentions: { outlet: string; title: string; url: string }[]
}

/** A real person known only by name (e.g. the original byline of a migrated post). */
export type SignatureAuthor = { kind: "signature"; id: string; name: string }

/** Posts with no real person behind them are signed by the company. */
export type OrganizationAuthor = { kind: "organization"; id: string; name: string }

export type Author = PersonAuthor | SignatureAuthor | OrganizationAuthor

// Add nothing to a person entry that they have not confirmed themselves.
export const AUTHORS: readonly Author[] = [
  { kind: "organization", id: "powerup-menu", name: "PowerUp Menu" },
  {
    kind: "person",
    id: "federico-bello",
    name: "Federico Bello",
    jobTitle: "CEO",
    bioShort:
      "CEO de PowerUp Menu, la carta digital QR que aplica ingeniería de menú y neuromarketing para que los restaurantes vendan más.",
    bioLong:
      "Federico Bello es CEO de PowerUp Menu, una startup española acelerada por Lanzadera que desarrolla una carta digital QR pensada para vender más: aplica ingeniería de menú y neuromarketing para subir el ticket medio dentro del local y ayuda a los restaurantes a aparecer en Google y en las herramientas de IA. La compañía ofrece además Maestro, un servicio de consultoría de rentabilidad para restaurantes centrado en food cost, carta y estrategia de precios. Medios del sector como Profesional Horeca han recogido su visión sobre la digitalización de la hostelería.",
    photo: "/images/about-fede.png",
    sameAs: ["https://www.linkedin.com/in/bellofederico/"],
    mentions: [
      {
        outlet: "Profesional Horeca",
        title: "El servicio gratuito que ayuda a los restaurantes a mejorar sus cartas",
        url: "https://www.profesionalhoreca.com/el-servicio-gratuito-que-ayuda-a-los-restaurantes-a-mejorar-sus-cartas/",
      },
    ],
  },
]

export function getAuthor(id: string): Author | undefined {
  return AUTHORS.find((author) => author.id === id)
}

export function isPerson(author: Author | undefined): author is PersonAuthor {
  return author?.kind === "person"
}
