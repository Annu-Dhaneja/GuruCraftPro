"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoryCTAProps {
    title: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText?: string;
    secondaryBtnLink?: string;
}

export function CategoryCTA({ title, primaryBtnText, primaryBtnLink, secondaryBtnText, secondaryBtnLink }: CategoryCTAProps) {
    return (
        <section className="py-24 bg-gradient-to-br from-background to-muted border-t border-border">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-6">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">{title}</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="rounded-full px-8 h-12 text-base" asChild>
                            <Link href={primaryBtnLink}>
                                {primaryBtnText} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        {secondaryBtnText && secondaryBtnLink && (
                            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base" asChild>
                                <Link href={secondaryBtnLink}>
                                    {secondaryBtnText}
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
