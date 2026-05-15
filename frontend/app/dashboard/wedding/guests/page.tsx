"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Plus, ArrowLeft, Trash2, CheckCircle2, Clock, UserPlus, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeddingStore } from "@/store/weddingStore";

export default function GuestsPage() {
    const router = useRouter();
    const { guests, fetchDashboard, addGuest, updateGuest, deleteGuest, loading } = useWeddingStore();
    const [showAdd, setShowAdd] = useState(false);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({ name: "", email: "", phone: "", category: "Friend", status: "pending", plus_one: false, dietary_reqs: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { router.push("/login"); return; }
        fetchDashboard();
    }, [fetchDashboard, router]);

    const handleAdd = async () => {
        if (!form.name.trim()) return;
        await addGuest(form as any);
        setForm({ name: "", email: "", phone: "", category: "Friend", status: "pending", plus_one: false, dietary_reqs: "" });
        setShowAdd(false);
    };

    const filteredGuests = guests.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
    const confirmed = guests.filter((g) => g.status === "confirmed").length;
    const pending = guests.filter((g) => g.status === "pending").length;

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
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">GUEST <span className="text-primary">LIST</span></h1>
                        <p className="text-slate-400 text-sm mt-3">Manage your wedding guests and track RSVPs.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="glass-card rounded-2xl px-5 py-3 border border-white/5 text-center"><p className="text-2xl font-black text-emerald-400">{confirmed}</p><p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Confirmed</p></div>
                        <div className="glass-card rounded-2xl px-5 py-3 border border-white/5 text-center"><p className="text-2xl font-black text-amber-400">{pending}</p><p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Pending</p></div>
                        <div className="glass-card rounded-2xl px-5 py-3 border border-white/5 text-center"><p className="text-2xl font-black">{guests.length}</p><p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Total</p></div>
                    </div>
                </div>

                {/* Search & Add */}
                <div className="flex gap-4 mb-8">
                    <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guests..." className="bg-white/5 border-white/10 rounded-xl h-12 pl-11" /></div>
                    <Button onClick={() => setShowAdd(!showAdd)} className="bg-primary text-black font-black rounded-xl h-12 px-6"><UserPlus className="w-4 h-4 mr-2" />ADD GUEST</Button>
                </div>

                {/* Add Form */}
                {showAdd && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card rounded-2xl p-6 border border-primary/20 mb-8 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Guest Name *" className="bg-white/5 border-white/10 h-11" />
                            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="bg-white/5 border-white/10 h-11" />
                            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="bg-white/5 border-white/10 h-11" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm text-white">
                                {["Friend", "Family", "Colleague", "VIP"].map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                            </select>
                            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm text-white">
                                {["pending", "confirmed", "declined"].map((s) => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                            </select>
                            <label className="flex items-center gap-3 text-sm text-slate-400 cursor-pointer">
                                <input type="checkbox" checked={form.plus_one} onChange={(e) => setForm({ ...form, plus_one: e.target.checked })} className="rounded" /> Plus One
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={handleAdd} className="bg-primary text-black font-bold rounded-xl px-6">Save Guest</Button>
                            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
                        </div>
                    </motion.div>
                )}

                {/* Guest List */}
                <div className="space-y-3">
                    {filteredGuests.map((guest, i) => (
                        <motion.div key={guest.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card rounded-2xl p-5 border border-white/5 hover:border-primary/20 transition-all flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black", guest.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" : guest.status === "declined" ? "bg-rose-500/10 text-rose-400" : "bg-white/5 text-slate-500")}>
                                    {guest.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{guest.name} {guest.plus_one && <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full ml-2">+1</span>}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{guest.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => updateGuest(guest.id, { status: guest.status === "confirmed" ? "pending" : "confirmed" })} className={cn("text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors cursor-pointer", guest.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500 hover:bg-emerald-500/10 hover:text-emerald-400")}>{guest.status}</button>
                                <button onClick={() => deleteGuest(guest.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-rose-500/10 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </motion.div>
                    ))}
                    {filteredGuests.length === 0 && (
                        <div className="text-center py-20 text-slate-500"><Users className="w-12 h-12 mx-auto mb-4 opacity-30" /><p className="font-bold uppercase tracking-widest text-sm">No guests yet</p></div>
                    )}
                </div>
            </div>
        </div>
    );
}
