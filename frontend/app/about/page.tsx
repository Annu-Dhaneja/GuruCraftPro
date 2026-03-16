import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";

export const metadata: Metadata = {
    title: "About Us | Annu Design Studio",
    description: "Meet the team where technology meets thoughtful design. Learn about our philosophy and the founder, Annu.",
};
import { FounderIntro } from "@/components/about/FounderIntro";
import { Philosophy } from "@/components/about/Philosophy";
import { AIHumanSection } from "@/components/about/AIHumanSection";
import { ToolsWorkflow } from "@/components/about/ToolsWorkflow";
import { ServicesPreview } from "@/components/about/ServicesPreview";
import { TrustSection } from "@/components/about/TrustSection";
import { AboutCTA } from "@/components/about/AboutCTA";
import { Footer } from "@/components/footer/Footer";

export default async function AboutPage() {
    let aboutData: any = {};
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/v1/cms/about`, {
            cache: 'no-store'
        });
        if (res.ok) {
            aboutData = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch about content:", error);
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <AboutHero data={aboutData.hero} />
            <FounderIntro data={aboutData.founder} />
            <Philosophy data={aboutData.philosophy} />
            <AIHumanSection data={aboutData.ai_human} />
            <ToolsWorkflow data={aboutData.tools} />
            <ServicesPreview />
            <TrustSection />
            <AboutCTA />
            <Footer />
        </main>
    );
}
