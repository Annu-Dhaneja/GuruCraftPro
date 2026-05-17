"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
    id: number;
    content: string;
    author: string;
    role: string;
    rating: number;
}

interface TestimonialsProps {
    data: {
        title: string;
        list: Testimonial[];
    };
}

export function Testimonials({ data }: TestimonialsProps) {
    if (!data) return null;
    const { title, list: testimonials } = data;
    const [emblaRef] = useEmblaCarousel({ align: "start", loop: true });

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        {title}
                    </h2>
                </div>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing px-1" ref={emblaRef}>
                    <div className="flex gap-6">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                            >
                                <div className="h-full bg-muted/30 border border-border rounded-2xl p-8 flex flex-col justify-between">
                                    <div>
                                        <Quote className="h-8 w-8 text-indigo-500/20 mb-4" />
                                        <p className="text-lg leading-relaxed mb-6 font-medium text-foreground/80">
                                            "{testimonial.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.author}`} />
                                            <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-bold">{testimonial.author}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                        </div>
                                        <div className="ml-auto flex gap-0.5">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
