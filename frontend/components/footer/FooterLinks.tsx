"use client";

import Link from "next/link";
import { useSiteConfig } from "../layout/SiteConfigProvider";

export function FooterLinks() {
    const { config } = useSiteConfig();

    return (
        <>
            {/* Column 2: Explore */}
            <div>
                <h3 className="font-semibold text-white mb-6">Explore</h3>
                <ul className="space-y-4">
                    {(config?.footer_explore || []).map((link, idx) => (
                         <FooterLink key={idx} href={link.href} label={link.label} />
                    ))}
                </ul>
            </div>

            {/* Column 3: Support */}
            <div>
                <h3 className="font-semibold text-white mb-6">Support</h3>
                <ul className="space-y-4">
                    {(config?.footer_support || []).map((link, idx) => (
                        <FooterLink key={idx} href={link.href} label={link.label} />
                    ))}
                </ul>
            </div>

            {/* Column 4: Quick Links */}
            <div>
                <h3 className="font-semibold text-white mb-6">Quick Links</h3>
                <ul className="space-y-4">
                    <li>
                        <Link href="https://ommee.in/" target="_blank" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">
                            Developed by Om
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/Annu-Dhaneja" target="_blank" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">
                            Graphic Design by Annu
                        </Link>
                    </li>
                    <li>
                        <Link href="https://ommee.in/" target="_blank" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">
                            Official Website
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link
                href={href}
                className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
            >
                {label}
            </Link>
        </li>
    );
}
