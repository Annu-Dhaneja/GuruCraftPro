"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const defaultCategories = [
    {
        title: "Presentation",
        image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=200", // Placeholder
        color: "bg-[#ffe4d6]", // Pastel Orange
        textColor: "text-orange-900",
        href: "/portfolio/presentation"
    },
    {
        title: "Poster",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200",
        color: "bg-[#e0d6ff]", // Pastel Purple
        textColor: "text-purple-900",
        href: "/portfolio/poster"
    },
    {
        title: "Resume",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=200",
        color: "bg-[#e6ddff]",
        textColor: "text-indigo-900",
        href: "/portfolio/resume"
    },
    {
        title: "Email",
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=200",
        color: "bg-[#d6e4ff]", // Pastel Blue
        textColor: "text-blue-900",
        href: "/portfolio/email"
    },
    {
        title: "Logo",
        image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=200",
        color: "bg-[#fff8d6]", // Pastel Yellow
        textColor: "text-yellow-900",
        href: "/portfolio/logo"
    },
    {
        title: "Flyer",
        image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=200",
        color: "bg-[#f3d6ff]", // Pastel Pink/Purple
        textColor: "text-pink-900",
        href: "/portfolio/flyer"
    },
    {
        title: "Brochure",
        image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=200",
        color: "bg-[#ffeab6]", // Pastel Gold
        textColor: "text-amber-900",
        href: "/portfolio/brochure"
    },
    {
        title: "Instagram",
        image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&q=80&w=200", // Actual Instagram related image or abstract
        color: "bg-[#ffd6e0]", // Pastel Red
        textColor: "text-red-900",
        href: "/portfolio/instagram"
    }
];

export function ServiceCategoryRail({ data }: { data?: any }) {
    const title = data?.title || "Explore templates";
    const categories = (data?.categories || defaultCategories).map((cat: any) => ({
        ...cat,
        // Safeguard: If image is a massive base64 string, we might want to handle it 
        // but for now just ensures it exists.
        image: cat.image || "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=200",
        href: cat.href || "/portfolio",
        color: cat.color || "bg-indigo-100",
        textColor: cat.textColor || "text-indigo-900"
    }));

    return (
        <section className="w-full py-20 bg-slate-950 overflow-hidden relative">
            <div className="container px-4 md:px-6 mb-12">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">{title}</h2>
            </div>

            <div className="w-full relative">
                <div className="flex w-full overflow-hidden" 
                     style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
                    {/* Two copies of the list for seamless looping */}
                    <motion.div
                        className="flex gap-8 px-4 min-w-max"
                        animate={{ x: "-50%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 35, // Slower for premium feel
                            repeatType: "loop"
                        }}
                    >
                        {[...categories, ...categories].map((cat: any, index: number) => (
                            <Link
                                key={`${cat.title}-${index}`}
                                href={cat.href}
                                className={cn(
                                    "relative overflow-hidden rounded-[2rem] w-[320px] h-[160px] flex items-center justify-between p-8 transition-all hover:scale-105 hover:bg-white/5 border border-white/5 group bg-slate-900/50 backdrop-blur-sm shadow-xl"
                                )}
                            >
                                {/* Text */}
                                <div className="z-10">
                                    <span className="font-black text-2xl text-white tracking-tight uppercase">
                                        {cat.title}
                                    </span>
                                    <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 mt-2" />
                                </div>

                                {/* Image Visual */}
                                <div className="w-[120px] h-[120px] absolute -right-4 -bottom-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 opacity-40 group-hover:opacity-80">
                                    <img 
                                        src={cat.image} 
                                        alt="" 
                                        className="w-full h-full object-cover rounded-2xl shadow-2xl" 
                                        onError={(e: any) => {
                                            e.target.src = "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=200";
                                        }}
                                    />
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
