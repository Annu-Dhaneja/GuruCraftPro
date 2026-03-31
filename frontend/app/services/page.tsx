import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceCards } from "@/components/services/ServiceCards";
import { ServiceTiers } from "@/components/services/ServiceTiers";
import { ComparisonTable } from "@/components/services/ComparisonTable";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { ServiceNavigator } from "@/components/services/ServiceNavigator";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Services & Pricing | Annu Design Studio",
    description: "Choose the perfect design plan for your needs. From instant AI concepts to fully custom branding packages.",
};

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    let servicesData: any = {};
    let fetchError = false;

    try {
        const url = getApiUrl("/api/v1/cms/services");
        console.log(`[CMS] Fetching services content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                servicesData = await res.json();
                console.log(`[CMS] Successfully fetched services content`);
            } else {
                console.warn(`[CMS] Expected JSON but got ${contentType}`);
                fetchError = true;
            }
        } else {
            console.error(`[CMS] Failed to fetch services content: ${res.status} ${res.statusText}`);
            fetchError = true;
        }
    } catch (error) {
        console.error("Failed to fetch services content:", error);
        fetchError = true;
    }

    // Default structure for sub-components to prevent crashes
    const safeData = servicesData || {};

    return (
        <main className="min-h-screen bg-background flex flex-col pt-16">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode. Some sections may show default content.
                </div>
            )}
            
            <ServicesHero data={safeData.hero} />
            <ServiceNavigator />
            <ServiceCards data={safeData.cards} />
            <ServiceTiers data={safeData.tiers} />
            <ComparisonTable data={safeData.comparison} />
            <ProcessTimeline data={safeData.process} />
            <ServiceFAQ data={safeData.faq} />
            <ServicesCTA data={safeData.cta} />
            <Footer />
        </main>
    );
}
