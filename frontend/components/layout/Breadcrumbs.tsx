"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
    const pathname = usePathname();
    if (pathname === "/") return null;

    const paths = pathname.split("/").filter(Boolean);
    
    // Don't show breadcrumbs on dashboard or admin by default (or handle differently)
    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) return null;

    return (
        <nav className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>Source</span>
            </Link>
            
            {paths.map((path, idx) => {
                const href = `/${paths.slice(0, idx + 1).join("/")}`;
                const isLast = idx === paths.length - 1;
                const label = path.replace(/-/g, " ");

                return (
                    <div key={href} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-slate-700" />
                        {isLast ? (
                            <span className="text-indigo-400 italic">{label}</span>
                        ) : (
                            <Link href={href} className="hover:text-white transition-colors">
                                {label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
