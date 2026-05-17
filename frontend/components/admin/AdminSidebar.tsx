"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FileText, Sparkles, Layers, Layout, Menu, Search, 
  FileImage, Users, ShieldCheck, Settings, Terminal, History, ArrowLeft, LogOut
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "CMS Manager", href: "/admin/cms", icon: FileText },
  { name: "Services", href: "/admin/services", icon: Sparkles },
  { name: "Portfolio", href: "/admin/portfolio", icon: Layers },
  { name: "Pages", href: "/admin/page-builder", icon: Layout },
  { name: "Navbar/Footer", href: "/admin/site-config", icon: Menu },
  { name: "SEO Manager", href: "/admin/seo", icon: Search },
  { name: "Media Manager", href: "/admin/media", icon: FileImage },
  { name: "User Manager", href: "/admin/users", icon: Users },
  { name: "Roles & Permissions", href: "/admin/roles", icon: ShieldCheck },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "API Logs", href: "/admin/api-logs", icon: Terminal },
  { name: "Activity Logs", href: "/admin/activity-logs", icon: History },
];


export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-slate-900/50 backdrop-blur-xl">
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
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
