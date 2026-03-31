"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PortfolioItem {
    id: string | number;
    title: string;
    category: string;
    image: string;
    aiAssisted: boolean;
}

interface PortfolioCardProps {
    item: PortfolioItem;
    onClick?: () => void;
}

export function PortfolioCard({ item, onClick }: PortfolioCardProps) {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -10 }}
            className="group/card block mb-8 break-inside-avoid relative cursor-pointer perspective-[1000px]"
        >
            <motion.div 
                animate={{ 
                    rotateX: isHovered ? (mousePos.y - 150) / 20 : 0,
                    rotateY: isHovered ? (mousePos.x - 150) / -20 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl glass-card transform-gpu"
            >
                {/* Image with Parallax-ish Zoom */}
                <div className="relative overflow-hidden aspect-[4/5]">
                    <motion.img
                        src={item.image}
                        alt={item.title}
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Glow Reveal Effect */}
                    <div 
                        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
                        }}
                    />
                </div>

                {/* AI Badge */}
                {item.aiAssisted && (
                    <div className="absolute top-5 left-5 z-20">
                        <Badge variant="secondary" className="bg-indigo-500/20 backdrop-blur-xl text-indigo-300 border-indigo-500/30 shadow-2xl gap-2 px-3 py-1 text-[10px] uppercase font-black tracking-widest">
                            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> AI Enhanced
                        </Badge>
                    </div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                     <div className="flex justify-between items-end gap-4 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white tracking-tight leading-none">{item.title}</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400/80">{item.category}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-white backdrop-blur-xl group-hover/card:bg-indigo-500 group-hover/card:text-white transition-all duration-300">
                            <ArrowUpRight className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
