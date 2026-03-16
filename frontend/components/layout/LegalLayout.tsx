"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/footer/Footer";

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 max-w-4xl flex-grow relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                        {title}
                    </h1>
                    <p className="text-lg text-muted-foreground uppercase tracking-widest font-medium">
                        Last Updated: {lastUpdated}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight 
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-foreground
                        p-8 md:p-12 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-2xl"
                >
                    {children}
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
