"use client";

import { motion } from "framer-motion";
import { 
    Sparkles, 
    Shirt, 
    Heart, 
    Zap, 
    Palette, 
    Layout, 
    ArrowUpRight,
    Wand2,
    Cpu
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = { Shirt, Heart, Sparkles, Zap, Cpu, Layout, Palette, Wand2 };

interface FeatureItem {
    title: string;
    description: string;
    icon: any;
    href: string;
    className: string;
    accent: string;
    bg: string;
    tags: string[];
}

const ecosystem = [
    {
        title: "AI Wardrobe",
        description: "Intelligent outfit visualization and automated styling recommendations.",
        icon: Shirt,
        href: "/wardrobe",
        className: "lg:col-span-2 lg:row-span-2 bg-indigo-500/5",
        accent: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["Styling", "Visualization"]
    },
    {
        title: "Wedding AI",
        description: "Luxury planning tools powered by intelligent theme generation.",
        icon: Heart,
        href: "/wedding",
        className: "bg-rose-500/5",
        accent: "text-rose-400",
        bg: "bg-rose-400/10",
        tags: ["Planning"]
    },
    {
        title: "Guruji Art",
        description: "A sacred sanctuary for spiritual commerce and divine digital art.",
        icon: Sparkles,
        href: "/services/guru-ji-art",
        className: "bg-purple-500/5",
        accent: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["Spiritual"]
    },
    {
        title: "Vantage Ecom",
        description: "Elite post-production and advanced marketplace asset editing.",
        icon: Zap,
        href: "/services/vantage-ecom",
        className: "bg-cyan-500/5",
        accent: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["Editing"]
    },
    {
        title: "AI Lab",
        description: "Experimental image intelligence and multi-model creative testing.",
        icon: Cpu,
        href: "/ai-lab",
        className: "lg:col-span-2 bg-purple-500/5",
        accent: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["Intelligence"]
    },
    {
        title: "Smart Editor",
        description: "Drag-and-drop canvas with AI-powered design shortcuts.",
        icon: Layout,
        href: "/photo-editor",
        className: "bg-emerald-500/5",
        accent: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["Design"]
    }
];

export function FeaturesGrid({ items }: { items?: any[] }) {
    const displayItems = items || ecosystem;
    
    // Map icons if they are strings from CMS
    const mappedItems = displayItems.map(item => ({
        ...item,
        icon: typeof item.icon === 'string' ? (iconMap[item.icon] || Layout) : item.icon
    }));

    return (
        <section className="relative py-32 overflow-hidden bg-[#020617]">
            <div className="container px-4 md:px-8 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.3em] uppercase text-indigo-400 mb-6"
                        >
                            <span>Ecosystem</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9] text-white"
                        >
                            ENGINEERED FOR <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">UNLIMITED CREATIVITY</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-400 max-w-sm text-lg font-light italic leading-relaxed"
                    >
                        Explore our multi-layered platform designed to bridge the gap between AI intelligence and luxury aesthetics.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
                    {mappedItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "group relative overflow-hidden rounded-[2.5rem] p-8 glass-card border-white/5 hover:border-indigo-500/30 transition-all duration-700",
                                item.className
                            )}
                        >
                            <Link href={item.href} className="flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110", item.bg, item.accent)}>
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <ArrowUpRight className="w-6 h-6 text-white/10 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </div>
                                
                                <div className="mt-auto">
                                    <div className="flex gap-2 mb-3">
                                        {item.tags?.map((tag: string) => (
                                            <span key={tag} className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tight mb-2 group-hover:text-shimmer transition-all">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                            
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
