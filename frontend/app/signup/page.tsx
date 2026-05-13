"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, UserPlus, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is used, if not we'll use alert

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
            alert("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://guru-craft-pro.vercel.app";
            const response = await fetch(`${apiBase}/api/v1/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    name: formData.name,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("username", formData.username);
                
                alert("Account created successfully!");
                router.push("/shop"); // Redirect to shop or dashboard
            } else {
                alert(data.detail || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
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
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
            {/* Left Side - Visual */}
            <div className="hidden lg:block relative bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop"
                        alt="Fashion Design"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <Link href="/" className="font-bold text-2xl tracking-tighter mb-12 block group">
                        <span className="inline-block transition-transform group-hover:-translate-x-1">Annu</span>
                        <span className="text-indigo-500">.</span>
                    </Link>
                    
                    <div className="space-y-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                            New Collection Live
                        </div>
                        <h2 className="text-5xl font-black leading-none tracking-tight font-serif">
                            Elevate Your <br />
                            <span className="text-indigo-400 italic">Personal</span> Style.
                        </h2>
                        <p className="text-xl text-white/60 max-w-md font-light leading-relaxed">
                            Join our community to unlock personalized consultations and virtual try-ons.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-24 relative">
                <div className="absolute top-8 left-8 lg:left-24">
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-zinc-100" asChild>
                        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> Home</Link>
                    </Button>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-4xl font-black tracking-tight">Create Account</h1>
                        <p className="text-muted-foreground">Start your journey with Annu Design Studio today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input 
                                        id="name" 
                                        placeholder="John Doe" 
                                        className="pl-10 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white transition-all" 
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input 
                                        id="username" 
                                        placeholder="johndoe" 
                                        className="pl-10 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white transition-all" 
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    className="pl-10 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white transition-all" 
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input 
                                    id="password" 
                                    type="password" 
                                    className="pl-10 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white transition-all" 
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input 
                                    id="confirmPassword" 
                                    type="password" 
                                    className="pl-10 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white transition-all" 
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-14 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold text-lg shadow-xl shadow-zinc-200 transition-all active:scale-[0.98]" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </form>

                    <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-indigo-600 font-bold hover:underline underline-offset-4">
                                Log in
                            </Link>
                        </p>
                    </div>

                    <p className="text-xs text-center text-muted-foreground pt-8">
                        By clicking Sign Up, you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-2">Terms of Service</Link> and{" "}
                        <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </main>
    );
}
