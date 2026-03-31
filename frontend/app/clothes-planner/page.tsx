"use client";

import { useEffect, useState } from "react";
import { 
  Sparkles, 
  ChevronRight, 
  RefreshCcw, 
  Calendar, 
  Shirt, 
  Wind, 
  Heart,
  Users,
  ChevronDown,
  ArrowRight,
  Zap,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";

// --- Design Tokens ---
const STYLES = ["Formal", "Casual", "Traditional", "Fusion"];
const GENDERS = [
    { id: "male", label: "Man / Boy" },
    { id: "female", label: "Woman / Girl" },
    { id: "transgender", label: "Transgender" }
];

export default function ClothesPlannerPage() {
    const [outfits, setOutfits] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [form, setForm] = useState({
        style: "Casual",
        age: "25",
        gender: "female"
    });

    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                style: form.style,
                gender: form.gender,
                age: form.age
            }).toString();
            
            const res = await fetch(getApiUrl(`/api/v1/outfits/suggest?${query}`));
            if (res.ok) {
                const data = await res.json();
                setOutfits(data);
                // Scroll to results
                setTimeout(() => {
                    document.getElementById('results-grid')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 pb-40">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse [animation-delay:3s]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                {/* Hero section */}
                <div className="max-w-4xl space-y-8 mb-32 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black tracking-[0.4em] uppercase shadow-inner">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        Smart Recommendation Engine
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">
                         7-Day <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
                            Clothes Planner
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl font-serif italic border-l-2 border-indigo-500/30 pl-8 ml-2 py-2">
                         Experience a perfectly curated weekly wardrobe based on your unique profile. From foundation aesthetics to weekend luxury, orchestrated by AI.
                    </p>
                </div>

                {/* Consultation Form Matrix */}
                <section className="mb-40 max-w-5xl mx-auto animate-in fade-in slide-in-from-top-6 duration-700 [animation-delay:400ms]">
                    <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 md:p-20 shadow-3xl ring-1 ring-white/5 space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            {/* Left: Preference & Identity */}
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-1 italic">01. Style Preference</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {STYLES.map(s => (
                                            <button 
                                                key={s}
                                                onClick={() => setForm(p=>({...p, style: s}))}
                                                className={`py-5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${form.style === s ? 'bg-white text-black border-white shadow-2xl shadow-indigo-600/20' : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-1 italic">02. Gender Choice</h3>
                                    <div className="space-y-3">
                                        {GENDERS.map(g => (
                                            <button 
                                                key={g.id}
                                                onClick={() => setForm(p=>({...p, gender: g.id}))}
                                                className={`w-full py-4 px-6 rounded-2xl text-left text-sm font-bold border transition-all flex items-center justify-between group ${form.gender === g.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30' : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                                            >
                                                {g.label}
                                                <div className={`w-2 h-2 rounded-full transition-all ${form.gender === g.id ? 'bg-white scale-110 shadow-[0_0_10px_white]' : 'bg-white/10'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Age Calibration */}
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-1 italic">03. Age Calibration</h3>
                                    <div className="space-y-8">
                                        <div className="relative group">
                                            <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" />
                                            <input 
                                                type="number"
                                                value={form.age}
                                                min="0" max="100"
                                                onChange={(e) => setForm(p=>({...p, age: e.target.value}))}
                                                placeholder="Enter Age (0-100)"
                                                className="w-full bg-black/40 border-2 border-white/5 rounded-3xl py-6 pl-16 pr-8 text-2xl font-black text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-muted-foreground/20 italic"
                                            />
                                        </div>
                                        <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Info className="w-4 h-4 text-indigo-400" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Smart Mapping</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground font-medium italic">Your age number will be automatically mapped to its corresponding matrix group for optimal style alignment.</p>
                                        </div>
                                    </div>
                                </div>

                                <Button 
                                    onClick={fetchSuggestions}
                                    disabled={loading}
                                    className="w-full bg-indigo-600 hover:bg-white hover:text-black rounded-[2.5rem] py-12 px-10 font-bold tracking-[0.5em] uppercase shadow-3xl shadow-indigo-600/30 group transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                                >
                                    <div className="flex items-center gap-4">
                                        {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : "👉"} 
                                        <span className="text-lg">Generate 7 Outfit Ideas</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7-Day Result Matrix */}
                <div id="results-grid" className="scroll-mt-20 space-y-24 min-h-[500px]">
                    <div className="flex flex-col items-center gap-6">
                        <div className="h-px w-48 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                        <h2 className="text-5xl md:text-7xl font-black text-white italic text-center tracking-tighter uppercase">
                            Your Weekly <br />
                            <span className="text-indigo-400">Orchestration</span>
                        </h2>
                        <div className="h-px w-48 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-8">
                        {loading && !outfits.length ? (
                            Array.from({length: 7}).map((_, i) => (
                                <div key={i} className="aspect-[3/4] bg-white/5 rounded-[3rem] animate-pulse border border-white/5" />
                            ))
                        ) : outfits.length > 0 ? (
                            outfits.map((outfit, i) => (
                                <div 
                                    key={i} 
                                    className="group relative bg-slate-950 rounded-[3.5rem] border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all duration-700 shadow-3xl hover:translate-y-[-15px] animate-in fade-in zoom-in-95 duration-700"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        <img 
                                            src={outfit.image_url} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                                            alt={`Day ${i+1}`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-slate-950/90" />
                                        
                                        {/* Day Info Overlay */}
                                        <div className="absolute top-10 left-10">
                                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] italic mb-2">Day {outfit.day_number}</p>
                                            <h4 className="text-4xl font-black text-white italic leading-none">{outfit.age_group === 'baby' ? 'Bundle' : outfit.category}</h4>
                                        </div>
                                    </div>

                                    <div className="p-10 space-y-8">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-bold uppercase px-4 py-1.5 rounded-full border border-indigo-500/20 tracking-widest">{outfit.category}</span>
                                            <span className="bg-white/5 text-white/50 text-[9px] font-bold uppercase px-4 py-1.5 rounded-full border border-white/5 tracking-widest">{outfit.gender}</span>
                                        </div>
                                        <div className="space-y-6">
                                            <p className="text-sm text-balance text-white/60 font-medium leading-relaxed italic border-l border-indigo-500/20 pl-4">
                                                A bespoke {outfit.age_group} {(outfit.tags?.occasion || "Daily").toLowerCase()} look.
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                               <button className="text-rose-500/50 hover:text-rose-500 transition-colors">
                                                 <Heart className="w-5 h-5 hover:fill-current transition-all" />
                                               </button>
                                               <Button variant="ghost" size="icon" className="w-12 h-12 bg-white/5 hover:bg-indigo-600 rounded-2xl transition-all shadow-xl hover:shadow-indigo-600/30">
                                                  <ArrowRight className="w-5 h-5" />
                                               </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-40 text-center space-y-8 animate-in fade-in zoom-in-95 duration-1000">
                                <div className="w-24 h-24 bg-indigo-500/10 rounded-[3rem] border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400 shadow-2xl shadow-indigo-600/10">
                                    <Shirt className="w-10 h-10" />
                                </div>
                                <div className="max-w-sm mx-auto space-y-4">
                                    <h3 className="text-4xl font-black italic tracking-tighter uppercase">No Selections</h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed italic border-x border-indigo-500/30 px-6">Input your profile parameters into the matrix above to begin generating your weekly lookbook.</p>
                                </div>
                                {!loading && (
                                    <Button variant="outline" className="border-indigo-500/30 text-indigo-400 font-bold hover:bg-indigo-500/10 rounded-2xl py-6 px-10" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                        Scroll to Ingest
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Final CTA */}
                <section className="mt-60 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[4rem] p-16 md:p-32 relative overflow-hidden group shadow-3xl shadow-indigo-600/20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 blur-[120px] rounded-full group-hover:scale-150 transition-transform duration-[3000ms]" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-black/20 blur-[120px] rounded-full group-hover:scale-150 transition-transform duration-[3000ms]" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-20">
                        <div className="max-w-2xl space-y-8">
                            <h2 className="text-5xl md:text-7xl font-black text-white italic leading-[0.9] uppercase tracking-tighter italic">CRAFT YOUR <br /> UNIQUE LOOKBOOK.</h2>
                            <p className="text-xl text-white/70 font-semibold font-serif italic border-l-2 border-white/20 pl-8">Experience the cutting edge of AI fashion with our bespoke consultation services delivered in the studio.</p>
                        </div>
                        <Button className="bg-white text-indigo-600 hover:bg-slate-100 rounded-[2.5rem] py-12 px-20 font-black tracking-[0.4em] uppercase shadow-[0_0_50px_rgba(255,255,255,0.2)] group transition-all hover:scale-110 active:scale-95">
                            Consult Now
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
}
