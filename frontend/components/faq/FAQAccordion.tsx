"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqData = [
    {
        category: "General",
        items: [
            {
                question: "What is Gurucraftpro?",
                answer: "Gurucraftpro is a next-generation creative agency that blends human expertise with advanced AI tools to deliver stunning designs for branding, web, and marketing."
            },
            {
                question: "How does the AI Design Lab work?",
                answer: "Our AI Design Lab allows you to input prompts and generate initial design concepts instantly. You can then refine these concepts using our tools or request professional customization."
            }
        ]
    },
    {
        category: "Services & Pricing",
        items: [
            {
                question: "What design services do you offer?",
                answer: "We offer a wide range of services including Logo Design, Brand Identity, UI/UX Design, Web Development, Packaging, 3D Art, and Marketing Collateral."
            },
            {
                question: "How much does a project cost?",
                answer: "Project costs vary based on scope and complexity. We offer tiered pricing packages starting from basic branding kits to full enterprise design systems. Contact us for a custom quote."
            },
            {
                question: "Do you offer revisions?",
                answer: "Yes, all our standard packages include up to 3 rounds of revisions to ensure you are 100% satisfied with the final result."
            }
        ]
    },
    {
        category: "Technical",
        items: [
            {
                question: "What file formats will I receive?",
                answer: "For logos and branding, you'll receive vector formats (SVG, AI, EPS) and high-res raster formats (PNG, JPG). For functional designs like UI/UX, we provide Figma files."
            },
            {
                question: "Can I export AI-generated images?",
                answer: "Yes, premium members can download high-resolution versions of their AI-generated designs for personal or commercial use."
            }
        ]
    }
];

export function FAQAccordion({ data }: { data?: any[] }) {
    const displayData = data || [
        {
            category: "General",
            items: [
                {
                    question: "What is Annu Design Studio?",
                    answer: "Annu Design Studio is a next-generation creative agency that blends human expertise with advanced AI tools."
                }
            ]
        }
    ];

    return (
        <section className="py-12 pb-24 container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="space-y-12">
                {displayData.map((section: any, idx: number) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-2">{section.category}</h2>

                        <Accordion type="single" collapsible className="w-full">
                            {(section.items || []).map((item: any, i: number) => (
                                <AccordionItem key={i} value={`${section.category}-${i}`}>
                                    <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">
                                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
