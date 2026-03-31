import type { Metadata } from "next";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";

export const metadata: Metadata = {
    title: "Portfolio | Annu Design Studio",
    description: "Explore our collection of AI-generated and custom-crafted design projects. From branding to UI/UX, see what's possible.",
};
import { PortfolioFilters } from "@/components/portfolio/PortfolioFilters";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioCTA } from "@/components/portfolio/PortfolioCTA";
import { Footer } from "@/components/footer/Footer";

import { ServiceCategoryRail } from "@/components/portfolio/ServiceCategoryRail";
import { Suspense } from "react";
import { ExploreTemplates } from "@/components/portfolio/ExploreTemplates";
import { getApiUrl } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
    let portfolioData: any = { categories: ["All"], projects: [] };
    let fetchError = false;
    
    try {
        const url = getApiUrl("/api/v1/cms/portfolio");
        console.log(`[CMS] Fetching portfolio content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                portfolioData = await res.json();
                console.log(`[CMS] Successfully fetched portfolio content`);
            } else {
                console.warn(`[CMS] Expected JSON but got ${contentType}`);
                fetchError = true;
            }
        } else {
            console.error(`[CMS] Failed to fetch portfolio content: ${res.status} ${res.statusText}`);
            fetchError = true;
        }
    } catch (error) {
        console.error("Failed to fetch portfolio content:", error);
        fetchError = true;
    }

    // Default structure for sub-components to prevent crashes
    const safeData = portfolioData || { categories: ["All"], projects: [] };

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
                <PortfolioFilters categories={safeData.categories || ["All"]} />
            </Suspense>
            <PortfolioGrid initialProjects={safeData.projects || []} />
            <ExploreTemplates templates={safeData.explore_templates} />
            <PortfolioCTA data={safeData.cta || {}} />
            <Footer />
        </main>
    );
}
