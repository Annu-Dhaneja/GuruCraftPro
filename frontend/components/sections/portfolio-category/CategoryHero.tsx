"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface CategoryHeroProps {
    title: string;
    description: string;
    tags?: string[];
}

export function CategoryHero({ title, description, tags }: CategoryHeroProps) {
    return (
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
            {/* Premium Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-20" />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {tags && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-wrap justify-center gap-3 mb-8"
                        >
                            {tags.map((tag, index) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="px-4 py-1.5 text-xs md:text-sm font-medium tracking-wide bg-secondary/50 backdrop-blur-md border border-white/5"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </motion.div>
                    )}

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/90 to-foreground/50">
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
                </motion.div>
            </div>

            {/* Decorative bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
}
