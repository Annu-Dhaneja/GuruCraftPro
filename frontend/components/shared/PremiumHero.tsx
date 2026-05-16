"use client";

import { motion } from "framer-motion";
import { Zap, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PremiumButton } from "./UI";

interface HeroProps {
    data: {
        badge?: string;
        title_prefix?: string;
        title_highlight?: string;
        title_suffix?: string;
        headline_prefix?: string;
        headline_highlight?: string;
        headline_suffix?: string;
        subheadline?: string;
        description?: string;
        cta_text?: string;
        cta_href?: string;
        secondary_cta_text?: string;
        secondary_cta_href?: string;
        image_url?: string;
        stats?: Array<{ label: string; value: string }>;
    };
    variant?: "default" | "centered" | "split";
    className?: string;
}

export function PremiumHero({ data, variant = "default", className }: HeroProps) {
    if (!data) return null;

    const title = (
        <>
            {data.title_prefix || data.headline_prefix}{" "}
            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                {data.title_highlight || data.headline_highlight}
            </span>{" "}
            {data.title_suffix || data.headline_suffix}
        </>
    );

    const desc = data.subheadline || data.description;

    return (
        <section className={cn(
            "relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden bg-slate-950 text-white",
            variant === "centered" && "text-center",
            className
        )}>
            {/* ── Neural Background ─────────────────────────── */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 neural-mesh" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
                <div className="scan-line" />
            </div>

            <div className="container relative z-10">
                <div className={cn(
                    "grid grid-cols-1 gap-16 items-center",
                    variant === "split" && "lg:grid-cols-2"
                )}>
                    
                    <div className={cn(
                        "flex flex-col items-start",
                        variant === "centered" && "items-center max-w-5xl mx-auto",
                        variant === "split" && "max-w-4xl"
                    )}>
                        {data.badge && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-10 inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 backdrop-blur-xl"
                            >
                                <Zap className="w-4 h-4 animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">{data.badge}</span>
                            </motion.div>
                        )}

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-10 leading-[0.8] uppercase italic",
                                variant === "centered" && "lg:text-[12rem]"
                            )}
                        >
                            {title}
                        </motion.h1>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={cn(
                                "text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-16 italic px-8 border-l-2 border-indigo-500/30",
                                variant === "centered" && "border-l-0 text-center"
                            )}
                            dangerouslySetInnerHTML={desc ? { __html: desc } : undefined}
                        >
                            {!desc && "Orchestrating high-fidelity digital experiences through neural-grade design and strategic precision."}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={cn(
                                "flex flex-wrap gap-6 w-full sm:w-auto",
                                variant === "centered" && "justify-center"
                            )}
                        >
                            {data.cta_text && (
                                <Link href={data.cta_href || "/contact"}>
                                    <PremiumButton 
                                        size="xl" 
                                        className="bg-white text-slate-900 hover:bg-indigo-600 hover:text-white"
                                        icon={<ChevronRight className="w-6 h-6" />}
                                        iconPosition="right"
                                    >
                                        {data.cta_text}
                                    </PremiumButton>
                                </Link>
                            )}
                            {data.secondary_cta_text && (
                                <Link href={data.secondary_cta_href || "#"}>
                                    <PremiumButton 
                                        variant="outline" 
                                        size="xl" 
                                        className="border-white/10 text-white hover:bg-white/5"
                                        icon={<Sparkles className="w-6 h-6" />}
                                        iconPosition="right"
                                    >
                                        {data.secondary_cta_text}
                                    </PremiumButton>
                                </Link>
                            )}
                        </motion.div>

                        {data.stats && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className={cn(
                                    "flex flex-wrap gap-16 mt-24 pt-12 border-t border-white/5 w-full",
                                    variant === "centered" && "justify-center",
                                    variant === "split" && "justify-start"
                                )}
                            >
                                {data.stats.map((stat, i) => (
                                    <div key={i} className="group">
                                        <div className="text-4xl font-black text-white italic tracking-tighter group-hover:text-indigo-400 transition-colors">{stat.value}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-2 italic">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {variant === "split" && (
                        <div className="relative hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative aspect-square w-full"
                            >
                                <div className="absolute inset-0 rounded-[5rem] overflow-hidden border border-white/5 glass-card p-0">
                                    {data.image_url ? (
                                        <Image 
                                            src={data.image_url}
                                            alt="Neural Core Visual"
                                            fill
                                            className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-purple-500/20" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-80" />
                                </div>
                                <div className="absolute -inset-20 -z-10 bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-950 to-transparent z-10" />
        </section>
    );
}
