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
    try {
        const url = getApiUrl("/api/v1/cms/services");
        const res = await fetch(url, {
            cache: 'no-store'
        });
        if (res.ok) {
            servicesData = await res.json();
            console.log(`[CMS] Successfully fetched services content`);
        } else {
            console.error(`[CMS] Failed to fetch services content: ${res.status}`);
        }
    } catch (error) {
        console.error("Failed to fetch services content:", error);
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <ServicesHero data={servicesData?.hero} />
            <ServiceNavigator />
            <ServiceCards data={servicesData?.cards} />
            <ServiceTiers data={servicesData?.tiers} />
            <ComparisonTable data={servicesData?.comparison} />
            <ProcessTimeline data={servicesData?.process} />
            <ServiceFAQ data={servicesData?.faq} />
            <ServicesCTA data={servicesData?.cta} />
            <Footer />
        </main>
    );
}
