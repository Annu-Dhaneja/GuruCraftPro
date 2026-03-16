"use client";

import { Download, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
    { title: "2024 Social Media Sizing Cheat Sheet", type: "PDF", size: "2.4 MB", icon: FileText },
    { title: "Glassmorphism UI Kit (Figma)", type: "FIG", size: "15 MB", icon: ImageIcon },
    { title: "50 Free Gradient Maps", type: "ZIP", size: "45 MB", icon: Download },
];

export function FreeResources() {
    return (
        <section className="py-16 container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Free Downloads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((res) => (
                    <div key={res.title} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-indigo-500/30 transition-all group">
                        <div className="h-12 w-12 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <res.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm mb-1 leading-snug group-hover:text-indigo-500 transition-colors">{res.title}</h3>
                            <p className="text-xs text-muted-foreground">{res.type} • {res.size}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
}
