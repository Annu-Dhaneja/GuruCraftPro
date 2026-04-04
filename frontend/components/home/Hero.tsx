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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-2 text-sm font-bold text-primary mb-10 ring-1 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span className="tracking-widest uppercase">{badge}</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.9] md:leading-[0.85] text-white"
                >
                    {headlinePrefix}
                    {headlineHighlight ? (
                        <>
                            {" "}
                            <span className="text-shimmer drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                                {headlineHighlight}
                            </span>
                        </>
                    ) : null}
                    {headlineSuffix ? ` ${headlineSuffix}` : null}
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-16 leading-relaxed font-light"
                >
                    {subheadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mb-20"
                >
                    <Button size="lg" className="rounded-2xl text-xl h-20 px-12 bg-white text-black hover:bg-slate-200 shadow-2xl transition-all hover:scale-105 font-black group" asChild>
                        <Link href="/request">
                            Start Project <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-2xl text-xl h-20 px-12 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-bold transition-all" asChild>
                        <Link href="/ai-lab">
                            <Wand2 className="mr-3 h-6 w-6" /> Explore AI
                        </Link>
                    </Button>
                    <Button size="lg" variant="ghost" className="rounded-2xl text-xl h-20 px-12 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-bold" asChild>
                        <Link href="/guruji-darshan">
                            Guru Ji Darshan <Sparkles className="ml-3 h-6 w-6" />
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
