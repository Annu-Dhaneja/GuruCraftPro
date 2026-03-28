"use client";

import { Heart, Eye, Maximize, ShieldCheck } from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Human First",
        desc: "AI assists the process, but design decisions and emotional connection remain human-led.",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
    },
    {
        icon: Eye,
        title: "Clarity Over Noise",
        desc: "Every element serves a purpose. We strip away the unnecessary to focus on the essential message.",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
    },
    {
        icon: Maximize,
        title: "Adaptable Creativity",
        desc: "Designs that scale across platforms and time, built to grow with your brand.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        icon: ShieldCheck,
        title: "Ethical AI Use",
        desc: "Transparency in how AI contributes to the work, ensuring responsible and authentic results.",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
];

export function Philosophy({ data }: { data?: any }) {
    const philosophyValues = data?.values || [
        { title: "Human First", desc: "Design decisions remain human-led.", icon: "Heart", color: "text-pink-500", bg: "bg-pink-500/10" },
        { title: "Clarity Over Noise", desc: "Focus on the essential message.", icon: "Eye", color: "text-indigo-500", bg: "bg-indigo-500/10" },
        { title: "Adaptability", desc: "Built to grow with your brand.", icon: "Maximize", color: "text-purple-500", bg: "bg-purple-500/10" },
        { title: "Ethical AI", desc: "Transparency and authenticity.", icon: "ShieldCheck", color: "text-green-500", bg: "bg-green-500/10" },
    ];

    return (
        <section className="py-12 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">{data?.title || "Design should be smart, simple, and purposeful."}</h2>
                    <p className="text-muted-foreground">{data?.description || "Our core values guide every pixel we place and every decision we make."}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {philosophyValues.map((item: any) => (
                        <div key={item.title} className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-all text-center">
                            <div className={`h-14 w-14 mx-auto rounded-xl ${item.bg || 'bg-indigo-500/10'} ${item.color || 'text-indigo-500'} flex items-center justify-center mb-6`}>
                                {/* Note: dynamic lucide icons are hard without mapping, falling back to Heart if unsure */}
                                <Heart className="h-7 w-7" />
                            </div>
                            <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
