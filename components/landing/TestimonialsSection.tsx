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
            bgImage: "/images/testimonials/marisa/bgimage.png",
            logo: "/images/testimonials/marisa/logo.png",
            place: "La Taberna Casera",
            review: "La mejor carta digital que he probado. Me ha ayudado a vender más y a mejorar mi restaurante.",
            link: "https://www.google.com/maps/place/?cid=1234567890",
            userImage: "/images/testimonials/marisa/marisa.png",
            userName: "Jose Luis",
            extraContent: <div className="text-lg font-medium text-gray-400"><span className="font-medium text-[#50B27F]">x1,2</span> Facturacion en 6 meses</div>
        },
        {
            bgImage: "/images/testimonials/goyos/bgimage.png",
            logo: "/images/testimonials/goyos/logo.png",
            place: "Goyos",
            review: "La mejor carta digital que he probado. Me ha ayudado a vender más y a mejorar mi restaurante.",
            link: "https://www.google.com/maps/place/?cid=1234567890",
            userImage: "/images/testimonials/marisa/marisa.png",
            userName: "Arturo",
            extraContent: <div className="text-lg font-medium text-gray-400"><span className="font-medium text-[#50B27F]">x1,2</span> Facturacion en 6 meses</div>
        }
    ];
    return (
        <SectionContainer id="testimonials">
            <div className="grid items-center gap-12 lg:grid-cols-2 ">
                <div className="space-y-8">
                    <BlurFade inView inViewMargin="-80px">
                        <h2 className="section-title">Más de <Highlighter action="circle" color="#FF9800">
                            <span className="font-medium text-[#50B27F]">+1500</span>
                        </Highlighter> restaurantes ya están vendiendo más</h2>
                    </BlurFade>
                    <BlurFade inView inViewMargin="-80px" delay={0.12}>
                        <p className="section-paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra quis felis condimentum volutpat.
                        </p>
                    </BlurFade>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-2">
                            <p className="text-gray-800">Tripadvisor</p>
                            <div className="flex items-center gap-2 font-heading text-2xl font-medium">
                                <div>4.4</div>
                                <Image src="/images/excellent-stars.png" alt="Tripadvisor" width={500} height={500} className="w-[112px] h-auto object-contain" />
                            </div>

                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-800">Google Maps</p>
                            <div className="flex items-center gap-3 font-heading text-2xl font-medium">
                                <div>4.2</div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="size-4 text-yellow-500" fill="currentColor" strokeWidth={1.75} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    <CTAButton />
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
                            <div className="space-y-4 text-left pb-12" key={key}>
                                <div className="relative">
                                    <Image src={testimonial.bgImage} alt={testimonial.place} width={1000} height={1000} className="w-full h-[200px] object-cover rounded-2xl rest-image" />
                                    <Image src={testimonial.logo} alt={testimonial.place} width={100} height={100} className="w-[80px] h-[80px] object-cover rounded-lg absolute bottom-3 left-3" />
                                </div>
                                {testimonial.extraContent}
                                <p className="text-lg font-medium">&ldquo;{testimonial.review}&rdquo;</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Image src={testimonial.userImage} alt={testimonial.userName} width={100} height={100} className="w-[50px] h-[50px] object-cover rounded-full" />
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
        </SectionContainer>
    )
}