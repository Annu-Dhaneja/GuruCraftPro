"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Heart,
    Sparkles,
    ArrowRight,
    Star,
    Crown,
    Plane,
    MapPin,
    Camera,
    Music,
    Palette,
    Users,
    ChevronRight,
    Quote,
    CheckCircle2,
    Calendar,
    Gem,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWeddingStore } from "@/store/weddingStore";

const iconMap: Record<string, any> = {
    heart: Heart,
    crown: Crown,
    plane: Plane,
    palette: Palette,
    music: Music,
    camera: Camera,
    sparkles: Sparkles,
    users: Users,
};

export default function WeddingShowcasePage() {
    const { showcase, showcaseLoading, fetchShowcase } = useWeddingStore();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchShowcase();
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        setIsLoggedIn(!!token);
    }, [fetchShowcase]);

    if (showcaseLoading || !showcase) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse text-sm">Loading Wedding Collection...</p>
                </div>
            </div>
        );
    }

    const { hero, packages, services, testimonials, gallery } = showcase;
    
    // Normalize dynamic data from CMS if needed
    const packageItems = packages?.items || packages || [];
    const serviceItems = services?.items || services || [];
    const testimonialItems = testimonials?.items || testimonials || [];
    const galleryImages = gallery?.images || gallery || [];

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-rose-500/8 blur-[200px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/8 blur-[180px] rounded-full" />
            </div>

            {/* ─── HERO SECTION ─── */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-20">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,#1e1b4b_0%,#020617_70%)] opacity-80" />
                
                {/* Floating decorative elements */}
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-[15%] w-20 h-20 rounded-full border border-rose-500/20 hidden lg:block"
                />
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 left-[10%] w-32 h-32 rounded-full border border-indigo-500/10 hidden lg:block"
                />

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black tracking-[0.4em] uppercase text-rose-400 mb-10 backdrop-blur-xl"
                    >
                        <Heart className="w-3 h-3 fill-rose-400" />
                        <span>{hero.badge}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-8"
                    >
                        <span className="text-white block">{hero.title.split(",")[0]}</span>
                        <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-indigo-300 to-rose-400 block mt-2">
                            {hero.title.split(",")[1] || "Perfected"}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl font-light italic leading-relaxed max-w-3xl mx-auto mb-14"
                    >
                        {hero.subtitle}
                    </motion.p>

                    {/* Hero Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16"
                    >
                        {hero.stats?.map((stat: any, i: number) => (
                            <div key={i} className="glass-card rounded-2xl p-5 border border-white/5">
                                <p className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-1">{stat.value}</p>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <Link href={isLoggedIn ? "/wedding/planner" : "/signup"}>
                            <Button className="h-16 px-10 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-black text-sm uppercase tracking-[0.15em] shadow-[0_20px_50px_rgba(244,63,94,0.3)] hover:scale-105 transition-all group">
                                {isLoggedIn ? "MY WEDDING PLANNER" : "START PLANNING FREE"}
                                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="h-16 px-10 rounded-full border-white/10 text-white font-black text-sm uppercase tracking-[0.15em] hover:bg-white/5 gap-3">
                                <Calendar className="w-4 h-4" /> BOOK CONSULTATION
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ─── SERVICES SECTION ─── */}
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-400 mb-6">Complete Wedding Services</p>
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                            EVERY DETAIL, <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-500">PERFECTED.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceItems.map((service: any, i: number) => {
                            const Icon = iconMap[service.icon] || Sparkles;
                            return (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group glass-card rounded-[2rem] p-8 border border-white/5 hover:border-rose-500/20 transition-all duration-700 relative overflow-hidden"
                                >
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6 text-rose-400" />
                                        </div>
                                        <h3 className="text-xl font-black uppercase tracking-tight mb-3 group-hover:text-rose-400 transition-colors">{service.name}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── PACKAGES SECTION ─── */}
            <section className="py-32 relative z-10 bg-[#020617]/50 backdrop-blur-3xl border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-6">Curated Packages</p>
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
                            CHOOSE YOUR <br />
                            <span className="text-indigo-400">EXPERIENCE.</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-light italic max-w-2xl mx-auto">Every package is fully customizable. Start with a foundation and build your dream wedding.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {packageItems.map((pkg: any, i: number) => {
                            const Icon = iconMap[pkg.icon] || Sparkles;
                            return (
                                <motion.div
                                    key={pkg.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className={cn(
                                        "group relative glass-card rounded-[2.5rem] p-10 border transition-all duration-700 overflow-hidden",
                                        pkg.popular
                                            ? "border-indigo-500/30 bg-indigo-500/5 scale-105 shadow-[0_20px_80px_rgba(99,102,241,0.15)]"
                                            : "border-white/5 hover:border-indigo-500/20"
                                    )}
                                >
                                    {pkg.popular && (
                                        <div className="absolute top-6 right-6">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                    <div className="relative z-10">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110",
                                            pkg.popular ? "bg-indigo-500/20" : "bg-white/5"
                                        )}>
                                            <Icon className={cn("w-7 h-7", pkg.popular ? "text-indigo-400" : "text-slate-400")} />
                                        </div>

                                        <h3 className="text-2xl font-black uppercase italic tracking-tight mb-3">{pkg.name}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">{pkg.description}</p>

                                        <p className="text-3xl font-black tracking-tighter text-white mb-8">
                                            {pkg.price}
                                            <span className="text-xs text-slate-500 font-bold ml-2">starting</span>
                                        </p>

                                        <ul className="space-y-3 mb-10">
                                            {pkg.features.map((f: string) => (
                                                <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                                                    <CheckCircle2 className={cn("w-4 h-4 flex-shrink-0", pkg.popular ? "text-indigo-400" : "text-slate-600")} />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link href={isLoggedIn ? "/wedding/planner" : "/signup"}>
                                            <Button className={cn(
                                                "w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                                                pkg.popular
                                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
                                                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                            )}>
                                                GET STARTED <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── GALLERY SECTION ─── */}
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-400 mb-6">Our Portfolio</p>
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                            MOMENTS WE <br />
                            <span className="text-rose-400">CRAFTED.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img: string, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "relative group overflow-hidden rounded-2xl border border-white/5",
                                    i === 0 || i === 5 ? "row-span-2" : ""
                                )}
                            >
                                <img
                                    src={img}
                                    alt={`Wedding gallery ${i + 1}`}
                                    className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS SECTION ─── */}
            <section className="py-32 relative z-10 bg-[#020617]/50 backdrop-blur-3xl border-y border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-6">Happy Couples</p>
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                            LOVE <span className="text-indigo-400">STORIES.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonialItems.map((t: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="glass-card rounded-[2rem] p-8 border border-white/5 hover:border-indigo-500/20 transition-all duration-500 relative"
                            >
                                <Quote className="w-8 h-8 text-indigo-500/20 mb-6" />
                                <p className="text-slate-300 text-sm leading-relaxed italic mb-8">&ldquo;{t.quote}&rdquo;</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-black tracking-tight text-white">{t.name}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3 text-indigo-400" />
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: t.rating }).map((_, j) => (
                                            <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-40 relative z-10 px-6">
                <div className="max-w-5xl mx-auto glass-card rounded-[4rem] p-16 md:p-24 text-center border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-indigo-500/10" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black tracking-[0.3em] uppercase text-rose-400 mb-10">
                            <Gem className="w-3 h-3" />
                            <span>Your Journey Begins Here</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
                            READY TO PLAN <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-indigo-400 to-rose-400">
                                YOUR DREAM WEDDING?
                            </span>
                        </h2>

                        <p className="text-slate-400 text-lg font-light italic max-w-2xl mx-auto mb-14">
                            Create your free account and unlock our full wedding planning suite — 
                            countdown timer, guest management, budget optimizer, vendor tracking, and AI-powered recommendations.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href={isLoggedIn ? "/wedding/planner" : "/signup"}>
                                <Button className="h-16 px-12 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-black text-sm uppercase tracking-[0.15em] shadow-[0_20px_50px_rgba(244,63,94,0.3)] hover:scale-105 transition-all group">
                                    {isLoggedIn ? "OPEN MY PLANNER" : "CREATE FREE ACCOUNT"}
                                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" className="h-16 px-12 rounded-full border-white/10 text-white font-black text-sm uppercase tracking-[0.15em] hover:bg-white/5">
                                    TALK TO AN EXPERT
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
