"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Wallet, Sparkles, MapPin, ChevronRight, ArrowRight, Heart, CheckCircle2, Plus, Clock, TrendingUp, ShieldCheck, AlertCircle, Loader2, Edit2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeddingStore } from "@/store/weddingStore";
import { WeddingOnboarding } from "@/components/wedding/WeddingOnboarding";

const StatCard = ({ label, value, icon: Icon, color, delay }: any) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="relative group overflow-hidden">
        <div className="glass-card rounded-[2rem] p-6 flex flex-col items-center text-center border border-white/5 group-hover:border-primary/20 transition-all duration-500">
            <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1">{value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
        </div>
    </motion.div>
);

export default function WeddingPlannerPage() {
    const router = useRouter();
    const { plan, stats, tasks, guests, vendors, budget, loading, error, fetchDashboard, updatePlan } = useWeddingStore();
    const [activePhase, setActivePhase] = useState("planning");
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({ partner_names: "", location: "", wedding_date: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { router.push("/login"); return; }
        fetchDashboard();
    }, [fetchDashboard, router]);

    useEffect(() => {
        if (plan) setEditData({ partner_names: plan.partner_names || "", location: plan.location || "", wedding_date: plan.wedding_date?.split("T")[0] || "" });
    }, [plan]);

    useEffect(() => {
        if (!plan?.wedding_date) return;
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const wd = new Date(plan.wedding_date).getTime();
            const d = wd - now;
            setTimeLeft({ days: Math.floor(d / 864e5), hours: Math.floor((d % 864e5) / 36e5), minutes: Math.floor((d % 36e5) / 6e4), seconds: Math.floor((d % 6e4) / 1e3) });
        }, 1000);
        return () => clearInterval(timer);
    }, [plan?.wedding_date]);

    const handleSavePlan = async () => {
        await updatePlan(editData);
        setEditing(false);
    };

    const handleOnboardingComplete = async (onboardingData: any) => {
        await updatePlan({
            partner_names: onboardingData.partner_names,
            location: onboardingData.location,
            wedding_date: onboardingData.wedding_date,
            guest_count: onboardingData.guest_count
        });
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="text-center space-y-4"><Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" /><p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Loading Your Planner...</p></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="glass-card p-8 rounded-[2rem] text-center max-w-md">
                <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h2 className="text-xl font-black uppercase tracking-tight mb-2">Connection Error</h2>
                <p className="text-slate-400 text-sm mb-6">{error}</p>
                <Button onClick={() => fetchDashboard()} className="bg-primary text-black font-bold px-8 rounded-full">RETRY</Button>
            </div>
        </div>
    );

    const phases = [
        { id: "planning", label: "Tasks", icon: Calendar, description: "Manage milestones.", items: tasks.map((t) => ({ name: t.title, status: t.status, desc: t.category })), stats: `${tasks.filter((t) => t.status === "completed").length}/${tasks.length}`, href: "/dashboard/wedding/tasks" },
        { id: "guests", label: "Guests", icon: Users, description: "Guest list & RSVP.", items: guests.slice(0, 5).map((g) => ({ name: g.name, status: g.status, desc: g.category })), stats: `${guests.length} Total`, href: "/dashboard/wedding/guests" },
        { id: "vendors", label: "Vendors", icon: Heart, description: "Contracts & payments.", items: vendors.map((v) => ({ name: v.name, status: v.status, desc: v.category })), stats: `${vendors.length} Hired`, href: "/dashboard/wedding/vendors" },
        { id: "budget", label: "Budget", icon: Wallet, description: "Financial tracking.", items: budget.map((b) => ({ name: b.category, status: "active", desc: `₹${(b.spent_amount / 1000).toFixed(0)}k` })), stats: stats?.budget_spent || "₹0", href: "/dashboard/wedding/budget" },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col pt-20 selection:bg-primary selection:text-black">
            {plan?.partner_names === "Your Names Here" && (
                <WeddingOnboarding onComplete={handleOnboardingComplete} />
            )}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            <header className="relative z-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-2xl px-6 md:px-12 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                    <Link href="/wedding" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" /></div>
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden md:block" />
                    <h1 className="text-lg md:text-2xl font-black uppercase tracking-tighter italic">My <span className="text-primary">Wedding</span> Planner</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"><ShieldCheck className="w-3 h-3 text-emerald-400" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Private Vault</span></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Hero with editable partner names */}
                    <div className="flex flex-col lg:flex-row md:items-end justify-between mb-16 gap-10">
                        <div>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-8">
                                <Sparkles className="w-3 h-3" /><span>Personal Wedding Suite</span>
                            </motion.div>
                            {editing ? (
                                <div className="space-y-4 max-w-md">
                                    <Input value={editData.partner_names} onChange={(e) => setEditData({ ...editData, partner_names: e.target.value })} placeholder="Partner Names (e.g. Priya & Arjun)" className="bg-white/5 border-white/10 h-12 text-lg font-bold" />
                                    <Input value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} placeholder="Location" className="bg-white/5 border-white/10 h-12" />
                                    <Input type="date" value={editData.wedding_date} onChange={(e) => setEditData({ ...editData, wedding_date: e.target.value })} className="bg-white/5 border-white/10 h-12" />
                                    <div className="flex gap-3">
                                        <Button onClick={handleSavePlan} className="bg-primary text-black font-bold rounded-full px-6"><Save className="w-4 h-4 mr-2" />Save</Button>
                                        <Button variant="ghost" onClick={() => setEditing(false)} className="text-slate-400">Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.85] text-white">
                                        {plan?.partner_names?.split(" & ")[0]} <br />
                                        <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-200 to-primary/50">& {plan?.partner_names?.split(" & ")[1]}</span>
                                    </h2>
                                    <div className="flex items-center gap-3 mt-6 text-slate-400">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <p className="text-lg font-medium tracking-tight italic">{plan?.location} • {new Date(plan?.wedding_date || "").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                                        <button onClick={() => setEditing(true)} className="ml-4 p-2 rounded-full hover:bg-white/10 transition-colors"><Edit2 className="w-4 h-4 text-primary" /></button>
                                    </div>
                                </>
                            )}
                        </div>
                        {/* Countdown */}
                        <div className="flex flex-col gap-4 items-end">
                            <div className="flex gap-3">
                                {[{ label: "Days", value: timeLeft.days }, { label: "Hrs", value: timeLeft.hours }, { label: "Min", value: timeLeft.minutes }, { label: "Sec", value: timeLeft.seconds }].map((u) => (
                                    <div key={u.label} className="h-20 w-20 md:h-24 md:w-24 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center backdrop-blur-xl hover:border-primary/30 transition-all">
                                        <span className="text-2xl md:text-3xl font-black leading-none mb-1">{String(u.value).padStart(2, "0")}</span>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{u.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <StatCard label="Total Guests" value={stats?.guest_count || "0"} icon={Users} color="text-blue-400" delay={0.1} />
                        <StatCard label="Budget Spent" value={stats?.budget_spent || "₹0"} icon={Wallet} color="text-emerald-400" delay={0.2} />
                        <StatCard label="Tasks Done" value={stats?.tasks_completed || "0%"} icon={CheckCircle2} color="text-indigo-400" delay={0.3} />
                        <StatCard label="RSVP Rate" value={`${Math.round(((stats?.rsvp_confirmed || 0) / Math.max(plan?.guest_count || 1, 1)) * 100)}%`} icon={Heart} color="text-rose-400" delay={0.4} />
                    </div>

                    {/* Phase Navigation & Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-3 space-y-6">
                            <div className="px-4"><p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-500 mb-2">Modules</p><div className="h-px w-8 bg-primary" /></div>
                            <div className="space-y-3">
                                {phases.map((phase) => (
                                    <button key={phase.id} onClick={() => setActivePhase(phase.id)} className={cn("w-full flex items-center justify-between p-5 rounded-[2rem] transition-all duration-500 text-left group relative overflow-hidden", activePhase === phase.id ? "bg-primary/10 border border-primary/20 text-white" : "bg-white/5 border border-transparent text-slate-500 hover:bg-white/10 hover:text-white")}>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", activePhase === phase.id ? "bg-primary/20 text-primary scale-110" : "bg-white/5 text-slate-600")}><phase.icon className="w-5 h-5" /></div>
                                            <div><p className="text-[11px] font-black uppercase tracking-widest">{phase.label}</p><p className="text-[9px] opacity-50 font-bold uppercase mt-0.5">{phase.stats}</p></div>
                                        </div>
                                        <ChevronRight className={cn("w-4 h-4 transition-transform relative z-10", activePhase === phase.id ? "text-primary" : "text-slate-800")} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-9">
                            <AnimatePresence mode="wait">
                                <motion.div key={activePhase} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-8">
                                    <div className="flex items-center justify-between px-4">
                                        <div>
                                            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-1">{phases.find((p) => p.id === activePhase)?.label} <span className="text-primary">Manager</span></h3>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{phases.find((p) => p.id === activePhase)?.description}</p>
                                        </div>
                                        <Link href={phases.find((p) => p.id === activePhase)?.href || "#"}>
                                            <Button className="rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white gap-2 px-6 h-12 font-black text-[10px] uppercase tracking-widest">
                                                OPEN FULL VIEW <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {phases.find((p) => p.id === activePhase)?.items.slice(0, 5).map((item, i) => (
                                            <motion.div key={item.name + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group glass-card rounded-[2rem] p-8 min-h-[180px] flex flex-col justify-between overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-700">
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary")}>{item.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}</div>
                                                        <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full", item.status === "completed" || item.status === "confirmed" ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-slate-500")}>{item.status}</span>
                                                    </div>
                                                    <h4 className="text-lg font-black uppercase italic tracking-tighter mb-1 group-hover:text-primary transition-colors">{item.name}</h4>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">{item.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {(phases.find((p) => p.id === activePhase)?.items.length || 0) === 0 && (
                                            <Link href={phases.find((p) => p.id === activePhase)?.href || "#"} className="glass-card rounded-[2rem] p-8 min-h-[180px] flex flex-col items-center justify-center gap-4 border-dashed border-white/10 hover:border-primary/50 group transition-all">
                                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all"><Plus className="w-6 h-6" /></div>
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">Add First Item</span>
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
