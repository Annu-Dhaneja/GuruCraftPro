"use client";

import React from "react";
import { LoginForm } from "@/components/sections/auth/LoginForm";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ShieldCheck, Zap } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white flex flex-col lg:flex-row overflow-hidden selection:bg-indigo-500/30">
            {/* Left Side - Form Container */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative bg-[#020617] z-10">
                <div className="absolute top-8 left-8">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return Home</span>
                    </Link>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <LoginForm />
                </motion.div>
            </div>

            {/* Right Side - Visual Brand Story */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 items-center justify-center p-24 overflow-hidden border-l border-white/5">
                {/* Background Grid & Orbs */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse" />
                
                <div className="relative z-10 max-w-lg space-y-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.4em] uppercase text-indigo-400">
                            <Zap className="w-3 h-3 fill-indigo-400" />
                            <span>System Authentication</span>
                        </div>
                        <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                            ACCESS THE <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-100">NEURAL CORE.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-light italic leading-relaxed">
                            Log in to manage your collection, process high-fidelity assets, and interact with the AI stylist.
                        </p>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            Active Session Protection
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-800">v4.2.1-STABLE</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
