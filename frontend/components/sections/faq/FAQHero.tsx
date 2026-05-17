"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export function FAQHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-background">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none select-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <HelpCircle className="h-5 w-5 text-indigo-500" />
                        </div>
                        <span className="text-sm font-medium text-indigo-500 uppercase tracking-widest">Support</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
                        Frequently Asked Questions
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Find answers to common questions about our design services, AI tools, pricing, and project workflows.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
