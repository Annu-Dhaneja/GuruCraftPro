"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    Zap, 
    Layers, 
    ImageIcon, 
    CheckCircle2, 
    ArrowRight, 
    Box, 
    Shirt, 
    TrendingUp, 
    BookOpen, 
    Wand2,
    Cpu,
    Sparkles,
    ShieldCheck,
    BarChart3,
    Package
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const categories = [
    {
        title: "Category A",
        subtitle: "Creative Product Post Production",
        description: "Professional photo editing optimized for elite e-commerce platforms like Amazon, Flipkart, and Etsy.",
        icon: ImageIcon,
        features: ["Ghost Mannequin Editing", "Color Correction", "Shadow Generation", "AI Compliance Checker"],
        href: "/services/vantage-ecom/creative",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10"
    },
    {
        title: "Category B",
        subtitle: "Technical E-commerce Assets",
        description: "Precision-engineered mockups, custom size charts, and jersey customization workflows.",
        icon: Box,
        features: ["Jersey Customization", "3D Visualization", "AI Size Chart Generator", "Technical Mockups"],
        href: "/services/vantage-ecom/technical",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10"
    },
    {
        title: "Category C",
        subtitle: "Knowledge & Strategy",
        description: "Elite blueprints, e-books, and AI business strategy assistance for digital merchants.",
        icon: BookOpen,
        features: ["Market Analysis AI", "Pricing Strategy", "Digital Merchant Guides", "E-books Marketplace"],
        href: "/services/vantage-ecom/strategy",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10"
    }
];

export default function VantageEcomPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-8 lg:px-16 overflow-hidden">
            {/* Mesh Background */}
            <div className="fixed inset-0 z-0 mesh-gradient opacity-20 pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black tracking-[0.3em] uppercase text-indigo-400 mb-8"
                        >
                            <Zap className="w-3 h-3" />
                            <span>Industrial Intelligence Suite</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white">
                            VANTAGE <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">E-COMMERCE</span>
                        </h1>
                    </div>
                    <div className="flex flex-col gap-6 max-w-sm">
                        <p className="text-slate-400 text-lg font-light italic leading-relaxed">
                            Elite AI-powered editing and e-commerce strategy platform designed for high-conversion product presentation.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800" />
                                ))}
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[10px] font-black uppercase text-white tracking-widest">1.2K+ Users</p>
                                <p className="text-[10px] text-slate-500 font-bold">Trading Globally</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Stats Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {[
                        { label: "AI Precision", value: "99.9%", icon: Cpu },
                        { label: "Conversion Lift", value: "+34%", icon: TrendingUp },
                        { label: "Time Saved", value: "85%", icon: Sparkles },
                        { label: "Compliance", "value": "100%", icon: ShieldCheck },
                    ].map((stat, i) => (
                        <div key={stat.label} className="glass-card rounded-3xl p-6 flex items-center gap-6 border-white/5">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-black tracking-tighter">{stat.value}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative flex flex-col glass-card rounded-[3rem] p-10 overflow-hidden border-white/5 hover:border-indigo-500/30 transition-all duration-700"
                        >
                            <div className="relative z-10 flex-1">
                                <div className="flex justify-between items-start mb-10">
                                    <div className={cn("w-16 h-16 rounded-[2rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-2xl", cat.bg, cat.color)}>
                                        <cat.icon className="w-8 h-8" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{cat.title}</span>
                                </div>
                                
                                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4 group-hover:text-shimmer transition-all">
                                    {cat.subtitle}
                                </h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 group-hover:text-slate-200 transition-colors">
                                    {cat.description}
                                </p>

                                <div className="space-y-3 mb-10">
                                    {cat.features.map(feat => (
                                        <div key={feat} className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <CheckCircle2 className="w-2.5 h-2.5 text-indigo-400" />
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button className="relative z-10 w-full h-14 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-slate-200 gap-2 transition-all group/btn">
                                LAUNCH MODULE <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>

                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    ))}
                </div>

                {/* Print Shop Preview */}
                <div className="mt-20 glass-card rounded-[3rem] p-12 lg:p-20 border-white/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-6 text-indigo-400">
                                <Package className="w-6 h-6" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Elite Print Shop</span>
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-[0.9] text-white mb-8">
                                Transform Pixels <br />
                                <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-100">Into Premium Print</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-light italic leading-relaxed mb-10">
                                Global print fulfillment for luxury business cards, invitation suites, and branded e-commerce packaging.
                            </p>
                            <Button className="h-14 px-10 rounded-2xl bg-indigo-500 text-black font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(245,158,11,0.2)]">
                                OPEN PRINT SHOP
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4 rotate-12 group-hover:rotate-6 transition-transform duration-[2s]">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-40 h-56 rounded-2xl bg-slate-800 border border-white/10 shadow-2xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
