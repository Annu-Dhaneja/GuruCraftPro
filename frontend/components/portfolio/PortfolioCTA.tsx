"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PortfolioCTA() {
    return (
        <section className="py-24 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    Inspired by what you see?
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                    Whether you need a quick AI-generated concept or a fully custom brand identity,
                    we have the right tools for you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700" asChild>
                        <Link href="/ai-lab">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Try AI Design Generator
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full" asChild>
                        <Link href="/request">
                            Request Custom Design <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
