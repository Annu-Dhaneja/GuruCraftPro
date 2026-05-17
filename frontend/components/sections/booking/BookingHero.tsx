"use client";

import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";

export function BookingHero() {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none select-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <CalendarClock className="h-5 w-5 text-indigo-500" />
                        </div>
                        <span className="text-sm font-medium text-indigo-500 uppercase tracking-widest">Consultation</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
                        Schedule a Strategy Call
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Ready to elevate your brand? Book a time to discuss your vision, and let's map out a plan for your success.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
