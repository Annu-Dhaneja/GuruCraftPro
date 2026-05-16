"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { SectionHeading, GlassCard, PremiumGrid } from "./UI";

export function Testimonials({ props }: { props: any }) {
    const { title, subtitle, items } = props;

    return (
        <section className="py-24 md:py-40 relative overflow-hidden">
            <div className="container relative z-10">
                <SectionHeading 
                    align="center"
                    badge={subtitle || "Social Proof"}
                    title={title || "Client Echoes"}
                />

                <PremiumGrid columns={3}>
                    {items?.map((item: any, i: number) => (
                        <GlassCard 
                            key={i}
                            className="flex flex-col group"
                        >
                            <Quote className="absolute top-8 right-8 w-16 h-16 text-slate-100 group-hover:text-indigo-600/10 transition-colors" />
                            
                            <div className="flex gap-1 mb-10">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-3 h-3 fill-indigo-600 text-indigo-600" />
                                ))}
                            </div>

                            <p className="text-xl font-light italic leading-relaxed text-slate-600 mb-12 flex-1">
                                "{item.content}"
                            </p>

                            <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white italic group-hover:scale-110 transition-transform">
                                    {item.author?.[0]}
                                </div>
                                <div>
                                    <p className="font-black uppercase tracking-tighter text-lg leading-none mb-1 italic">{item.author}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">{item.role}</p>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </PremiumGrid>
            </div>
        </section>
    );
}
