"use client";

import React from "react";
import Link from "next/link";
import { Brain, Wand2, Layout, Palette, Zap, ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading, GlassCard, PremiumGrid } from "./UI";

const IconMap: Record<string, LucideIcon> = {
  Brain,
  Wand2,
  Layout,
  Palette,
  Zap,
  ArrowRight
};

interface ToolItem {
    title: string;
    description: string;
    href: string;
    icon: string;
    image: string;
}

interface AILabGridProps {
    title?: string;
    badge?: string;
    description?: string;
    tools: ToolItem[];
}

export function AILabGrid({ props }: { props: AILabGridProps }) {
    const { title, badge, description, tools } = props;

    return (
        <section className="py-24 md:py-40 relative z-10">
            <div className="container">
                <SectionHeading 
                    align="center"
                    badge={badge || "Neural Laboratory"}
                    title={title || "Strategic AI Modules"}
                    description={description}
                />

                <PremiumGrid columns={2}>
                    {(tools || []).map((tool, idx) => {
                        const Icon = IconMap[tool.icon] || Zap;
                        return (
                            <Link 
                                key={idx}
                                href={tool.href} 
                                className="group block relative h-[500px] rounded-[4rem] overflow-hidden border border-slate-100 hover:border-indigo-600/50 transition-all duration-700 shadow-xl"
                            >
                                <img 
                                    src={tool.image} 
                                    alt={tool.title} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                                
                                <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-end">
                                    <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8 bg-white/10 backdrop-blur-xl border border-white/20 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-white group-hover:translate-x-3 transition-transform leading-none">
                                        {tool.title}
                                    </h3>
                                    <p className="text-white/60 text-lg font-light italic mb-10 max-w-sm group-hover:translate-x-3 transition-transform delay-75">
                                        {tool.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white group-hover:text-indigo-400 transition-colors italic">
                                        LAUNCH MODULE <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </PremiumGrid>
            </div>
        </section>
    );
}
