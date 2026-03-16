"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const defaultPosts = [
    {
        id: "future-of-ai",
        title: "The Creative Synergy: AI + Human Design",
        excerpt: "Why the best future for creatives isn't fearing AI, but mastering it as a collaborator.",
        date: "Jan 12, 2026",
        category: "Industry Trends",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "typography-2026",
        title: "Kinetic Typography: Moving Beyond Static Text",
        excerpt: "Motion is the new bold. How animated type is taking over web and brand identity.",
        date: "Jan 05, 2026",
        category: "Typography",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1558655146-aec8b3b4ee91?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "case-study-neobank",
        title: "Case Study: Identity for a Gen-Z Neobank",
        excerpt: "Deconstructing our process for 'Flux', from neon color palettes to accessible UI components.",
        date: "Dec 20, 2025",
        category: "Case Study",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
    },
];

export function BlogPreview({ data }: { data?: any }) {
    const badgeText = data?.badge_text || "Insights";
    const title = data?.title || "Latest thinking.";
    const buttonText = data?.button_text || "Read Marketing Blog";
    const buttonLink = data?.button_link || "/blog";
    const posts = data?.posts || defaultPosts;

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <Badge variant="outline" className="mb-4">{badgeText}</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            {title}
                        </h2>
                    </div>
                    <Button variant="ghost" className="hidden md:flex gap-2" asChild>
                        <Link href={buttonLink}>
                            {buttonText} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className="group block h-full">
                            <article className="flex flex-col h-full bg-background rounded-2xl border border-border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="aspect-[16/9] w-full relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white/90 text-black backdrop-blur hover:bg-white">{post.category}</Badge>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                        <Calendar className="h-3 w-3" /> {post.date}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm font-medium pt-4 border-t border-border">
                                        <span>{post.readTime}</span>
                                        <span className="group-hover:translate-x-1 transition-transform">Read Article →</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 md:hidden">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/blog">View All Articles</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
