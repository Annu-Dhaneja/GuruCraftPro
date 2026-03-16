"use client";

import { motion } from "framer-motion";

export function LearnHero() {
    return (
        <section className="pt-32 pb-16 bg-background relative overflow-hidden text-center">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Learn design. Explore <span className="text-indigo-500">AI</span>.<br />
                        Create better.
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Tutorials, insights, and resources to help you design smarter with AI and creativity.
                        Knowledge is the foundation of great design.
                    </p>
                </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-indigo-500/5 to-transparent -z-10 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-transparent -z-10 blur-3xl opacity-50" />
        </section>
    );
}
