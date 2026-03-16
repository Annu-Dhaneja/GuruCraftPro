"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
    "All Resources",
    "Design Tutorials",
    "AI & Design",
    "Branding",
    "UI/UX",
    "Free Assets",
];

export function CategoryTabs() {
    const [activeTab, setActiveTab] = useState("All Resources");

    return (
        <div className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-md border-b border-border transition-all">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar mask-gradient-right py-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={cn(
                                "whitespace-nowrap pb-1 font-medium text-sm transition-colors relative",
                                activeTab === cat
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {cat}
                            {activeTab === cat && (
                                <div className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-indigo-500" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
