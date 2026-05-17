"use client";

import { ArrowRight, ShieldCheck, CreditCard, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PremiumButton, PremiumInput } from "@/components/shared/PremiumUI";
import { servicesService } from "@/services/api/services";

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

            await servicesService.submitProjectIntake(data);
            toast.success("Subscribed successfully!");
            setEmail("");
        } catch (err: any) {
            console.error("Newsletter error:", err);
            const errMsg = err.data?.detail || "Subscription failed.";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4 leading-none">Stay Inspired</h3>
                <p className="text-sm text-slate-400 font-light italic leading-relaxed">
                    Join the creative circle. Get design tips & AI updates. No spam, only value.
                </p>
            </div>

            {/* Input Form */}
            <form className="space-y-4" onSubmit={handleSubscribe}>
                <PremiumInput
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-slate-800 text-white placeholder:text-slate-600 italic font-medium"
                />
                <PremiumButton 
                    type="submit" 
                    isLoading={loading}
                    className="w-full bg-white text-slate-900 hover:bg-indigo-600 hover:text-white"
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                >
                    SUBSCRIBE
                </PremiumButton>
            </form>

            {/* Trust Signals */}
            <div className="pt-8 border-t border-slate-900 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>Secure Protocols</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                    <CreditCard className="h-4 w-4 text-indigo-500" />
                    <span>Industrial NDAs</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>Global Coverage</span>
                </div>
            </div>
        </div>
    );
}
