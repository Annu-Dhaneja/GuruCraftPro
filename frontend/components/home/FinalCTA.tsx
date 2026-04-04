"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA({ data }: { data?: any }) {
    const title = data?.title || "Ready to bring your ideas to life?";
    const description = data?.description || "Whether you need instant AI inspiration or a complete custom brand overhaul, Gurucraftpro is your partner in creativity.";
    const primaryButtonText = data?.primary_button_text || "Start AI Design";
    const primaryButtonLink = data?.primary_button_link || "/ai-lab";
    const secondaryButtonText = data?.secondary_button_text || "Request Custom Design";
    const secondaryButtonLink = data?.secondary_button_link || "/request";

    return (
        <section className="py-40 relative overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            {/* Sparkles/Stars Effect could go here */}

            <div className="container mx-auto px-4 md:px-6 text-center text-white">
                <div className="max-w-3xl mx-auto">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] text-white"
                    >
                        {title}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-3xl text-slate-400 mb-16 leading-relaxed max-w-3xl mx-auto font-light"
                    >
                        {description}
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col md:flex-row gap-6 justify-center items-center"
                    >
                        <Button size="lg" className="h-24 px-16 text-2xl bg-white text-black hover:bg-slate-200 rounded-[2rem] font-black shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all hover:scale-105 group" asChild>
                            <Link href={primaryButtonLink}>
                                <Sparkles className="mr-3 h-8 w-8 text-indigo-600 animate-pulse" />
                                {primaryButtonText}
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-24 px-16 text-2xl border-white/10 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 rounded-[2rem] font-black transition-all hover:scale-105" asChild>
                            <Link href={secondaryButtonLink}>
                                {secondaryButtonText} <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-3 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
