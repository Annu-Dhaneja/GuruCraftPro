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
    const categories = data?.categories || defaultCategories;

    return (
        <section className="w-full py-12 border-b bg-background/50 overflow-hidden">
            <div className="container px-4 md:px-6 mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            </div>

            <div className="w-full relative">
                <div className="flex w-full overflow-hidden mask-linear-gradient">
                    {/* Two copies of the list for seamless looping */}
                    <motion.div
                        className="flex gap-4 px-4 min-w-max"
                        animate={{ x: "-50%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20, // Adjust speed here
                            repeatType: "loop"
                        }}
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {[...categories, ...categories].map((cat: any, index: number) => (
                            <Link
                                key={`${cat.title}-${index}`}
                                href={cat.href}
                                className={cn(
                                    "relative overflow-hidden rounded-2xl w-[220px] h-[100px] flex items-center justify-between p-4 transition-transform hover:-translate-y-1 hover:shadow-lg shrink-0",
                                    cat.color
                                )}
                            >
                                {/* Text */}
                                <span className={cn("font-bold text-lg z-10", cat.textColor)}>
                                    {cat.title}
                                </span>

                                {/* Image Visual */}
                                <div className="w-[80px] h-[70px] bg-white/40 rounded-lg shadow-sm rotate-[5deg] translate-x-2 translate-y-2 overflow-hidden flex items-center justify-center">
                                    <img src={cat.image} alt="" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
