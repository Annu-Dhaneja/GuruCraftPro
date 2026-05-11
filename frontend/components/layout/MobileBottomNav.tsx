"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
    Home, 
    Sparkles, 
    ShoppingBag, 
    Calendar, 
    User 
} from "lucide-react";

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: Home,
    },
    {
        label: "AI Lab",
        href: "/ai-lab",
        icon: Sparkles,
    },
    {
        label: "Shop",
        href: "/services/guru-ji-art",
        icon: ShoppingBag,
    },
    {
        label: "Planner",
        href: "/wedding",
        icon: Calendar,
    },
    {
        label: "Profile",
        href: "/dashboard",
        icon: User,
    },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    // Hide bottom nav on dashboard or admin pages if they have their own navigation
    if (pathname && (pathname.startsWith('/admin'))) {
        return null;
    }

    return (
        <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md">
            <div className="bg-[#020617]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                    
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-[2rem] transition-all duration-500",
                                isActive 
                                    ? "bg-primary text-white scale-110 shadow-[0_0_20px_rgba(124,58,237,0.4)]" 
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6", isActive ? "animate-pulse" : "")} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
