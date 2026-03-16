"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export function AIHero() {
    return (
        <section className="pt-32 pb-12 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 text-indigo-500 px-4 py-1.5 text-sm font-medium mb-6"
                >
                    <Sparkles className="h-4 w-4" />
                    <span>AI-Powered Beta</span>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Create stunning designs <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        instantly with AI.
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Turn ideas into visuals in seconds. Use our AI for rapid concepts,
                    then refine with professional design expertise.
                </motion.p>

                <motion.div
                    className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        AI-Assisted, Human-Refined
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-indigo-500" />
                        Commercial-Use Ready
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Secure & Private
                    </div>
                </motion.div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[100px] -z-10 rounded-full" />
        </section>
    );
}
