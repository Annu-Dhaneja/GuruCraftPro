"use client";

import Link from "next/link";

export function FooterLinks() {
    return (
        <>
            {/* Column 2: Explore */}
            <div>
                <h3 className="font-semibold text-white mb-6">Explore</h3>
                <ul className="space-y-4">
                    <FooterLink href="/services" label="Services" />
                    <FooterLink href="/portfolio" label="Portfolio" />
                    <FooterLink href="/ai-lab" label="AI Design Lab" />
                    <FooterLink href="/resources" label="Resources" />
                    <FooterLink href="/blog" label="Design Blog" />
                    <FooterLink href="/about" label="About Us" />
                </ul>
            </div>

            {/* Column 3: Support */}
            <div>
                <h3 className="font-semibold text-white mb-6">Support</h3>
                <ul className="space-y-4">
                    <FooterLink href="/request" label="Request Custom Design" />
                    <FooterLink href="/dashboard" label="Client Dashboard" />
                    <FooterLink href="/faq" label="FAQs" />
                    <FooterLink href="/contact" label="Contact Us" />
                    <FooterLink href="/book" label="Book a Call" />
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
