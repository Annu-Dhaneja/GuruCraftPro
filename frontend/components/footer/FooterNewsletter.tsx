"use client";

import { ArrowRight, ShieldCheck, CreditCard, Globe } from "lucide-react";

export function FooterNewsletter() {
    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-white mb-2">Stay Inspired</h3>
            <p className="text-sm text-muted-foreground">
                Join the creative circle. Get design tips & AI updates. No spam, only value.
            </p>

            {/* Input Form */}
            <form className="flex flex-col gap-3">
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                </div>
                <button className="w-full bg-white text-black font-medium py-3 rounded-lg text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group">
                    Subscribe
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            {/* Trust Signals */}
            <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="h-4 w-4 text-indigo-500" />
                    <span>Invoices & NDAs Available</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>Global Clients Supported</span>
                </div>
            </div>
        </div>
    );
}
