"use client";

import { motion } from "framer-motion";
import { PortfolioCard } from "./PortfolioCard";
import { useState } from "react";
import { 
  Grid, 
  Filter, 
  Search, 
  LayoutGrid, 
  Maximize2,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProjectModal } from "./ProjectModal";

// Fallback items if API fails
const defaultItems = [
    { id: "1", title: "Modern Tech Logo", category: "Logo Design", image: "/images/generated/generated-image-2026-02-23_14-29-08 (1).jpg" },
    { id: "2", title: "Floral Wedding Invite", category: "Wedding Card", image: "/images/generated/generated-image-2026-02-23_14-29-25 (4).jpg" },
    { id: "3", title: "Urban Street T-Shirt", category: "T-Shirt Design", image: "/images/generated/generated-image-2026-02-23_14-29-25 (6).jpg" },
    { id: "4", title: "Summer Sale Banner", category: "Banner Design", image: "/images/generated/generated-image-2026-02-23_14-29-25 (3).jpg" },
    { id: "5", title: "Minimal Resume", category: "Resume Design", image: "/images/generated/generated-image-2026-02-24_08-51-01 (2).jpg" },
    { id: "6", title: "Epic Gaming Thumbnail", category: "Thumbnail", image: "/images/generated/generated-image-2026-02-24_08-35-13.jpg" },
    { id: "7", title: "Guruji Portrait", category: "GURU JI ART", image: "/images/content/guru/guru2.png" },
    { id: "8", title: "Vantage Ecom Store", category: "VANTAGE ECOM", image: "/images/generated/generated-image-2026-02-23_14-29-23.jpg" },
    { id: "9", title: "Weekly Wardrobe", category: "7 DAY CLOTHS", image: "/images/generated/generated-image-2026-02-24_10-15-40 (3).jpg" },
    { id: "10", title: "Game RPG Assets", category: "GAME DESIGN", image: "/images/generated/generated-image-2026-02-24_10-45-40.jpg" },
    { id: "11", title: "Luxury Wedding Moodboard", category: "WEDDING PLAN", image: "/images/generated/generated-image-2026-02-24_08-51-01 (1).jpg" },
    { id: "12", title: "High-End Retouch", category: "PHOTO EDITOR", image: "/images/generated/generated-image-2026-02-24_10-45-44 (1).jpg" }
];

export function PortfolioAll({ initialProjects }: { initialProjects?: any[] }) {
    const [search, setSearch] = useState("");
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const items = initialProjects && initialProjects.length > 0 ? initialProjects : defaultItems;

    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col bg-background">
            {/* ── Sub-Hero / Header ─────────────────────────── */}
            <section className="py-24 border-b border-border bg-muted/20">
                <div className="container px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Archive <span className="text-indigo-600">.</span></h1>
                            <p className="text-xl text-muted-foreground font-light leading-relaxed">
                                A complete catalog of every project, concept, and creation ever 
                                touched by the studio. No filters. Just excellence.
                            </p>
                        </div>
                        <div className="flex bg-background border border-border rounded-full px-6 py-3 items-center gap-4 w-full md:w-96 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                            <Search className="w-5 h-5 text-muted-foreground" />
                            <input 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search the archive..." 
                                className="bg-transparent border-none outline-none w-full text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest">
                            <Grid className="w-3 h-3" /> Grid View
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            {filteredItems.length} Projects Total
                        </div>
                    </div>
                </div>
            </section>

            {/* ── High Density Grid ─────────────────────────── */}
            <section className="py-20 container px-4">
                <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
                    {filteredItems.map((item, idx) => (
                        <motion.div
                            key={item.id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 12) * 0.05 }}
                        >
                            <PortfolioCard 
                                item={item}
                                onClick={() => {
                                    setSelectedProject(item);
                                    setIsModalOpen(true);
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="py-40 text-center">
                        <Maximize2 className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-muted-foreground">No matches found in the archive</h2>
                    </div>
                )}
            </section>

            <ProjectModal 
                project={selectedProject}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}
