"use client";

import React from "react";
import { 
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQ({ props }: { props: any }) {
    const { title, items } = props;

    return (
        <section className="py-40 bg-slate-950/50 backdrop-blur-3xl">
            <div className="container mx-auto px-8 max-w-4xl">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-8">
                        <HelpCircle className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
                        Neural <span className="text-indigo-400">Support</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-light italic">{title || "Frequently requested data points."}</p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {items?.map((item: any, i: number) => (
                        <AccordionItem 
                            key={i} 
                            value={`item-${i}`}
                            className="border-white/5 bg-white/5 rounded-[2rem] px-8 overflow-hidden data-[state=open]:border-indigo-500/30 transition-all"
                        >
                            <AccordionTrigger className="hover:no-underline py-8 text-xl font-black italic uppercase tracking-tight text-left">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="pb-8 text-slate-400 text-lg font-light italic leading-relaxed">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
