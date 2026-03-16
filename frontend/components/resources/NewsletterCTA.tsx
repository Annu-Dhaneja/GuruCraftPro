"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterCTA() {
    return (
        <section className="py-24 bg-foreground text-background">
            <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
                <div className="h-16 w-16 mx-auto bg-background/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Mail className="h-8 w-8 text-background" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">Design smarter, straight to your inbox.</h2>
                <p className="text-lg text-background/70 mb-8">
                    Get practical design tips, fresh AI prompts, and exclusive freebies.
                    Sent twice a month. No spam, ever.
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-background text-foreground border-0 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-indigo-500"
                    />
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
                        Subscribe
                    </Button>
                </form>
                <p className="text-xs text-background/40 mt-4">
                    Join 5,000+ designers and creators. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
