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
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        {data.title}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {data.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative flex flex-col items-center text-center bg-card p-6 rounded-2xl border border-transparent hover:border-border transition-colors"
                        >
                            <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${step.color} transition-transform group-hover:scale-110 duration-300`}
                            >
                                {step.icon && <step.icon className="w-8 h-8" />}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>

                            {/* Connector line for mobile (vertical) */}
                            {index !== steps.length - 1 && (
                                <div className="md:hidden absolute bottom-[-2rem] left-1/2 w-px h-8 bg-border -translate-x-1/2" />
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
