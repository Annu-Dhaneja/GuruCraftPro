"use client";

import { motion } from "framer-motion";
import { Camera, Heart, Palette, Gamepad2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
    { name: "Photo Editor", slug: "photo-editor", icon: Camera, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
    { name: "Wedding Plan", slug: "wedding-plan", icon: Heart, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" },
    { name: "Guru Ji Art", slug: "guru-ji-art", icon: Palette, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    { name: "Game Design", slug: "game-design", icon: Gamepad2, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
    { name: "Vantage Ecom", slug: "vantage-ecom", icon: ShoppingBag, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" }
];

export function ServiceNavigator() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Explore Specialized Tiers
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        Deep-dive into our dedicated service channels for unique requirements.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.slug}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <Link 
                                href={`/services/${cat.slug}`}
                                className={`group flex flex-col items-center justify-center p-8 rounded-3xl border ${cat.border} ${cat.bg} hover:bg-opacity-20 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 relative overflow-hidden h-full`}
                            >
                                <cat.icon className={`w-10 h-10 ${cat.color} mb-4 group-hover:scale-110 transition-transform`} />
                                <div className="text-sm font-bold text-white uppercase tracking-widest">{cat.name}</div>
                                <div className="mt-4 flex items-center text-[10px] font-bold text-muted-foreground group-hover:text-white transition-colors">
                                    LEARN MORE <ArrowRight className="ml-1 w-3 h-3" />
                                </div>
                                
                                {/* Hover background glow */}
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
