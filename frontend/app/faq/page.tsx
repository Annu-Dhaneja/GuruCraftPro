"use client";

import { useEffect, useState } from "react";
import { FAQHero } from "@/components/faq/FAQHero";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export default function FAQPage() {
    const [faqData, setFaqData] = useState<any>(null);

    useEffect(() => {
        fetch(getApiUrl("/api/v1/cms/faq"))
            .then(res => res.json())
            .then(data => setFaqData(data.sections || []))
            .catch(err => console.error("FAQ Fetch Error:", err));
    }, []);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <FAQHero />
            <FAQAccordion data={faqData} />
            <Footer />
        </main>
    );
}
