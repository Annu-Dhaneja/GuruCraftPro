"use client";

import React from "react";
import { Search, Globe, Share2, BarChart, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PAGES = [
    { title: "Home Page", slug: "/", score: 98, status: "Healthy" },
    { title: "Design Portfolio", slug: "/portfolio", score: 94, status: "Healthy" },
    { title: "AI Creative Lab", slug: "/ai-lab", score: 82, status: "Action Required" },
    { title: "Contact Us", slug: "/contact", score: 96, status: "Healthy" },
];

export function SEOManager() {
    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center">
                <p className="text-slate-500 font-medium italic">Optimizing visibility and narrative dominance across global search networks.</p>
                <Button className="rounded-2xl bg-indigo-600 hover:bg-white hover:text-black font-black px-8 h-14 transition-all gap-2">
                    <BarChart size={18} /> FULL AUDIT
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {PAGES.map((page) => (
                    <div key={page.slug} className="glass-card p-10 rounded-[3rem] border border-white/5 group hover:border-indigo-500/30 transition-all">
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tight">{page.title}</h3>
                                    <p className="text-xs text-slate-500 font-mono">{page.slug}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-black italic text-indigo-400">{page.score}%</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">SEO Index</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-10">
                            {[
                                { label: "Metadata", icon: Search, ok: true },
                                { label: "OG Tags", icon: Share2, ok: page.score > 90 },
                                { label: "Index", icon: CheckCircle2, ok: true },
                            ].map((s, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                                    <s.icon size={16} className={s.ok ? "text-emerald-400" : "text-amber-400"} />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{s.label}</span>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="w-full rounded-2xl border-white/5 h-12 font-bold text-xs hover:bg-white hover:text-black">
                            MANAGE SEO ARCHITECTURE
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
