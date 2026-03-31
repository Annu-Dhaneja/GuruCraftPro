"use client";
// Admin Navigation v1.0.2 - Triggering deployment sync for 'Try Dress' link

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, LayoutDashboard, Settings, Globe, ArrowLeft, Sparkles, LogOut, ShieldCheck, BookOpen, PenTool, Lightbulb, Mail, Shirt } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

    const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Site Configuration", href: "/admin/site-config", icon: Settings },
    { name: "Try Dress", href: "/admin/wardrobe", icon: Shirt },
    { name: "Home Page CMS", href: "/admin/home", icon: Home },
    { name: "About Page CMS", href: "/admin/about", icon: BookOpen },
    { name: "Services CMS", href: "/admin/services", icon: LayoutDashboard },
    { name: "Guruji Darshan CMS", href: "/admin/guruji", icon: Sparkles },
    { name: "AI Lab CMS", href: "/admin/ai-lab", icon: Sparkles },
    { name: "Portfolio CMS", href: "/admin/portfolio", icon: PenTool },
    { name: "Resources CMS", href: "/admin/resources", icon: Lightbulb },
    { name: "FAQ CMS", href: "/admin/faq", icon: ShieldCheck },
    { name: "Clothing Library", href: "/admin/clothes-planner", icon: Sparkles },
    { name: "Contact Page CMS", href: "/admin/contact", icon: Mail },
    { name: "Content Blog", href: "/admin/blog", icon: BookOpen },
    { name: "User Management", href: "/admin/users", icon: Globe },
    { name: "Media Library", href: "/admin/media", icon: Globe },
  ];

  if (!isAuthorized) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-white pt-24">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Site</span>
          </Link>
          <h2 className="text-xl font-bold tracking-tight">Admin Console</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage website content</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname && pathname.startsWith(item.href + '/'));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-400" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground">
            <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              A
            </div>
            Admin User
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
