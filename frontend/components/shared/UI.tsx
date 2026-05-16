"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Export all premium components
export * from "./PremiumUI";

interface SectionHeadingProps {
    badge?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
    dark?: boolean;
}

export function SectionHeading({ 
    badge, 
    title, 
    description, 
    align = "left", 
    className,
    dark = false
}: SectionHeadingProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "mb-12 md:mb-20",
                align === "center" && "text-center",
                className
            )}
        >
            {badge && (
                <div className={cn(
                    "flex items-center gap-4 mb-6",
                    align === "center" && "justify-center"
                )}>
                    {align === "left" && <div className={cn("h-[1px] w-12", dark ? "bg-white/30" : "bg-indigo-600")} />}
                    <span className={cn(
                        "font-black text-[10px] md:text-xs tracking-[0.6em] uppercase italic",
                        dark ? "text-white" : "text-indigo-600"
                    )}>
                        {badge}
                    </span>
                    {align === "center" && <div className={cn("h-[1px] w-12", dark ? "bg-white/30" : "bg-indigo-600")} />}
                </div>
            )}
            
            <h2 className={cn(
                "text-4xl md:text-6xl lg:text-8xl font-black leading-[0.85] tracking-tighter uppercase italic mb-6",
                dark ? "text-white" : "text-slate-900"
            )}>
                {title}
            </h2>
            
            {description && (
                <div 
                    className={cn(
                        "text-lg md:text-xl font-light italic max-w-2xl",
                        dark ? "text-white/60" : "text-slate-500",
                        align === "center" && "mx-auto"
                    )}
                    dangerouslySetInnerHTML={{ __html: description }} 
                />
            )}
        </motion.div>
    );
}

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverGlow?: boolean;
    noPadding?: boolean;
}

export function GlassCard({ children, className, hoverGlow = true, noPadding = false }: GlassCardProps) {
    return (
        <div className={cn(
            "glass-card relative overflow-hidden",
            !noPadding && "p-8 md:p-12",
            hoverGlow && "neon-border-glow shimmer-sweep",
            className
        )}>
            {children}
        </div>
    );
}

// ── NEW: PREMIUM GRID ───────────────────────────────────────────────

export function PremiumGrid({ children, columns = 3, className }: { children: React.ReactNode, columns?: 1 | 2 | 3 | 4, className?: string }) {
    const colMap = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    };

    return (
        <div className={cn(
            "grid gap-8 md:gap-12",
            colMap[columns],
            className
        )}>
            {children}
        </div>
    );
}
