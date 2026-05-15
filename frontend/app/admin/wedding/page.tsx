"use client";

import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, Wallet, MapPin, ChevronRight, ArrowLeft, Eye, Loader2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanSummary {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string | null;
    partner_names: string;
    wedding_date: string | null;
    location: string;
    total_budget: number;
    guest_count: number;
    task_count: number;
    task_progress: string;
    vendor_count: number;
    total_spent: number;
    created_at: string | null;
}

interface PlanDetail {
    plan: Record<string, any>;
    user: Record<string, any>;
    stats: Record<string, any>;
    tasks: Array<Record<string, any>>;
    guests: Array<Record<string, any>>;
    vendors: Array<Record<string, any>>;
    budget: Array<Record<string, any>>;
}

export default function AdminWeddingPage() {
    const [plans, setPlans] = useState<PlanSummary[]>([]);
    const [totalPlans, setTotalPlans] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<PlanDetail | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth("/api/v1/wedding/admin/all-plans");
            if (res.ok) {
                const data = await res.json();
                setPlans(data.plans || []);
                setTotalPlans(data.total_plans || 0);
            }
        } catch (e) {
            console.error("Failed to load plans:", e);
        }
        setLoading(false);
    };

    const viewDetail = async (planId: number) => {
        setDetailLoading(true);
        try {
            const res = await fetchWithAuth(`/api/v1/wedding/admin/plan/${planId}`);
            if (res.ok) {
                const data = await res.json();
                setSelectedPlan(data);
            }
        } catch (e) {
            console.error("Failed to load detail:", e);
        }
        setDetailLoading(false);
    };

    const totalBudget = plans.reduce((s, p) => s + p.total_budget, 0);
    const totalGuests = plans.reduce((s, p) => s + p.guest_count, 0);
    const avgBudget = plans.length > 0 ? totalBudget / plans.length : 0;

    if (loading) {
        return (
            <div className="p-10 flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>
        );
    }

    // ── Detail View ──
    if (selectedPlan) {
        const { plan, user, stats, tasks, guests, vendors, budget } = selectedPlan;
        return (
            <div className="p-10 space-y-8">
                <button onClick={() => setSelectedPlan(null)} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to All Plans</span>
                </button>

                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-black mb-1">{plan.partner_names}</h1>
                        <p className="text-slate-400 text-sm">By {user.name || user.username} ({user.email})</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="w-4 h-4 text-indigo-400" />
                        {plan.location} • {plan.wedding_date || "No date set"}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { label: "Guests", value: stats.guest_count, color: "text-blue-400" },
                        { label: "RSVP Confirmed", value: stats.rsvp_confirmed, color: "text-emerald-400" },
                        { label: "Task Progress", value: stats.task_progress, color: "text-indigo-400" },
                        { label: "Total Spent", value: stats.total_spent, color: "text-amber-400" },
                        { label: "Vendors", value: stats.vendor_count, color: "text-rose-400" },
                    ].map((s) => (
                        <div key={s.label} className="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center">
                            <p className={cn("text-2xl font-black", s.color)}>{s.value}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Data Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Tasks */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-bold">Tasks ({tasks.length})</span>
                            <Calendar className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {tasks.map((t: any) => (
                                <div key={t.id} className="px-5 py-3 border-b border-white/5 flex items-center justify-between text-sm">
                                    <span className={t.status === "completed" ? "text-slate-500 line-through" : ""}>{t.title}</span>
                                    <span className={cn("text-[9px] font-bold uppercase px-2 py-0.5 rounded-full", t.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500")}>{t.status}</span>
                                </div>
                            ))}
                            {tasks.length === 0 && <p className="px-5 py-6 text-sm text-slate-500 text-center">No tasks</p>}
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-bold">Guests ({guests.length})</span>
                            <Users className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {guests.map((g: any) => (
                                <div key={g.id} className="px-5 py-3 border-b border-white/5 flex items-center justify-between text-sm">
                                    <div><span>{g.name}</span> <span className="text-[9px] text-slate-500 ml-2">{g.category}</span></div>
                                    <span className={cn("text-[9px] font-bold uppercase px-2 py-0.5 rounded-full", g.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500")}>{g.status}</span>
                                </div>
                            ))}
                            {guests.length === 0 && <p className="px-5 py-6 text-sm text-slate-500 text-center">No guests</p>}
                        </div>
                    </div>

                    {/* Vendors */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-bold">Vendors ({vendors.length})</span>
                            <Heart className="w-4 h-4 text-rose-400" />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {vendors.map((v: any) => (
                                <div key={v.id} className="px-5 py-3 border-b border-white/5 flex items-center justify-between text-sm">
                                    <div><span>{v.name}</span> <span className="text-[9px] text-slate-500 ml-2">{v.category}</span></div>
                                    <span className="text-xs font-bold">₹{(v.paid_amount / 1000).toFixed(0)}k / ₹{(v.total_quote / 1000).toFixed(0)}k</span>
                                </div>
                            ))}
                            {vendors.length === 0 && <p className="px-5 py-6 text-sm text-slate-500 text-center">No vendors</p>}
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-bold">Budget ({budget.length})</span>
                            <Wallet className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {budget.map((b: any) => (
                                <div key={b.id} className="px-5 py-3 border-b border-white/5 flex items-center justify-between text-sm">
                                    <span>{b.category}</span>
                                    <span className="text-xs font-bold">₹{(b.spent_amount / 1000).toFixed(0)}k / ₹{(b.allocated_amount / 1000).toFixed(0)}k</span>
                                </div>
                            ))}
                            {budget.length === 0 && <p className="px-5 py-6 text-sm text-slate-500 text-center">No budget items</p>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── List View ──
    return (
        <div className="p-10 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2">Wedding Plans Manager</h1>
                    <p className="text-slate-400">View and manage all users&apos; wedding plans.</p>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-5 text-center">
                    <p className="text-3xl font-black text-indigo-400">{totalPlans}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Total Plans</p>
                </div>
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-5 text-center">
                    <p className="text-3xl font-black text-blue-400">{totalGuests}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Total Guests</p>
                </div>
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-5 text-center">
                    <p className="text-3xl font-black text-emerald-400">₹{(totalBudget / 100000).toFixed(1)}L</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Total Budget</p>
                </div>
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-5 text-center">
                    <p className="text-3xl font-black text-amber-400">₹{(avgBudget / 100000).toFixed(1)}L</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Avg Budget</p>
                </div>
            </div>

            {/* Plans Table */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">All Wedding Plans</span>
                    <Heart className="w-4 h-4 text-rose-400" />
                </div>

                {plans.length === 0 ? (
                    <div className="p-16 text-center text-slate-500">
                        <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="font-bold">No wedding plans found</p>
                        <p className="text-sm mt-1">Plans will appear here when users create them.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 text-left">
                                    <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">User</th>
                                    <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Couple</th>
                                    <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Location</th>
                                    <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Date</th>
                                    <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Budget</th>
                                    <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Guests</th>
                                    <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Progress</th>
                                    <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.map((plan) => (
                                    <tr key={plan.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-white">{plan.user_name}</p>
                                            <p className="text-[10px] text-slate-500">{plan.user_email}</p>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{plan.partner_names}</td>
                                        <td className="px-6 py-4 text-slate-400">{plan.location}</td>
                                        <td className="px-6 py-4 text-slate-400">{plan.wedding_date || "—"}</td>
                                        <td className="px-6 py-4 font-bold">₹{(plan.total_budget / 100000).toFixed(1)}L</td>
                                        <td className="px-6 py-4">{plan.guest_count}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn("text-[9px] font-black uppercase px-3 py-1 rounded-full", parseInt(plan.task_progress) >= 80 ? "bg-emerald-500/10 text-emerald-400" : parseInt(plan.task_progress) >= 40 ? "bg-amber-500/10 text-amber-400" : "bg-white/5 text-slate-500")}>{plan.task_progress}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button size="sm" variant="ghost" onClick={() => viewDetail(plan.id)} className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 gap-1">
                                                <Eye className="w-4 h-4" /> View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
