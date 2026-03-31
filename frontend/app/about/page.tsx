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
    let fetchError = false;

    try {
        const url = getApiUrl("/api/v1/cms/about");
        console.log(`[CMS] Fetching about content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                aboutData = await res.json();
                console.log(`[CMS] Successfully fetched about content`);
            } else {
                console.warn(`[CMS] Expected JSON but got ${contentType}`);
                fetchError = true;
            }
        } else {
            console.error(`[CMS] Failed to fetch about content: ${res.status} ${res.statusText}`);
            fetchError = true;
        }
    } catch (error) {
        console.error("Failed to fetch about content:", error);
        fetchError = true;
    }

    // Default structure for sub-components to prevent crashes
    // If backend returns SSOT format (sections array), normalize it now as an extra guard
    const rawData = aboutData || {};
    let safeData = rawData;
    
    // If it's pure SSOT format with a sections array, flatten it here too (redundant but safe)
    if (Array.isArray(rawData.sections)) {
        safeData = {};
        rawData.sections.forEach((s: any) => {
            if (s.slug) safeData[s.slug] = s.content || {};
        });
    }

    return (
        <main className="min-h-screen bg-background flex flex-col pt-16">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode. Some sections may show default content.
                </div>
            )}
            
            <AboutHero data={safeData.hero} />
            <FounderIntro data={safeData.founder} />
            <TeamSection data={safeData.team} />
            <Philosophy data={safeData.philosophy} />
            <AIHumanSection data={safeData.ai_human} />
            <ToolsWorkflow data={safeData.tools} />
            <ServicesPreview data={safeData.services_preview} />
            <TrustSection data={safeData.trust_section} />
            <AboutCTA data={safeData.about_cta} />
            <Footer />
        </main>
    );
}
