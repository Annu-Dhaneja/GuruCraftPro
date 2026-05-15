"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Plus, ArrowLeft, Trash2, Phone, Wallet, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeddingStore } from "@/store/weddingStore";

export default function VendorsPage() {
    const router = useRouter();
    const { vendors, fetchDashboard, addVendor, deleteVendor, loading } = useWeddingStore();
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ name: "", category: "Venue", contact_person: "", phone: "", total_quote: 0, paid_amount: 0, status: "hired" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { router.push("/login"); return; }
        fetchDashboard();
    }, [fetchDashboard, router]);

    const handleAdd = async () => {
        if (!form.name.trim()) return;
        await addVendor(form as any);
        setForm({ name: "", category: "Venue", contact_person: "", phone: "", total_quote: 0, paid_amount: 0, status: "hired" });
        setShowAdd(false);
    };

    const totalQuoted = vendors.reduce((s, v) => s + v.total_quote, 0);
    const totalPaid = vendors.reduce((s, v) => s + v.paid_amount, 0);

    if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
            <div className="fixed inset-0 z-0 mesh-gradient opacity-10 pointer-events-none" />
            <div className="max-w-6xl mx-auto relative z-10">
                <Link href="/wedding/planner" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-8">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /><span className="text-xs font-black uppercase tracking-widest">Back to Planner</span>
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">VENDOR <span className="text-primary">MANAGER</span></h1>
                        <p className="text-slate-400 text-sm mt-3">Track your vendors, contracts, and payments.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="glass-card rounded-2xl px-5 py-3 border border-white/5 text-center"><p className="text-xl font-black text-white">₹{(totalQuoted / 100000).toFixed(1)}L</p><p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Total Quoted</p></div>
                        <div className="glass-card rounded-2xl px-5 py-3 border border-emerald-500/10 text-center"><p className="text-xl font-black text-emerald-400">₹{(totalPaid / 100000).toFixed(1)}L</p><p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Total Paid</p></div>
                    </div>
                </div>

                <div className="flex mb-8">
                    <Button onClick={() => setShowAdd(!showAdd)} className="bg-primary text-black font-black rounded-xl h-12 px-6"><Plus className="w-4 h-4 mr-2" />ADD VENDOR</Button>
                </div>

                {showAdd && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card rounded-2xl p-6 border border-primary/20 mb-8 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Vendor Name *" className="bg-white/5 border-white/10 h-11" />
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm text-white">
                                {["Venue", "Catering", "Photography", "Videography", "Decor", "Florist", "DJ/Music", "Makeup", "Mehndi", "Invitations", "Transport", "Other"].map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                            </select>
                            <Input value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} placeholder="Contact Person" className="bg-white/5 border-white/10 h-11" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="bg-white/5 border-white/10 h-11" />
                            <Input type="number" value={form.total_quote || ""} onChange={(e) => setForm({ ...form, total_quote: Number(e.target.value) })} placeholder="Total Quote (₹)" className="bg-white/5 border-white/10 h-11" />
                            <Input type="number" value={form.paid_amount || ""} onChange={(e) => setForm({ ...form, paid_amount: Number(e.target.value) })} placeholder="Paid Amount (₹)" className="bg-white/5 border-white/10 h-11" />
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={handleAdd} className="bg-primary text-black font-bold rounded-xl px-6">Save Vendor</Button>
                            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-4">
                    {vendors.map((vendor, i) => {
                        const paidPercent = vendor.total_quote > 0 ? Math.round((vendor.paid_amount / vendor.total_quote) * 100) : 0;
                        return (
                            <motion.div key={vendor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Heart className="w-5 h-5 text-primary" /></div>
                                        <div>
                                            <p className="font-black text-sm uppercase tracking-tight">{vendor.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{vendor.category}</span>
                                                {vendor.phone && <span className="text-[9px] text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" />{vendor.phone}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full", vendor.status === "hired" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500")}>{vendor.status}</span>
                                        <button onClick={() => deleteVendor(vendor.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-rose-500/10 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all" style={{ width: `${paidPercent}%` }} /></div>
                                    <div className="flex items-center gap-2 text-xs"><Wallet className="w-3 h-3 text-primary" /><span className="font-bold">₹{(vendor.paid_amount / 1000).toFixed(0)}k</span><span className="text-slate-500">/ ₹{(vendor.total_quote / 1000).toFixed(0)}k</span></div>
                                </div>
                            </motion.div>
                        );
                    })}
                    {vendors.length === 0 && (
                        <div className="text-center py-20 text-slate-500"><Heart className="w-12 h-12 mx-auto mb-4 opacity-30" /><p className="font-bold uppercase tracking-widest text-sm">No vendors yet</p></div>
                    )}
                </div>
            </div>
        </div>
    );
}
