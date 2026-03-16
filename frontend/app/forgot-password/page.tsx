"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    return (
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🔑</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Password Recovery</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                For security reasons, password resets are handled manually by the system administrator.
                Please contact the technical team to reset your credentials.
            </p>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/login">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                </Link>
            </Button>
        </main>
    );
}
