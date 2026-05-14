"use client";

import { usePathname } from "next/navigation";
import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterBottom } from "./FooterBottom";
import { cn } from "@/lib/utils";

export function Footer() {
    const pathname = usePathname();

    // Hide footer on dashboard, admin, and auth pages
    if (pathname && (
        pathname.startsWith('/dashboard') || 
        pathname.startsWith('/admin') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup') ||
        pathname.startsWith('/forgot-password')
    )) {
        return null;
    }

    return (
        <footer className="relative bg-[#020617] text-slate-200 pt-24 pb-12 border-t border-white/5 overflow-hidden">
            {/* Premium Glow Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
            
            {/* Top Shine Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

                    {/* Column 1: Brand */}
                    <div className="lg:pr-8">
                        <FooterBrand />
                    </div>

                    {/* Column 2 & 3: Links (Split in component) */}
                    <FooterLinks />

                    {/* Column 4: Newsletter */}
                    <div className="lg:pl-8">
                        <FooterNewsletter />
                    </div>

                </div>

                {/* Bottom Strip */}
                <FooterBottom />
            </div>
        </footer>
    );
}

