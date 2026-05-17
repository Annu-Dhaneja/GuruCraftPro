"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectNavigation() {
    return (
        <section className="py-12 border-t border-border">
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <Button variant="ghost" asChild>
                    <Link href="/portfolio" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Previous Project
                    </Link>
                </Button>

                <Button variant="outline" asChild>
                    <Link href="/portfolio">View All Works</Link>
                </Button>

                <Button variant="ghost" asChild>
                    <Link href="/portfolio" className="flex items-center gap-2">
                        Next Project <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
