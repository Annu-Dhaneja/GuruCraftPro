"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Sparkles, 
    ShoppingCart, 
    Heart, 
    Calendar, 
    Moon, 
    Sun, 
    GalleryVertical,
    Flower,
    Gem,
    ArrowRight,
    Play,
    Volume2,
    Eye,
    Star
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const products = [
    { id: '1', title: "Divine Aura Bracelet", price: "₹2,499", image: "https://images.unsplash.com/photo-1611078838275-5fc0c75ff0d1?q=80&w=800", badge: "Most Sacred" },
    { id: '2', title: "Infinity Peace Pendant", price: "₹4,999", image: "https://images.unsplash.com/photo-1573408302315-924f7a250517?q=80&w=800", badge: "Exclusive" },
    { id: '3', title: "Spiritual Wisdom Box", price: "₹1,299", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800", badge: "AR Enabled" },
];

export function SpiritualSanctuaryContent({ data }: { data?: any }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const hero = data?.hero || {};
    const vachan = data?.vachan || {};
    const store = data?.store || {};

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-amber-500/30">
            {/* Sacred Background Layer */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b0764_0%,#020617_60%)]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
                
                {/* Floating Particles (Simulated) */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
            </div>

            {/* Immersive Header */}
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-8 py-6 flex items-center justify-between",
                scrolled ? "bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent"
            )}>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-0.5">
                        <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center">
                            <Flower className="w-5 h-5 text-amber-400" />
                        </div>
                    </div>
                    <span className="text-sm font-black uppercase tracking-[0.3em] italic">Guru Ji Art <span className="text-amber-500">Work</span></span>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/wedding" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Digital Vachan</Link>
                    <Link href="/services" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">AR Gallery</Link>
                    <Button className="rounded-full bg-amber-500 hover:bg-amber-400 text-black font-black px-6 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                        DARSHAN
                    </Button>
                </div>
            </nav>

            <main className="relative z-10 pt-32 lg:pt-48 px-8 lg:px-16 max-w-screen-2xl mx-auto">
                {/* Hero Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black tracking-[0.4em] uppercase text-amber-500 mb-8"
                        >
                            <Sparkles className="w-3 h-3" />
                            <span>{hero.badge || "Sacred Digital Presence"}</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white mb-8"
                        >
                            {hero.title_prefix || "Immerse in"} <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-200 to-amber-500">{hero.title_highlight || "Divine Wisdom"}</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-xl font-light italic leading-relaxed max-w-xl mb-12"
                        >
                            {hero.description || "Experience the intersection of ancient spirituality and modern artistry through AI-curated vachans and high-fidelity 3D spiritual assets."}
                        </motion.p>
                        <div className="flex flex-wrap gap-6">
                            <Button className="h-16 px-10 rounded-[2rem] bg-amber-500 text-black font-black text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:scale-105 transition-all">
                                EXPLORE COLLECTION
                            </Button>
                            <Button variant="outline" className="h-16 px-10 rounded-[2rem] border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all gap-3">
                                <Play className="w-4 h-4 fill-white" /> VIRTUAL DARSHAN
                            </Button>
                        </div>
                    </div>

                    {/* Featured AR Asset Preview */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-amber-500/20 blur-[150px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative glass-card rounded-[4rem] p-4 aspect-square overflow-hidden border-amber-500/20">
                            <img 
                                src="https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=1200" 
                                alt="Divine Artwork"
                                className="w-full h-full object-cover rounded-[3.5rem] group-hover:scale-105 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                            
                            {/* AR Label */}
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 group-hover:border-amber-500/50 transition-all">
                                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
                                    <Eye className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Live Preview</p>
                                    <p className="text-xs font-bold">Augmented Reality Room</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Daily Wisdom Section */}
                <section className="mb-40 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent rounded-[3rem]" />
                    <div className="relative p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-6">{vachan.badge || "Daily Vachan"}</p>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9] mb-8">
                                {vachan.quote || "\"Infinite peace begins within the soul.\""}
                            </h2>
                            <p className="text-slate-400 font-medium italic mb-12">
                                {vachan.description || "Receive a personalized AI-generated spiritual quote every morning based on your journey and meditation goals."}
                            </p>
                            <Button className="rounded-full bg-white text-black font-black px-8">
                                SUBSCRIBE TO WISDOM
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-40 h-56 rounded-3xl bg-white/5 border border-white/5 p-4 flex flex-col justify-end hover:border-amber-500/30 transition-all">
                                    <div className="w-full h-1 bg-amber-500/20 rounded-full mb-4" />
                                    <p className="text-[10px] font-bold text-slate-500 mb-1 italic">June {i+10}</p>
                                    <p className="text-[10px] font-black uppercase tracking-tighter line-clamp-2">Sacred Morning Vachan</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Spiritual Marketplace */}
                <section className="mb-40">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter">{store.title_prefix || "Sacred"} <span className="text-amber-500">{store.title_highlight || "Store"}</span></h2>
                        <Link href="/shop" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-amber-500 transition-colors flex items-center gap-2">
                            VIEW ALL COLLECTIONS <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="glass-card rounded-[3rem] p-4 mb-6 border-white/5 group-hover:border-amber-500/20">
                                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-900">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-8 left-8">
                                            <span className="bg-amber-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{product.badge}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-black uppercase italic tracking-tighter">{product.title}</h3>
                                        <span className="text-amber-400 font-bold">{product.price}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium mb-6">Handcrafted with premium materials and divine energy.</p>
                                    <Button className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-black text-[10px] uppercase tracking-widest transition-all">
                                        ADD TO CART
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="relative z-10 border-t border-white/5 bg-[#020617]/50 backdrop-blur-xl py-20 px-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-4">
                        <Flower className="w-8 h-8 text-amber-500" />
                        <span className="text-2xl font-black uppercase tracking-tighter italic">GURU JI ART</span>
                    </div>
                    <div className="flex gap-12">
                        {['Wallpapers', 'Donations', 'Vachans', 'Stickers'].map(item => (
                            <Link key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white">{item}</Link>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-500"><Volume2 className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon" className="text-slate-500"><Moon className="w-5 h-5" /></Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
