import type { Metadata } from "next";
import { FAQHero } from "@/components/faq/FAQHero";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const metadata: Metadata = {
    title: "FAQ | Annu Design Studio",
    description: "Find answers to frequently asked questions about our AI design services, billing, and process.",
};

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
    let faqData: any = [];
    let fetchError = false;

    try {
        const url = getApiUrl("/api/v1/cms/faq");
        console.log(`[CMS] Fetching FAQ content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();
                console.log(`[CMS] Full FAQ Data Received:`, JSON.stringify(data, null, 2));
                
                // Be extremely robust: search every section for any 'sections' array in 'content'
                // This handles various data nesting formats seen in SSOT vs Legacy
                let allFaqSections = [];
                if (data.sections && Array.isArray(data.sections)) {
                    allFaqSections = data.sections.flatMap((s: any) => s.content?.sections || []);
                }
                
                faqData = allFaqSections;
                
                console.log(`[CMS] Extracted FAQ Sections:`, faqData.length);
            } else {
                console.warn(`[CMS] Expected JSON but got ${contentType}`);
                fetchError = true;
            }
        } else {
            console.error(`[CMS] Failed to fetch FAQ content: ${res.status} ${res.statusText}`);
            fetchError = true;
        }
    } catch (error) {
        console.error("Failed to fetch FAQ content:", error);
        fetchError = true;
    }

    return (
        <main className="min-h-screen bg-background flex flex-col pt-16">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode. Some sections may show default content.
                </div>
            )}
            
            <FAQHero />
            <FAQAccordion data={faqData} />
            <Footer />
        </main>
    );
}
