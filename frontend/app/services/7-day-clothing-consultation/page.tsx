"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Sparkles, ArrowLeft, RefreshCcw, Heart, ArrowRight,
  Shirt, Users, Zap, Info, Layers, Palette, Wand2, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

// --- Design Tokens & Constants ---
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
  const [cmsData, setCmsData] = useState<any>(null);

  // Form State
  const [form, setForm] = useState({
    style: "Casual",
    age: "25",
    gender: "female",
    startDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetch(getApiUrl("/api/v1/cms/7-day-clothing-consultation"))
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
    <main className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Premium Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />
      </div>

      {/* Navigation Header */}
      <div className="relative z-50 container mx-auto px-6 py-8">
        <Link href="/services" className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
            <ArrowLeft className="h-3 w-3" />
          </div>
          Back to Studio
        </Link>
      </div>

      <section className="relative z-10 py-12 md:py-24 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Hero Section: High Fidelity */}
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

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30 italic uppercase leading-[0.9] font-outfit">
              {cmsData?.hero?.title || <>7-Day <br /> Consultation</>}
            </h1>
            
            <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
              {cmsData?.hero?.description || "Experience the fusion of AI logic and high-street fashion. Our success matrix orchestrates local and global styles into a seamless weekly flow."}
            </p>
          </motion.div>

          {/* Master Interface: Glassmorphic Container */}
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
                  {/* Decorative Border Glow */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-indigo-500/50 rounded-[4rem] blur-[2px] opacity-20 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                      {/* Column 01: Schedule & Global Preferences */}
                      <div className="space-y-16">
                        <section className="space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">01. Temporal Setting</h3>
                          </div>
                          
                          <div className="relative group/input">
                            <input
                              type="date"
                              value={form.startDate}
                              onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))}
                              className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 px-10 text-lg font-bold text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all italic appearance-none"
                            />
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                          </div>
                        </section>

                        <section className="space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                                <Palette className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">02. Aesthetic Universe</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {STYLES.map(s => (
                              <button
                                key={s}
                                onClick={() => setForm(p => ({ ...p, style: s }))}
                                className={`group relative py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] border transition-all duration-500 overflow-hidden ${form.style === s ? 'bg-white text-black border-white shadow-[0_20px_40px_rgba(255,255,255,0.15)]' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                              >
                                {form.style === s && <motion.div layoutId="style-bg" className="absolute inset-0 bg-white" />}
                                <span className="relative z-10">{s}</span>
                              </button>
                            ))}
                          </div>
                        </section>
                      </div>

                      {/* Column 02: Biological Matrix & Engine Activation */}
                      <div className="space-y-16 flex flex-col justify-between">
                        <section className="space-y-10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                                <Users className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">03. Identity Matrix</h3>
                          </div>
                          
                          <div className="space-y-8">
                            <div className="relative group/input space-y-4">
                              <div className="flex justify-between items-center px-4">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Chronological Age</label>
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                    Tier: {map_age_group(parseInt(form.age))}
                                </span>
                              </div>
                              <input
                                type="number"
                                value={form.age}
                                min="0" max="100"
                                onChange={(e) => setForm(p => ({ ...p, age: e.target.value }))}
                                className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 px-10 text-3xl font-black text-white focus:outline-none focus:border-emerald-500/50 transition-all italic"
                              />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-4">Gender Classification</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {GENDERS.map(g => (
                                        <button
                                            key={g.id}
                                            onClick={() => setForm(p => ({ ...p, gender: g.id }))}
                                            className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${form.gender === g.id ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-600/20' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}
                                        >
                                            {g.id === "male" ? "Man" : g.id === "female" ? "Woman" : "Fluid"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                          </div>
                        </section>

                        <div className="pt-8">
                          <Button
                            onClick={fetchSuggestions}
                            disabled={loading}
                            className="w-full relative group/btn h-24 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-500 shadow-2xl shadow-indigo-600/40 disabled:opacity-50 overflow-hidden"
                          >
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                             <div className="flex items-center justify-center gap-4">
                                {loading ? (
                                    <>
                                        <RefreshCcw className="w-5 h-5 animate-spin" />
                                        <span className="text-sm font-black uppercase tracking-[0.4em] italic">Orchestrating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
                                        <span className="text-base font-black uppercase tracking-[0.4em] italic">Generate Experience</span>
                                    </>
                                )}
                             </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-20 max-w-[95rem] mx-auto"
              >
                {/* High Fidelity Results Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/10 pb-16">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">
                        <ShieldCheck className="w-4 h-4" /> Optimization Complete
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none font-outfit">
                        The Week In <br /> <span className="text-indigo-500">Vision</span>
                    </h2>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setOutfits([])} className="h-16 px-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl">
                      Re-calibrate Matrix
                    </Button>
                    <Button onClick={fetchSuggestions} className="h-16 px-10 rounded-full bg-white text-black hover:bg-slate-200 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-white/10">
                      Sync Again
                    </Button>
                  </div>
                </div>

                {/* 7-Day Matrix Grid */}
                <div id="results-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
                  {outfits.map((outfit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative"
                    >
                      <div className="aspect-[3/4.5] relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:border-indigo-500/40">
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                        
                        <img
                          src={outfit.image_url}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                          alt={`Vision ${outfit.day_number}`}
                        />

                        {/* Top Info Badge */}
                        <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                             <div className="bg-white text-black text-[10px] font-black uppercase px-5 py-2 rounded-full tracking-[0.3em] shadow-2xl italic">
                                Day 0{outfit.day_number}
                             </div>
                        </div>
                        
                        {/* Bottom Metadata */}
                        <div className="absolute bottom-10 left-8 right-8 z-20 space-y-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                             <div className="flex flex-wrap gap-2">
                                <span className="bg-indigo-600/90 backdrop-blur-md text-white text-[8px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest">{outfit.category}</span>
                                <span className="bg-white/10 backdrop-blur-md text-white/60 text-[8px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest border border-white/5">{form.style}</span>
                             </div>
                             <h4 className="text-lg font-bold text-white uppercase italic tracking-tight line-clamp-1">{outfit.tags?.occasion || "Modern Essential"}</h4>
                        </div>

                        {/* Hover Overlay Actions */}
                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-indigo-900/20 backdrop-blur-sm">
                             <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-90 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                                <Heart className="w-6 h-6" />
                             </button>
                             <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">Archive Look</div>
                        </div>
                      </div>
                      
                      {/* Reflection Effect */}
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col items-center justify-center pt-24 space-y-8">
                    <div className="w-[1px] h-32 bg-gradient-to-b from-indigo-500/50 to-transparent" />
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.6em] italic">Matrix Visualization Complete</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}
