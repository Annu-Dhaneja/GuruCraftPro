"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Share2, Heart, ExternalLink, Calendar, Tag, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PortfolioCard } from "./PortfolioCard";

interface PortfolioProjectProps {
    project: any;
    relatedProjects?: any[];
}

export function PortfolioProjectTemplate({ project, relatedProjects }: PortfolioProjectProps) {
    if (!project) return null;

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 overflow-hidden">
            {/* Cinematic Hero Section */}
            <section className="relative h-[85vh] flex items-end justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-60 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                <div className="container relative z-10 pb-20 px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 text-[10px] uppercase font-black tracking-widest px-4 py-1.5">
                                {project.category}
                            </Badge>
                            {project.aiAssisted && (
                                <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 text-[10px] uppercase font-black tracking-widest px-4 py-1.5 gap-2">
                                    <Sparkles className="h-3 w-3" /> AI Enhanced
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-none mb-10 uppercase">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-3xl text-slate-300 font-light italic max-w-3xl leading-relaxed">
                            {project.description || "A masterclass in strategic aesthetic alignment and neural design orchestration."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Project Metadata Bar */}
            <section className="border-y border-white/5 bg-slate-900/20 backdrop-blur-3xl py-12">
                <div className="container px-8 grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Client / Brand</p>
                        <p className="text-lg font-bold italic">{project.client || "Confidential Elite"}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Timeline</p>
                        <p className="text-lg font-bold italic">{project.timeline || "Q1 2026"}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Industry</p>
                        <p className="text-lg font-bold italic">{project.industry || "Digital Luxury"}</p>
                    </div>
                    <div className="flex items-center gap-4 justify-end">
                        <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white hover:text-black">
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white hover:text-black">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Content & Gallery */}
            <section className="py-32">
                <div className="container px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-4 space-y-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black italic uppercase tracking-tight">The Vision</h3>
                                <p className="text-slate-400 leading-relaxed font-light italic">
                                    {project.long_description || "We orchestrated a seamless fusion of traditional aesthetic principles and next-gen neural processing to deliver an unparalleled visual identity."}
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black italic uppercase tracking-tight">Outcome</h3>
                                <ul className="space-y-4">
                                    {project.outcomes?.map((outcome: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            <span className="text-sm font-medium">{outcome}</span>
                                        </li>
                                    )) || (
                                        <>
                                            <li className="flex items-center gap-3 text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> <span className="text-sm font-medium">40% Increase in conversion</span></li>
                                            <li className="flex items-center gap-3 text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> <span className="text-sm font-medium">Global Brand Alignment</span></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="lg:col-span-8 space-y-12">
                            {/* Main Display Image */}
                            <div className="rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                                <img src={project.image} alt={project.title} className="w-full h-auto" />
                            </div>

                            {/* Gallery Matrix */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.gallery?.map((img: string, i: number) => (
                                    <div key={i} className="rounded-[2rem] overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all group">
                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects && relatedProjects.length > 0 && (
                <section className="py-32 border-t border-white/5 bg-slate-900/10">
                    <div className="container px-8">
                        <div className="flex justify-between items-end mb-20">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-4 italic">The Collection</p>
                                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Related Vision</h2>
                            </div>
                            <Button variant="link" className="text-indigo-400 hover:text-white font-bold" asChild>
                                <Link href="/portfolio">View All Works</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((p, i) => (
                                <PortfolioCard key={i} item={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="py-12 border-t border-white/5 flex justify-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                <span className="flex items-center gap-2 text-emerald-500">
                    <ShieldCheck className="w-3 h-3" /> GurucraftPro Architecture v4.0
                </span>
            </div>
        </main>
    );
}
