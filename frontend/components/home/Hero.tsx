"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2, Zap, Shield, Globe, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroProps {
    data: {
        badge?: string;
        headline_prefix?: string;
        headline_highlight?: string;
        headline_suffix?: string;
        subheadline?: string;
    };
}

export function Hero({ data }: HeroProps) {
    if (!data) return null;

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#020617]">
            {/* Background Neural Mesh */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute inset-0 neural-mesh" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* LEFT SIDE: Content */}
                    <div className="flex flex-col items-start text-left max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md px-4 py-1.5 text-[10px] font-black text-indigo-400 mb-8 tracking-[0.3em] uppercase"
                        >
                            <Zap className="w-3 h-3 fill-indigo-500 animate-pulse" />
                            <span>{data.badge || "SYSTEM ACTIVATED V4.0"}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase italic"
                        >
                            AI-POWERED <br /> 
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                                LUXURY ECOSYSTEM.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-2xl text-slate-400 mb-12 leading-relaxed font-light italic border-l-2 border-indigo-500/30 pl-6"
                        >
                            Fashion AI, Wedding Planning, Spiritual Artistry, and Intelligent Creative Tools in one premium digital sanctum.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-16 w-full sm:w-auto"
                        >
                            <Button size="lg" className="rounded-full h-16 sm:h-20 px-8 sm:px-12 bg-white text-black hover:bg-indigo-600 hover:text-white text-lg sm:text-xl font-black shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all active:scale-95 group" asChild>
                                <Link href="/services">
                                    EXPLORE PLATFORM <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-3 transition-transform" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full h-16 sm:h-20 px-8 sm:px-12 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white text-lg sm:text-xl font-black transition-all group" asChild>
                                <Link href="/ai-lab">
                                    WATCH DEMO <Sparkles className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-8 py-6 border-t border-white/5 w-full"
                        >
                           <div className="flex items-center gap-2 text-slate-500">
                               <Shield className="w-4 h-4 text-indigo-500" />
                               <span className="text-[10px] font-bold tracking-widest uppercase">Secured</span>
                           </div>
                           <div className="flex items-center gap-2 text-slate-500">
                               <Globe className="w-4 h-4 text-indigo-500" />
                               <span className="text-[10px] font-bold tracking-widest uppercase">Global</span>
                           </div>
                           <div className="flex items-center gap-2 text-slate-500">
                               <Star className="w-4 h-4 text-indigo-500" />
                               <span className="text-[10px] font-bold tracking-widest uppercase">Elite</span>
                           </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: Interactive Visuals */}
                    <div className="relative lg:block hidden">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative aspect-square w-full max-w-2xl mx-auto"
                        >
                            {/* Floating Luxury Cards */}
                            <motion.div 
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 right-0 z-20 glass-card p-6 rounded-3xl border-indigo-500/30 w-64 shadow-2xl backdrop-blur-3xl"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <span className="font-black text-xs tracking-widest uppercase">AI Stylist</span>
                                </div>
                                <div className="h-2 w-full bg-indigo-500/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        animate={{ width: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="h-full bg-indigo-500" 
                                    />
                                </div>
                                <p className="text-[10px] mt-4 text-slate-400 font-bold uppercase tracking-tighter">Optimizing Wardrobe...</p>
                            </motion.div>

                            <motion.div 
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 left-0 z-20 glass-card p-6 rounded-3xl border-cyan-500/30 w-72 shadow-2xl backdrop-blur-3xl"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <span className="font-black text-xs tracking-widest uppercase">Spiritual Art</span>
                                </div>
                                <div className="aspect-video w-full rounded-xl bg-slate-800/50 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
                                </div>
                                <p className="text-[10px] mt-4 text-slate-400 font-bold uppercase tracking-tighter">Rendered Sanctum 4K</p>
                            </motion.div>

                            {/* Center Visual (Reel Placeholder) */}
                            <div className="absolute inset-0 rounded-[5rem] overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-inner group">
                                <Image 
                                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                                    alt="Hero Visual"
                                    fill
                                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-80" />
                                
                                {/* Scan Line Effect */}
                                <div className="scan-line" />
                            </div>

                            {/* Neural Connections (Visual abstraction) */}
                            <div className="absolute -inset-10 -z-10 bg-indigo-600/5 blur-[120px] rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#020617] to-transparent z-10" />
        </section>
    );
}
