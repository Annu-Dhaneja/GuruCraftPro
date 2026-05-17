"use client";

import React, { useEffect, useState } from "react";
import { 
  FileText, Sparkles, Layers, Search, ImageIcon, Heart, 
  HelpCircle, BookOpen, ArrowRight, UserCheck, Activity, ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { getApiUrl, safeFetch } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";

export default function EditorDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await safeFetch(getApiUrl("/api/v1/cms/stats"), {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.ok) {
          setStats(await res.json());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const shortcuts = [
    { label: "Visual Page Builder", href: "/admin/pages", desc: "Manage component structures & SEO for website pages", icon: Layout, color: "from-indigo-600 to-indigo-800" },
    { label: "Elite Services", href: "/admin/services", desc: "Orchestrate specialized services catalog & packages", icon: Sparkles, color: "from-purple-600 to-purple-800" },
    { label: "Creative Portfolio", href: "/admin/portfolio", desc: "Showcase client projects & visual artwork outputs", icon: Layers, color: "from-emerald-600 to-emerald-800" },
    { label: "Media Library", href: "/admin/media", desc: "Upload and index graphical assets & background files", icon: ImageIcon, color: "from-rose-600 to-rose-800" },
    { label: "SEO Architecture", href: "/admin/seo", desc: "Verify and adjust search engine indexing meta details", icon: Search, color: "from-amber-600 to-amber-800" },
    { label: "Customer FAQ Panel", href: "/admin/faq", desc: "Manage helper question sheets & support items", icon: HelpCircle, color: "from-sky-600 to-sky-800" },
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-white/5 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-[10px] tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full w-fit">
              <UserCheck size={12} /> Editorial Portal Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase">
              Welcome back, <span className="text-indigo-400 not-italic font-extrabold">{user?.name || user?.username || "Editor"}</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl font-light italic">
              Empowering GurucraftPro content nodes with premium design orchestration.
            </p>
          </div>
          <Link href="/admin/pages">
            <Button size="lg" className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-white hover:text-black font-black text-xs tracking-wider uppercase transition-all shadow-lg shadow-indigo-500/10 gap-2">
              Access CMS Matrix <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Active CMS Pages", value: stats?.cms_pages_count || "7", desc: "Pages in database", icon: FileText, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Forms Submitted", value: stats?.total_submissions || "0", desc: "User submission requests", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Media Library Size", value: "Verified", desc: "Asset repository status", icon: ImageIcon, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((card, i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{card.desc}</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{card.label}</p>
            <h3 className="text-3xl font-black italic tracking-tighter text-white">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Grid of Shortcuts */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black italic uppercase tracking-tight text-white">Direct Command Workspace</h2>
          <p className="text-slate-500 text-sm italic">Never type manually. Navigate to visual panels directly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shortcuts.map((shortcut, i) => (
            <Link key={i} href={shortcut.href} className="group">
              <div className="glass-card p-8 rounded-[2rem] border border-white/5 group-hover:border-indigo-500/30 transition-all duration-500 h-full flex flex-col justify-between hover:bg-slate-900/10">
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${shortcut.color} flex items-center justify-center text-white shadow-lg`}>
                    <shortcut.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                      {shortcut.label}
                    </h3>
                    <p className="text-slate-400 text-sm mt-2 font-medium leading-relaxed italic">{shortcut.desc}</p>
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Panel <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reuse layout icon
import { Layout } from "lucide-react";
