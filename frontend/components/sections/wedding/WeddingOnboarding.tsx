"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, MapPin, Calendar, Users, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OnboardingProps {
    onComplete: (data: { partner_names: string; location: string; wedding_date: string; guest_count: number }) => void;
}

export function WeddingOnboarding({ onComplete }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        partner_names: "",
        location: "",
        wedding_date: "",
        guest_count: 100,
    });

    const next = () => setStep(s => s + 1);

    const finish = () => {
        if (data.partner_names && data.location && data.wedding_date) {
            onComplete(data);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-xl glass-card rounded-[3rem] p-10 md:p-14 border border-white/10 overflow-hidden"
            >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-primary fill-primary/20" />
                        </div>
                        <div className="h-px flex-1 bg-white/5" />
                        <div className="flex gap-2">
                            {[1, 2, 3].map(s => (
                                <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? "w-8 bg-primary" : "w-2 bg-white/10"}`} />
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Welcome to Your <br /><span className="text-primary text-shimmer">Dream Planner</span></h2>
                                    <p className="text-slate-400 text-sm leading-relaxed">Let's start with the basics. Who is this beautiful celebration for?</p>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Partner Names</label>
                                    <Input 
                                        value={data.partner_names}
                                        onChange={e => setData({...data, partner_names: e.target.value})}
                                        placeholder="e.g. Priya & Arjun"
                                        className="h-16 bg-white/5 border-white/10 rounded-2xl text-xl font-bold px-6 focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <Button 
                                    disabled={!data.partner_names}
                                    onClick={next}
                                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs transition-all shadow-[0_15px_40px_rgba(var(--primary-rgb),0.3)]"
                                >
                                    CONTINUE JOURNEY <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">The <span className="text-primary">Where</span> & <span className="text-primary">When</span></h2>
                                    <p className="text-slate-400 text-sm leading-relaxed">Every story has a setting. Tell us about yours.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Wedding Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                            <Input 
                                                value={data.location}
                                                onChange={e => setData({...data, location: e.target.value})}
                                                placeholder="e.g. Udaipur Palace"
                                                className="h-14 bg-white/5 border-white/10 rounded-xl pl-12 font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Wedding Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                            <Input 
                                                type="date"
                                                value={data.wedding_date}
                                                onChange={e => setData({...data, wedding_date: e.target.value})}
                                                className="h-14 bg-white/5 border-white/10 rounded-xl pl-12 font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="ghost" onClick={() => setStep(1)} className="h-16 flex-1 rounded-2xl text-slate-400 font-bold">BACK</Button>
                                    <Button 
                                        disabled={!data.location || !data.wedding_date}
                                        onClick={next}
                                        className="h-16 flex-[2] rounded-2xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs"
                                    >
                                        NEXT STEP <ChevronRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">One <span className="text-primary">Last Detail</span></h2>
                                    <p className="text-slate-400 text-sm leading-relaxed">Roughly how many guests are you expecting?</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Estimated Guest Count</label>
                                            <span className="text-2xl font-black text-primary italic">{data.guest_count}</span>
                                        </div>
                                        <input 
                                            type="range"
                                            min="20"
                                            max="1000"
                                            step="10"
                                            value={data.guest_count}
                                            onChange={e => setData({...data, guest_count: Number(e.target.value)})}
                                            className="w-full accent-primary h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-600">
                                            <span>Intimate (20)</span>
                                            <span>Grand (1000+)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <Button variant="ghost" onClick={() => setStep(2)} className="h-16 flex-1 rounded-2xl text-slate-400 font-bold">BACK</Button>
                                    <Button 
                                        onClick={finish}
                                        className="h-16 flex-[2] rounded-2xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs shadow-[0_15px_40px_rgba(var(--primary-rgb),0.3)]"
                                    >
                                        FINISH SETUP <Check className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
