"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, Eye, EyeOff, Lock, User, ShieldCheck } from "lucide-react";
import { getApiUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/useAuthStore";

export function LoginForm() {
    const { login } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const loginData = new URLSearchParams();
            loginData.append("username", username);
            loginData.append("password", password);

            const res = await fetch(getApiUrl("/api/v1/auth/login"), {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: loginData,
            });

            if (res.ok) {
                const data = await res.json();
                
                // Use the centralized login method
                login(
                    { 
                        id: data.user?.id || 0, 
                        username: data.user?.username || username, 
                        role: data.role || "USER", 
                        name: data.user?.name || username,
                        email: data.user?.email || "" 
                    }, 
                    data.access_token
                );
                
                const normalizedRole = (data.role || "USER").toUpperCase();
                if (normalizedRole === "EDITOR") {
                    window.location.href = "/admin/content";
                } else if (["ADMIN", "SUPER_ADMIN"].includes(normalizedRole)) {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/dashboard";
                }
            } else {
                const errData = await res.json();
                const detail = errData.detail;
                setError(typeof detail === 'string' ? detail : "Authentication failed. Check your identity.");
            }
        } catch (err) {
            setError("Neural Core connection timeout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight uppercase italic text-center lg:text-left">Initialize <span className="text-indigo-400">Session</span></h1>
                <p className="text-slate-500 text-sm font-medium italic text-center lg:text-left">Authenticate your identity to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {error && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4" />
                        {error}
                    </div>
                )}
                
                <div className="space-y-3">
                    <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Identity Identifier</Label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                        <Input 
                            id="username" 
                            name="username" 
                            type="text" 
                            placeholder="USER_IDENTITY_X" 
                            required 
                            className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500/50 focus:ring-0 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" title="Encrypted password" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Security Key</Label>
                        <Link href="/forgot-password" className="text-[9px] font-black uppercase tracking-widest text-indigo-500 hover:text-white transition-colors">
                            Recover Key?
                        </Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                        <Input 
                            id="password" 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            required 
                            className="pl-12 pr-12 h-14 rounded-2xl bg-white/5 border-white/10 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500/50 focus:ring-0 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-16 rounded-[2rem] bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-500/20 transition-all active:scale-[0.98]" 
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <Loader2 className="animate-spin h-5 w-5" />
                            Authorizing...
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            Access Core <ArrowRight className="h-4 w-4" />
                        </div>
                    )}
                </Button>
            </form>

            <div className="text-center space-y-6 pt-4">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                    New Identity?{" "}
                    <Link href="/signup" className="text-indigo-400 hover:text-white transition-colors">
                        Request Profile
                    </Link>
                </p>
            </div>
        </div>
    );
}
