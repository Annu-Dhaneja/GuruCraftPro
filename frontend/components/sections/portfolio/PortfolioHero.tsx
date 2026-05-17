"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PortfolioHero({ data }: { data?: any }) {
    const title = data?.title || "Crafting Digital Masterpieces";
    const description = data?.description || "We blend aesthetic excellence with functional precision to build brands that stand out in the digital noise.";

    return (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-background text-foreground py-20">
            {/* Advanced Neural Background */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60">
                <div className="absolute inset-0 neural-mesh" />
                <div className="scan-line" />
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-500/20 dark:bg-indigo-600/40 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-500/20 dark:bg-purple-600/40 rounded-full blur-[140px] animate-pulse delay-1000" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 shadow-2xl">
                        <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-200">
                             Digital Arts & Development
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-shimmer">
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground dark:text-gray-300 mb-10 leading-relaxed font-light font-sans max-w-xl">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-lg h-14 px-10 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95">
                            Start a Project
                        </Button>
                        <Button variant="outline" size="lg" className="border-white/10 text-foreground hover:bg-white/5 text-lg h-14 px-10 rounded-2xl backdrop-blur-md group">
                            Explore Work <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </div>
                </motion.div>

                {/* Interactive 3D Visual Stack */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative hidden lg:block perspective-[2000px]"
                >
                    <div className="relative w-full h-[550px] flex items-center justify-center">
                        {/* Layered Floating Cards */}
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute z-30 w-72 h-96 glass-card rounded-[3rem] p-8 flex flex-col justify-end"
                        >
                            <div className="w-16 h-16 bg-indigo-500 rounded-2xl mb-auto flex items-center justify-center text-3xl shadow-lg">
                                🕸️
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Web Dev</h3>
                            <p className="text-xs text-white/60">High-performance digital experiences & platforms.</p>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute z-20 w-72 h-96 glass-card rounded-[3rem] p-8 flex flex-col justify-end translate-x-20 -translate-y-12 rotate-6 opacity-60"
                        >
                             <div className="w-16 h-16 bg-purple-500 rounded-2xl mb-auto flex items-center justify-center text-3xl">
                                🎨
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Design</h3>
                            <p className="text-xs text-white/60">Aesthetic brilliance meet strategic precision.</p>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute z-10 w-72 h-96 glass-card rounded-[3rem] p-8 flex flex-col justify-end -translate-x-20 translate-y-12 -rotate-6 opacity-40"
                        >
                             <div className="w-16 h-16 bg-pink-500 rounded-2xl mb-auto flex items-center justify-center text-3xl">
                                🤖
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">AI Lab</h3>
                            <p className="text-xs text-white/60">Exploring the intersection of art and intelligence.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
