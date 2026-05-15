"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, ArrowLeft, Trash2, CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeddingStore } from "@/store/weddingStore";

export default function TasksPage() {
    const router = useRouter();
    const { tasks, fetchDashboard, addTask, updateTask, deleteTask, loading } = useWeddingStore();
    const [showAdd, setShowAdd] = useState(false);
    const [filter, setFilter] = useState("all");
    const [form, setForm] = useState({ title: "", description: "", category: "General", priority: "Medium", status: "pending" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { router.push("/login"); return; }
        fetchDashboard();
    }, [fetchDashboard, router]);

    const handleAdd = async () => {
        if (!form.title.trim()) return;
        await addTask(form as any);
        setForm({ title: "", description: "", category: "General", priority: "Medium", status: "pending" });
        setShowAdd(false);
    };

    const filtered = tasks.filter((t) => filter === "all" || t.status === filter);
    const completed = tasks.filter((t) => t.status === "completed").length;
    const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
            <div className="fixed inset-0 z-0 mesh-gradient opacity-10 pointer-events-none" />
            <div className="max-w-6xl mx-auto relative z-10">
                <Link href="/wedding/planner" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-8">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Back to Planner</span>
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">TASK <span className="text-primary">TIMELINE</span></h1>
                        <p className="text-slate-400 text-sm mt-3">Manage your wedding milestones and to-dos.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="glass-card rounded-2xl px-6 py-3 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
                                <span className="text-sm font-black text-primary">{progress}%</span>
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{completed}/{tasks.length} completed</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-8 flex-wrap">
                    {["all", "pending", "in-progress", "completed"].map((f) => (
                        <button key={f} onClick={() => setFilter(f)} className={cn("text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all", filter === f ? "bg-primary text-black" : "bg-white/5 text-slate-500 hover:bg-white/10")}>{f === "all" ? `All (${tasks.length})` : f}</button>
                    ))}
                    <Button onClick={() => setShowAdd(!showAdd)} className="bg-primary text-black font-black rounded-full h-10 px-6 ml-auto"><Plus className="w-4 h-4 mr-2" />ADD TASK</Button>
                </div>

                {/* Add Form */}
                {showAdd && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card rounded-2xl p-6 border border-primary/20 mb-8 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task Title *" className="bg-white/5 border-white/10 h-11" />
                            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="bg-white/5 border-white/10 h-11" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm text-white">
                                {["General", "Venue", "Catering", "Decor", "Attire", "Music", "Photography", "Invitations"].map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                            </select>
                            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm text-white">
                                {["Low", "Medium", "High", "Critical"].map((p) => <option key={p} value={p} className="bg-slate-900">{p}</option>)}
                            </select>
                            <Button onClick={handleAdd} className="bg-primary text-black font-bold rounded-xl h-11">Save Task</Button>
                        </div>
                    </motion.div>
                )}

                {/* Task List */}
                <div className="space-y-3">
                    {filtered.map((task, i) => (
                        <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card rounded-2xl p-5 border border-white/5 hover:border-primary/20 transition-all flex items-center justify-between group">
                            <div className="flex items-center gap-4 flex-1">
                                <button onClick={() => updateTask(task.id, { status: task.status === "completed" ? "pending" : "completed", title: task.title, description: task.description || "", category: task.category, priority: task.priority })} className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer", task.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-600 hover:bg-primary/10 hover:text-primary")}>
                                    {task.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                </button>
                                <div className="flex-1">
                                    <p className={cn("font-bold text-sm", task.status === "completed" && "line-through text-slate-500")}>{task.title}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{task.category}</span>
                                        <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full", task.priority === "High" || task.priority === "Critical" ? "bg-rose-500/10 text-rose-400" : task.priority === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-slate-500/10 text-slate-500")}>{task.priority}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-rose-500/10 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                        </motion.div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center py-20 text-slate-500"><Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" /><p className="font-bold uppercase tracking-widest text-sm">No tasks yet</p></div>
                    )}
                </div>
            </div>
        </div>
    );
}
