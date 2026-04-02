'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { Highlighter } from "../ui/highlighter"
import { SectionContainer } from "./SectionContainer"
import Image from "next/image"
import { CTAButton } from "../CTAButton";

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
        }
    ];
    return (
        <SectionContainer id="testimonials">
            <div className="grid items-center gap-12 lg:grid-cols-2 ">
                <div className="space-y-8">
                    <h2 className="section-title">Más de <Highlighter action="circle" color="#FF9800">
                        <span className="font-medium text-[#50B27F]">+1500</span>
                    </Highlighter> restaurantes ya están vendiendo más</h2>
                    <p className="section-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra quis felis condimentum volutpat.
                    </p>
                    <CTAButton />
                </div>
                <div>
                    {testimonials.map((testimonial, key) => (
                        <div className="space-y-4" key={key}>
                            <div className="relative">
                                <Image src={testimonial.bgImage} alt={testimonial.place} width={1000} height={1000} className="w-full h-[200px] object-cover rounded-2xl" />
                                <Image src={testimonial.logo} alt={testimonial.place} width={100} height={100} className="w-[80px] h-[80px] object-cover rounded-lg absolute bottom-3 left-3" />
                            </div>
                            {testimonial.extraContent}
                            <p className="text-lg font-medium">"{testimonial.review}"</p>
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
                </div>
            </div>
        </SectionContainer>
    )
}