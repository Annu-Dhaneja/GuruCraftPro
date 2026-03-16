"use client";

import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterBottom } from "./FooterBottom";

export function Footer() {
    return (
        <footer className="bg-[#0F0F0F] text-slate-200 pt-20 pb-10 border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

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
