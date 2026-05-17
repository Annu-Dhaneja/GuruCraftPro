import type { Metadata } from "next";
import { LuxuryShopContent } from "@/components/sections/shop/LuxuryShopContent";
import { getApiUrl, safeFetch } from "@/lib/utils";

export const metadata: Metadata = {
    title: "The Collection | Elite Marketplace",
    description: "Browse our curated collection of spiritual art, e-commerce assets, and design kits.",
};

export default async function LuxuryShopPage() {
    let cmsData = null;
    try {
        const url = getApiUrl("/api/v1/cms/shop");
        const res = await safeFetch(url, { cache: 'no-store' }, 8000);
        if (res.ok) cmsData = await res.json();
    } catch (error) {
        console.error("Failed to fetch shop CMS data:", error);
    }

    return (
        <LuxuryShopContent cmsData={cmsData} />
    );
}
