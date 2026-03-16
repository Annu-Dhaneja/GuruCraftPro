"use client";

import { PenTool, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
    {
        icon: PenTool,
        title: "Request a Custom Design",
        desc: "Best for detailed project work",
        intent: "custom",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
    },
    {
        icon: Sparkles,
        title: "Try AI Design First",
        desc: "Instant concept generation",
        intent: "ai",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
    },
    {
        icon: MessageCircle,
        title: "General Inquiry",
        desc: "Questions & collaboration",
        intent: "general",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
];

export function ContactOptions() {
    const scrollToForm = (intent: string) => {
        // In a real implementation, this enables specific form logic
        const element = document.getElementById("contact-form");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="pb-12 container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {options.map((option) => (
                    <button
                        key={option.title}
                        onClick={() => scrollToForm(option.intent)}
                        className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:border-indigo-500/50 hover:shadow-lg transition-all group"
                    >
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", option.bg, option.color)}>
                            <option.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}
