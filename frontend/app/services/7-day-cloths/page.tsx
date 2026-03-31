"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Sparkles, ArrowLeft, RefreshCcw, Heart, ArrowRight,
  Shirt, Users, Zap, Info
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

// --- Design Tokens ---
const STYLES = ["Formal", "Casual", "Traditional", "Fusion"];
const GENDERS = [
  { id: "male", label: "Man / Boy" },
  { id: "female", label: "Woman / Girl" },
  { id: "transgender", label: "Transgender" }
];

const map_age_group = (age: number) => {
  if (isNaN(age)) return "unknown";
  if (age <= 3) return "baby";
  if (age <= 12) return "kids";
  if (age <= 17) return "teen";
  if (age <= 30) return "young_adult";
  if (age <= 50) return "adult";
  return "senior";
};

export default function ClothingConsultationPage() {
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
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header / Nav */}
      <div className="container mx-auto px-4 py-6 border-b border-border/40">
        <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Link>
      </div>

      <section className="py-12 md:py-24 relative overflow-hidden flex-1">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-8 text-indigo-400 backdrop-blur-md">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">AI-Powered Precision</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 italic uppercase">
              Smart 7-Day <br /> Clothes Planner
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Orchestrate your weekly wardrobe with our advanced categorization logic. Zero effort, maximum style.
            </p>
          </motion.div>

          {/* Consultation Form */}
          <AnimatePresence mode="wait">
            {outfits.length === 0 ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Style + Gender */}
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">01. Style Universe</h3>
                            <span className="text-[10px] text-white/40 font-mono italic">REQUIRED</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {STYLES.map(s => (
                            <button
                              key={s}
                              onClick={() => setForm(p => ({ ...p, style: s }))}
                              className={`py-5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all duration-500 ${form.style === s ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-[1.02]' : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/10 hover:text-white'}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">02. Gender Identity</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {GENDERS.map(g => (
                            <button
                              key={g.id}
                              onClick={() => setForm(p => ({ ...p, gender: g.id }))}
                              className={`w-full py-4 px-6 rounded-2xl text-left text-sm font-bold border transition-all duration-500 flex items-center justify-between group ${form.gender === g.id ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]' : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                            >
                              <span className="flex items-center gap-3">
                                {g.label}
                              </span>
                              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${form.gender === g.id ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/10 group-hover:bg-white/30'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Age + Generate */}
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">03. Age Dynamics</h3>
                            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest italic">{map_age_group(parseInt(form.age))}</span>
                            </div>
                        </div>
                        <div className="relative group">
                          <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400/50 group-focus-within:text-white transition-colors" />
                          <input
                            type="number"
                            value={form.age}
                            min="0" max="100"
                            onChange={(e) => setForm(p => ({ ...p, age: e.target.value }))}
                            placeholder="Current Age"
                            className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-2xl font-black text-white focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-muted-foreground/20 italic"
                          />
                        </div>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-start gap-4">
                          <Zap className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                            <span className="text-white">Intelligent Mapping:</span> Our algorithm automatically calculates your lifecycle stage to provide era-appropriate style suggestions.
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          onClick={fetchSuggestions}
                          disabled={loading}
                          className="w-full bg-white text-black hover:bg-slate-200 rounded-[2rem] py-10 font-black tracking-[0.3em] uppercase shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 text-base italic overflow-hidden relative group"
                        >
                          <div className="flex items-center gap-3 relative z-10">
                            {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <span>👉 Generate 7 Outfit Ideas</span>}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 max-w-[90rem] mx-auto"
              >
                {/* Results Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] italic text-center md:text-left">Success Matrix Result</p>
                    <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">Your Curated Collection</h2>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setOutfits([])} className="rounded-full h-14 px-8 border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
                      Reset Matrix
                    </Button>
                    <Button onClick={fetchSuggestions} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-14 px-8 font-bold uppercase tracking-widest text-[10px] gap-2 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                      <RefreshCcw className="h-4 w-4" /> Regenerate
                    </Button>
                  </div>
                </div>

                {/* 7-Day Grid */}
                <div id="results-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
                  {outfits.map((outfit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="group relative bg-slate-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-indigo-500/40 transition-all duration-700 hover:translate-y-[-12px] shadow-2xl ring-1 ring-white/5"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={outfit.image_url}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                          alt={`Day ${outfit.day_number}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 opacity-80" />

                        {/* Day Badge */}
                        <div className="absolute top-6 left-6 bg-white text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-[0.2em] shadow-2xl italic">
                          Day {outfit.day_number}
                        </div>
                        
                        <div className="absolute bottom-6 left-6 right-6 space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                             <div className="flex gap-1.5">
                                <span className="bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-[8px] font-black uppercase px-3 py-1 rounded-full border border-indigo-500/30 tracking-widest">{outfit.category}</span>
                             </div>
                             <p className="text-[10px] text-white/60 font-bold uppercase tracking-tighter line-clamp-1">{outfit.tags?.occasion || "Modern Essential"}</p>
                        </div>
                      </div>

                      <div className="p-6 bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 flex flex-col items-center justify-center gap-4">
                           <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-xl">
                                <Heart className="w-5 h-5" />
                           </button>
                           <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Add to Wardrobe</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col items-center justify-center pt-12 space-y-6">
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] italic">End of Suggestions</p>
                    <div className="w-1 h-20 bg-gradient-to-b from-indigo-500/50 to-transparent rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
