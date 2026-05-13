"use client";

import { ArrowRight, ShieldCheck, CreditCard, Globe, Loader2 } from "lucide-react";
import { useState } from "react";
import { getApiUrl } from "@/lib/utils";
import { toast } from "sonner";

export function FooterNewsletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const data = new FormData();
            data.append("name", "Newsletter Subscriber");
            data.append("email", email);
            data.append("inquiry_type", "Newsletter Subscription");
            data.append("message", "User subscribed to newsletter from footer.");

            const res = await fetch(getApiUrl("/api/v1/contact/"), {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                toast.success("Subscribed successfully!");
                setEmail("");
            } else {
                toast.error("Subscription failed.");
            }
        } catch (err) {
            toast.error("Connection error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-white mb-2">Stay Inspired</h3>
            <p className="text-sm text-muted-foreground">
                Join the creative circle. Get design tips & AI updates. No spam, only value.
            </p>

            {/* Input Form */}
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-white text-black font-medium py-3 rounded-lg text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                    {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
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
