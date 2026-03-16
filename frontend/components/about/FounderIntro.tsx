"use client";

import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";

export function FounderIntro({ data }: { data?: any }) {
    if (!data) return null;

    return (
        <section className="py-24 container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 text-indigo-500 font-medium mb-4 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20">
                    <Sparkles className="h-4 w-4" />
                    {data.badge || "About Gurucraftpro"}
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-6">{data.main_title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {data.main_description}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted relative z-10 box-shadow-xl border border-border/50">
                        <img
                            src={data.image}
                            alt={`${data.name} - ${data.title}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-indigo-500/20 rounded-3xl -z-10" />
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl dark:bg-indigo-500/20" />
                </div>

                <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Leadership / Founder Profile</h3>
                    <h2 className="text-4xl font-bold mb-4">Meet {data.name}</h2>

                    <div className="flex flex-wrap gap-2 mb-8 text-sm font-medium">
                        {data.tags?.map((tag: string) => (
                            <span key={tag} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full dark:bg-indigo-500/10 dark:text-indigo-300">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                        {data.bio?.map((para: string, i: number) => (
                             <p key={i}>{para}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
