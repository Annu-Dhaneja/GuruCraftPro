"use client";

import React from "react";
import { ArrowLeft, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import WeddingBudgetPlanner from "@/components/wedding/BudgetPlannerAI";

export default function BudgetPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
            {/* Mesh Background */}
            <div className="fixed inset-0 z-0 mesh-gradient opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <Link href="/wedding" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-8">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Planner</span>
                    </Link>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-6"
                            >
                                <Sparkles className="w-3 h-3" />
                                <span>Financial Intelligence</span>
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] text-white">
                                SMART <span className="text-primary">BUDGET</span> <br />
                                OPTIMIZER
                            </h1>
                        </div>
                        <p className="text-slate-400 text-lg font-light italic leading-relaxed max-w-sm">
                            Allocate your funds with surgical precision using our elite AI recommendations for high-end vendors.
                        </p>
                    </div>
                </div>

                {/* Main Component */}
                <WeddingBudgetPlanner />
            </div>
        </div>
    );
}
