"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutCTA({ data }: { data?: any }) {
    const title = data?.title || "Let's create something meaningful together.";
    const description = data?.description || "Design built with intention, enhanced by technology.";

    return (
        <section className="py-32 container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">{title}</h2>
                <p className="text-xl text-muted-foreground mb-10">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="h-12 px-8 rounded-full" asChild>
                        <Link href={data?.link || "/request"}>Request Custom Design</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 rounded-full" asChild>
                        <Link href="/ai-lab">Try AI Design</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
