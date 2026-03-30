import type { Metadata } from "next";
import { PortfolioAll } from "@/components/portfolio/PortfolioAll";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Portfolio Archive | Annu Design Studio",
    description: "Explore our full collection of projects and creations without filters. Every masterpiece in one single view.",
};

export const dynamic = "force-dynamic";

export default async function PortfolioAllPage() {
    let portfolioData: any = { projects: [] };
    
    try {
        const res = await fetch(getApiUrl("/api/v1/cms/portfolio"), {
            cache: "no-store"
        });
        if (res.ok) {
            portfolioData = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch portfolio archive:", error);
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <PortfolioAll initialProjects={portfolioData.projects} />
            <Footer />
        </main>
    );
}
