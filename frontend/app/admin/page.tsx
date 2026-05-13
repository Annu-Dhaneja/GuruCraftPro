"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    BarChart3, 
    Users, 
    ShoppingBag, 
    Wand2, 
    LayoutDashboard, 
    Package, 
    Settings, 
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Bell,
    TrendingUp,
    ShieldCheck,
    Cpu,
    CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CMSManager } from "@/components/admin/CMSManager";

const stats = [
    { label: "Total Revenue", value: "₹4,28,400", change: "+12.5%", trend: "up", icon: CreditCard },
    { label: "Total Users", value: "2,429", change: "+8.2%", trend: "up", icon: Users },
    { label: "AI API Usage", value: "84.2k", change: "-2.1%", trend: "down", icon: Cpu },
    { label: "Active Orders", value: "142", change: "+18.4%", trend: "up", icon: Package },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-[#020617] text-white flex">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-[#020617]/50 backdrop-blur-2xl p-8 flex flex-col gap-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-black uppercase tracking-tighter italic">Command <span className="text-primary">Center</span></h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: 'overview', label: 'Analytics', icon: BarChart3 },
                        { id: 'orders', label: 'Orders', icon: ShoppingBag },
                        { id: 'products', label: 'Products', icon: Package },
                        { id: 'users', label: 'Users', icon: Users },
                        { id: 'cms', label: 'CMS Builder', icon: LayoutDashboard },
                        { id: 'ai', label: 'AI Control', icon: Wand2 },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group",
                                activeTab === item.id 
                                    ? "bg-primary text-black font-black" 
                                    : "text-slate-500 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-black" : "text-slate-600 group-hover:text-primary")} />
                            <span className="text-xs uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="pt-8 border-t border-white/5">
                    <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-500 hover:text-white transition-all">
                        <Settings className="w-5 h-5" />
                        <span className="text-xs uppercase tracking-widest">Settings</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 border-b border-white/5 bg-[#020617]/50 backdrop-blur-xl px-10 flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-6 py-2 w-96">
                        <Search className="w-4 h-4 text-slate-500" />
                        <input type="text" placeholder="Global search..." className="bg-transparent border-none outline-none text-sm w-full" />
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-white">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#020617]" />
                        </Button>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-[10px] font-black uppercase text-white tracking-widest">Administrator</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">GuruCraft Pro</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black">AD</div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Area */}
                <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                    <div className="max-w-7xl mx-auto space-y-12">
                        {/* Summary Header */}
                        <div>
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Performance <span className="text-primary">Pulse</span></h2>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Operational Snapshot • May 2026</p>
                        </div>

                        {/* Content Area - Conditional Rendering */}
                        <div className="min-h-[600px]">
                            {activeTab === 'overview' && (
                                <div className="space-y-12">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {stats.map((stat, i) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="glass-card rounded-[2.5rem] p-8 border-white/5 hover:border-primary/20 transition-all group"
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-2xl">
                                                        <stat.icon className="w-6 h-6" />
                                                    </div>
                                                    <div className={cn(
                                                        "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black",
                                                        stat.trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                                    )}>
                                                        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                                        {stat.change}
                                                    </div>
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{stat.label}</p>
                                                <p className="text-3xl font-black tracking-tighter text-white">{stat.value}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Charts / Main View Section */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                        {/* Revenue Chart Placeholder */}
                                        <div className="lg:col-span-8 glass-card rounded-[3rem] p-10 min-h-[400px] border-white/5 flex flex-col justify-between">
                                            <div className="flex justify-between items-center mb-10">
                                                <h3 className="text-xl font-black uppercase italic tracking-tighter">Revenue <span className="text-primary">Stream</span></h3>
                                                <div className="flex gap-2">
                                                    {['7D', '1M', '1Y'].map(p => (
                                                        <Button key={p} variant="ghost" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest hover:bg-white/5">{p}</Button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex items-end gap-3 px-4">
                                                {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 100].map((h, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${h}%` }}
                                                        transition={{ delay: i * 0.05, duration: 1 }}
                                                        className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 rounded-t-lg group relative"
                                                    >
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-black px-2 py-1 rounded text-[10px] font-black transition-opacity">
                                                            ₹{(h * 1000).toLocaleString()}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recent Activity */}
                                        <div className="lg:col-span-4 glass-card rounded-[3rem] p-10 border-white/5">
                                            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8">AI Usage <span className="text-primary">Feed</span></h3>
                                            <div className="space-y-6">
                                                {[
                                                    { user: "User #429", tool: "BG Remover", time: "2m ago" },
                                                    { user: "User #118", tool: "Logo Gen", time: "5m ago" },
                                                    { user: "User #902", tool: "Budget AI", time: "12m ago" },
                                                    { user: "User #055", tool: "Darshan AR", time: "18m ago" },
                                                ].map((log, i) => (
                                                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                                                <TrendingUp className="w-4 h-4 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-black text-white uppercase tracking-tighter">{log.user}</p>
                                                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{log.tool}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-[9px] font-bold text-slate-600">{log.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button variant="outline" className="w-full mt-8 border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5">
                                                VIEW FULL AUDIT
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'cms' && (
                                <div className="glass-card rounded-[3rem] p-4 border-white/5 min-h-[700px]">
                                    <CMSManager />
                                </div>
                            )}

                            {activeTab !== 'overview' && activeTab !== 'cms' && (
                                <div className="flex flex-col items-center justify-center h-[500px] text-slate-500">
                                    <LayoutDashboard className="w-16 h-16 mb-4 opacity-10" />
                                    <p className="text-xs uppercase tracking-[0.3em] font-black">Module Under Synchronization</p>
                                    <p className="text-[10px] mt-2 text-slate-700">Connecting to Neural Core...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

                    </div>
                </div>
            </main>
        </div>
    );
}
