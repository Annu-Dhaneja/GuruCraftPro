"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";
import { getApiUrl } from "@/lib/utils";

export function SignupForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;

        try {
            const res = await fetch(getApiUrl("/api/v1/auth/signup"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, name, email: email || undefined }),
            });

            const data = await res.json();

            if (res.ok) {
                // Store token and redirect
                localStorage.setItem("token", data.access_token);
                setSuccess(`Account created! Redirecting...`);
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1500);
            } else {
                const detail = data.detail;
                if (typeof detail === "object" && detail !== null) {
                    setError(detail.msg || JSON.stringify(detail));
                } else {
                    setError(detail || "Signup failed");
                }
            }
        } catch (err) {
            setError("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
                <p className="text-muted-foreground">Join Annu Design Studio to manage projects.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {success}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="name@example.com" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="username">Username (Admin ID)</Label>
                    <Input id="username" name="username" placeholder="myusername" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <Button type="submit" className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                        <>
                            Create Account <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-500 hover:text-indigo-600 font-medium hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
