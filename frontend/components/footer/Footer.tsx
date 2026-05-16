"use client";

import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterBottom } from "./FooterBottom";
import { cn } from "@/lib/utils";

export function Footer() {
    return (
        <footer className="relative bg-slate-950 text-slate-200 pt-32 pb-16 border-t border-slate-900 overflow-hidden">
            {/* Premium Glow Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(79,70,229,0.08)_0%,transparent_70%)] pointer-events-none" />
            
            {/* Top Shine Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-600/30 to-transparent" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12 mb-24">

                    {/* Column 1: Brand (Spans 2 columns on large) */}
                    <div className="lg:col-span-2">
                        <FooterBrand />
                    </div>

                    {/* Column 2 & 3: Links */}
                    <FooterLinks />

                    {/* Column 4: Newsletter */}
                    <div>
                        <FooterNewsletter />
                    </div>

                </div>

                {/* Bottom Strip */}
                <div className="pt-12 border-t border-slate-900">
                    <FooterBottom />
                </div>
            </div>
        </footer>
    );
}
