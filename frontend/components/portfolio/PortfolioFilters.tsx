"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function PortfolioFilters({ categories: customCategories }: { categories?: string[] }) {
    const categories = customCategories || ["All", "Logo Design", "Banner Design", "Thumbnail", "T-Shirt Design", "Mug Design", "Wedding Card", "Book Design", "Resume Design", "7 DAY CLOTHS", "WEDDING PLAN", "GURU JI ART", "PHOTO EDITOR", "GAME DESIGN", "VANTAGE ECOM"];
    const styles = ["Minimal", "Modern", "Bold", "Luxury", "Playful", "Digital Art", "Streetwear", "Professional"];
    const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = usePortfolioStore();
    const [showFilters, setShowFilters] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat && categories.includes(cat)) {
            setActiveCategory(cat);
        }
    }, [searchParams, categories, setActiveCategory]);

    return (
        <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border transition-all">
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Categories (Desktop) */}
                    <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient-right flex-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                                    activeCategory === cat
                                        ? "bg-foreground text-background"
                                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Category Dropdown / Search */}
                    <div className="flex w-full md:w-auto items-center gap-2">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search projects..."
                                className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className={cn("shrink-0", showFilters && "bg-muted")}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Advanced Filters Drawer */}
                {showFilters && (
                    <div className="pt-6 pb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-in slide-in-from-top-2 fade-in duration-200">
                        <div>
                            <h4 className="text-sm font-semibold mb-3">Style</h4>
                            <div className="flex flex-wrap gap-2">
                                {styles.map(style => (
                                    <Badge key={style} variant="outline" className="cursor-pointer hover:bg-muted">{style}</Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-3">Industry</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Fintech", "Fashion", "Tech", "Food", "Health"].map(ind => (
                                    <Badge key={ind} variant="outline" className="cursor-pointer hover:bg-muted">{ind}</Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-3">Tools</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Figma", "Adobe AI", "Midjourney", "Photoshop"].map(tool => (
                                    <Badge key={tool} variant="outline" className="cursor-pointer hover:bg-muted">{tool}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-end justify-end">
                            <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm">Reset All</Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
