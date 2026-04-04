"use client";

import { motion } from "framer-motion";
import { MessageSquare, Wand2, Download, ArrowRight } from "lucide-react";
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
    
    // Map icons manually since they are not in JSON
    const icons = [MessageSquare, Wand2, Download];
    const colors = [
        "bg-blue-500/10 text-blue-500",
        "bg-purple-500/10 text-purple-500",
        "bg-green-500/10 text-green-500"
    ];

    const steps = data.steps.map((step, i) => ({
        ...step,
        icon: icons[i % icons.length],
        color: colors[i % colors.length]
    }));

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Decorative background line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-12 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">
                        {data.title}
                    </h2>
                    <p className="text-slate-400 text-xl md:text-2xl font-light">
                        {data.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative flex flex-col items-center text-center glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all shine-effect"
                        >
                            <div
                                className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 ${step.color} shadow-lg transition-transform group-hover:scale-110 duration-500`}
                            >
                                {step.icon && <step.icon className="w-10 h-10" />}
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white tracking-tight">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-lg font-light">
                                {step.description}
                            </p>

                            {/* Connector line for mobile (vertical) */}
                            {index !== steps.length - 1 && (
                                <div className="md:hidden absolute bottom-[-2.5rem] left-1/2 w-6 h-6 border-r-2 border-b-2 border-white/10 -translate-x-1/2 rotate-45" />
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Button size="lg" className="rounded-full">
                        Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
