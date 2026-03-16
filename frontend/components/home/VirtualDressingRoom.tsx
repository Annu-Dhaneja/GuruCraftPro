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
        <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-purple-950/20 via-background to-background">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-400">{badgeText}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                        {title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Main Image Container with Glow */}
                    <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={1200}
                            height={675}
                            className="w-full h-auto"
                            priority
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* CTA at bottom */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                            <Link href={buttonLink}>
                                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30 gap-2 text-white">
                                    {buttonText} <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />
                </motion.div>
            </div>
        </section>
    );
}
