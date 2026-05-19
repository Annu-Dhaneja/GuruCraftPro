"use client";

import React from "react";
import { Send, User, Mail, MessageSquare, Briefcase } from "lucide-react";
import { PremiumButton, PremiumInput, GlassCard, SectionHeading } from "./UI";

export function ContactForm({ props }: { props: any }) {
    const { title, subtitle, form_id } = props || {};

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
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <PremiumInput 
                                label="Full Identity" 
                                placeholder="e.g. Alexander Knight"
                                icon={<User className="w-4 h-4" />}
                            />
                            <PremiumInput 
                                label="Neural Address" 
                                placeholder="e.g. contact@domain.com"
                                type="email"
                                icon={<Mail className="w-4 h-4" />}
                            />
                        </div>

                        <PremiumInput 
                            label="Mission Objective" 
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
                                    className="w-full bg-slate-50 border-2 border-slate-100 pl-12 pr-6 py-6 rounded-none focus:outline-none focus:border-indigo-600 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300 min-h-[180px] resize-none"
                                    placeholder="Describe your vision..."
                                />
                            </div>
                        </div>

                        <PremiumButton 
                            variant="primary" 
                            size="xl" 
                            fullWidth 
                            icon={<Send className="w-5 h-5" />}
                            iconPosition="right"
                        >
                            TRANSMIT DATA
                        </PremiumButton>
                    </form>
                </GlassCard>
            </div>
        </section>
    );
}
