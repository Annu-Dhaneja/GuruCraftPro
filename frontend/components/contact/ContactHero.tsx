"use client";

import { motion } from "framer-motion";

export function ContactHero() {
    return (
        <section className="pt-32 pb-16 bg-background relative overflow-hidden text-center">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                >
                    Let's talk about your <br />
                    <span className="text-indigo-500">design needs</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Whether you need AI-powered visuals or a fully custom design,
                    share your idea and we’ll take it forward.
                </motion.p>
            </div>

            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/5 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-500/5 blur-[100px] -z-10" />
        </section>
    );
}
