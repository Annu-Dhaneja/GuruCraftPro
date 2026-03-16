"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        q: "How soon will I get a reply?",
        a: "We strive to respond to all inquiries within 24-48 hours during business days.",
    },
    {
        q: "Do you work with international clients?",
        a: "Yes! We work with clients globally. Our communication and delivery processes are optimized for remote collaboration.",
    },
    {
        q: "Is there a consultation fee?",
        a: "Initial discovery calls (15 mins) are generally free to see if we're a good fit. Detailed strategy sessions may be billable.",
    },
    {
        q: "Can I start with an AI design and upgrade later?",
        a: "Absolutely. Many clients use our AI Lab for initial concepts and then hire us for the final polish and production files.",
    },
];

export function ContactFAQ() {
    return (
        <section className="py-20 container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger>{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
