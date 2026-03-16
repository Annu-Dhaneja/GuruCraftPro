"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA({ data }: { data?: any }) {
    const title = data?.title || "Ready to bring your ideas to life?";
    const description = data?.description || "Whether you need instant AI inspiration or a complete custom brand overhaul, Gurucraftpro is your partner in creativity.";
    const primaryButtonText = data?.primary_button_text || "Start AI Design";
    const primaryButtonLink = data?.primary_button_link || "/ai-lab";
    const secondaryButtonText = data?.secondary_button_text || "Request Custom Design";
    const secondaryButtonLink = data?.secondary_button_link || "/request";

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 -z-20" />
            <div className="absolute inset-0 bg-black/20 -z-10" />

            {/* Sparkles/Stars Effect could go here */}

            <div className="container mx-auto px-4 md:px-6 text-center text-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        {title}
                    </h2>
                    <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 px-8 text-lg bg-white text-indigo-900 hover:bg-white/90" asChild>
                            <Link href={primaryButtonLink}>
                                <Sparkles className="mr-2 h-5 w-5" />
                                {primaryButtonText}
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white/10 hover:text-white" asChild>
                            <Link href={secondaryButtonLink}>
                                {secondaryButtonText} <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
