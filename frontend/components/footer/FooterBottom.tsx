"use client";

import Link from "next/link";

export function FooterBottom() {
    return (
        <div className="border-t border-white/10 pt-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">

            {/* Copyright */}
            <div>
                © {new Date().getFullYear()} Gurucraftpro. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                </Link>
                <Link href="/refunds" className="hover:text-white transition-colors">
                    Refund Policy
                </Link>
            </div>

            {/* Optional: Language or Theme toggle placeholder */}
            <div className="hidden md:block opacity-50 hover:opacity-100 transition-opacity">
                English (US)
            </div>
        </div>
    );
}
