"use client";

import { motion } from "framer-motion";
import { MessageSquare, Wand2, Download, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
    title: string;
    description: string;
}

interface HowItWorksProps {
    data: {
        title: string;
        subtitle: string;
        steps: Step[];
    };
}

export function HowItWorks({ data }: HowItWorksProps) {
    if (!data) return null;
    
    const icons = [MessageSquare, Wand2, Download];
    const colors = [
        "bg-blue-500/10 text-blue-500 border-blue-500/20",
        "bg-purple-500/10 text-purple-500 border-purple-500/20",
        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    ];

    const steps = data.steps.map((step, i) => ({
        ...step,
        icon: icons[i % icons.length],
        color: colors[i % colors.length]
    }));

    return (
        <section className="py-48 bg-zinc-950 relative overflow-hidden border-y border-white/5">
            {/* Cinematic Background */}
            <div className="absolute inset-0 neural-mesh opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[180px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-5xl mx-auto mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 backdrop-blur-xl mb-10"
                    >
                        <Sparkles className="h-4 w-4" />
                        AESTHETIC STRATEGY
                    </motion.div>
                    <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter mb-10 leading-[0.8] text-white uppercase italic text-shimmer">
                        {data.title}
                    </h2>
                    <p className="text-2xl text-zinc-500 font-light italic leading-relaxed max-w-2xl mx-auto border-x border-white/5 px-10 py-6">
                        {data.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group relative flex flex-col items-center text-center glass-card p-16 rounded-[4rem] border border-white/5 hover:border-indigo-500/20 transition-all duration-700"
                        >
                            <div className="shimmer-sweep absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
                            
                            <div
                                className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${step.color} shadow-2xl relative z-10`}
                            >
                                {step.icon && <step.icon className="w-10 h-10" />}
                            </div>
                            
                            <h3 className="text-3xl font-black mb-6 text-white tracking-tight uppercase italic relative z-10 group-hover:text-indigo-400 transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-zinc-500 leading-relaxed text-lg font-light italic relative z-10">
                                {step.description}
                            </p>

                            {/* Large Step ID */}
                            <span className="absolute top-10 right-10 text-white/5 font-black text-6xl italic group-hover:text-indigo-500/10 transition-colors pointer-events-none uppercase">0{index + 1}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 flex justify-center"
                >
                    <Button size="lg" className="h-24 px-20 text-2xl bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[2rem] font-black shadow-2xl transition-all uppercase italic">
                        The Master Plan <ArrowRight className="ml-4 h-8 w-8" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
