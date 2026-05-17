"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { 
  Terminal, Search, Filter, RefreshCw, Eye, 
  CheckCircle2, AlertTriangle, XCircle, ArrowLeftRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_LOGS = [
  { id: "log-1", method: "GET", path: "/api/v1/cms/site_config", status: 200, time: "18ms", ip: "192.168.1.105", timestamp: "2026-05-17 07:34:12", payload: { query: {}, response: { site_name: "GurucraftPro", status: "published" } } },
  { id: "log-2", method: "GET", path: "/api/v1/cms/wedding-showcase", status: 200, time: "42ms", ip: "192.168.1.105", timestamp: "2026-05-17 07:33:55", payload: { query: { preview: "false" }, response: { title: "Wedding Masterpiece", components_count: 5 } } },
  { id: "log-3", method: "POST", path: "/api/v1/auth/login", status: 200, time: "115ms", ip: "103.45.202.14", timestamp: "2026-05-17 07:33:01", payload: { body: { username: "Annu_AD" }, response: { success: true, role: "super-admin" } } },
  { id: "log-4", method: "PUT", path: "/api/v1/cms/guru-ji-art", status: 200, time: "84ms", ip: "192.168.1.105", timestamp: "2026-05-17 07:31:40", payload: { body: { title: "Guruji Ke Sakshat Darshan" }, response: { success: true } } },
  { id: "log-5", method: "GET", path: "/api/v1/cms/wedding-plan", status: 404, time: "12ms", ip: "182.68.95.23", timestamp: "2026-05-17 07:29:15", payload: { query: {}, error: "Dynamic page mapping wedding-plan not found in standard route matches" } },
  { id: "log-6", method: "POST", path: "/api/v1/contact/submit", status: 201, time: "156ms", ip: "106.21.32.188", timestamp: "2026-05-17 07:25:33", payload: { body: { name: "Rajesh Kumar", email: "rajesh@gmail.com" }, response: { message: "Submission successful" } } },
  { id: "log-7", method: "GET", path: "/api/v1/cms/guruji", status: 200, time: "28ms", ip: "192.168.1.105", timestamp: "2026-05-17 07:22:11", payload: { query: {}, response: { aliased_from: "guru-ji-art", components_count: 3 } } },
  { id: "log-8", method: "DELETE", path: "/api/v1/media/3", status: 401, time: "15ms", ip: "94.23.41.60", timestamp: "2026-05-17 07:18:49", payload: { query: {}, error: "Missing write authorization for media manager" } },
];

export default function ApiLogsPage() {
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("ALL");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLogs([
        {
          id: `log-${Date.now()}`,
          method: "GET",
          path: "/api/v1/cms/site_config",
          status: 200,
          time: `${Math.floor(Math.random() * 30) + 10}ms`,
          ip: "127.0.0.1",
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          payload: { query: {}, response: { site_name: "GurucraftPro", status: "published" } }
        },
        ...logs
      ]);
    }, 600);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.path.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.ip.includes(searchTerm) || 
                          log.status.toString().includes(searchTerm);
    const matchesMethod = filterMethod === "ALL" || log.method === filterMethod;
    return matchesSearch && matchesMethod;
  });

  const getMethodStyle = (method: string) => {
    switch (method) {
      case "GET": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "POST": return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "PUT": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "DELETE": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getStatusStyle = (status: number) => {
    if (status >= 200 && status < 300) return "text-emerald-400 bg-emerald-500/5 border border-emerald-500/10";
    if (status >= 400 && status < 500) return "text-amber-400 bg-amber-500/5 border border-amber-500/10";
    return "text-rose-400 bg-rose-500/5 border border-rose-500/10";
  };

  return (
    <AdminLayout>
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-4">
          <Terminal className="h-10 w-10 text-indigo-400" />
          API Interface Logs
        </h1>
        <p className="text-slate-500 text-lg font-light italic">Monitoring real-time API transactions, routes performance, and request health.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LOGS LIST */}
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-[2rem] border border-white/5 bg-slate-900/20 backdrop-blur-sm space-y-4">
            
            {/* FILTERS */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search endpoint, status or IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder:text-slate-600"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                {["ALL", "GET", "POST", "PUT", "DELETE"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setFilterMethod(m)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      filterMethod === m
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

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500 font-black">
                    <th className="py-4 px-4">Method</th>
                    <th className="py-4 px-4">Endpoint</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Latency</th>
                    <th className="py-4 px-4">Client IP</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 text-sm italic">
                        No transactions match your search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-4 px-4">
                          <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wider ${getMethodStyle(log.method)}`}>
                            {log.method}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono text-xs font-semibold text-slate-300 group-hover:text-indigo-400 transition-colors">
                          {log.path}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${getStatusStyle(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-400">
                          {log.time}
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-500 font-mono">
                          {log.ip}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedLog(log)}
                            className="rounded-xl hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-500 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* LOG DETAILS PANEL */}
        <div className="xl:col-span-1">
          {selectedLog ? (
            <div className="glass-card p-8 rounded-[2rem] border border-indigo-500/20 bg-slate-900/30 backdrop-blur-sm space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-xl font-bold uppercase italic tracking-tight">Transaction Detail</h3>
                  <span className="text-[10px] font-mono text-slate-500">{selectedLog.id}</span>
                </div>
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="text-slate-500 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Method</p>
                  <p className="text-md font-bold mt-1 text-white">{selectedLog.method}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Response Status</p>
                  <p className="text-md font-bold mt-1 text-white">{selectedLog.status}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Latency</p>
                  <p className="text-md font-bold mt-1 text-white">{selectedLog.time}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Client IP</p>
                  <p className="text-md font-mono mt-1 text-white">{selectedLog.ip}</p>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Endpoint Path</p>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-xs text-indigo-400 overflow-x-auto">
                  {selectedLog.path}
                </div>
              </div>

              <div className="space-y-2 text-left">
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Payload Dump (JSON)</p>
                <pre className="p-4 bg-black/60 rounded-2xl border border-white/5 font-mono text-[10px] text-emerald-400 overflow-x-auto max-h-60">
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </pre>
              </div>

              <div className="text-[10px] font-semibold text-slate-500 text-center italic">
                Logged at: {selectedLog.timestamp} UTC
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] glass-card p-8 rounded-[2rem] border border-white/5 bg-slate-900/10 backdrop-blur-sm flex flex-col items-center justify-center text-center text-slate-500 space-y-4">
              <ArrowLeftRight className="h-12 w-12 text-slate-700 animate-pulse" />
              <div>
                <p className="font-bold text-slate-400 uppercase text-xs tracking-wider">Inspector Locked</p>
                <p className="text-xs max-w-[200px] mt-1">Select an API log event to audit payload headers and JSON variables.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
