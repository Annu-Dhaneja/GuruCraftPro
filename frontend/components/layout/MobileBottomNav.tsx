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
        label: "Expertise",
        href: "/portfolio",
        icon: ShoppingBag,
    },
    {
        label: "Strategy",
        href: "/services",
        icon: Calendar,
    },
    {
        label: "Account",
        href: "/dashboard",
        icon: User,
    },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    if (pathname && (
        pathname.startsWith('/admin') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup')
    )) {
        return null;
    }

    return (
        <nav className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md">
            <div className="bg-white/80 backdrop-blur-3xl border border-slate-100 rounded-[2.5rem] p-2 flex items-center justify-between shadow-2xl">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                    
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 flex-1 h-14 rounded-[1.8rem] transition-all duration-500",
                                isActive 
                                    ? "bg-indigo-600 text-white scale-105 shadow-xl shadow-indigo-600/30" 
                                    : "text-slate-400 hover:text-indigo-600"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "" : "")} />
                            <span className="text-[8px] font-black uppercase tracking-widest italic">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
