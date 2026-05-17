"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CaseStudyHeroProps {
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
}

export function CaseStudyHero({ title, category, description, image, tags }: CaseStudyHeroProps) {
    return (
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Blur Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-background/90 z-10 backdrop-blur-[100px]" />
                <img src={image} className="w-full h-full object-cover opacity-50 blur-3xl scale-125" alt="" />
            </div>

            <div className="container relative z-20 mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-5xl mx-auto mb-16"
                >
                    <div className="flex justify-center gap-2 mb-8">
                        <Badge variant="outline" className="uppercase tracking-widest text-[11px] px-3 py-1 border-primary/20 bg-background/50 backdrop-blur-sm">
                            {category}
                        </Badge>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed font-light">
                        {description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 50 }}
                    className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s] ease-in-out"
                    />
                </motion.div>
            </div>
        </section>
    );
}
