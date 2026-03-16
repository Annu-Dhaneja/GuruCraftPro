"use client";

import Link from "next/link";
import { ArrowRight, Layers, Layout, Image as ImageIcon, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
    { icon: PenTool, title: "Brand Identity", desc: "Logos & guidelines" },
    { icon: ImageIcon, title: "Social Media", desc: "Posts & stories" },
    { icon: Layers, title: "Marketing", desc: "Posters & ads" },
    { icon: Layout, title: "UI Design", desc: "Web & app assets" },
];

export function ServicesPreview() {
    return (
        <section className="py-24 container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">What We Create</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {services.map((item) => (
                        <div key={item.title} className="p-6 border border-border rounded-xl hover:border-indigo-500 transition-colors group">
                            <div className="h-10 w-10 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 justify-center">
                    <Button variant="outline" asChild>
                        <Link href="/services">Explore Services</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/portfolio">View Portfolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
