"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/shared/UI";

interface PortfolioItem {
    id: string | number;
    title: string;
    category: string;
    image: string;
    ai_assisted?: boolean;
    slug?: string;
}

export function PortfolioCard({ item, onClick }: { item: PortfolioItem, onClick?: () => void }) {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const projectSlug = item.slug || String(item.id).toLowerCase().replace(/ /g, "-");

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <Link href={`/portfolio/${projectSlug}`} onClick={handleClick} className="block h-full">
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -12 }}
                className="group/card block h-full break-inside-avoid relative cursor-pointer perspective-[1500px]"
            >
                <motion.div 
                    animate={{ 
                        rotateX: isHovered ? (mousePos.y - 200) / 30 : 0,
                        rotateY: isHovered ? (mousePos.x - 200) / -30 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative h-full rounded-[3rem] overflow-hidden bg-slate-900 border border-slate-100 shadow-2xl transform-gpu h-full flex flex-col"
                >
                    {/* Image Layer */}
                    <div className="relative overflow-hidden aspect-[4/5] w-full">
                        <motion.img
                            src={item.image}
                            alt={item.title}
                            animate={{ scale: isHovered ? 1.15 : 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-1000"
                        />
                        
                        {/* Glow Reveal */}
                        <div 
                            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.25), transparent 60%)`
                            }}
                        />
                    </div>

                    {/* AI Badge */}
                    {item.ai_assisted && (
                        <div className="absolute top-6 left-6 z-20">
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 rounded-full text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/40 italic">
                                <Sparkles className="h-3 w-3 animate-pulse" /> AI Enhanced
                            </div>
                        </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-20 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                        <div className="flex justify-between items-end gap-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-700 ease-out">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{item.title}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic">{item.category}</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-white backdrop-blur-xl group-hover/card:bg-indigo-600 group-hover/card:text-white transition-all duration-500 shadow-2xl">
                                <ArrowUpRight className="h-7 w-7" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    );
}
