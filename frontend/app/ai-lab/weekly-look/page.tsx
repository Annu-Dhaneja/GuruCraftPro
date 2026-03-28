"use client";

import { useState } from "react";
import { Sparkles, Calendar, Loader2, Info, ChevronRight, User, Baby, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getApiUrl } from "@/lib/utils";
import { Footer } from "@/components/footer/Footer";

const STYLES = [
    { id: "Formal", label: "Formal", desc: "Suits & blazers" },
    { id: "Casual", label: "Casual", desc: "Everyday comfort" },
    { id: "Traditional", label: "Traditional", desc: "Ethnic & cultural" },
    { id: "Fusion", label: "Fusion", desc: "Modern & traditional mix" }
];

const AGES = [
    { id: "Kids", label: "Kids", icon: Baby },
    { id: "Teens", label: "Teens", icon: GraduationCap },
    { id: "Adult", label: "Adult", icon: Briefcase },
    { id: "Senior", label: "Senior", icon: User }
];

const GENDERS = ["Male", "Female", "Unisex"];

export default function WeeklyLookPage() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [style, setStyle] = useState("Casual");
    const [gender, setGender] = useState("Female");
    const [age, setAge] = useState("Adult");
    
    const [plan, setPlan] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        
        const params = new URLSearchParams({
            gender,
            age_group: age,
            style
        });

        try {
            const res = await fetch(getApiUrl(`/api/v1/wardrobe/suggest?${params.toString()}`));
            if (res.ok) {
                const data = await res.json();
                if (data.items.length > 0) {
                    setPlan(data.items);
                } else {
                    setError("No matching items found for your selection. Try different filters!");
                }
            } else {
                setError("System is busy. Please try again in a moment.");
            }
        } catch (e) {
            setError("Connection failed. Check your internet.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <div className="container mx-auto px-4 md:px-6 py-12 flex-grow max-w-6xl">
                <div className="space-y-12">
                    
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" />
                            Smart Wardrobe Engine
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            Your Weekly Look
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                            Stop wondering what to wear. Generate a curated 7-day outfit plan using real studio assets.
                        </p>
                    </div>

                    {/* Generator Box */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
                            
                            {/* Start Date */}
                            <div className="space-y-4">
                                <Label className="text-xs uppercase font-black tracking-[0.2em] text-white/40">Start Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400/50" />
                                    <input 
                                        type="date" 
                                        value={startDate} 
                                        onChange={e => setStartDate(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-[10px] text-white/30 font-medium">Select the first day of your 7-day plan.</p>
                            </div>

                            {/* Gender */}
                            <div className="space-y-4">
                                <Label className="text-xs uppercase font-black tracking-[0.2em] text-white/40">Gender</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {GENDERS.map(g => (
                                        <button 
                                            key={g}
                                            onClick={() => setGender(g)}
                                            className={`py-3 rounded-xl border text-xs font-bold transition-all ${gender === g ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Age Group */}
                            <div className="space-y-4">
                                <Label className="text-xs uppercase font-black tracking-[0.2em] text-white/40">Age Group</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {AGES.map(a => (
                                        <button 
                                            key={a.id}
                                            onClick={() => setAge(a.id)}
                                            title={a.label}
                                            className={`p-3 rounded-xl border flex items-center justify-center transition-all ${age === a.id ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                        >
                                            <a.icon className="w-5 h-5" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Style */}
                            <div className="space-y-4">
                                <Label className="text-xs uppercase font-black tracking-[0.2em] text-white/40">Style Preference</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {STYLES.map(s => (
                                        <button 
                                            key={s.id}
                                            onClick={() => setStyle(s.id)}
                                            className={`py-3 rounded-xl border text-xs font-bold transition-all ${style === s.id ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="mt-12 space-y-6 relative z-10">
                            <Button 
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full h-16 rounded-[1.25rem] bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-black tracking-tight transition-all active:scale-[0.98] shadow-2xl shadow-indigo-600/40"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                        Calculating Optimal Mix...
                                    </>
                                ) : (
                                    "Generate My Weekly Look"
                                )}
                            </Button>
                            <p className="text-center text-white/20 text-xs italic">Our stylist algorithm will select 7 perfect pieces from our real studio collection based on your choices.</p>
                        </div>
                    </div>

                    {/* Result Plan */}
                    {(plan.length > 0 || error) && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                             {error ? (
                                <div className="p-12 border border-destructive/20 bg-destructive/5 rounded-3xl text-center space-y-4">
                                    <Info className="w-12 h-12 text-destructive mx-auto" />
                                    <h3 className="text-xl font-bold">Oops! Narrow selection</h3>
                                    <p className="text-muted-foreground">{error}</p>
                                </div>
                             ) : (
                                <>
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <h2 className="text-2xl font-bold flex items-center gap-2">
                                            <Sparkles className="text-indigo-400" />
                                            Day-by-Day Inspiration
                                        </h2>
                                        <Button variant="ghost" onClick={() => setPlan([])}>Custom Reset</Button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                                        {plan.map((item, i) => (
                                            <div key={i} className="group flex flex-col gap-3">
                                                <div className="text-[10px] font-black uppercase text-white/40 tracking-widest pl-2">DAY 0{i+1}</div>
                                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl group-hover:border-indigo-500/50 transition-colors">
                                                    <img 
                                                        src={item.image_url.startsWith("http") ? item.image_url : getApiUrl(item.image_url)} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                                        alt={`Look ${i+1}`} 
                                                    />
                                                    <div className="absolute top-2 right-2 bg-indigo-600 px-2 py-1 rounded-lg text-[8px] font-black uppercase border border-white/20">
                                                        {item.style}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-center pt-8">
                                        <Button size="lg" className="rounded-full gap-2 pr-2">
                                            Save This Weekly Plan <ChevronRight className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </>
                             )}
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </main>
    );
}
