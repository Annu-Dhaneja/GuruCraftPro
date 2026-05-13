"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
    Zap, 
    Sparkles, 
    Wand2, 
    ArrowRight, 
    Globe, 
    ShieldCheck, 
    Play,
    Star,
    ChevronDown,
    Heart,
    Box,
    Shirt,
    Package
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
            {/* Cinematic Global Mesh */}
            <div className="fixed inset-0 z-0 mesh-gradient opacity-30 pointer-events-none" />

            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden px-8">
                {/* Background Video / Visual Layer */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#020617_100%)] opacity-80" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
                
                {/* Floating 3D-like Orbs */}
                <motion.div 
                    animate={{ 
                        y: [0, -40, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full" 
                />
                <motion.div 
                    animate={{ 
                        y: [0, 50, 0],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/20 blur-[180px] rounded-full" 
                />

                <div className="relative z-10 max-w-screen-xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-10 backdrop-blur-xl"
                    >
                        <Zap className="w-3 h-3 fill-primary" />
                        <span>Intelligence Beyond Design</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-[13vw] md:text-[8vw] font-black tracking-tighter uppercase italic leading-[0.8] mb-12 mix-blend-plus-lighter"
                    >
                        <span className="text-white block">GURU<span className="text-primary italic">CRAFT</span></span>
                        <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-amber-200 to-primary block">ULTRA PRO</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-slate-400 text-lg md:text-2xl font-light italic leading-relaxed max-w-3xl mx-auto mb-16 px-4"
                    >
                        The world's first AI-powered luxury ecosystem merging <span className="text-white font-bold">Elite Graphics</span>, <span className="text-white font-bold">Divine Artistry</span>, and <span className="text-white font-bold">Strategic Commerce</span> into one cinematic experience.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-8"
                    >
                        <Link href="/services">
                            <Button className="h-20 px-12 rounded-[2.5rem] bg-primary text-black font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(197,160,89,0.4)] hover:scale-105 transition-all group">
                                ENTER THE ECOSYSTEM <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button variant="outline" className="h-20 px-12 rounded-[2.5rem] border-white/10 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-white/5 transition-all gap-4">
                            <Play className="w-5 h-5 fill-white" /> WATCH SHOWREEL
                        </Button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Discover</span>
                    <ChevronDown className="w-6 h-6 text-primary" />
                </motion.div>
            </header>

            {/* Ecosystem Grid */}
            <section className="py-40 relative z-10">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-24">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6">Master Modules</p>
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-10">
                            UNLIMITED <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-500">CREATIVITY.</span>
                        </h2>
                    </div>
                    
                    <FeaturesGrid />
                </div>
            </section>

            {/* AI Lab Preview */}
            <section className="py-40 bg-[#020617]/50 backdrop-blur-3xl border-y border-white/5 relative z-10">
                <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="glass-card rounded-[4rem] p-4 aspect-[4/3] overflow-hidden border-primary/20 group-hover:border-primary/50 transition-all">
                            <img 
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200" 
                                alt="AI Lab" 
                                className="w-full h-full object-cover rounded-[3.5rem] group-hover:scale-105 transition-transform duration-[3s]"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black tracking-[0.4em] uppercase text-indigo-400 mb-8">
                            <Wand2 className="w-3 h-3" />
                            <span>AI Core Integration</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-10">
                            MAGIC AT <br />
                            <span className="text-indigo-400">YOUR FINGERTIPS.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-light italic leading-relaxed mb-12">
                            From background removal to neural upscaling, our AI core processes high-fidelity assets in milliseconds, optimized for industrial-scale commerce.
                        </p>
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            {[
                                { label: "Processing Speed", value: "8ms", icon: Zap },
                                { label: "Model Accuracy", value: "99.2%", icon: ShieldCheck },
                            ].map(stat => (
                                <div key={stat.label} className="space-y-2">
                                    <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                        <Link href="/ai-lab">
                            <Button className="h-16 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-slate-200">
                                LAUNCH AI LAB
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter / Final CTA */}
            <section className="py-40 relative z-10 px-8">
                <div className="max-w-screen-xl mx-auto glass-card rounded-[4rem] p-16 md:p-32 text-center border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-indigo-500/10" />
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] mb-12">
                            JOIN THE <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-200">ELITE 1%.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto mb-16">
                            Be the first to access the full GURUCRaft ecosystem and exclusive early-adopter luxury packages.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <input 
                                type="email" 
                                placeholder="Your elite email address" 
                                className="h-16 px-10 rounded-full bg-white/5 border border-white/10 w-full md:w-96 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none"
                            />
                            <Button className="h-16 px-12 rounded-full bg-primary text-black font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                                GET EARLY ACCESS
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 relative z-10 px-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black italic">GP</div>
                        <span className="text-xl font-black uppercase tracking-tighter italic">GURUCRaft <span className="text-primary">Pro</span></span>
                    </div>
                    <div className="flex gap-12">
                        {['Services', 'Ecosystem', 'Lab', 'Shop'].map(item => (
                            <Link key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">{item}</Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Production Version 4.2.0</p>
                        <div className="flex gap-4">
                            <Globe className="w-4 h-4 text-slate-600" />
                            <ShieldCheck className="w-4 h-4 text-slate-600" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
