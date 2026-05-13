"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
    ArrowRight, 
    Shirt, 
    Sparkles, 
    PenTool, 
    Sticker, 
    Wand2, 
    Zap, 
    ChevronLeft,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOOLS = [
    {
        title: "Virtual Try-On",
        description: "Experience high-fidelity garment mapping. Upload your photo and see the future of fashion instantly.",
        href: "/ai-lab/virtual-try-on",
        icon: Shirt,
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200"
    },
    {
        title: "Photo Core Editor",
        description: "Industrial-grade AI editing. Neural upscaling, background removal, and studio relighting.",
        href: "/photo-editor",
        icon: Wand2,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200"
    },
    {
        title: "Outfit Architect",
        description: "Generate complete collections from simple text prompts using our neural design engine.",
        href: "/ai-lab/outfit-generator",
        icon: Sparkles,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200"
    },
    {
        title: "Identity Generator",
        description: "Create professional logos and brand assets with strategic aesthetic alignment.",
        href: "/ai-lab/logo-generator",
        icon: PenTool,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        image: "https://images.unsplash.com/photo-1626785774573-4b79931256ce?q=80&w=1200"
    }
];

export default function AILabPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-hidden">
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,#020617_100%)]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="relative z-10">
                {/* Header Navigation */}
                <header className="h-20 border-b border-white/5 bg-[#020617]/50 backdrop-blur-2xl flex items-center justify-between px-8">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Core</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-sm font-black tracking-tight uppercase italic">
                            AI <span className="text-indigo-400">LAB CORE</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                            <ShieldCheck className="w-3 h-3" /> System Stable
                        </span>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-24 px-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-8 mb-24"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.4em] uppercase text-indigo-400 mb-4">
                            <Zap className="w-3 h-3 fill-indigo-400" />
                            <span>Neural Intelligence v4.2</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            UNLIMITED <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-100">POSSIBILITY.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto leading-relaxed">
                            Explore our ecosystem of high-fidelity AI tools designed for elite fashion houses and strategic commerce.
                        </p>
                    </motion.div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {TOOLS.map((tool, idx) => (
                            <motion.div
                                key={tool.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link href={tool.href} className="group block relative h-[450px] rounded-[3rem] overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-700">
                                    {/* Image Layer */}
                                    <img 
                                        src={tool.image} 
                                        alt={tool.title} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                                    
                                    {/* Content Layer */}
                                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6", tool.bg)}>
                                            <tool.icon className={cn("w-8 h-8", tool.color)} />
                                        </div>
                                        <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 group-hover:translate-x-2 transition-transform">
                                            {tool.title}
                                        </h3>
                                        <p className="text-slate-400 text-lg font-medium italic mb-8 max-w-sm group-hover:translate-x-2 transition-transform delay-75">
                                            {tool.description}
                                        </p>
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-indigo-400 transition-colors">
                                            Launch Module <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Animated Border/Glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-transparent" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer Status */}
                <footer className="py-12 border-t border-white/5 bg-[#020617]/50 backdrop-blur-xl">
                    <div className="container mx-auto px-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                        <span>© 2026 GURUCRaft Pro</span>
                        <div className="flex gap-8">
                            <span>Terms</span>
                            <span>Privacy</span>
                            <span>API Docs</span>
                        </div>
                        <span>v4.2.1-Stable</span>
                    </div>
                </footer>
            </div>
        </main>
    );
}
