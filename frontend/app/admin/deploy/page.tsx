"use client";

import { CheckCircle, Globe, Rocket, ShieldCheck, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NetlifyDeployPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-20 font-sans selection:bg-indigo-500/30">
            <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                
                {/* Header */}
                <div className="space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-black uppercase tracking-widest">
                        <Rocket className="w-4 h-4" />
                        Production Orchestration
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                        NETLIFY <span className="text-indigo-500">PRO</span> DEPLOY
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                        Follow these exact steps to finalize your professional cloud hosting setup.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid gap-8">
                    
                    {/* Step 1 */}
                    <div className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/[0.07] transition-all duration-500">
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <div className="w-16 h-16 bg-indigo-500 rounded-3xl flex items-center justify-center text-3xl font-black shadow-xl shadow-indigo-500/20 shrink-0">1</div>
                            <div className="space-y-6 flex-1">
                                <h2 className="text-3xl font-bold tracking-tight">Connect GitHub Repo</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                                    Go to <a href="https://app.netlify.com" target="_blank" className="text-indigo-400 hover:underline">Netlify</a>, click "Add new site" → "Import an existing project" and select:
                                </p>
                                <div className="bg-black/50 p-6 rounded-2xl border border-white/5 font-mono text-indigo-400 break-all select-all">
                                    https://github.com/om-prakash16/virtual_try
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/[0.07] transition-all duration-500">
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-3xl font-black shrink-0">2</div>
                            <div className="space-y-6 flex-1">
                                <h2 className="text-3xl font-bold tracking-tight">Configuration Matrix</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                                    Set these exact build settings in the Netlify Deployment UI:
                                </p>
                                <div className="grid gap-4">
                                    <div className="flex justify-between p-5 bg-black/40 rounded-xl border border-white/5">
                                        <span className="text-muted-foreground font-bold uppercase text-xs tracking-widest">Base directory</span>
                                        <span className="text-white font-mono">frontend</span>
                                    </div>
                                    <div className="flex justify-between p-5 bg-black/40 rounded-xl border border-white/5">
                                        <span className="text-muted-foreground font-bold uppercase text-xs tracking-widest">Build command</span>
                                        <span className="text-white font-mono">npm run build</span>
                                    </div>
                                    <div className="flex justify-between p-5 bg-black/40 rounded-xl border border-white/5">
                                        <span className="text-muted-foreground font-bold uppercase text-xs tracking-widest">Publish directory</span>
                                        <span className="text-white font-mono">frontend/.next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/[0.07] transition-all duration-500 border-indigo-500/30">
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <div className="w-16 h-16 bg-indigo-500/20 rounded-3xl flex items-center justify-center text-3xl font-black text-indigo-400 shrink-0">3</div>
                            <div className="space-y-6 flex-1">
                                <h2 className="text-3xl font-bold tracking-tight">Environment Sync</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                                    In the "Environment Variables" section, add this strictly required variable:
                                </p>
                                <div className="p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/20">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">Variable Key</p>
                                    <p className="font-mono text-xl text-white mb-6 select-all">NEXT_PUBLIC_API_URL</p>
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">Variable Value</p>
                                    <p className="font-mono text-lg text-white select-all">https://virtual-trys.onrender.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Certification */}
                <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="w-12 h-12 text-emerald-500" />
                        <div>
                            <p className="font-black text-white uppercase tracking-tighter">System Certified</p>
                            <p className="text-xs text-muted-foreground font-medium">Orchestration level: Enterprise Dynamic</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
