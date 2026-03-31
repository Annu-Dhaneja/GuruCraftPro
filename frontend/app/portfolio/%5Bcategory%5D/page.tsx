import type { Metadata } from "next";
import { PortfolioLayout } from "@/components/portfolio/PortfolioLayout";
import { getApiUrl, unslugify } from "@/lib/utils";

export const dynamic = 'force-dynamic';

async function getPortfolioData() {
    try {
        const url = getApiUrl("/api/v1/cms/portfolio");
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) return await res.json();
    } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
    }
    return null;
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
    const category = unslugify(params.category);
    return {
        title: `${category} Portfolio | Annu Design Studio`,
        description: `Explore our ${category} projects. High-fidelity designs crafted with AI and human expertise.`,
    };
}

export default async function CategoryPortfolioPage({ params }: { params: { category: string } }) {
    const data = await getPortfolioData();
    const activeCategory = unslugify(params.category);
    
    return (
        <PortfolioLayout 
            data={data} 
            fetchError={!data} 
            initialCategory={activeCategory} 
        />
    );
}
