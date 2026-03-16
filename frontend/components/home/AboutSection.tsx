"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSection({ data }: { data?: any }) {
    const title = data?.title || "Design is intelligence made visible.";
    const paragraph1 = data?.paragraph1 || "Hi, I'm Gurucraftpro. I'm a multidisciplinary designer obsessed with the intersection of art and technology.";
    const paragraph2 = data?.paragraph2 || "My philosophy is simple: good design should be invisible. It should work so well that you don't even notice it's there—you just feel it. Whether I'm crafting a brand identity from scratch or using AI to rapidly iterate on concepts, my goal is always the same: clarity, beauty, and impact.";
    const Stat1Value = data?.stat1_value || "5+";
    const Stat1Label = data?.stat1_label || "Years Exp.";
    const Stat2Value = data?.stat2_value || "PS/AI/Figma";
    const Stat2Label = data?.stat2_label || "Core Tools";
    const Stat3Value = data?.stat3_value || "Global";
    const Stat3Label = data?.stat3_label || "Client Base";

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted relative z-10">
                            {/* 
                   Replace with actual photo of Gurucraftpro.
                   Using a placeholder gradient for now.
                */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200" />
                            <div className="absolute inset-0 flex items-center justify-center text-indigo-900/20 font-bold text-4xl">
                                Gurucraftpro
                            </div>
                        </div>
                        {/* Decorative Background Element */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-border rounded-2xl -z-0" />
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight whitespace-pre-line">
                            {title}
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                            <p>{paragraph1}</p>
                            <p>{paragraph2}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/about">
                                    More About Me
                                </Link>
                            </Button>
                            <Button size="lg" variant="ghost" asChild>
                                <Link href="/portfolio">
                                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border mt-4">
                            <div>
                                <div className="font-bold text-xl">{Stat1Value}</div>
                                <div className="text-xs text-muted-foreground uppercase">{Stat1Label}</div>
                            </div>
                            <div>
                                <div className="font-bold text-xl">{Stat2Value}</div>
                                <div className="text-xs text-muted-foreground uppercase">{Stat2Label}</div>
                            </div>
                            <div>
                                <div className="font-bold text-xl">{Stat3Value}</div>
                                <div className="text-xs text-muted-foreground uppercase">{Stat3Label}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
