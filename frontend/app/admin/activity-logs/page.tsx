"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { 
  History, Search, Shield, HelpCircle, RefreshCw, 
  CheckCircle2, AlertCircle, Info, Database, UserCheck, Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_ACTIVITIES = [
  { id: "act-1", actor: "Annu_AD", role: "Super Admin", action: "Updated Page Properties", module: "CMS", detail: "Modified heroic narrative and visual assets for page 'wedding-showcase'. Updated meta SEO index successfully.", status: "success", timestamp: "2026-05-17 07:34:12", ip: "192.168.1.105" },
  { id: "act-2", actor: "System Seeder", role: "Automation", action: "Seeded Dynamic Content", module: "Database", detail: "Executed seed_resources() successfully. Inserted 7 component sections linking to page 'resources'.", status: "info", timestamp: "2026-05-17 07:30:00", ip: "127.0.0.1" },
  { id: "act-3", actor: "Om@Op", role: "Admin", action: "Cleared Login Throttling", module: "Security", detail: "Triggered cache flush to reset all system IP login lockouts and API blockages.", status: "warning", timestamp: "2026-05-17 07:22:15", ip: "192.168.1.106" },
  { id: "act-4", actor: "Annu_AD", role: "Super Admin", action: "Modified Settings", module: "Config", detail: "Updated Global settings: changed footer explore layout links and added WhatsApp contact support link.", status: "success", timestamp: "2026-05-17 07:18:49", ip: "192.168.1.105" },
  { id: "act-5", actor: "System Seeder", role: "Automation", action: "Database Migration Fix", module: "Database", detail: "Invoked universal_schema_fix.py to map and normalize SQLite columns and audit constraints.", status: "info", timestamp: "2026-05-17 07:10:00", ip: "127.0.0.1" },
  { id: "act-6", actor: "Om@Op", role: "Admin", action: "Ingested Media Assets", module: "Media", detail: "Uploaded 4 new vector spiritual mandala graphics to folder static/uploads/spiritual.", status: "success", timestamp: "2026-05-17 06:44:30", ip: "192.168.1.106" },
  { id: "act-7", actor: "Malicious_Scanner", role: "Guest", action: "Failed Authentication", module: "Security", detail: "Multiple failed POST /login requests with non-existent administrative credentials.", status: "danger", timestamp: "2026-05-17 05:12:02", ip: "94.18.204.89" },
];

export default function ActivityLogsPage() {
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setActivities([
        {
          id: `act-${Date.now()}`,
          actor: "Om@Op",
          role: "Admin",
          action: "Audited CMS Page Content",
          module: "CMS",
          detail: "Loaded '/admin/services' workspace and audited dynamic mappings for Guruji Darshan and Vantage Ecom.",
          status: "success",
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          ip: "192.168.1.106"
        },
        ...activities
      ]);
    }, 600);
  };

  const filteredActivities = activities.filter(act => {
    const matchesSearch = act.actor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          act.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          act.detail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === "ALL" || act.module === filterModule;
    return matchesSearch && matchesModule;
  });

  const getSeverityStyle = (status: string) => {
    switch (status) {
      case "success": return { color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5", icon: CheckCircle2 };
      case "info": return { color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5", icon: Info };
      case "warning": return { color: "text-amber-400 border-amber-500/20 bg-amber-500/5", icon: AlertCircle };
      case "danger": return { color: "text-rose-400 border-rose-500/20 bg-rose-500/5", icon: AlertCircle };
      default: return { color: "text-slate-400 border-slate-500/20 bg-slate-500/5", icon: HelpCircle };
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case "CMS": return Shield;
      case "Database": return Database;
      case "Security": return UserCheck;
      case "Config": return Settings;
      default: return History;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-4">
          <History className="h-10 w-10 text-indigo-400" />
          Administrative Audits
        </h1>
        <p className="text-slate-500 text-lg font-light italic">Auditing configuration changes, database inputs, and admin operations across modules.</p>
      </div>

      <div className="glass-panel p-8 rounded-[3rem] border border-white/5 bg-slate-900/20 backdrop-blur-sm space-y-8 max-w-5xl mx-auto">
        
        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by admin, action, or detail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["ALL", "CMS", "Database", "Security", "Config", "Media"].map((m) => (
              <button
                key={m}
                onClick={() => setFilterModule(m)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterModule === m
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-400 hover:text-white bg-white/5 border border-white/5"
                }`}
              >
                {m}
              </button>
            ))}
            
            <Button 
              onClick={handleRefresh}
              variant="ghost" 
              size="icon"
              className={`rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 ${isRefreshing ? "animate-spin" : ""}`}
            >
              <RefreshCw className="h-4 w-4 text-slate-400" />
            </Button>
          </div>
        </div>

        {/* TIMELINE LIST */}
        <div className="space-y-6 relative text-left">
          {/* Timeline Line */}
          <div className="absolute left-6 top-2 bottom-2 w-[1px] bg-slate-800 pointer-events-none" />

          {filteredActivities.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm italic">
              No audit logs matched your search filters.
            </div>
          ) : (
            filteredActivities.map((act) => {
              const severity = getSeverityStyle(act.status);
              const SeverityIcon = severity.icon;
              const ModuleIcon = getModuleIcon(act.module);

              return (
                <div key={act.id} className="relative pl-14 group">
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-3.5 top-1.5 w-6 h-6 rounded-full border-2 border-slate-950 flex items-center justify-center -translate-x-1/2 z-10 transition-transform group-hover:scale-110 ${severity.color}`}>
                    <SeverityIcon className="h-3.5 w-3.5" />
                  </div>

                  {/* Activity Details Card */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-black/30 hover:border-indigo-500/20 transition-all space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                          <ModuleIcon className="h-4 w-4 text-indigo-400" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                            {act.action}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider ml-3 px-2 py-0.5 rounded bg-white/5">
                            {act.module}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-slate-500 font-semibold font-mono">
                        {act.timestamp} UTC
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {act.detail}
                    </p>

                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/5 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[9px] font-black">
                          {act.actor.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-300">{act.actor}</span>
                          <span className="text-[9px] uppercase font-bold text-indigo-400 ml-2">({act.role})</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-600 font-mono">
                        IP: {act.ip}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
