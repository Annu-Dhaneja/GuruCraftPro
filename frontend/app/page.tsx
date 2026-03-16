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
import { AboutSection } from "@/components/home/AboutSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch dynamic home page data from the backend
  let homeData: any = {};
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/v1/cms/home`, { 
      cache: 'no-store' // Keep it dynamic
    });
    if (res.ok) {
      homeData = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch home content:", error);
  }

  return (
    <main className="flex min-h-screen flex-col bg-background overflow-x-hidden w-full">
      {homeData.hero && <Hero data={homeData.hero} />}
      {!homeData.hero && <Hero data={null as any} />} {/* Fallback if needed but we handle null in component */}

      {homeData.trust_strip && <TrustStrip data={homeData.trust_strip} />}
      <ServiceCategoryRail data={homeData.service_category_rail} />
      <VirtualDressingRoom data={homeData.virtual_dressing_room} />
      <PortfolioPreview data={homeData.portfolio_preview} />
      <AILabPreview data={homeData.ai_lab_preview} />

      {homeData.how_it_works && <HowItWorks data={homeData.how_it_works} />}
      {homeData.main_services && <MainServices data={homeData.main_services} />}
      <GraphicDesignServices data={homeData.graphic_design_services} />
      
      {homeData.testimonials && <Testimonials data={homeData.testimonials} />}
      <AboutSection data={homeData.about_section} />
      <BlogPreview data={homeData.blog_preview} />
      <FinalCTA data={homeData.final_cta} />
      <Footer />
    </main>
  );
}
