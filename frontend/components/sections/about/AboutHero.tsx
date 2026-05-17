"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function AboutHero({ data }: { data?: any }) {
    return (
        <section className="pt-32 pb-20 bg-background relative overflow-hidden text-center">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 flex justify-center"
                >
                    <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full border-indigo-500/20 text-indigo-500 bg-indigo-500/5">
                        {data?.badge || "AI-Assisted • Human-Refined • Client-Focused"}
                    </Badge>
                </motion.div>
 
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 max-w-5xl mx-auto leading-tight"
                >
                    {data?.title_prefix || "Where technology meets"} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                        {data?.title_highlight || "thoughtful design"}
                    </span>
                </motion.h1>
 
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    {data?.description || "Gurucraftpro blends AI-powered efficiency with human creativity to craft visuals that truly connect and communicate."}
                </motion.p>
            </div>

            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>
        </section>
    );
}
