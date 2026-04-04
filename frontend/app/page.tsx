/**
 * Home Page Component
 * 
 * This is the main landing page for the Annu Design Studio application.
 * It serves as the entry point for users, showcasing the premium value proposition
 * and offering navigation to key areas: Portfolio and Design Request.
 * 
 * Design Philosophy:
 * - Minimalist and premium aesthetic
 * - Focus on typography and whitespace
 * - Subtle animations and gradients for depth
 */
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServiceCategoryRail } from "@/components/portfolio/ServiceCategoryRail";
import { VirtualDressingRoom } from "@/components/home/VirtualDressingRoom";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { AILabPreview } from "@/components/home/AILabPreview";

import { HowItWorks } from "@/components/home/HowItWorks";
import { MainServices } from "@/components/home/MainServices";
import { GraphicDesignServices } from "@/components/services/GraphicDesignServices";
import { Testimonials } from "@/components/home/Testimonials";
import { ThingsSection } from "@/components/home/ThingsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { SevenDayTrial } from "@/components/home/SevenDayTrial";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const fallbackHomeHero = {
  badge: "The Future of Design",
  headline_prefix: "Design at the speed of imagination",
  headline_highlight: "",
  headline_suffix: ".",
  subheadline:
    "Combine AI-powered generation with expert human refinement to create polished brand, UI, and marketing assets faster.",
};

export default async function Home() {
    // Fetch dynamic home page data from the backend
    let homeData: any = {};
    let fetchError = false;

    try {
        const url = getApiUrl("/api/v1/cms/home");
        console.log(`[CMS] Fetching home content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                homeData = await res.json();
                console.log(`[CMS] Successfully fetched home content`);
            } else {
                console.warn(`[CMS] Expected JSON but got ${contentType}`);
                fetchError = true;
            }
        } else {
            console.error(`[CMS] Failed to fetch home content: ${res.status} ${res.statusText}`);
            fetchError = true;
        }
    } catch (error) {
        console.error("Failed to fetch home content:", error);
        fetchError = true;
    }

    // Default structure for sub-components to prevent crashes
    const safeData = homeData || {};

    return (
        <main className="flex min-h-screen flex-col bg-background overflow-x-hidden w-full pt-16">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode. Some sections may show default content.
                </div>
            )}
            
            <Hero data={safeData.hero || fallbackHomeHero} />

            {safeData.trust_strip && <TrustStrip data={safeData.trust_strip} />}
            <ServiceCategoryRail data={safeData.service_category_rail} />
            <VirtualDressingRoom data={safeData.virtual_dressing_room} />
            <PortfolioPreview data={safeData.portfolio_preview} />
            <AILabPreview data={safeData.ai_lab_preview} />
            <SevenDayTrial />

            {safeData.how_it_works && <HowItWorks data={safeData.how_it_works} />}
            {safeData.main_services && <MainServices data={safeData.main_services} />}
            <GraphicDesignServices data={safeData.graphic_design_services} />
            <ThingsSection data={safeData.things_section} />
            
            {safeData.testimonials && <Testimonials data={safeData.testimonials} />}
            <AboutSection data={safeData.about_section} />
            <BlogPreview data={safeData.blog_preview} />
            <FinalCTA data={safeData.final_cta} />
            <Footer />
        </main>
    );
}
