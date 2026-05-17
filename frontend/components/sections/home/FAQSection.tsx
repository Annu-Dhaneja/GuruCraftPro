"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How does the AI design process work?",
        answer: "Our process begins with your requirements. We use advanced AI models to generate initial concepts, which are then refined by our senior design team to ensure they meet professional standards and align with your brand identity.",
    },
    {
        question: "What is the typical turnaround time?",
        answer: "For individual design assets, we typically deliver within 24 hours. More complex projects like full branding or e-commerce platforms take between 3-7 business days depending on the scope.",
    },
    {
        question: "Do I own the copyrights to the designs?",
        answer: "Yes, once final payment is made, you own 100% of the copyrights and intellectual property for all designs created for your project.",
    },
    {
        question: "Can you handle high-volume product editing?",
        answer: "Absolutely. Our 'Vantage Ecom' service is specifically designed for high-volume, precision editing for e-commerce brands, including ghost mannequin effects, color matching, and bulk retouching.",
    },
    {
        question: "What industries do you specialize in?",
        answer: "While we are multidisciplinary, we have deep expertise in E-commerce, Fashion, Luxury Weddings, Spiritual Art, and Gaming. Our AI models are specifically tuned for these high-aesthetic industries.",
    },
];

export function FAQSection() {
    return (
        <section className="py-24 bg-white/5 border-y border-white/5">
            <div className="container px-4 md:px-8 mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Common Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg"
                    >
                        Everything you need to know about working with GurucraftPro.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline hover:text-indigo-400 transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-400 leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
