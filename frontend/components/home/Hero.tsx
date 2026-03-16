"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
    data: {
        badge: string;
        headline_prefix: string;
        headline_highlight: string;
        headline_suffix: string;
        subheadline: string;
    };
}

export function Hero({ data }: HeroProps) {
    if (!data) return null;
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-start pt-32 pb-0 md:pt-48 overflow-hidden">

            {/* Background Layer - Clipped to avoid scrollbars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center mx-auto">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 backdrop-blur-md px-3 py-1.5 text-xs md:text-sm font-medium text-primary mb-8 ring-1 ring-primary/20"
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{data.badge}</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] md:leading-[1.1]"
                >
                    {data.headline_prefix}{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        {data.headline_highlight}
                    </span>
                    {data.headline_suffix}
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
                >
                    {data.subheadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20"
                >
                    <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
                        <Link href="/request">
                            Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 border-foreground/10 hover:bg-foreground/5" asChild>
                        <Link href="/ai-lab">
                            <Wand2 className="mr-2 h-5 w-5" /> Try AI Generator
                        </Link>
                    </Button>
                </motion.div>

                {/* Hero Visual Removed per user request */}
            </div>

            {/* Fade to next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-30" />
        </section>
    );
}
