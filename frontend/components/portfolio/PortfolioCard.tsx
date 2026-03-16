"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    return (
        <div
            onClick={onClick}
            className="group/card block mb-6 break-inside-avoid relative cursor-pointer"
        >
            <div className="relative rounded-xl overflow-hidden bg-muted transform-gpu">
                {/* Image */}
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover/card:scale-105 transform-gpu"
                />

                {/* AI Badge */}
                {item.aiAssisted && (
                    <div className="absolute top-3 left-3 z-10">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-indigo-600 shadow-sm gap-1 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                            <Sparkles className="h-3 w-3" /> AI-Assisted
                        </Badge>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white text-black px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                        View Project <ArrowUpRight className="h-4 w-4" />
                    </div>
                </div>
            </div>

            {/* Meta (Below Image) */}
            <div className="mt-3">
                <h3 className="font-bold text-lg leading-tight group-hover:text-indigo-500 transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
        </div>
    );
}
