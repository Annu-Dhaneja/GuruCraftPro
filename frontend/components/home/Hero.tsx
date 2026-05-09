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

    const badge = data.badge?.trim();
    const headlinePrefix = data.headline_prefix?.trim();
    const headlineHighlight = data.headline_highlight?.trim();
    const headlineSuffix = data.headline_suffix?.trim();
    const subheadline = data.subheadline?.trim();

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-start pt-32 pb-0 md:pt-48 overflow-hidden">

            {/* Background Layer - Clipped to avoid scrollbars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-indigo-300 mb-8 tracking-wider uppercase shadow-inner"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span>{badge}</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white max-w-5xl"
                >
                    {headlinePrefix}
                    {headlineHighlight ? (
                        <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                            {" "}{headlineHighlight}
                        </span>
                    ) : null}
                    {headlineSuffix ? ` ${headlineSuffix}` : null}
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-normal"
                >
                    {subheadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20"
                >
                    <Button size="lg" className="rounded-full text-base h-14 px-10 bg-white text-black hover:bg-white/90 shadow-lg transition-all font-semibold group" asChild>
                        <Link href="/request">
                            Start Project <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-10 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-medium transition-all" asChild>
                        <Link href="/ai-lab">
                            <Wand2 className="mr-2 h-4 w-4" /> Explore AI
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
