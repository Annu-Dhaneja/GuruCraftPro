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
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { VirtualDressingRoom } from "@/components/home/VirtualDressingRoom";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MainServices } from "@/components/home/MainServices";
import { Testimonials } from "@/components/home/Testimonials";
import { ThingsSection } from "@/components/home/ThingsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl, safeFetch } from "@/lib/utils";

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
    let homeData: any = {};
    let fetchError = false;

    try {
        const url = getApiUrl("/api/v1/cms/home");
        const res = await safeFetch(url, { cache: 'no-store' }, 8000);
        if (res.ok) {
            homeData = await res.json();
        } else {
            fetchError = true;
        }
    } catch (error) {
        fetchError = true;
    }

    const safeData = homeData || {};

    return (
        <main className="flex min-h-screen flex-col bg-background overflow-x-hidden w-full pt-16 selection:bg-indigo-500/30">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode.
                </div>
            )}
            
            <Hero data={safeData.hero || fallbackHomeHero} />

            {safeData.trust_strip && <TrustStrip data={safeData.trust_strip} />}
            
            <FeaturesGrid />

            <div className="bg-slate-900/50">
                <VirtualDressingRoom data={safeData.virtual_dressing_room} />
            </div>

            <PortfolioPreview data={safeData.portfolio_preview} />

            <div className="bg-white/5">
                {safeData.main_services && <MainServices data={safeData.main_services} />}
            </div>

            {safeData.how_it_works && <HowItWorks data={safeData.how_it_works} />}
            
            <ThingsSection data={safeData.things_section} />
            
            {safeData.testimonials && <Testimonials data={safeData.testimonials} />}
            
            <FAQSection />

            <FinalCTA data={safeData.final_cta} />
            
            <Footer />
        </main>
    );
}
