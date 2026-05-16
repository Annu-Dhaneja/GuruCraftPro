"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Sparkles, ArrowLeft, RefreshCcw, Heart, ArrowRight,
  Shirt, Users, Zap, Info, Layers, Palette, Wand2, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getApiUrl, fetchWithAuth } from "@/lib/utils";

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

export function ClothingConsultationContent() {
  const [outfits, setOutfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cmsData, setCmsData] = useState<any>(null);

  const [form, setForm] = useState({
    style: "Casual",
    age: "25",
    gender: "female",
    startDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchWithAuth("/api/v1/cms/7-day-clothing-consultation")
      .then(res => res.json())
      .then(data => setCmsData(data))
      .catch(err => console.error("CMS Fetch Error:", err));
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        style: form.style,
        gender: form.gender,
        age: form.age
      }).toString();

      const res = await fetchWithAuth(`/api/v1/outfits/suggest?${query}`);
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
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-indigo-500/30 overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />
      </div>

      <section className="relative z-10 py-12 md:py-24 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl mx-auto mb-28"
          >
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-6 py-2.5 mb-10 text-indigo-400 backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Next-Gen Wardrobe Intelligence</span>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30 italic uppercase leading-[0.9]">
              {cmsData?.hero?.title || "7-Day Consultation"}
            </h1>
            
            <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
              {cmsData?.hero?.description || "Experience the fusion of AI logic and high-street fashion. Our success matrix orchestrates local and global styles into a seamless weekly flow."}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {outfits.length === 0 ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                className="max-w-6xl mx-auto"
              >
                <div className="relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-indigo-500/50 rounded-[4rem] blur-[2px] opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                      <div className="space-y-16">
                        <section className="space-y-8">
                          <div className="flex items-center gap-6 mb-10">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-xl">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-[0.4em] italic">01. Temporal Setting</h3>
                          </div>
                          <input
                            type="date"
                            value={form.startDate}
                            onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))}
                            className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 px-10 text-lg font-bold text-white focus:outline-none focus:border-indigo-500/50 transition-all italic"
                          />
                        </section>
                        <section className="space-y-8">
                          <div className="flex items-center gap-6 mb-10">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                                <Palette className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-[0.4em] italic">02. Aesthetic Universe</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {STYLES.map(s => (
                              <button
                                key={s}
                                onClick={() => setForm(p => ({ ...p, style: s }))}
                                className={`py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] border transition-all duration-500 ${form.style === s ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </section>
                      </div>
                      <div className="space-y-16 flex flex-col justify-between">
                        <section className="space-y-10">
                          <div className="flex items-center gap-6 mb-10">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-[0.4em] italic">03. Identity Matrix</h3>
                          </div>
                          <div className="space-y-8">
                            <input
                              type="number"
                              value={form.age}
                              onChange={(e) => setForm(p => ({ ...p, age: e.target.value }))}
                              className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 px-10 text-3xl font-black text-white focus:outline-none focus:border-emerald-500/50 transition-all italic"
                            />
                            <div className="grid grid-cols-3 gap-3">
                                {GENDERS.map(g => (
                                    <button
                                        key={g.id}
                                        onClick={() => setForm(p => ({ ...p, gender: g.id }))}
                                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${form.gender === g.id ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}
                                    >
                                        {g.label.split(" ")[0]}
                                    </button>
                                ))}
                            </div>
                          </div>
                        </section>
                        <Button
                          onClick={fetchSuggestions}
                          disabled={loading}
                          className="w-full h-24 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-2xl disabled:opacity-50"
                        >
                           {loading ? <RefreshCcw className="animate-spin" /> : <span className="font-black uppercase tracking-[0.4em] italic text-base">Generate Experience</span>}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div id="results-grid" className="space-y-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
                  {outfits.map((outfit, i) => (
                    <motion.div key={i} className="group relative aspect-[3/4.5] rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40">
                      <img src={outfit.image_url} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black z-10 opacity-80" />
                      <div className="absolute bottom-8 left-8 z-20">
                        <span className="bg-white text-black text-[10px] font-black uppercase px-4 py-2 rounded-full mb-2 block w-fit">Day 0{outfit.day_number}</span>
                        <h4 className="text-white font-bold italic uppercase">{outfit.category}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" onClick={() => setOutfits([])} className="mx-auto block rounded-full px-12 h-16 border-white/10 text-white font-black uppercase tracking-widest">
                    RESET MATRIX
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
