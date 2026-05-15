"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    Wallet, 
    Users, 
    MapPin, 
    Sparkles, 
    ChevronRight, 
    PieChart, 
    Download,
    TrendingUp,
    ShieldCheck,
    Gem,
    Utensils,
    Camera,
    Music,
    Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface Allocation {
    category: string;
    amount: number;
    percentage: number;
    icon: any;
    priority: 'high' | 'medium' | 'low';
}

export default function WeddingBudgetPlanner() {
    const [budget, setBudget] = useState(1500000);
    const [guests, setGuests] = useState(150);
    const [city, setCity] = useState("Udaipur");
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [allocations, setAllocations] = useState<Allocation[]>([]);

    const optimizeBudget = () => {
        setIsOptimizing(true);
        // Simulate AI logic
        setTimeout(() => {
            const data: Allocation[] = [
                { category: 'Venue & Decor', percentage: 40, amount: budget * 0.4, icon: Palette, priority: 'high' },
                { category: 'Catering', percentage: 30, amount: budget * 0.3, icon: Utensils, priority: 'high' },
                { category: 'Photography', percentage: 15, amount: budget * 0.15, icon: Camera, priority: 'medium' },
                { category: 'Entertainment', percentage: 10, amount: budget * 0.1, icon: Music, priority: 'medium' },
                { category: 'Invitations', percentage: 5, amount: budget * 0.05, icon: Sparkles, priority: 'low' },
            ];
            setAllocations(data);
            setIsOptimizing(false);
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Input Side */}
            <div className="lg:col-span-4 space-y-8">
                <div className="glass-card rounded-[2.5rem] p-8 border-primary/20 bg-primary/5">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tighter italic">AI Optimizer</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Budget (₹)</label>
                            <Input 
                                type="number" 
                                value={budget} 
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="bg-white/5 border-white/10 rounded-xl h-12 font-bold text-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Guest Count</label>
                            <Input 
                                type="number" 
                                value={guests} 
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="bg-white/5 border-white/10 rounded-xl h-12 font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Target City</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                <Input 
                                    value={city} 
                                    onChange={(e) => setCity(e.target.value)}
                                    className="bg-white/5 border-white/10 rounded-xl h-12 pl-10 font-bold"
                                />
                            </div>
                        </div>

                        <Button 
                            onClick={optimizeBudget}
                            disabled={isOptimizing}
                            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(99,102,241,0.3)] transition-all"
                        >
                            {isOptimizing ? "Processing..." : "Generate AI Strategy"}
                        </Button>
                    </div>
                </div>

                <div className="p-8 border border-white/5 rounded-[2.5rem] bg-slate-900/30">
                    <div className="flex items-center gap-3 mb-4 text-indigo-400">
                        <Gem className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Luxury Tip</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                        "For a destination wedding in {city}, allocating 15% more to logistics ensures a smoother guest experience."
                    </p>
                </div>
            </div>

            {/* Output Side */}
            <div className="lg:col-span-8">
                {allocations.length > 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-card rounded-[2rem] p-6 border-white/5">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Cost Per Guest</p>
                                <p className="text-2xl font-black tracking-tighter text-white">₹{(budget/guests).toLocaleString()}</p>
                            </div>
                            <div className="glass-card rounded-[2rem] p-6 border-emerald-500/10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-2">Confidence Score</p>
                                <p className="text-2xl font-black tracking-tighter text-emerald-400">94%</p>
                            </div>
                            <div className="glass-card rounded-[2rem] p-6 border-white/5">
                                <Button variant="ghost" className="w-full h-full p-0 flex flex-col items-center justify-center gap-1 hover:text-primary transition-colors">
                                    <Download className="w-5 h-5 mb-1" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Download PDF</span>
                                </Button>
                            </div>
                        </div>

                        {/* Breakdown Table */}
                        <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5">
                            <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Budget Allocation Breakdown</span>
                                <PieChart className="w-4 h-4 text-primary" />
                            </div>
                            <div className="p-0">
                                {allocations.map((alloc, i) => (
                                    <div 
                                        key={alloc.category} 
                                        className={cn(
                                            "px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 last:border-0",
                                            i === 0 ? "bg-primary/5" : ""
                                        )}
                                    >
                                        <div className="flex items-center gap-6 flex-1">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                                                <alloc.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-tight">{alloc.category}</h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] text-slate-500 font-bold">{alloc.percentage}% of total</span>
                                                    <span className={cn(
                                                        "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                                                        alloc.priority === 'high' ? "bg-rose-500/10 text-rose-500" : "bg-slate-500/10 text-slate-500"
                                                    )}>
                                                        {alloc.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black tracking-tighter">₹{alloc.amount.toLocaleString()}</p>
                                            <p className="text-[10px] font-bold text-primary italic">AI Optimized</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center glass-card rounded-[3rem] border-dashed border-white/10 opacity-30">
                        <TrendingUp className="w-16 h-16 mb-6" />
                        <h3 className="text-xl font-black uppercase italic tracking-tighter">Enter Wedding Details</h3>
                        <p className="text-sm font-medium text-slate-500 mt-2">Our AI will generate a personalized luxury <br /> budget strategy in real-time.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
