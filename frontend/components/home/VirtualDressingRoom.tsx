"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function VirtualDressingRoom({ data }: { data?: any }) {
    const title = data?.title || "Virtual Dressing Room";
    const description = data?.description || "Upload your photo and try on outfits virtually. Our AI stylist analyzes the fit, color compatibility, and overall look.";
    const imageUrl = data?.image || "/virtualtry.jpeg";
    const buttonText = data?.button_text || "Try It Now";
    const buttonLink = data?.button_link || "/ai-lab/virtual-try-on";
    const badgeText = data?.badge_text || "AI-Powered Feature";

    return (
        <section className="py-48 md:py-64 relative overflow-hidden bg-zinc-950 border-b border-white/5">
            {/* Background Mesh/Glow */}
            <div className="absolute inset-0 z-0 text-white">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full neural-mesh opacity-10 pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-28"
                >
                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-6 py-2.5 mb-10 backdrop-blur-md">
                        <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.4em] text-indigo-400 uppercase">{badgeText}</span>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 text-white leading-[0.85] uppercase italic text-shimmer">
                        {title}
                    </h2>
                    <p className="text-2xl text-zinc-500 font-light italic leading-relaxed max-w-3xl mx-auto border-x border-white/5 px-10 py-4">
                        {description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative max-w-6xl mx-auto group"
                >
                    {/* Main Image Container with Elite Glow */}
                    <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.1)] transition-all duration-700 group-hover:border-white/20">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={1280}
                            height={720}
                            className="w-full h-auto transition-transform duration-[3000ms] group-hover:scale-105"
                            priority
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                        {/* CTA at center-bottom */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20">
                            <Link href={buttonLink}>
                                <Button size="lg" className="h-24 px-16 text-2xl bg-white text-black hover:bg-zinc-200 rounded-[2rem] font-black shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all hover:scale-105 group/btn">
                                    {buttonText} <ArrowRight className="ml-3 h-8 w-8 group-hover/btn:translate-x-3 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Elite Decorative Elements */}
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-[100px] -z-10 animate-pulse" />
                    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />
                </motion.div>
            </div>
        </section>
    );
}
