"use client";

import { motion } from "framer-motion";

export function RequestHero() {
    return (
        <section className="pt-32 pb-16 bg-background relative overflow-hidden text-center">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                >
                    Start Your <br />
                    <span className="text-indigo-500">Design Journey</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Tell us about your vision. We'll craft a custom proposal tailored to your goals.
                </motion.p>
            </div>

            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/5 blur-[120px] -z-10" />
        </section>
    );
}
