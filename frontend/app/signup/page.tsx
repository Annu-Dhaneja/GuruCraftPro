import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign Up | Annu Design Studio",
    description: "Create your account.",
};

export default function SignupPage() {
    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Visual */}
            <div className="hidden lg:block relative bg-zinc-900 border-r border-white/5">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop"
                        alt="Creative Workspace"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute top-12 left-12 right-12 text-white">
                    <Link href="/" className="font-bold text-2xl tracking-tighter mb-8 block">
                        Annu<span className="text-indigo-500">.</span>
                    </Link>
                    <h2 className="text-4xl font-bold mb-4">Join the creative revolution.</h2>
                    <p className="text-lg text-white/70">Unlock AI-powered design tools and exclusive resources.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center items-center bg-background">
                <SignupForm />
            </div>
        </main>
    );
}
