import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { FounderIntro } from "@/components/about/FounderIntro";
import { TeamSection } from "@/components/about/TeamSection";
import { Philosophy } from "@/components/about/Philosophy";
import { AIHumanSection } from "@/components/about/AIHumanSection";
import { ToolsWorkflow } from "@/components/about/ToolsWorkflow";
import { ServicesPreview } from "@/components/about/ServicesPreview";
import { TrustSection } from "@/components/about/TrustSection";
import { AboutCTA } from "@/components/about/AboutCTA";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const metadata: Metadata = {
    title: "About Us | Annu Design Studio",
    description: "Meet the team where technology meets thoughtful design. Learn about our philosophy and the founder, Annu.",
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    let aboutData: any = {};
    try {
        const url = getApiUrl("/api/v1/cms/about");
        console.log(`[CMS] Fetching about content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store'
        });
        
        if (res.ok) {
            aboutData = await res.json();
            console.log(`[CMS] Successfully fetched about content`);
        } else {
            console.error(`[CMS] Failed to fetch about content: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        console.error("Failed to fetch about content:", error);
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <AboutHero data={aboutData?.hero} />
            <FounderIntro data={aboutData?.founder} />
            <TeamSection data={aboutData?.team} />
            <Philosophy data={aboutData?.philosophy} />
            <AIHumanSection data={aboutData?.ai_human} />
            <ToolsWorkflow data={aboutData?.tools} />
            <ServicesPreview data={aboutData?.services_preview} />
            <TrustSection data={aboutData?.trust_section} />
            <AboutCTA data={aboutData?.about_cta} />
            <Footer />
        </main>
    );
}
