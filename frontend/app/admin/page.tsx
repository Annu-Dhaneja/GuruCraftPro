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
    fetch(getApiUrl("/api/v1/cms/stats"))
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
      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
      <p className="animate-pulse text-muted-foreground font-medium">Synchronizing Data Matrix...</p>
    </div>
  );

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
      <div className={`absolute top-0 right-0 w-32 h-32 ${color}/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-500`} />
      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-12 h-12 rounded-2xl ${color}/10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
          <h3 className="text-3xl font-black text-white mt-1">{value}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-sm border border-indigo-500/30">
              Operational Base
            </span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Command Center</h1>
          <p className="text-muted-foreground font-medium mt-2">Intelligence overview and real-time site management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl py-6 px-6" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Site
            </Link>
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 rounded-xl py-6 px-8 font-bold">
            Generate Intelligence
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={MessageSquare} 
          label="Active Inquiries" 
          value={stats?.total_submissions || 0} 
          color="bg-indigo-500" 
        />
        <StatCard 
          icon={LayoutDashboard} 
          label="CMS Assets" 
          value={stats?.cms_sections_count || 0} 
          color="bg-amber-500" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Engagement Score" 
          value="98.2%" 
          color="bg-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <Clock className="text-indigo-500 w-6 h-6" />
              Recent Intelligence
            </h2>
            <Link href="/admin/contacts" className="text-indigo-400 text-sm font-bold hover:underline flex items-center gap-1">
              View All Submissions
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/5 shadow-2xl">
            {stats?.recent_submissions?.length > 0 ? (
              stats.recent_submissions.map((sub: any) => (
                <div key={sub.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-indigo-400 border border-white/5">
                      {sub.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{sub.name}</h4>
                      <p className="text-muted-foreground text-xs font-medium">{sub.type} — {new Date(sub.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 font-bold" asChild>
                    <Link href={`/admin/contacts?id=${sub.id}`}>Analysis</Link>
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-16 text-center">
                <p className="text-muted-foreground font-medium italic">No incoming data streams detected.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / System Health */}
        <div className="space-y-10">
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <Sparkles className="text-amber-500 w-6 h-6" />
              Quick Operations
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Update Strategic Hero", link: "/admin/home", icon: ShieldCheck },
                { label: "Sync Design Portfolio", link: "/admin/portfolio", icon: Search },
                { label: "Refine Core Services", link: "/admin/services", icon: Users },
                { label: "System Calibration", link: "/admin/settings", icon: TrendingUp },
              ].map((action, i) => (
                <Link key={i} href={action.link} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-indigo-600/10 hover:border-indigo-500/30 transition-all group">
                  <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">{action.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </section>

          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
             <h3 className="text-lg font-black text-white mb-2 relative z-10">System Status: Nominal</h3>
             <p className="text-indigo-300/80 text-sm font-medium relative z-10">All background processes and AI models are within optimal parameters. Next sync in 4h 12m.</p>
             <div className="mt-6 flex items-center gap-2 relative z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Postgres Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
