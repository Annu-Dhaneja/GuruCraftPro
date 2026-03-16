"use client";

import { motion } from "framer-motion";
import { MousePointerClick, MessageSquare, Paintbrush, CheckCircle2 } from "lucide-react";

const steps = [
    { icon: MousePointerClick, title: "1. Choose Service", desc: "Select AI, Hybrid, or Custom based on your needs." },
    { icon: MessageSquare, title: "2. Share Brief", desc: "Input your prompt or fill out a detailed design brief." },
    { icon: Paintbrush, title: "3. Creation", desc: "AI generates instantly, or Gurucraftpro crafts your unique design." },
    { icon: CheckCircle2, title: "4. Delivery", desc: "Receive final assets, ready for launch." },
];

export function ProcessTimeline({ data }: { data?: any }) {
    const list = data?.steps || steps;
    return (
        <section className="py-24 container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">{data?.title || "How it works"}</h2>
                <p className="text-muted-foreground">{data?.description || "A simple, transparent process from start to finish."}</p>
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">

                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 -z-10" />

                    {list.map((step: any, index: number) => {
                        const Icon = steps[index]?.icon || CheckCircle2;
                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center max-w-[200px] bg-background p-4"
                            >
                                <div className="h-14 w-14 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center mb-6 text-foreground shadow-sm z-10 transition-colors hover:border-primary hover:text-primary">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.desc || step.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
