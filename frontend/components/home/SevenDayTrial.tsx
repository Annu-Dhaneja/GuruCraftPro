"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const results = [
    {
        day: "Day 01",
        title: "Concept & Strategy",
        image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2000&auto=format&fit=crop",
        desc: "Deep analysis of your brand identity and market positioning."
    },
    {
        day: "Day 04",
        title: "High-Fidelity Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2000&auto=format&fit=crop",
        desc: "Transforming concepts into pixel-perfect, premium visuals."
    },
    {
        day: "Day 07",
        title: "Final Handoff",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
        desc: "Complete asset delivery and production-ready implementation."
    }
];

export function SevenDayTrial() {
    return (
        <section className="py-48 md:py-64 bg-zinc-950 relative overflow-hidden border-b border-white/5">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 neural-mesh opacity-10 pointer-events-none" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black leading-none uppercase select-none opacity-[0.03] text-white">SPRINT</span>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-5xl mx-auto mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-10 backdrop-blur-xl"
                    >
                        <Zap className="h-5 w-5 text-indigo-500 fill-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Rapid Elite Execution</span>
                    </motion.div>
                    <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[0.8] text-white uppercase italic text-shimmer">
                        The 7-Day <br />
                        <span className="drop-shadow-[0_0_50px_rgba(139,92,246,0.3)]">Design Trial</span>
                    </h2>
                    <p className="text-2xl text-zinc-500 font-light italic leading-relaxed max-w-3xl mx-auto border-x border-white/5 px-10 py-4">
                        Experience our highest-tier service in a condensed timeframe. From blank canvas to market-ready masterpiece in exactly 168 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                    {results.map((result, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-950 mb-10 shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)]">
                                <Image
                                    src={result.image}
                                    alt={result.title}
                                    fill
                                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                    <span className="text-4xl font-black text-white italic tracking-tighter mb-2 block">{result.day}</span>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{result.title}</h3>
                                </div>
                                <div className="absolute top-8 left-8">
                                    <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <Sparkles className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed pl-6 border-l-2 border-indigo-500">
                                {result.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 flex flex-col items-center gap-12"
                >
                    <div className="flex flex-wrap justify-center gap-10">
                        <div className="flex items-center gap-3">
                            <Clock className="h-6 w-6 text-indigo-500" />
                            <span className="text-sm font-black uppercase tracking-widest">168h Turnaround</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-6 w-6 text-emerald-500" />
                            <span className="text-sm font-black uppercase tracking-widest">Elite Quality Guaranteed</span>
                        </div>
                    </div>
                    <Button size="lg" className="h-24 px-20 text-2xl bg-zinc-950 dark:bg-white text-white dark:text-black hover:scale-105 rounded-[2rem] font-black shadow-2xl transition-all" asChild>
                        <Link href="/services/7-day-clothing-consultation">
                            START YOUR TRIAL <ArrowRight className="ml-4 h-8 w-8" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
