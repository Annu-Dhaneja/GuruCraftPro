import React, { useState } from "react";
import { Send, User, Mail, MessageSquare, Briefcase, Loader2 } from "lucide-react";
import { PremiumButton, PremiumInput, GlassCard, SectionHeading } from "./UI";
import { servicesService } from "@/services/api/services";

export function ContactForm({ props }: { props: any }) {
    const { title, subtitle } = props || {};
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");
        setErrorMessage("");

        const formEl = e.currentTarget;
        const formData = new FormData(formEl);
        
        // Set metadata parameters
        formData.append("page_source", typeof window !== "undefined" ? window.location.pathname : "/contact");

        try {
            await servicesService.submitProjectIntake(formData);
            setStatus("success");
            formEl.reset();
        } catch (err: any) {
            console.error("Submission error:", err);
            setStatus("error");
            setErrorMessage(err?.data?.detail || "System link transmission failure.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 md:py-40 relative">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                <div>
                    <SectionHeading 
                        badge={subtitle || "Contact Neural"}
                        title="INITIATE COMMAND."
                        description={title || "Deploy our strategic design assets for your next mission. Reach out to our neural core."}
                    />

                    <div className="mt-20 space-y-12">
                        {[
                            { label: "Strategic Ops", value: "ops@gurucraftpro.com" },
                            { label: "Media Core", value: "media@gurucraftpro.com" },
                        ].map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2 group-hover:text-indigo-600 transition-colors italic">{item.label}</p>
                                <p className="text-3xl font-black italic tracking-tighter uppercase leading-none">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <GlassCard className="rounded-[4rem]">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Honeypot Spam Protection Field */}
                        <input 
                            type="text" 
                            name="website" 
                            style={{ display: "none" }} 
                            tabIndex={-1} 
                            autoComplete="off" 
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <PremiumInput 
                                label="Full Identity" 
                                name="name"
                                required
                                placeholder="e.g. Alexander Knight"
                                icon={<User className="w-4 h-4" />}
                            />
                            <PremiumInput 
                                label="Neural Address" 
                                name="email"
                                required
                                type="email"
                                placeholder="e.g. contact@domain.com"
                                icon={<Mail className="w-4 h-4" />}
                            />
                        </div>

                        <PremiumInput 
                            label="Mission Objective" 
                            name="inquiry_type"
                            required
                            placeholder="e.g. Brand Identity Overhaul"
                            icon={<Briefcase className="w-4 h-4" />}
                        />

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 italic">
                                Strategic Details
                            </label>
                            <div className="relative group">
                                <MessageSquare className="absolute left-4 top-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-4 h-4" />
                                <textarea
                                    name="message"
                                    required
                                    className="w-full bg-slate-50 border-2 border-slate-100 pl-12 pr-6 py-6 rounded-none focus:outline-none focus:border-indigo-600 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300 min-h-[180px] resize-none"
                                    placeholder="Describe your vision..."
                                />
                            </div>
                        </div>

                        {status === "success" && (
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold italic text-sm text-center">
                                TRANSMISSION COMPLETE. RESPONSE REGISTERED IN CORE.
                            </div>
                        )}

                        {status === "error" && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 font-bold italic text-sm text-center">
                                {errorMessage.toUpperCase()}
                            </div>
                        )}

                        <PremiumButton 
                            type="submit"
                            variant="primary" 
                            size="xl" 
                            fullWidth 
                            isLoading={loading}
                            icon={!loading && <Send className="w-5 h-5" />}
                            iconPosition="right"
                        >
                            {loading ? "TRANSMITTING..." : "TRANSMIT DATA"}
                        </PremiumButton>
                    </form>
                </GlassCard>
            </div>
        </section>
    );
}
