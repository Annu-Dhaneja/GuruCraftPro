"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ServicesHero({ data }: { data?: any }) {
    return (
        <section className="pt-32 pb-20 bg-background relative overflow-hidden text-center">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl mx-auto"
                >
                    {data?.title || "Design services powered by AI, perfected by human creativity."}
                </motion.h1>
 
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    {data?.description || "Whether you need instant AI-generated visuals or fully custom designs, Gurucraftpro delivers quality, clarity, and creativity for every stage of your business."}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button size="lg" className="rounded-full h-12 px-8 bg-foreground text-background hover:bg-foreground/90" asChild>
                        <Link href="/request">
                            Request Custom Design
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-12 px-8" asChild>
                        <Link href="/ai-lab">
                            <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
                            Try AI Design
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Background Gradient */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background -z-10" />
        </section>
    );
}
