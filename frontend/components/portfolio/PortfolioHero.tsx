"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PortfolioHero() {
    return (
        <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-background text-foreground py-20">
            {/* Background Gradients & Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/30 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 dark:border-white/10 border-black/5 backdrop-blur-md mb-6">
                        <Sparkles className="w-4 h-4 text-purple-400 dark:text-purple-400 text-purple-600" />
                        <span className="text-sm font-medium tracking-wide text-gray-300 dark:text-gray-300 text-gray-600">Premium Design Studio</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-white dark:to-gray-400">
                        Crafting Digital <br />
                        <span className="text-foreground dark:text-white">Masterpieces</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-400 mb-8 leading-relaxed max-w-lg">
                        We blend aesthetic excellence with functional precision to build brands that stand out in the digital noise.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-lg h-12 px-8 rounded-full font-semibold transition-all shadow-lg">
                            Start a Project
                        </Button>
                        <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted dark:border-white/20 dark:text-white dark:hover:bg-white/10 text-lg h-12 px-8 rounded-full backdrop-blur-sm">
                            View Work <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </motion.div>

                {/* 3D Visual / Glass Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative hidden lg:block h-[500px]"
                >
                    {/* Abstract 3D Shape Placeholder - Using CSS for now, ideally Spline or Three.js */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-80 h-96 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl group transform hover:rotate-y-12 transition-transform duration-700 preserve-3d">
                            {/* Inner Glass Layer */}
                            <div className="absolute inset-0 bg-white/5 opacity-50 backdrop-blur-3xl" />

                            {/* Glowing Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-transparent to-black/5 dark:to-black/80">
                                <div className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.5)] mb-8 flex items-center justify-center text-5xl">
                                    🎨
                                </div>
                                <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2">Visual Identity</h3>
                                <p className="text-muted-foreground dark:text-gray-400">Defining brands through color, typography, and motion.</p>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
