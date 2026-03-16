"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServicesCTA() {
    return (
        <section className="py-24 container mx-auto px-4 md:px-6">
            <div className="bg-foreground text-background rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">

                {/* Background Accents */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Not sure which fits you best?</h2>
                    <p className="text-lg text-muted-foreground/80 mb-10">
                        One studio. Multiple ways to create. Start fast with AI or go deep with custom design — the choice is yours.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90" asChild>
                            <Link href="/ai-lab">
                                Start with AI Design
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full border-background/20 hover:bg-background/10 hover:text-background" asChild>
                            <Link href="/contact">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Talk to Gurucraftpro
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
