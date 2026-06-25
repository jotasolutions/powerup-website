'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { Highlighter } from "../ui/highlighter"
import { SectionContainer } from "./SectionContainer"
import Image from "next/image"
import { CTAButton } from "../CTAButton";
import { Carousel } from "react-responsive-carousel";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "../ui/blur-fade";

export function TestimonialsSection() {
    const testimonials = [
        {
            bgImage: "/images/testimonials/marisa/bgimage.png",
            logo: "/images/testimonials/marisa/logo.png",
            place: "La Taberna de Marisa",
            review: "La mejor carta digital que he probado. Me ha ayudado a vender más y a mejorar mi restaurante.",
            link: "https://www.google.com/maps/place/?cid=1234567890",
            userImage: "/images/testimonials/marisa/marisa.png",
            userName: "Marisa",
            extraContent: <div className="text-lg font-medium text-gray-400"><span className="font-medium text-[#50B27F]">x1,2</span> Facturacion en 6 meses</div>
        },
        {
            bgImage: "/images/testimonials/trattoria/bgimage.png",
            logo: "/images/testimonials/trattoria/logo.webp",
            place: "Trattoria Piemontese",
            review: "Un día miré las analíticas y había gente entrando desde ChatGPT. Ahora, si alguien pregunta dónde comer comida piemontesa por la zona, aparezco yo con la carta actualizada al día.",
            link: "https://carta.powerup.menu/trattoria-piemontese/categories",
            userImage: "/images/testimonials/trattoria/paolo2.jpg",
            userName: "Paolo",
            extraContent: <div className="text-lg font-medium text-gray-400"><span className="font-medium text-[#50B27F]">Recibe visitas de ChatGPT</span>— lo ve en sus analíticas</div>
        },
        {
            bgImage: "/images/testimonials/goyos/bgimage.png",
            logo: "/images/testimonials/spaccanapoli/logo.png",
            place: "Spaccanapoli",
            review: "Cambiar un precio o quitar un plato era llamar a la imprenta y esperar días. Ahora lo hago desde el móvil en diez segundos, las veces que haga falta.",
            link: "https://www.google.com/maps/place/?cid=1234567890",
            userImage: "/images/testimonials/spaccanapoli/dario.jpg",
            userName: "Dario",
            extraContent: <div className="text-lg font-medium text-gray-400"><span className="font-medium text-[#50B27F]">+9.000 cambios</span> sin visitas a la imprenta</div>
        },
        {
            bgImage: "/images/testimonials/goyos/bgimage.png",
            logo: "/images/testimonials/goyos/logo.png",
            place: "Restaurante Goyos",
            review: "Aquí viene mucho extranjero. Con la carta en su idioma y una buena foto en cada plato, ya no tengo que explicar nada: ven la brasa o el arroz, lo señalan y lo piden. Antes muchos se quedaban con la duda y pedían lo de siempre.",
            link: "https://www.google.com/maps/place/?cid=1234567890",
            userImage: "/images/testimonials/goyos/arturo.jpeg",
            userName: "Arturo",
            extraContent: <div className="text-lg font-medium text-gray-400">Carta traducida y con foto en cada plato</div>
        }
    ];
    return (
        <SectionContainer id="testimonials">
            <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-6 md:space-y-8">
                    <BlurFade inView inViewMargin="-80px">
                        <h2 className="section-title">Más de <Highlighter action="circle" color="#FF9800">
                            <span className="font-medium text-[#50B27F]">+1500</span>
                        </Highlighter> restaurantes ya están vendiendo más</h2>
                    </BlurFade>
                    <BlurFade inView inViewMargin="-80px" delay={0.12}>
                        <p className="section-paragraph">
                            Una taberna, una trattoria, un asador. Venden más, los encuentran en Google y se olvidaron de la imprenta. Te lo cuentan ellos.
                        </p>
                    </BlurFade>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Link href="https://www.trustpilot.com/review/powerup.menu" target="_blank">
                            <div className="space-y-2">
                                <p className="text-gray-800">Tripadvisor</p>
                                <div className="flex items-center gap-2 font-heading text-xl font-medium sm:text-2xl">
                                    <div>4.5</div>
                                    <Image src="/images/excellent-stars.png" alt="Tripadvisor" width={500} height={500} className="w-[112px] h-auto object-contain" />
                                </div>

                            </div>
                        </Link>
                        <Link href="https://maps.app.goo.gl/GphQ9hQkbkkyY6mk9" target="_blank">
                            <div className="space-y-4">
                                <p className="text-gray-800">Google Maps</p>
                                <div className="flex items-center gap-3 font-heading text-xl font-medium sm:text-2xl">
                                    <div>4.2</div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="size-4 text-yellow-500" fill="currentColor" strokeWidth={1.75} />
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </div>

                </div>
                <div>
                    <Carousel
                        className="testimonials-carousel"
                        showArrows
                        showStatus={false}
                        showIndicators={false}
                        autoPlay
                        interval={7000}
                        infiniteLoop
                        swipeable
                        showThumbs={false}
                        useKeyboardArrows
                        emulateTouch
                        dynamicHeight={false}
                        renderArrowPrev={(onClickHandler, hasPrev, label) => (
                            <button
                                type="button"
                                aria-label={label}
                                className={cn(
                                    "control-arrow control-prev inline-flex items-center justify-center",
                                    !hasPrev && "control-disabled"
                                )}
                                onClick={onClickHandler}
                            >
                                <ChevronLeft className="size-5 text-black" strokeWidth={1.75} aria-hidden />
                            </button>
                        )}
                        renderArrowNext={(onClickHandler, hasNext, label) => (
                            <button
                                type="button"
                                aria-label={label}
                                className={cn(
                                    "control-arrow control-next inline-flex items-center justify-center",
                                    !hasNext && "control-disabled"
                                )}
                                onClick={onClickHandler}
                            >
                                <ChevronRight className="size-5 text-black" strokeWidth={1.75} aria-hidden />
                            </button>
                        )}
                    >
                        {testimonials.map((testimonial, key) => (
                            <div className="space-y-4 pb-12 text-left" key={key}>
                                <div className="relative w-full h-[180px] sm:h-[200px]">
                                    <Image src={testimonial.bgImage} alt={testimonial.place} width={1000} height={1000} className="rest-image h-[180px] w-full rounded-2xl object-cover sm:h-[200px]" />
                                    <div className="absolute bottom-3 left-3 h-[64px] w-[64px] overflow-hidden rounded-lg sm:h-[80px] sm:w-[80px]">
                                        <Image src={testimonial.logo} alt={testimonial.place} width={100} height={100} className="carousel-contained-image object-cover" />
                                    </div>
                                </div>
                                {testimonial.extraContent}
                                <p className="text-base font-medium sm:text-lg">&ldquo;{testimonial.review}&rdquo;</p>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-[44px] w-[44px] shrink-0 overflow-hidden rounded-full sm:h-[50px] sm:w-[50px]">
                                            <Image src={testimonial.userImage} alt={testimonial.userName} width={100} height={100} className="carousel-contained-image object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{testimonial.userName}</p>
                                            <p className="text-gray-500 text-sm">{testimonial.place}</p>
                                        </div>
                                    </div>
                                    <Link href={testimonial.link} target="_blank">
                                        <Button variant="outline">Ver carta</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Carousel>

                </div>
            </div>
            <div className="flex justify-center mt-12">
                <CTAButton />
            </div>
        </SectionContainer>
    )
}