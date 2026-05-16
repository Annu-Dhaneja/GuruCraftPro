"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, RefreshCw, Send, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AILabPreview({ data }: { data?: any }) {
    const title_prefix = data?.title_prefix || "Visualize your ideas";
    const title_highlight = data?.title_highlight || "instantly.";
    const description = data?.description || "Don't wait days for a concept. Our AI-powered lab generates moodboards, logos, and layouts in seconds. Use it to brainstorm or reach the final design faster.";
    const primary_button_text = data?.primary_button_text || "Try AI Generator";
    const primary_button_link = data?.primary_button_link || "/ai-lab";
    const secondary_button_text = data?.secondary_button_text || "View Gallery";
    const secondary_button_link = data?.secondary_button_link || "/portfolio";

    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);
        // Simulate generation
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <section className="py-48 md:py-64 bg-zinc-950 relative overflow-hidden border-b border-white/5">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-full h-full bg-indigo-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-full h-full bg-purple-500/10 blur-[150px] rounded-full" />
                <div className="absolute inset-0 neural-mesh opacity-10" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    {/* Text Content */}
                    <div className="flex flex-col gap-10 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-4">
                            <Wand2 className="h-6 w-6 text-indigo-400 animate-pulse" />
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Elite Design Lab</span>
                        </div>
                        <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white uppercase italic text-shimmer">
                            {title_prefix} <br />
                            <span className="drop-shadow-[0_0_50px_rgba(139,92,246,0.3)]">
                                {title_highlight}
                            </span>
                        </h2>
                        <p className="text-2xl text-zinc-500 font-light italic leading-relaxed max-w-2xl border-x border-white/5 px-10 py-4">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-10 mt-6">
                            <Button size="lg" asChild className="h-24 px-16 text-2xl bg-white text-zinc-950 hover:bg-indigo-600 hover:text-white rounded-[2rem] font-black shadow-2xl transition-all uppercase italic">
                                <Link href={primary_button_link}>{primary_button_text}</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="h-24 px-12 text-2xl border-white/10 text-white hover:bg-white/5 rounded-[2rem] font-black transition-all uppercase italic">
                                <Link href={secondary_button_link}>{secondary_button_text}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Futuristic Interface Mockup */}
                    <div className="order-1 lg:order-2 perspective-3000">
                        <motion.div
                            initial={{ rotateY: -15, rotateX: 10 }}
                            whileInView={{ rotateY: -5, rotateX: 5 }}
                            whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="bg-black/40 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] p-12 relative z-10 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:rounded-[3rem] before:pointer-events-none"
                        >
                            {/* Interface Header */}
                            <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                                <div className="font-black text-xl flex items-center gap-3 text-white tracking-tight">
                                    <div className="h-4 w-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                    NEURAL INTERFACE 01
                                </div>
                                <Button variant="ghost" size="icon" className="h-12 w-12 text-zinc-500 hover:text-white transition-colors">
                                    <RefreshCw className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Input Area */}
                            <div className="flex gap-4 mb-12">
                                <div className="relative flex-1">
                                    <Input
                                        placeholder="Enter design prompt..."
                                        className="pr-14 h-20 bg-white/5 border-white/10 rounded-2xl text-xl text-white placeholder:text-zinc-600 focus:border-indigo-500/50 transition-all font-light"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                    <Wand2 className="absolute right-6 top-7 h-6 w-6 text-zinc-500" />
                                </div>
                                <Button size="icon" className="h-20 w-20 shrink-0 bg-white text-black hover:bg-zinc-200 rounded-2xl shadow-xl transition-all" onClick={handleGenerate}>
                                    <Send className="h-8 w-8" />
                                </Button>
                            </div>

                            {/* Image Grid / Result Area */}
                            <div className="grid grid-cols-2 gap-6 bg-black/40 rounded-3xl p-6 border border-white/5 relative group/grid">
                                {isGenerating ? (
                                    <div className="col-span-2 flex flex-col items-center justify-center h-80">
                                        <div className="h-16 w-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6" />
                                        <span className="text-xl font-black text-indigo-400 animate-pulse tracking-widest uppercase">Analyzing Prompt</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="rounded-2xl overflow-hidden aspect-square border border-white/5 transition-all duration-700 hover:scale-105 hover:border-indigo-500/50">
                                            <img src="/images/user_provided/generated-image-2026-02-23_14-29-24 (1).jpg" alt="Mock 1" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="rounded-2xl overflow-hidden aspect-square border border-white/5 transition-all duration-700 hover:scale-105 hover:border-indigo-500/50">
                                            <img src="/images/user_provided/generated-image-2026-02-23_14-29-22.jpg" alt="Mock 2" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="rounded-2xl overflow-hidden aspect-square border border-white/5 transition-all duration-700 hover:scale-105 hover:border-indigo-500/50">
                                            <img src="/images/user_provided/generated-image-2026-02-24_10-15-40 (2).jpg" alt="Mock 3" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="rounded-2xl overflow-hidden aspect-square border border-white/5 transition-all duration-700 hover:scale-105 hover:border-indigo-500/50">
                                            <img src="/images/user_provided/generated-image-2026-02-23_14-29-18.jpg" alt="Mock 4" className="w-full h-full object-cover" />
                                        </div>
                                    </>
                                )}
                                
                                {/* Futuristic Grid Overlay */}
                                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
