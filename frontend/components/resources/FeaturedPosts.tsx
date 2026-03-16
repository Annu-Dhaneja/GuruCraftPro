"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featured = [
    {
        title: "Mastering AI Prompts for Logo Design",
        desc: "Learn the exact keywords and structure to generate professional logo concepts in seconds.",
        category: "AI & Design",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    },
    {
        title: "The Ultimate Guide to Minimalist Branding",
        desc: "Why less is more, and how to strip away the noise to build a timeless brand identity.",
        category: "Branding",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1493421419110-74f4e70ba12b?q=80&w=1000&auto=format&fit=crop",
    },
    {
        title: "Typography Trends 2024",
        desc: "From massive serifs to kinetic type, explore the fonts that are defining this year's visual landscape.",
        category: "Typography",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    }
];

export function FeaturedPosts() {
    return (
        <section className="py-16 container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featured.map((post) => (
                    <div key={post.title} className="group cursor-pointer">
                        <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-white/90 text-black backdrop-blur-md hover:bg-white">{post.category}</Badge>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-500 transition-colors leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                {post.desc}
                            </p>
                            <Button variant="link" className="p-0 h-auto group-hover:translate-x-1 transition-transform">
                                Read Article <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
