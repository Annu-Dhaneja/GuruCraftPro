"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Layout, 
    Image as ImageIcon, 
    Type, 
    Shapes, 
    Layers, 
    Download, 
    Share2, 
    Settings, 
    Wand2,
    Plus,
    Palette,
    Search,
    ChevronRight,
    ArrowLeft,
    Box,
    Shirt,
    CreditCard,
    FileText,
    Monitor,
    Smartphone
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const categories = [
    { id: 'all', label: 'All Templates', icon: Layout },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'marketing', label: 'Marketing', icon: Wand2 },
    { id: 'print', label: 'Print Shop', icon: FileText },
    { id: 'brand', label: 'Brand Kits', icon: Box },
];

const tools = [
    { id: 'logo', label: 'AI Logo', icon: Box, color: 'text-indigo-400' },
    { id: 'social', label: 'AI Post', icon: Share2, color: 'text-rose-400' },
    { id: 'thumbnail', label: 'AI Thumb', icon: Monitor, color: 'text-indigo-400' },
    { id: 'resume', label: 'AI Resume', icon: FileText, color: 'text-cyan-400' },
    { id: 'business', label: 'AI Card', icon: CreditCard, color: 'text-emerald-400' },
    { id: 'tshirt', label: 'AI Apparel', icon: Shirt, color: 'text-purple-400' },
];

export default function GraphicsStudioPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col pt-16">
            {/* Mesh Background */}
            <div className="fixed inset-0 z-0 mesh-gradient opacity-30" />

            {/* Header / Sub-nav */}
            <div className="relative z-10 border-b border-white/5 bg-[#020617]/50 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10" />
                    <h1 className="text-xl font-black uppercase tracking-tighter italic">
                        Graphics <span className="text-primary">Studio</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search templates..."
                            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 font-bold shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                        <Plus className="w-4 h-4 mr-2" />
                        NEW DESIGN
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* Sidebar */}
                <aside className="w-72 border-r border-white/5 bg-[#020617]/30 backdrop-blur-md overflow-y-auto p-6 hidden lg:block">
                    <div className="mb-10">
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 mb-6">Marketplace</p>
                        <div className="space-y-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                                        activeCategory === cat.id 
                                            ? "bg-primary/10 text-primary border border-primary/20" 
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <cat.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeCategory === cat.id ? "text-primary" : "text-slate-500")} />
                                    <span className="text-sm font-bold tracking-tight">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 mb-6">AI Accelerators</p>
                        <div className="grid grid-cols-1 gap-2">
                            {tools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    href={`/graphics-studio/ai/${tool.id}`}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-2 rounded-xl bg-white/5", tool.color)}>
                                            <tool.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-300 group-hover:text-white">{tool.label}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    {/* Hero Section */}
                    <div className="relative overflow-hidden rounded-[3rem] p-12 mb-12 border border-white/5 bg-gradient-to-br from-indigo-500/10 via-transparent to-primary/5">
                        <div className="max-w-xl relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-6"
                            >
                                <Wand2 className="w-3 h-3" />
                                <span>AI-Powered Marketplace</span>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9] text-white mb-6">
                                Craft Your Brand <br />
                                <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-200">With AI Intelligence</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-light italic leading-relaxed mb-8">
                                Access thousands of luxury templates or use our AI core to generate unique, print-ready designs in seconds.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-white text-black hover:bg-slate-200 rounded-full px-8 font-black">
                                    BROWSE DESIGNS
                                </Button>
                                <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-full px-8 font-black">
                                    AI DESIGN ASSISTANT
                                </Button>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
                    </div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[1,2,3,4,5,6,7,8].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative glass-card rounded-[2rem] overflow-hidden"
                            >
                                <div className="aspect-[4/3] bg-slate-900 overflow-hidden">
                                    <img 
                                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`} 
                                        alt="Template" 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <Button className="rounded-full bg-primary text-black font-bold h-10 w-10 p-0">
                                            <ImageIcon className="w-5 h-5" />
                                        </Button>
                                        <Button className="rounded-full bg-white text-black font-bold h-10 w-10 p-0">
                                            <Plus className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-black uppercase italic tracking-tighter text-sm">Luxury Brand Identity {i}</h3>
                                        <span className="text-[10px] text-primary font-black uppercase tracking-widest">Premium</span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-1 mb-4">Complete stationery and logo kit for elite businesses.</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {[1,2,3].map(j => (
                                                <div key={j} className="w-5 h-5 rounded-full bg-slate-800 border border-black" />
                                            ))}
                                        </div>
                                        <Button variant="ghost" className="h-8 text-[10px] font-black uppercase tracking-widest hover:text-primary p-0">
                                            Edit Template
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Footer Status */}
            <footer className="relative z-10 border-t border-white/5 bg-[#020617]/50 backdrop-blur-xl px-8 py-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                        AI Core Online
                    </span>
                    <span>1,429 templates available</span>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-white/20">© 2026 GURUCRaft Studio</span>
                </div>
            </footer>
        </div>
    );
}
