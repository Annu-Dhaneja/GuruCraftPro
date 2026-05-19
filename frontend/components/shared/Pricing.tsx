"use client";

import React from "react";
import { Check, Zap, Sparkles, Crown } from "lucide-react";
import Link from "next/link";
import { SectionHeading, GlassCard, PremiumGrid, PremiumButton } from "./UI";

export function Pricing({ props }: { props: any }) {
    const { title, subtitle, tiers } = props || {};

    const getIcon = (icon: string) => {
        switch (icon) {
            case "zap": return <Zap className="w-6 h-6" />;
            case "sparkles": return <Sparkles className="w-6 h-6" />;
            case "crown": return <Crown className="w-6 h-6" />;
            default: return <Zap className="w-6 h-6" />;
        }
    };

    return (
        <section className="py-24 md:py-40">
            <div className="container">
                <SectionHeading 
                    align="center"
                    badge={subtitle || "Investment Tiers"}
                    title={title || "Neural Access"}
                />

                <PremiumGrid columns={3}>
                    {tiers?.map((tier: any, i: number) => (
                        <GlassCard 
                            key={i}
                            className={cn(
                                "flex flex-col group",
                                tier.highlight && "border-indigo-600/30 bg-indigo-50/10"
                            )}
                        >
                            {tier.highlight && (
                                <div className="absolute top-8 right-8">
                                    <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 italic rounded-full">
                                        Most Strategic
                                    </span>
                                </div>
                            )}

                            <div className="mb-12">
                                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                    {getIcon(tier.icon)}
                                </div>
                                <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2">{tier.name}</h3>
                                <p className="text-slate-500 text-sm font-medium italic">{tier.description}</p>
                            </div>

                            <div className="mb-12">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black italic tracking-tighter uppercase">{tier.price}</span>
                                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest italic">{tier.frequency}</span>
                                </div>
                            </div>

                            <div className="space-y-6 mb-16 flex-1">
                                {tier.features?.map((f: string, j: number) => (
                                    <div key={j} className="flex items-center gap-4 group/item">
                                        <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 group-hover/item:bg-indigo-600 transition-colors">
                                            <Check className="w-3 h-3 text-indigo-600 group-hover/item:text-white" />
                                        </div>
                                        <span className="text-slate-600 text-sm font-medium italic group-hover/item:text-indigo-600 transition-colors">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href={tier.button_link || "/contact"}>
                                <PremiumButton 
                                    variant={tier.highlight ? "primary" : "outline"} 
                                    size="lg" 
                                    fullWidth
                                >
                                    {tier.button_text || "INITIATE ACCESS"}
                                </PremiumButton>
                            </Link>
                        </GlassCard>
                    ))}
                </PremiumGrid>
            </div>
        </section>
    );
}

import { cn } from "@/lib/utils";
