"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ArrowLeft, 
    Loader2, 
    UserPlus, 
    Mail, 
    Lock, 
    User, 
    ShieldCheck, 
    Zap,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn, fetchWithAuth } from "@/lib/utils";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetchWithAuth("/api/v1/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    name: formData.name,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Account created successfully! Redirecting to login...");
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            } else {
                toast.error(data.detail || "Signup failed. Please check your details.");
            }
        } catch (error: any) {
            console.error("Signup core error:", error);
            toast.error(`Account creation failed: ${error.message || "Unknown Error"}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <main className="min-h-screen bg-[#020617] text-white flex flex-col lg:flex-row overflow-hidden selection:bg-indigo-500/30">
            {/* Left Side - Cinematic Brand Reveal */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 items-center justify-center p-24">
                {/* Background Grid & Orbs */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse" />
                
                <div className="relative z-10 max-w-lg space-y-12">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-black italic shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">GP</div>
                        <span className="text-2xl font-black uppercase tracking-tighter italic">GURUCRaft <span className="text-indigo-400">Pro</span></span>
                    </Link>

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.4em] uppercase text-indigo-400">
                            <Zap className="w-3 h-3 fill-indigo-400" />
                            <span>Neural Membership</span>
                        </div>
                        <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                            JOIN THE <br />
                            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-100">ELITE 1%.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-light italic leading-relaxed">
                            Unlock the full power of our neural design ecosystem and high-fidelity fashion analysis.
                        </p>
                    </div>

                    <div className="space-y-4 pt-12 border-t border-white/5">
                        {[
                            "Neural Texture Mapping",
                            "High-Resolution Upscaling",
                            "AI Studio Lighting Core"
                        ].map(feature => (
                            <div key={feature} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <Check className="w-4 h-4 text-emerald-500" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative bg-[#020617]">
                {/* Mobile Header */}
                <div className="absolute top-8 left-8 flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-white" asChild>
                        <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
                    </Button>
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-12"
                >
                    <div className="space-y-4">
                        <h1 className="text-4xl font-black tracking-tight uppercase italic">Initialize <span className="text-indigo-400">Profile</span></h1>
                        <p className="text-slate-500 text-sm font-medium italic">Enter your credentials to access the neural core.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Full Name</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                    <Input 
                                        id="name" 
                                        placeholder="ALEX RIVIERA" 
                                        className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500/50 focus:ring-0 transition-all" 
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Username</Label>
                                <div className="relative group">
                                    <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                    <Input 
                                        id="username" 
                                        placeholder="ALEX_PRO" 
                                        className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500/50 focus:ring-0 transition-all" 
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email Address</Label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="ALEX@GURUCRaft.PRO" 
                                    className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500/50 focus:ring-0 transition-all" 
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="password" title="At least 8 characters" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Secure Password</Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                <Input 
                                    id="password" 
                                    type="password" 
                                    className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-white font-bold focus:border-indigo-500/50 focus:ring-0 transition-all" 
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Confirm Identity</Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                <Input 
                                    id="confirmPassword" 
                                    type="password" 
                                    className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-white font-bold focus:border-indigo-500/50 focus:ring-0 transition-all" 
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-16 rounded-[2rem] bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-500/20 transition-all active:scale-[0.98]" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Synchronizing...
                                </>
                            ) : (
                                "Confirm Access"
                            )}
                        </Button>
                    </form>

                    <div className="text-center space-y-6">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                            Authorized Already?{" "}
                            <Link href="/login" className="text-indigo-400 hover:text-white transition-colors">
                                Authenticate Here
                            </Link>
                        </p>
                        
                        <div className="flex items-center gap-4 justify-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
                            <ShieldCheck className="w-3 h-3" />
                            Secure Neural Encryption Active
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
