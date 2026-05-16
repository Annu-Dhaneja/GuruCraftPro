"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
    LayoutDashboard, 
    Users, 
    Shield, 
    FileText, 
    Image as ImageIcon, 
    Search, 
    Settings, 
    LogOut,
    Menu,
    X,
    ChevronRight,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/useAuthStore";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
    { label: "CMS Manager", href: "/admin/cms", icon: FileText, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
    { label: "Media Manager", href: "/admin/media", icon: ImageIcon, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
    { label: "User Management", href: "/admin/users", icon: Users, role: ["ADMIN", "SUPER_ADMIN"] },
    { label: "Role Management", href: "/admin/roles", icon: Shield, role: ["SUPER_ADMIN"] },
    { label: "SEO Manager", href: "/admin/seo", icon: Search, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
    { label: "Settings", href: "/admin/settings", icon: Settings, role: ["ADMIN", "SUPER_ADMIN"] },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    useEffect(() => {
        // Protect Route
        if (!isAuthenticated || (user && !["ADMIN", "SUPER_ADMIN", "EDITOR"].includes(user.role))) {
            router.push("/dashboard"); // Redirect unauthorized admin attempts to dashboard
        }
    }, [isAuthenticated, user, router, pathname]);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200">
            {/* Sidebar */}
            <aside 
                className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-slate-900/50 backdrop-blur-3xl border-r border-white/5 transition-all duration-300",
                    isSidebarOpen ? "w-72" : "w-20"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Brand */}
                    <div className="p-8 flex items-center justify-between">
                        <Link href="/" className={cn("font-black tracking-tighter uppercase italic transition-opacity", !isSidebarOpen && "opacity-0")}>
                            <span className="text-2xl">GURU</span>
                            <span className="text-indigo-500">PRO</span>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400">
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 space-y-2">
                        {NAV_ITEMS.filter(item => item.role.includes(user.role)).map((item) => (
                            <Link 
                                key={item.href} 
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative overflow-hidden",
                                    pathname === item.href 
                                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                                        : "hover:bg-white/5 text-slate-400 hover:text-white"
                                )}
                            >
                                <item.icon size={20} className={cn("shrink-0", pathname === item.href && "animate-pulse")} />
                                <span className={cn("font-bold text-sm tracking-tight transition-all", !isSidebarOpen && "opacity-0 translate-x-10")}>
                                    {item.label}
                                </span>
                                {pathname === item.href && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 mt-auto">
                        <div className={cn("p-4 rounded-3xl bg-slate-800/30 border border-white/5 mb-4 overflow-hidden transition-all", !isSidebarOpen && "opacity-0 h-0 p-0")}>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Active User</p>
                            <p className="font-bold text-sm truncate">{user.name || user.username}</p>
                            <p className="text-[10px] font-black uppercase text-indigo-400">{user.role}</p>
                        </div>
                        <Button 
                            variant="ghost" 
                            className="w-full justify-start gap-4 px-4 py-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                            onClick={() => logout()}
                        >
                            <LogOut size={20} />
                            <span className={cn("font-bold text-sm", !isSidebarOpen && "hidden")}>Logout System</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 flex flex-col transition-all duration-300",
                isSidebarOpen ? "ml-72" : "ml-20"
            )}>
                {/* Topbar */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Admin Control Panel</span>
                        <ChevronRight className="text-slate-700 w-4 h-4" />
                        <span className="font-black uppercase tracking-tighter italic">
                            {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Button variant="ghost" size="icon" className="text-slate-400 relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-950" />
                            </Button>
                        </div>
                        <div className="h-8 w-[1px] bg-white/5" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-xs">
                                {user.username.slice(0,2).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Workspace */}
                <div className="p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
}
