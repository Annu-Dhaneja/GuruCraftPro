"use client";

import { motion } from "framer-motion";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

interface CategoryGridProps {
    items: any[];
}

export function CategoryGrid({ items }: CategoryGridProps) {
    return (
        <section className="py-16 container mx-auto px-4 md:px-6">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <PortfolioCard item={item} />
                    </motion.div>
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">No projects found in this category yet.</p>
                </div>
            )}
        </section>
    );
}
