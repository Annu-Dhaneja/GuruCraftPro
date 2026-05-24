"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, FileText, Sparkles, Layers, Layout, Menu, Search, 
  FileImage, Users, Shield, Settings, Terminal, History, LogOut,
  Bell, ChevronRight, X, Heart, HelpCircle, BookOpen, ArrowLeft, Palette
} from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CentralizedSEO } from "@/components/layout/CentralizedSEO";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, role: ["ADMIN", "SUPER_ADMIN"] },
  { label: "Pages", href: "/admin/pages", icon: Layout, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
  { label: "Services", href: "/admin/services", icon: Sparkles, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
  { label: "Portfolio", href: "/admin/portfolio", icon: Layers, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
  { label: "Media Library", href: "/admin/media", icon: FileImage, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
  { label: "Theme & Layout", href: "/admin/theme", icon: Palette, role: ["ADMIN", "SUPER_ADMIN"] },
  { label: "Navigation", href: "/admin/site-config", icon: Menu, role: ["ADMIN", "SUPER_ADMIN"] },
  { label: "SEO", href: "/admin/seo", icon: Search, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
  { label: "Forms & Leads", href: "/admin/forms", icon: FileText, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
  { label: "Users", href: "/admin/users", icon: Users, role: ["ADMIN", "SUPER_ADMIN"] },
  { label: "Settings", href: "/admin/settings", icon: Settings, role: ["ADMIN", "SUPER_ADMIN"] },
  { label: "Activity Logs", href: "/admin/activity-logs", icon: History, role: ["ADMIN", "SUPER_ADMIN"] },
  { label: "Help & Guide", href: "/admin/help-guide", icon: HelpCircle, role: ["ADMIN", "SUPER_ADMIN", "EDITOR"] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Make sure Zustand auth store checks identity
    checkAuth();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const normalizedRole = role ? role.toLowerCase().replace("_", "-") : "";
    
    if (!token) {
      router.push("/login");
    } else if (normalizedRole !== "admin" && normalizedRole !== "super-admin" && normalizedRole !== "editor") {
      router.push("/dashboard");
    } else {
      setIsAuthorized(true);
      // Redirect editors directly away from administrative dashboard metric command centers
      if (normalizedRole === "editor" && pathname === "/admin") {
        router.push("/admin/content");
      }
    }
  }, [router, pathname]);

  const handleLogout = () => {
    logout();
    localStorage.clear();
    router.push("/login");
  };

  if (!isAuthorized || !user) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm font-semibold tracking-widest uppercase animate-pulse">Establishing Secure Uplink...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      <CentralizedSEO title="Admin Console | GuruCraftPro" />
      
      {/* Sidebar Overlay for Mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-slate-900/80 lg:bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 transition-all duration-300 flex flex-col h-full",
          isMobile 
            ? (isSidebarOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full")
            : (isSidebarOpen ? "w-72 translate-x-0" : "w-20 translate-x-0")
        )}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link 
            href="/" 
            className={cn(
              "font-black tracking-tighter uppercase italic transition-opacity flex items-center gap-2", 
              (!isSidebarOpen && !isMobile) && "opacity-0"
            )}
          >
            <span className="text-xl text-white">GURU</span>
            <span className="text-indigo-500 text-xl">PRO</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white rounded-xl">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        {/* Back Link */}
        {isSidebarOpen && (
          <div className="px-6 py-4">
            <Link href="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-400 transition-colors font-bold uppercase tracking-wider">
              <ArrowLeft className="h-3 w-3" /> Back to main site
            </Link>
          </div>
        )}

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.filter(item => item.role.includes(user.role)).map((item) => {
            const isActive = pathname === item.href || (pathname && pathname.startsWith(item.href + '/'));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative overflow-hidden",
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                    : "hover:bg-white/5 text-slate-400 hover:text-white"
                )}
                onClick={() => {
                  if (isMobile) {
                    setIsSidebarOpen(false);
                  }
                }}
              >
                <item.icon size={18} className={cn("shrink-0", isActive && "animate-pulse")} />
                <span className={cn("font-bold text-xs tracking-wider uppercase transition-all duration-300", (!isSidebarOpen && !isMobile) && "opacity-0 translate-x-10")}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer user metadata */}
        <div className="p-4 border-t border-white/5 mt-auto bg-slate-900/20">
          <div className={cn("p-4 rounded-2xl bg-slate-800/30 border border-white/5 mb-3 overflow-hidden transition-all duration-300", (!isSidebarOpen && !isMobile) && "opacity-0 h-0 p-0 mb-0")}>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Authenticated</p>
            <p className="font-bold text-sm truncate text-white">{user.name || user.username}</p>
            <p className="text-[9px] font-black uppercase tracking-wider text-indigo-400 mt-0.5">{user.role}</p>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-4 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span className={cn("font-bold text-xs uppercase tracking-wider", (!isSidebarOpen && !isMobile) && "hidden")}>Logout Console</span>
          </Button>
        </div>
      </aside>

      {/* Main Panel Content Container */}
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300 overflow-y-auto h-screen ml-0",
        isSidebarOpen ? "lg:ml-72" : "lg:ml-20"
      )}>
        {/* Responsive top header banner */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden text-slate-400 hover:text-white rounded-xl mr-2"
              >
                <Menu size={20} />
              </Button>
            )}
            <span className="text-slate-600 font-bold uppercase text-[9px] tracking-widest">Platform Core</span>
            <ChevronRight className="text-slate-800 w-3.5 h-3.5" />
            <span className="font-black uppercase tracking-tighter italic text-indigo-400 text-sm">
              {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-xl">
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              </Button>
            </div>
            <div className="h-6 w-[1px] bg-white/5" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-black text-xs text-white shadow-lg shadow-indigo-500/10 border border-white/10 uppercase">
                {user.username.slice(0, 2)}
              </div>
            </div>
          </div>
        </header>

        {/* Real Content body */}
        <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
}
