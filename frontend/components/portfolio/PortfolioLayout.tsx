import { Suspense } from "react";
import { PortfolioHero } from "./PortfolioHero";
import { ServiceCategoryRail } from "./ServiceCategoryRail";
import { PortfolioFilters } from "./PortfolioFilters";
import { PortfolioGrid } from "./PortfolioGrid";
import { ExploreTemplates } from "./ExploreTemplates";
import { PortfolioCTA } from "./PortfolioCTA";
import { Footer } from "@/components/footer/Footer";

interface PortfolioLayoutProps {
    data: any;
    fetchError?: boolean;
    initialCategory?: string;
}

export function PortfolioLayout({ data, fetchError, initialCategory }: PortfolioLayoutProps) {
    const safeData = data || { categories: ["All"], projects: [] };

    return (
        <main className="min-h-screen bg-background flex flex-col pt-16">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode. Some sections may show default content.
                </div>
            )}
            
            <PortfolioHero data={safeData.hero || {}} />
            <ServiceCategoryRail data={safeData.categories || []} />
            <Suspense fallback={<div className="h-20 bg-muted/20 animate-pulse" />}>
                <PortfolioFilters categories={safeData.categories || ["All"]} initialCategory={initialCategory} />
            </Suspense>
            <PortfolioGrid initialProjects={safeData.projects || []} />
            <ExploreTemplates templates={safeData.explore_templates} />
            <PortfolioCTA data={safeData.cta || {}} />
            <Footer />
        </main>
    );
}
