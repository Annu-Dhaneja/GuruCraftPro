"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2, Zap, Layout, ShoppingCart, BarChart3, Globe, ShieldCheck, Cloud, Monitor, BookOpen, Heart, Camera, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeading, GlassCard, PremiumGrid } from "./UI";

const iconMap: Record<string, any> = { 
    Wand2, Monitor, BookOpen, Sparkles, Zap, Layout, ShoppingCart, BarChart3, Globe, ShieldCheck, Cloud, Heart, Camera, ShoppingBag 
};

export function CategoryGrid({ props }: { props: any }) {
    const { title, subtitle, items, columns = 2 } = props || {};

    return (
        <section className="py-24 md:py-40 relative z-10">
            <div className="container">
                <SectionHeading 
                    badge={subtitle || "Neural Segments"}
                    title={title || "Strategic Hubs"}
                />

                <PremiumGrid columns={columns as any}>
                    {items?.map((item: any, idx: number) => {
                        const Icon = iconMap[item.icon] || Sparkles;
                        return (
                            <Link 
                                key={idx}
                                href={item.href || "#"} 
                                className="group block h-full"
                            >
                                <GlassCard className="h-full group-hover:border-indigo-600/30 transition-all duration-700">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                            <Icon className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {item.badge && (
                                                <span className="px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black uppercase tracking-widest text-indigo-600 italic">
                                                    {item.badge}
                                                </span>
                                            )}
                                            <ArrowRight className="w-8 h-8 text-slate-100 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase italic group-hover:text-indigo-600 transition-all leading-[0.9]">{item.title}</h3>
                                    <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 italic">
                                        {item.description}
                                    </p>
                                    
                                    {item.features && item.features.length > 0 && (
                                        <div className="space-y-4 pt-10 border-t border-slate-50">
                                            {item.features.map((f: string, i: number) => (
                                                <div key={i} className="flex items-center gap-4 group/item">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                                    <span className="text-sm font-black italic uppercase tracking-tight text-slate-400 group-hover/item:text-slate-900 transition-colors">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </GlassCard>
                            </Link>
                        );
                    })}
                </PremiumGrid>
            </div>
        </section>
    );
}
