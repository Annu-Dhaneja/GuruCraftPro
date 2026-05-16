"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shirt, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { WardrobeGrid } from "@/components/wardrobe/WardrobeGrid";

export default function VirtualTryOnPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-hidden pt-20">
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,#020617_100%)]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="relative z-10">
                <section className="py-24 px-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-8 mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black tracking-[0.4em] uppercase text-rose-400 mb-4">
                            <Shirt className="w-3 h-3" />
                            <span>Neural Dressing Room v1.0</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            VIRTUAL <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-100">TRY-ON.</span>
                        </h1>
                        <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto leading-relaxed">
                            Upload your profile and experience high-fidelity garment mapping in real-time.
                        </p>
                    </motion.div>

                    <div className="glass-card rounded-[3rem] p-10 border border-white/5 bg-slate-900/30 backdrop-blur-3xl min-h-[600px]">
                        <WardrobeGrid />
                    </div>
                </section>

                <div className="py-12 flex justify-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                    <span className="flex items-center gap-2 text-emerald-500">
                        <ShieldCheck className="w-3 h-3" /> Secure Neural Sandbox
                    </span>
                </div>
            </div>
        </main>
    );
}
