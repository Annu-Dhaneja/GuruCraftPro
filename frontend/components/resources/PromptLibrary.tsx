"use client";

import { Copy, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const prompts = [
    { id: 1, title: "Cyberpunk Cityscape", text: "Futuristic city street at night, neon lights, rain reflections, cyberpunk style, high detail, cinematic lighting --ar 16:9" },
    { id: 2, title: "Minimalist Coffee Logo", text: "Minimalist line art logo for a coffee shop, coffee bean icon, clean typography, sans-serif, black on white background" },
    { id: 3, title: "3D Icon Set", text: "3D icon set, claymorphism style, soft pastel colors, rounded edges, high gloss, isometric view, white background" },
];

export function PromptLibrary() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-indigo-500" />
                            Prompt Library
                        </h2>
                        <p className="text-muted-foreground">Copy & paste these high-quality prompts into our AI Designer.</p>
                    </div>
                    <Button variant="outline">View All Prompts</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {prompts.map((item) => (
                        <PromptCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PromptCard({ item }: { item: any }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(item.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <Badge variant="secondary" className="text-[10px]">Midjourney v6</Badge>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 mb-4 text-xs font-mono text-muted-foreground leading-relaxed h-20 overflow-hidden relative group">
                {item.text}
                <div className="absolute inset-0 bg-gradient-to-t from-muted to-transparent opacity-50" />
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={handleCopy}>
                    {copied ? <Check className="mr-2 h-3 w-3 text-green-500" /> : <Copy className="mr-2 h-3 w-3" />}
                    {copied ? "Copied" : "Copy Prompt"}
                </Button>
                <Button size="sm" className="w-full text-xs bg-indigo-600 hover:bg-indigo-700">
                    Try in Lab
                </Button>
            </div>
        </div>
    );
}
