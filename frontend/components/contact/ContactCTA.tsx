"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactCTA() {
    return (
        <section className="py-24 container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Have an idea in mind?</h2>
                <p className="text-muted-foreground mb-8">
                    Don't let it stay just an idea. Let's bring it to life today.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700" asChild>
                        <Link href="#contact-form">Get Started</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full" asChild>
                        <Link href="/ai-lab">Try AI Design</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
