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

export default async function PortfolioPage() {
    let portfolioData: any = { categories: ["All"], projects: [] };
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/v1/cms/portfolio`, {
            cache: 'no-store'
        });
        if (res.ok) {
            portfolioData = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch portfolio content:", error);
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <PortfolioHero />
            <ServiceCategoryRail data={portfolioData.categories} />
            <Suspense fallback={<div className="h-20 bg-muted/20 animate-pulse" />}>
                <PortfolioFilters categories={portfolioData.categories} />
            </Suspense>
            <PortfolioGrid initialProjects={portfolioData.projects} />
            <PortfolioCTA />
            <Footer />
        </main>
    );
}
