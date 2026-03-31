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

      <section className="py-12 md:py-20 relative overflow-hidden flex-1">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6 text-indigo-400">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Smart Recommendation Engine</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white/60">
              7-Day Clothing Consultation
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Our AI-powered algorithm curates a perfect weekly wardrobe based on your age, gender, and style preferences. From foundation days to weekend luxury.
            </p>
          </motion.div>

          {/* Consultation Form */}
          <AnimatePresence mode="wait">
            {outfits.length === 0 ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl mx-auto bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Left: Style + Gender */}
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">01. Style Preference</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {STYLES.map(s => (
                          <button
                            key={s}
                            onClick={() => setForm(p => ({ ...p, style: s }))}
                            className={`py-4 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all ${form.style === s ? 'bg-white text-black border-white shadow-lg' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">02. Gender</h3>
                      <div className="space-y-2">
                        {GENDERS.map(g => (
                          <button
                            key={g.id}
                            onClick={() => setForm(p => ({ ...p, gender: g.id }))}
                            className={`w-full py-3.5 px-5 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${form.gender === g.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                          >
                            {g.label}
                            <div className={`w-2 h-2 rounded-full transition-all ${form.gender === g.id ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/10'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Age + Generate */}
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">03. Age</h3>
                      <div className="relative">
                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400/50" />
                        <input
                          type="number"
                          value={form.age}
                          min="0" max="100"
                          onChange={(e) => setForm(p => ({ ...p, age: e.target.value }))}
                          placeholder="Enter your age (0-100)"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-xl font-bold text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-muted-foreground/30"
                        />
                      </div>
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-3">
                        <Info className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          Your age is automatically mapped: 0–3 → Baby, 4–12 → Kids, 13–17 → Teen, 18–30 → Young Adult, 31–50 → Adult, 50+ → Senior.
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={fetchSuggestions}
                      disabled={loading}
                      className="w-full bg-indigo-600 hover:bg-white hover:text-black rounded-2xl py-8 font-bold tracking-widest uppercase shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 text-base"
                    >
                      <div className="flex items-center gap-3">
                        {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <span>👉</span>}
                        <span>Generate 7 Outfit Ideas</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 max-w-6xl mx-auto"
              >
                {/* Results Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-400" />
                    Your Curated Weekly Plan
                  </h2>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setOutfits([])} className="rounded-full border-white/10">
                      Change Preferences
                    </Button>
                    <Button onClick={fetchSuggestions} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full gap-2">
                      <RefreshCcw className="h-4 w-4" /> Regenerate
                    </Button>
                  </div>
                </div>

                {/* 7-Day Grid */}
                <div id="results-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5">
                  {outfits.map((outfit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="group relative bg-card/50 rounded-2xl border border-border/50 overflow-hidden hover:border-indigo-500/30 transition-all duration-500 hover:translate-y-[-8px] shadow-lg"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={outfit.image_url}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          alt={`Day ${outfit.day_number}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

                        {/* Day Badge */}
                        <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest shadow-lg">
                          Day {outfit.day_number}
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border border-indigo-500/20 tracking-wider">{outfit.category}</span>
                          <span className="bg-white/5 text-white/50 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border border-white/5 tracking-wider">{outfit.gender}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {outfit.age_group} • {(outfit.tags?.occasion || "Daily wear")}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <button className="text-rose-500/40 hover:text-rose-500 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="text-white/20 hover:text-indigo-400 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
