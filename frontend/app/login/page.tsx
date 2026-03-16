import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login | Gurucraftpro",
    description: "Sign in to your account.",
};

export default function LoginPage() {
    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center items-center bg-background relative">
                <div className="absolute top-8 left-8">
                    <Link href="/" className="font-bold text-xl tracking-tighter">
                        Gurucraftpro<span className="text-indigo-500">.</span>
                    </Link>
                </div>
                <LoginForm />
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:block relative bg-zinc-900 border-l border-white/5">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                        alt="Abstract Design"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <blockquote className="text-2xl font-medium leading-relaxed mb-4">
                        "Crafting digital experiences where human creativity meets artificial intelligence."
                    </blockquote>
                    <cite className="text-white/60 not-italic">— Annu Design Studio</cite>
                </div>
            </div>
        </main>
    );
}
