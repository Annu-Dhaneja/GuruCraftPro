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

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <ContactHero />
            <ContactOptions />
            <ContactForm />
            <AlternateContacts />
            <ContactProcess />
            <ContactFAQ />
            <ContactCTA />
            <Footer />
        </main>
    );
}
