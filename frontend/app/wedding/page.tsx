"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Calendar, 
    Users, 
    Wallet, 
    Sparkles, 
    MapPin, 
    ChevronRight, 
    ArrowRight,
    Heart,
    Star,
    CheckCircle2,
    Plus,
    Clock,
    TrendingUp,
    ShieldCheck,
    AlertCircle,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWeddingStore } from "@/store/weddingStore";

// Luxury Stat Card Component
const StatCard = ({ label, value, icon: Icon, color, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="relative group overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
        <div className="glass-card rounded-[2rem] p-6 flex flex-col items-center text-center relative z-10 border border-white/5 group-hover:border-primary/20 transition-all duration-500">
            <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <motion.p 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black tracking-tighter mb-1"
            >
                {value}
            </motion.p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{label}</p>
        </div>
    </motion.div>
);

export default function WeddingDashboardPage() {
    const { plan, stats, tasks, guests, vendors, budget, loading, error, fetchDashboard } = useWeddingStore();
    const [activePhase, setActivePhase] = useState('planning');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    useEffect(() => {
        if (!plan?.wedding_date) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const weddingDate = new Date(plan.wedding_date).getTime();
            const distance = weddingDate - now;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [plan?.wedding_date]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Initializing Luxury Suite...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="glass-card p-8 rounded-[2rem] text-center max-w-md">
                    <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                    <h2 className="text-xl font-black uppercase tracking-tight mb-2">Sync Interrupted</h2>
                    <p className="text-slate-400 text-sm mb-6">{error}</p>
                    <Button onClick={() => fetchDashboard()} className="bg-primary text-black font-bold px-8 rounded-full">
                        RETRY SYNC
                    </Button>
                </div>
            </div>
        );
    }

    const phases = [
        { 
            id: 'planning', 
            label: 'Planning', 
            icon: Calendar, 
            description: 'Manage milestones and timeline.',
            items: tasks.map(t => ({ name: t.title, status: t.status, desc: t.category })),
            stats: `${tasks.filter(t => t.status === 'completed').length}/${tasks.length} Done`
        },
        { 
            id: 'guests', 
            label: 'Guests', 
            icon: Users, 
            description: 'Guest list and RSVP tracking.',
            items: [
                { name: 'RSVP Overview', status: 'active', desc: `${stats?.rsvp_confirmed || 0} Confirmed` },
                { name: 'Table Planning', status: 'pending', desc: 'Coming soon' },
                { name: 'Dietary Stats', status: 'active', desc: 'Managed by AI' }
            ],
            stats: `${guests.length} Total`
        },
        { 
            id: 'vendors', 
            label: 'Vendors', 
            icon: Heart, 
            description: 'Contracts and payments.',
            items: vendors.map(v => ({ name: v.name, status: v.status, desc: v.category })),
            stats: `${vendors.length} Hired`
        },
        { 
            id: 'budget', 
            label: 'Budget', 
            icon: Wallet, 
            description: 'Financial tracking and spend.',
            items: budget.map(b => ({ name: b.category, status: 'active', desc: `₹${b.spent_amount / 1000}k spent` })),
            stats: stats?.budget_spent || '₹0'
        },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col pt-16 selection:bg-primary selection:text-black">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="fixed inset-0 mesh-gradient opacity-10" />
            </div>

            {/* Premium Header */}
            <header className="relative z-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-2xl px-6 md:px-12 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Heart className="w-4 h-4 text-primary fill-primary/20" />
                        </div>
                        <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-colors">Digital Atelier</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden md:block" />
                    <h1 className="text-lg md:text-2xl font-black uppercase tracking-tighter italic">
                        Elite <span className="text-primary">Wedding</span> Suite
                    </h1>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vault Protected</span>
                    </div>
                    <Button variant="ghost" className="text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-widest">
                        MY STUDIO
                    </Button>
                    <Button className="rounded-full bg-primary hover:bg-primary/90 text-black px-6 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
                        EXPORT PLAN
                    </Button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10 scrollbar-hide">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="flex flex-col lg:row md:items-end justify-between mb-16 gap-10">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-8"
                            >
                                <Sparkles className="w-3 h-3" />
                                <span>AI Dynamic Engine V4.2</span>
                            </motion.div>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white">
                                {plan?.partner_names?.split(' & ')[0]} <br />
                                <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-amber-200 to-primary/50">
                                    & {plan?.partner_names?.split(' & ')[1]}
                                </span>
                            </h2>
                            <div className="flex items-center gap-3 mt-8 text-slate-400">
                                <MapPin className="w-4 h-4 text-primary" />
                                <p className="text-lg font-medium tracking-tight italic">{plan?.location} • {new Date(plan?.wedding_date || '').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                        </div>

                        {/* Luxury Countdown */}
                        <div className="flex flex-col gap-6 items-end">
                            <div className="flex gap-3">
                                {[
                                    { label: 'Days', value: timeLeft.days },
                                    { label: 'Hrs', value: timeLeft.hours },
                                    { label: 'Min', value: timeLeft.minutes },
                                    { label: 'Sec', value: timeLeft.seconds }
                                ].map((unit, i) => (
                                    <div key={unit.label} className="relative group">
                                        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="h-20 w-20 md:h-24 md:w-24 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center relative z-10 backdrop-blur-xl group-hover:border-primary/30 transition-all">
                                            <span className="text-2xl md:text-3xl font-black leading-none mb-1">{String(unit.value).padStart(2, '0')}</span>
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{unit.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Wedding Momentum: <span className="text-white">+12% this week</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <StatCard 
                            label="Total Guests" 
                            value={stats?.guest_count || "0"} 
                            icon={Users} 
                            color="text-blue-400" 
                            delay={0.1} 
                        />
                        <StatCard 
                            label="Budget Spent" 
                            value={stats?.budget_spent || "₹0"} 
                            icon={Wallet} 
                            color="text-emerald-400" 
                            delay={0.2} 
                        />
                        <StatCard 
                            label="Tasks Status" 
                            value={stats?.tasks_completed || "0%"} 
                            icon={CheckCircle2} 
                            color="text-amber-400" 
                            delay={0.3} 
                        />
                        <StatCard 
                            label="RSVP Rate" 
                            value={`${Math.round((stats?.rsvp_confirmed / (plan?.guest_count || 1)) * 100)}%`} 
                            icon={Heart} 
                            color="text-rose-400" 
                            delay={0.4} 
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="px-4">
                                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-500 mb-2">The Journey</p>
                                <div className="h-px w-8 bg-primary" />
                            </div>
                            
                            <div className="space-y-3">
                                {phases.map((phase) => (
                                    <button
                                        key={phase.id}
                                        onClick={() => setActivePhase(phase.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-5 rounded-[2rem] transition-all duration-500 text-left group relative overflow-hidden",
                                            activePhase === phase.id 
                                                ? "bg-primary/10 border border-primary/20 text-white" 
                                                : "bg-white/5 border border-transparent text-slate-500 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                                activePhase === phase.id ? "bg-primary/20 text-primary scale-110" : "bg-white/5 text-slate-600 group-hover:text-slate-400"
                                            )}>
                                                <phase.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black uppercase tracking-widest">{phase.label}</p>
                                                <p className="text-[9px] opacity-50 font-bold uppercase tracking-tighter mt-0.5">{phase.stats}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className={cn("w-4 h-4 transition-transform relative z-10", activePhase === phase.id ? "text-primary translate-x-0" : "text-slate-800 -translate-x-2 group-hover:translate-x-0")} />
                                        
                                        {activePhase === phase.id && (
                                            <motion.div layoutId="active-pill" className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* AI Suggestion Card */}
                            <div className="p-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 mt-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">AI Recommendation</span>
                                </div>
                                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                                    "Based on your Udaipur location, consider Royal Blue accents for the Sangeet night to contrast the palace marble."
                                </p>
                                <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 p-0 h-auto justify-start gap-2 group">
                                    View Palette <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-9">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePhase}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between px-4">
                                        <div>
                                            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-1">
                                                {phases.find(p => p.id === activePhase)?.label} <span className="text-primary">Modules</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{phases.find(p => p.id === activePhase)?.description}</p>
                                        </div>
                                        <Button className="rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white gap-2 px-6 h-12 font-black text-[10px] uppercase tracking-widest">
                                            <Plus className="w-4 h-4" /> ADD ITEM
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {phases.find(p => p.id === activePhase)?.items.map((item, i) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="group relative glass-card rounded-[2.5rem] p-8 min-h-[220px] flex flex-col justify-between overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-700"
                                            >
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className={cn(
                                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                                            item.status === 'completed' || item.status === 'active' ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary"
                                                        )}>
                                                            {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                                        </div>
                                                        <span className={cn(
                                                            "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                                            item.status === 'completed' || item.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-slate-500"
                                                        )}>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors">{item.name}</h4>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{item.desc}</p>
                                                </div>
                                                
                                                <div className="relative z-10 mt-6 flex items-center justify-between">
                                                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-500 p-0 hover:text-white h-auto">Manage</Button>
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all">
                                                        <ArrowRight className="w-4 h-4 text-primary" />
                                                    </div>
                                                </div>

                                                {/* Decorative Blobs */}
                                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                            </motion.div>
                                        ))}

                                        {/* Luxury Blank Card */}
                                        <button className="glass-card rounded-[2.5rem] p-8 min-h-[220px] flex flex-col items-center justify-center gap-4 border-dashed border-white/10 hover:border-primary/50 group transition-all duration-500">
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
                                                <Plus className="w-6 h-6" />
                                            </div>
                                            <div className="text-center">
                                                <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white transition-colors">Expand Logic</span>
                                                <span className="block text-[9px] text-slate-600 font-bold uppercase mt-1">Custom Module</span>
                                            </div>
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-3xl border-t border-white/5 p-4 flex justify-around">
                {phases.map((p) => (
                    <button 
                        key={p.id}
                        onClick={() => setActivePhase(p.id)}
                        className={cn("flex flex-col items-center gap-1", activePhase === p.id ? "text-primary" : "text-slate-500")}
                    >
                        <p.icon className="w-5 h-5" />
                        <span className="text-[8px] font-black uppercase tracking-widest">{p.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
