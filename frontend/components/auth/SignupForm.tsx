"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";

export function SignupForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate signup
        setTimeout(() => {
            setLoading(false);
            alert("Account created successfully!");
        }, 2000);
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
                <p className="text-muted-foreground">Join Gurucraftpro to manage projects.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a password" required />
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
