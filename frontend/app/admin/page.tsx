"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  LayoutDashboard, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Search,
  ExternalLink
} from "lucide-react";
import { getApiUrl } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(getApiUrl("/api/v1/cms/stats"), {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard Stats Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="p-20 flex flex-col items-center justify-center text-white">
      <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
      <p className="text-muted-foreground font-medium">Loading Dashboard...</p>
    </div>
  );

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-sm hover:border-indigo-500/50 transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${color}/10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
          <h3 className="text-2xl font-bold text-white mt-0.5">{value}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground font-medium mt-1">Manage your website content and view recent inquiries.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Site
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={MessageSquare} 
          label="Total Inquiries" 
          value={stats?.total_submissions || 0} 
          color="bg-indigo-500" 
        />
        <StatCard 
          icon={LayoutDashboard} 
          label="CMS Pages" 
          value={stats?.cms_sections_count || 0} 
          color="bg-amber-500" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Site Status" 
          value="Healthy" 
          color="bg-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="text-indigo-400 w-5 h-5" />
              Recent Inquiries
            </h2>
            <Link href="/admin/contacts" className="text-indigo-400 text-sm font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
            {stats?.recent_submissions?.length > 0 ? (
              stats.recent_submissions.map((sub: any) => (
                <div key={sub.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-indigo-400">
                      {sub?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{sub?.name || "Unknown"}</h4>
                      <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">{sub?.type || "General Inquiry"} — {sub?.date ? new Date(sub.date).toLocaleDateString() : "Recent"}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-indigo-400 font-bold text-xs" asChild>
                    <Link href={`/admin/contacts?id=${sub.id}`}>View Details</Link>
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-16 text-center">
                <p className="text-muted-foreground font-medium italic">No recent inquiries found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-amber-400 w-5 h-5" />
              Quick Links
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Edit Home Page", link: "/admin/home", icon: ShieldCheck },
                { label: "Edit About Page", link: "/admin/about", icon: Users },
                { label: "Edit Portfolio", link: "/admin/portfolio", icon: Search },
                { label: "Edit Services", link: "/admin/services", icon: LayoutDashboard },
                { label: "Manage 7-Day Planner", link: "/admin/clothes-planner", icon: Sparkles, highlight: true },
              ].map((action, i) => (
                <Link key={i} href={action.link} className={`flex items-center justify-between p-4 border rounded-xl transition-all group ${action.highlight ? 'bg-indigo-600/10 border-indigo-500/50 hover:bg-indigo-600/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                  <div className="flex items-center gap-3">
                    <action.icon className={`w-4 h-4 ${action.highlight ? 'text-indigo-400' : 'text-muted-foreground'}`} />
                    <span className="font-bold text-sm text-white">{action.label}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </section>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
             <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                System Status: Online
             </h3>
             <p className="text-emerald-300/80 text-[11px] font-medium">All systems are running correctly. Database connection is healthy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
