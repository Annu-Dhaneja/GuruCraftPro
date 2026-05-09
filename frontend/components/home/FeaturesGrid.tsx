"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Globe, Cpu, Layers } from "lucide-react";

const features = [
    {
        title: "AI-Powered Precision",
        description: "Our proprietary neural networks ensure pixel-perfect accuracy in every design iteration.",
        icon: Cpu,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
    },
    {
        title: "Lightning Fast Delivery",
        description: "From concept to final asset in under 24 hours without compromising quality.",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        title: "Secure & Private",
        description: "Your data and designs are protected by enterprise-grade encryption and privacy standards.",
        icon: Shield,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "Global Scalability",
        description: "Easily scale your brand assets across multiple languages and markets instantly.",
        icon: Globe,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Creative Mastery",
        description: "A perfect blend of artificial intelligence and human artistic vision.",
        icon: Sparkles,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Multi-Layered Design",
        description: "Sophisticated layouts that maintain depth and clarity across all platforms.",
        icon: Layers,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    },
];

export function FeaturesGrid() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="container px-4 md:px-8 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-indigo-400 mb-4 tracking-wider uppercase"
                    >
                        <span>Capabilities</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Creative Excellence</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 leading-relaxed"
                    >
                        We combine the world's most advanced AI models with elite human design expertise to deliver results that were previously impossible.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 group hover:border-indigo-500/30 transition-all duration-500"
                        >
                            <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
