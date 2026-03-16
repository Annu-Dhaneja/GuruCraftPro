"use client";

import { PlayCircle } from "lucide-react";

const tutorials = [
    { title: "Figma 101: Auto-Layout Mastery", category: "UI/UX", duration: "12 mins" },
    { title: "Midjourney V6: Style Reference Guide", category: "AI & Design", duration: "8 mins" },
    { title: "Creating a Brand Pattern Library", category: "Branding", duration: "15 mins" },
    { title: "Typography Hierarchies Explained", category: "UI/UX", duration: "10 mins" },
];

export function TutorialList() {
    return (
        <section className="py-12 container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Latest Tutorials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tutorials.map((item) => (
                    <div key={item.title} className="group rounded-xl border border-border bg-card p-4 hover:shadow-lg transition-all cursor-pointer">
                        <div className="aspect-video rounded-lg bg-muted relative flex items-center justify-center mb-4 overflow-hidden">
                            <PlayCircle className="h-10 w-10 text-muted-foreground group-hover:text-indigo-500 group-hover:scale-110 transition-all" />
                            <div className="absolute inset-0 bg-transparent group-hover:bg-indigo-500/10 transition-colors" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                <span>{item.category}</span>
                                <span>{item.duration}</span>
                            </div>
                            <h3 className="font-semibold text-sm leading-snug group-hover:text-indigo-500 transition-colors">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
