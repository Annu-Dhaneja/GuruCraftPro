import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";

export const metadata: Metadata = {
    title: "Contact Us | Annu Design Studio",
    description: "Get in touch for your next design project. Request a custom quote or start with AI assistance.",
};
import { ContactOptions } from "@/components/contact/ContactOptions";
import { ContactForm } from "@/components/contact/ContactForm";
import { AlternateContacts } from "@/components/contact/AlternateContacts";
import { ContactProcess } from "@/components/contact/ContactProcess";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
    let contactData: any = {};
    let fetchError = false;
    
    try {
        const url = getApiUrl("/api/v1/cms/contact");
        console.log(`[CMS] Fetching contact content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                contactData = await res.json();
                console.log(`[CMS] Successfully fetched contact content`);
            } else {
                console.warn(`[CMS] Expected JSON but got ${contentType}`);
                fetchError = true;
            }
        } else {
            console.error(`[CMS] Failed to fetch contact content: ${res.status} ${res.statusText}`);
            fetchError = true;
        }
    } catch (error) {
        console.error("Failed to fetch contact content:", error);
        fetchError = true;
    }

    // Default structure for sub-components to prevent crashes
    const safeData = contactData || {};

    return (
        <main className="min-h-screen bg-background flex flex-col pt-16">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode. Some sections may show default content.
                </div>
            )}
            
            <ContactHero data={safeData.hero || {}} />
            <ContactOptions data={safeData.options || {}} />
            <ContactForm data={safeData.form || {}} />
            <AlternateContacts data={safeData.alternate_contacts || {}} />
            <ContactProcess data={safeData.process || {}} />
            <ContactFAQ data={safeData.faq || []} />
            <ContactCTA data={safeData.cta || {}} />
            <Footer />
        </main>
    );
}
