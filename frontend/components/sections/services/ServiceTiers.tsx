"use client";

import { Check, Sparkles, User, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function ServiceTiers({ data }: { data?: any[] }) {
    const list = data || [
        { name: "AI Design", badge: "Fast & Efficient", description: "Ideal for early-stage startups and budget-conscious users who need fast ideas.", features: ["Text prompt → AI-generated designs", "Multiple variations instantly"], icon: "Sparkles", image: "/images/content/ai_design_services.png" },
    ];

    const IconMap: any = { Sparkles, User, PenTool };

    return (
        <div className="space-y-24 py-24 container mx-auto px-4 md:px-6">
            {list.map((tier: any, index: number) => {
                const isEven = index % 2 === 0;
                const Icon = IconMap[tier.icon] || Sparkles;

                return (
                    <section key={tier.name} className="grid md:grid-cols-2 gap-12 items-center">
                        <div className={isEven ? "order-2 md:order-1" : "order-2"}>
                            <Badge variant="outline" className={`mb-4 ${isEven ? 'text-indigo-500 border-indigo-200 bg-indigo-50' : 'text-purple-500 border-purple-200 bg-purple-50'}`}>
                                {tier.badge}
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">{tier.name}</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                {tier.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {tier.features?.map((item: string) => (
                                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                                        <Check className={`h-5 w-5 shrink-0 ${isEven ? 'text-indigo-500' : 'text-purple-500'}`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Button size="lg" className="rounded-full bg-foreground text-background" asChild>
                                <Link href={tier.button_href || "/request"}>
                                    {tier.button_text || "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className={`${isEven ? "order-1 md:order-2" : "order-1"} rounded-3xl overflow-hidden aspect-square relative box-shadow-xl border border-border/50`}>
                            <img src={tier.image} alt={tier.name} className="absolute inset-0 w-full h-full object-cover" />
                            {tier.popular && (
                                <div className="absolute top-0 right-0 p-6 z-10">
                                    <Badge className="bg-white text-indigo-600 hover:bg-white/90 shadow-lg px-4 py-1.5 text-sm">Most Popular</Badge>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-purple-900/10 mix-blend-multiply" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Icon className="h-24 w-24 text-white/50 animate-pulse" />
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
