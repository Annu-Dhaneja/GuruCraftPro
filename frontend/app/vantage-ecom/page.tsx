import type { Metadata } from "next";
import { VantageEcomContent } from "@/components/vantage-ecom/VantageEcomContent";
import { getApiUrl, safeFetch } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Vantage Ecom Platform | Annu Design Studio",
    description: "The future of high-performance e-commerce. AI-driven automation, lightning-fast interfaces, and data-backed conversion science.",
};

export default async function VantageEcomPage() {
    let cmsData = null;
    try {
        const url = getApiUrl("/api/v1/cms/vantage-ecom");
        const res = await safeFetch(url, { cache: 'no-store' }, 8000);
        if (res.ok) cmsData = await res.json();
    } catch (error) {
        console.error("Failed to fetch vantage-ecom data:", error);
    }

    return (
        <main className="min-h-screen bg-white">
            <VantageEcomContent data={cmsData} />
        </main>
    );
}
