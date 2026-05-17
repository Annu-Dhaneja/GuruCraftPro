"use client";
// Admin Navigation v1.0.2 - Triggering deployment sync for 'Try Dress' link

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, LayoutDashboard, Settings, Globe, ArrowLeft, 
  Sparkles, LogOut, ShieldCheck, BookOpen, PenTool, 
  Lightbulb, Mail, Shirt, Layers, FormInput, FileImage, Users, Heart, Menu 
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CentralizedSEO } from "@/components/layout/CentralizedSEO";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const normalizedRole = role ? role.toLowerCase().replace("_", "-") : "";
    if (!token) {
      router.push("/login");
    } else if (normalizedRole !== "admin" && normalizedRole !== "super-admin") {
      // If logged in but not an admin/super-admin, redirect to user dashboard
      router.push("/dashboard");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

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
    <div className="flex h-screen overflow-hidden bg-slate-950 text-white">
      <CentralizedSEO title="Admin Console" />
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-white/5 hidden md:flex flex-col">
        <AdminSidebar onLogout={handleLogout} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-400" />
            <span className="font-bold tracking-tight">Admin Console</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r border-white/5">
              <AdminSidebar onLogout={handleLogout} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
