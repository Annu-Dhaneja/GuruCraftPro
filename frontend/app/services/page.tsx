import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";

export const metadata: Metadata = {
    title: "Services & Pricing | Annu Design Studio",
    description: "Choose the perfect design plan for your needs. From instant AI concepts to fully custom branding packages.",
};
import { ServiceCards } from "@/components/services/ServiceCards";
import { ServiceTiers } from "@/components/services/ServiceTiers";
import { ComparisonTable } from "@/components/services/ComparisonTable";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { Footer } from "@/components/footer/Footer";

export default async function ServicesPage() {
    let servicesData: any = {};
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/v1/cms/services`, {
            cache: 'no-store'
        });
        if (res.ok) {
            servicesData = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch services content:", error);
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <ServicesHero data={servicesData.hero} />
            <ServiceCards />
            <ServiceTiers data={servicesData.tiers} />
            <ComparisonTable />
            <ProcessTimeline data={servicesData.process} />
            <ServiceFAQ data={servicesData.faq} />
            <ServicesCTA />
            <Footer />
        </main>
    );
}
