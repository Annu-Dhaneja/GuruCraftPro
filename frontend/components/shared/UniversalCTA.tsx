"use client";

import { motion } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PremiumButton } from "./UI";

interface CTAProps {
    data: {
        title?: string;
        headline?: string;
        description?: string;
        subtext?: string;
        button_text?: string;
        cta_text?: string;
        button_href?: string;
        cta_href?: string;
        link?: string;
    };
    className?: string;
}

export function UniversalCTA({ data, className }: CTAProps) {
    if (!data) return null;

    const title = data.title || data.headline || "READY FOR ASCENSION?";
    const desc = data.description || data.subtext;
    const btnText = data.button_text || data.cta_text || "INQUIRE NOW";
    const btnHref = data.button_href || data.cta_href || data.link || "/contact";

    return (
        <section className={cn("py-24 md:py-48 text-center container relative overflow-hidden", className)}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/5 blur-[250px] rounded-full pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-6 relative z-10"
            >
                <div className="flex justify-center mb-16">
                    <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center animate-pulse shadow-xl">
                        <Zap className="w-10 h-10 text-indigo-600" />
                    </div>
                </div>

                <h2 className="text-5xl md:text-[8rem] lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase italic mb-10 text-slate-900">
                    {title}
                </h2>

                {desc && (
                    <div 
                        className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-20 italic font-light" 
                        dangerouslySetInnerHTML={{ __html: desc }} 
                    />
                )}
                
                <div className="flex justify-center">
                    <Link href={btnHref}>
                        <PremiumButton 
                            size="xl" 
                            className="bg-indigo-600 text-white hover:bg-slate-900"
                            icon={<ChevronRight className="w-8 h-8" />}
                            iconPosition="right"
                        >
                            {btnText}
                        </PremiumButton>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
