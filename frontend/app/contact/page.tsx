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
    
    try {
        const res = await fetch(getApiUrl("/api/v1/cms/contact"), {
            cache: 'no-store'
        });
        if (res.ok) {
            contactData = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch contact content:", error);
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <ContactHero data={contactData.hero} />
            <ContactOptions data={contactData.options} />
            <ContactForm data={contactData.form} />
            <AlternateContacts data={contactData.alternate_contacts} />
            <ContactProcess data={contactData.process} />
            <ContactFAQ data={contactData.faq} />
            <ContactCTA data={contactData.cta} />
            <Footer />
        </main>
    );
}
