import type { Metadata } from "next";
import { PortfolioLayout } from "@/components/portfolio/PortfolioLayout";
import { getApiUrl } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Portfolio | Annu Design Studio",
    description: "Explore our collection of AI-generated and custom-crafted design projects. From branding to UI/UX, see what's possible.",
};

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

export default async function PortfolioPage() {
    const data = await getPortfolioData();
    return <PortfolioLayout data={data} fetchError={!data} />;
}
