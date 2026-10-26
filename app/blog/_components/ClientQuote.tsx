import Image from "next/image"

// A real customer's words next to the Advisor card, as in the blog's first design. The quote and
// the photos are the ones the home's TestimonialsSection already shows for Marisa. No link to
// her carta: nothing next to the Advisor should take people away from it.
export function ClientQuote() {
  return (
    <figure className="flex h-full flex-col justify-between gap-8 rounded-[24px] bg-white p-6 shadow-xl sm:p-8">
      <blockquote className="font-heading text-xl font-medium leading-snug tracking-tight text-slate-900 sm:text-2xl">
        “La mejor carta digital que he probado. Me ha ayudado a vender más y a mejorar mi restaurante.”
      </blockquote>
      <figcaption className="flex items-center gap-4">
        <Image
          src="/images/testimonials/marisa/marisa.png"
          alt="Marisa"
          width={103}
          height={102}
          className="size-14 flex-none rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">La Taberna de Marisa</p>
          <p className="text-sm text-slate-600">
            <span className="font-medium text-[#1E7F5F]">x1,2</span> facturación en 6 meses
          </p>
        </div>
        <Image
          src="/images/testimonials/marisa/logo.png"
          alt=""
          width={81}
          height={81}
          className="size-11 flex-none rounded-full object-contain"
        />
      </figcaption>
    </figure>
  )
}
