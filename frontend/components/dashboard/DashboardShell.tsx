"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderOpen,
    Settings,
    LogOut,
    Menu,
    X,
    Sparkles,
    MessageSquare,
    User,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
    children: React.ReactNode;
}

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/projects", label: "My Projects", icon: FolderOpen },
    { href: "/ai-lab", label: "AI Design Lab", icon: Sparkles },

    { href: "/request", label: "New Request", icon: MessageSquare },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: DashboardShellProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-muted/20 flex">
            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:flex flex-col w-64 bg-background border-r border-border h-screen sticky top-0">
                <div className="p-6 border-b border-border">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            AD
                        </div>
                        <span>Studio</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50 mb-4">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                            AN
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Gurucraftpro</p>
                            <p className="text-xs text-muted-foreground truncate">hello@gurucraftpro.com</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 border-b border-border bg-background flex items-center justify-between px-4 sticky top-0 z-30">
                    <Link href="/" className="font-bold text-lg">Gurucraftpro</Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </header>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-16 z-20 bg-background border-b border-border animate-in slide-in-from-top-10">
                        <nav className="p-4 space-y-2">
                            {navItems.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                                        pathname === item.href
                                            ? "bg-indigo-50 text-indigo-600"
                                            : "text-muted-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-border mt-4">
                                <Button variant="ghost" className="w-full justify-start text-red-500">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
