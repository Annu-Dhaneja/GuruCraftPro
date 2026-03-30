import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ban, ArrowLeft, Lock } from "lucide-react";

export const metadata: Metadata = {
    title: "Signups Disabled | Annu Design Studio",
    description: "Registration for new accounts is currently closed.",
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
                    <h2 className="text-4xl font-bold mb-4 italic font-serif">A Space for Exclusivity.</h2>
                    <p className="text-lg text-white/70">Our platform is currently in private beta. Direct registration is suspended.</p>
                </div>
            </div>

            {/* Right Side - Message */}
            <div className="flex flex-col justify-center items-center bg-background p-8 lg:p-24 text-center">
                <div className="w-24 h-24 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-10 animate-pulse">
                    <Lock className="w-10 h-10 text-rose-500" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Registration Closed</h1>
                <p className="text-xl text-muted-foreground mb-12 max-w-md leading-relaxed">
                    We are currently not accepting new member registrations. 
                    If you have an invite code or require access, please contact our support team.
                </p>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Button size="lg" className="h-16 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold" asChild>
                        <Link href="/login">Go to Login Page</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-16 rounded-2xl font-bold" asChild>
                        <Link href="/"><ArrowLeft className="mr-2 w-5 h-5" /> Back to Home</Link>
                    </Button>
                </div>

                <div className="mt-20 pt-12 border-t border-border w-full max-w-md text-sm text-muted-foreground italic">
                    "Crafting excellence requires focus. We'll be back with public access soon."
                </div>
            </div>
        </main>
    );
}
