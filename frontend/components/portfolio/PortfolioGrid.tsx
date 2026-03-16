"use client";

import { useState, useEffect } from "react";
import { PortfolioCard } from "./PortfolioCard";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectModal } from "./ProjectModal";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Mock Data - Updated for New Service Categories
const portfolioItems = [
    {
        id: "logo-modern tech",
        title: "TechFlow Modern Logo",
        category: "Logo Design",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-08 (1).jpg",
        aiAssisted: true,
    },
    {
        id: "wedding-card-elegant",
        title: "Elegant Floral Wedding Invite",
        category: "Wedding Card",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-25 (4).jpg",
        aiAssisted: false,
    },
    {
        id: "apparel-streetwear",
        title: "Urban Street T-Shirt",
        category: "T-Shirt Design",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-25 (6).jpg",
        aiAssisted: true,
    },
    {
        id: "banner-sale",
        title: "Summer Sale Web Banner",
        category: "Banner Design",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-25 (3).jpg",
        aiAssisted: false,
    },
    {
        id: "resume-pro",
        title: "Executive Minimal Resume",
        category: "Resume Design",
        image: "/images/user_provided/generated-image-2026-02-24_08-51-01 (2).jpg",
        aiAssisted: false,
    },
    {
        id: "thumbnail-gaming",
        title: "Epic Gaming Thumbnail",
        category: "Thumbnail",
        image: "/images/user_provided/generated-image-2026-02-24_08-35-13.jpg",
        aiAssisted: true,
    },
    {
        id: "guru-ji-portrait",
        title: "Guru Ji Pendant Art",
        category: "GURU JI ART",
        image: "/images/guru/guru2.png",
        aiAssisted: false,
    },
    {
        id: "vantage-ecom-store",
        title: "Vantage Premium Storefront",
        category: "VANTAGE ECOM",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-23.jpg",
        aiAssisted: false,
    },
    {
        id: "7-day-cloths",
        title: "Weekly Wardrobe Collection",
        category: "7 DAY CLOTHS",
        image: "/images/user_provided/generated-image-2026-02-24_10-15-40 (3).jpg",
        aiAssisted: true,
    },
    {
        id: "game-design-asset",
        title: "Fantasy RPG Assets",
        category: "GAME DESIGN",
        image: "/images/user_provided/generated-image-2026-02-24_10-45-40.jpg",
        aiAssisted: true,
    },
    {
        id: "mug-design-coffee",
        title: "Artisan Coffee Mug",
        category: "Mug Design",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-25 (5).jpg",
        aiAssisted: false,
    },
    {
        id: "book-cover-fantasy",
        title: "Fantasy Novel Cover",
        category: "Book Design",
        image: "/images/user_provided/generated-image-2026-02-24_10-45-46 (1).jpg",
        aiAssisted: true,
    },
    {
        id: "wedding-plan-layout",
        title: "Luxury Wedding Moodboard",
        category: "WEDDING PLAN",
        image: "/images/user_provided/generated-image-2026-02-24_08-51-01 (1).jpg",
        aiAssisted: false,
    },
    {
        id: "photo-editor-retouch",
        title: "High-End Beauty Retouch",
        category: "PHOTO EDITOR",
        image: "/images/user_provided/generated-image-2026-02-24_10-45-44 (1).jpg",
        aiAssisted: false,
    }
];


export function PortfolioGrid({ initialProjects }: { initialProjects?: any[] }) {
    const { activeCategory, searchQuery } = usePortfolioStore();
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchParams = useSearchParams();

    // Initial projects from CMS or fallback to empty
    const portfolioItems = initialProjects || [];

    // Pagination / Load More state
    const [displayCount, setDisplayCount] = useState(6);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Effect to handle direct project linking
    useEffect(() => {
        const projectId = searchParams.get("project");
        if (projectId && portfolioItems.length > 0) {
            const project = portfolioItems.find(p => String(p.id) === projectId);
            if (project) {
                setSelectedProject(project);
                setIsModalOpen(true);
            }
        }
    }, [searchParams, portfolioItems]);

    const filteredItems = portfolioItems.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category.includes(activeCategory) || (activeCategory === "UI/UX" && item.category === "UI / UX");
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const visibleItems = filteredItems.slice(0, displayCount);
    const hasMore = visibleItems.length < filteredItems.length;

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setDisplayCount(prev => prev + 6);
            setIsLoadingMore(false);
        }, 800);
    };

    const handleProjectClick = (item: any) => {
        setSelectedProject(item);
        setIsModalOpen(true);
    };

    return (
        <section className="py-12 container mx-auto px-4 md:px-6">
            <motion.div
                layout
                className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            >
                <AnimatePresence mode="popLayout">
                    {visibleItems.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={item.id}
                        >
                            <PortfolioCard
                                item={item}
                                onClick={() => handleProjectClick(item)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                    <p className="text-lg">No projects found matching your criteria.</p>
                </div>
            )}

            {/* Load More Trigger */}
            {hasMore && (
                <div className="mt-16 text-center">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-muted-foreground/30 hover:border-foreground pb-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                        {isLoadingMore ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load More Projects"
                        )}
                    </button>
                </div>
            )}

            <ProjectModal
                project={selectedProject}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </section>
    );
}
