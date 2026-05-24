"use client";

import React, { useEffect, useState } from "react";
import { 
    Users, 
    MessageSquare, 
    Eye, 
    TrendingUp, 
    ShieldCheck, 
    Activity,
    FileEdit,
    ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { getApiUrl, safeFetch } from "@/lib/utils";

export function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const res = await safeFetch(getApiUrl("/api/v1/cms/stats"), {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.ok) setStats(await res.json());
        };
        fetchStats();
    }, []);

    const cards = [
        { label: "Total Submissions", value: stats?.total_submissions || "0", icon: MessageSquare, color: "text-indigo-400", bg: "bg-indigo-500/10" },
        { label: "CMS Pages", value: stats?.cms_sections_count || "0", icon: FileEdit, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { label: "Platform Uptime", value: "99.98%", icon: Activity, color: "text-amber-400", bg: "bg-amber-500/10" },
        { label: "Active Guards", value: "48", icon: ShieldCheck, color: "text-rose-400", bg: "bg-rose-500/10" },
    ];

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500"
                    >
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", card.bg)}>
                            <card.icon className={cn("w-7 h-7", card.color)} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{card.label}</p>
                        <h3 className="text-4xl font-black italic tracking-tighter">{card.value}</h3>
                        
                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TrendingUp size={16} className="text-emerald-400" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Submissions */}
                <div className="lg:col-span-8 glass-panel rounded-[3rem] p-10">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-black italic uppercase tracking-tight">Recent Intelligence</h3>
                        <Button variant="outline" size="sm" className="rounded-xl border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">View All</Button>
                    </div>
 
                    <div className="space-y-4">
                        {stats?.recent_submissions?.map((sub: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-transparent hover:border-indigo-500/20 hover:bg-white/[0.07] transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        {sub.name.slice(0,1)}
                                    </div>
                                    <div>
                                        <p className="font-bold tracking-tight">{sub.name}</p>
                                        <p className="text-xs text-slate-500">{sub.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="outline" className="text-[9px] font-black uppercase border-indigo-500/30 text-indigo-400 px-3">{sub.type}</Badge>
                                    <p className="text-[10px] text-slate-600 mt-2 font-medium">{new Date(sub.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )) || (
                            <div className="py-20 text-center text-slate-600 text-sm font-medium italic">
                                No recent activity detected.
                            </div>
                        )}
                    </div>
                </div>
 
                {/* System Status */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="glass-panel rounded-[3rem] p-10 bg-indigo-600/5">
                         <h3 className="text-xl font-black italic uppercase tracking-tight mb-8">System Shield</h3>
                         <div className="space-y-6">
                            {[
                                { label: "API Integrity", status: "Secure", val: 100 },
                                { label: "DB Latency", status: "Optimal", val: 94 },
                                { label: "CDN Sync", status: "Healthy", val: 98 },
                            ].map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">{s.label}</span>
                                        <span className="text-emerald-400">{s.status}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${s.val}%` }}
                                            className="h-full bg-indigo-500" 
                                        />
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>

                    <div className="glass-card rounded-[3rem] p-8 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">SSOT Version</p>
                            <p className="font-bold text-lg italic">v4.2.1-Stable</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
