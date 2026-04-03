"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Palette, 
  ChevronRight, 
  Zap, 
  ShieldCheck,
  Star,
  Monitor,
  Wand2,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/footer/Footer";

export default function ServicesPage() {
  const categories = [
    {
      id: "creative",
      title: "Category A: Creative Product Post-Production",
      description: "Elite visual refinement for professional e-commerce imagery.",
      slug: "vantage-ecom",
      accent: "from-indigo-500 to-blue-600",
      icon: Wand2,
      features: ["Advanced Retouching", "Ghost Mannequin", "Compliance Editing"]
    },
    {
      id: "technical",
      title: "Category B: Technical E-com Assets",
      description: "Precision-engineered mockups and technical brand templates.",
      slug: "vantage-ecom",
      accent: "from-blue-600 to-cyan-500",
      icon: Monitor,
      features: ["Jersey Customization", "Branded Size Charts", "Technical Mockups"]
    },
    {
      id: "strategy",
      title: "Category C: Knowledge & Strategy",
      description: "Educational blueprints for scaling your digital merchant venture.",
      slug: "vantage-ecom",
      accent: "from-cyan-500 to-indigo-500",
      icon: BookOpen,
      features: ["E-books & Blueprints", "Scaling Strategies", "Market Analysis"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 overflow-hidden relative">
      {/* ── Neural Mesh Background ─────────────────────── */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 neural-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 backdrop-blur-xl"
          >
            <Cpu className="w-4 h-4 animate-spin-slow" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase">SYSTEM CATALOG V4.0</span>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.8] uppercase italic">
            ELITE <br /> <span className="text-shimmer">ECOSYSTEM.</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-16 italic px-6">
            Explore our professional-grade services, from tech-driven e-commerce post-production to divine spiritual artistry.
          </p>
        </div>
      </section>

      {/* ── Smart Menu Layout (VantageEcom Focus) ───────── */}
      <section className="py-32 relative z-10">
        <div className="container px-4">
          <div className="flex items-center gap-4 mb-20">
            <div className="h-[1px] w-20 bg-indigo-500" />
            <span className="text-indigo-500 font-black text-xs tracking-[0.6em] uppercase">VANTAGEECOM SMART MENU</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl -z-10 rounded-full" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                
                <Link href={`/services/${cat.slug}`} className="block glass-card p-12 rounded-[4rem] h-full relative neon-border-glow shimmer-sweep">
                   <div className="flex justify-between items-start mb-12">
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${cat.accent} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                         <cat.icon className="w-10 h-10 text-white" />
                      </div>
                      <ArrowRight className="w-8 h-8 text-white/5 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
                   </div>
                   
                   <h3 className="text-3xl font-black mb-6 tracking-tight uppercase italic group-hover:text-shimmer transition-all leading-none">{cat.title}</h3>
                   <p className="text-slate-500 text-lg font-light leading-relaxed mb-10 italic">{cat.description}</p>
                   
                   <div className="space-y-4 pt-8 border-t border-white/5">
                      {cat.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                           <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-widest">{f}</span>
                        </div>
                      ))}
                   </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guru Ji Art Museum Spotlight ─────────────── */}
      <section className="py-48 relative overflow-hidden bg-zinc-950/50 border-y border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.05)_0%,transparent_50% transition-all duration-1000)]" />
        
        <div className="container relative z-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative aspect-[4/5] rounded-[5rem] overflow-hidden border border-white/5 shadow-2xl group cursor-pointer"
             >
                <Image 
                  src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
                  alt="Guru Ji Art"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[3000ms] grayscale group-hover:grayscale-0 transition-grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-16 left-16">
                   <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 group-hover:bg-amber-600 transition-all duration-500">
                      <Star className="w-6 h-6 text-amber-500 group-hover:text-white" />
                      <span className="text-xl font-black tracking-widest uppercase text-white">THE DIVINE STUDIO</span>
                   </div>
                </div>
             </motion.div>

             <div className="space-y-12 text-left">
                <div className="flex items-center gap-4">
                   <div className="h-[1px] w-20 bg-amber-500" />
                   <span className="text-amber-500 font-black text-xs tracking-[0.6em] uppercase whitespace-nowrap">SECTION 1: SPIRITUAL ARTISTRY</span>
                </div>
                <h2 className="text-6xl md:text-9xl font-black leading-[0.8] tracking-tighter uppercase italic font-serif">Guru Ji <br /> <span className="text-shimmer bg-gradient-to-r from-amber-100 via-orange-300 to-amber-500 bg-clip-text text-transparent">Art Work.</span></h2>
                <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-xl italic">
                  Traditional spiritual symbolism reimagined through premium digital and physical art. Exclusive bracelets, satsang content, and sacred wisdom.
                </p>
                <Link href="/services/guru-ji-art">
                  <Button size="lg" className="bg-amber-600 hover:bg-white hover:text-black rounded-3xl h-24 px-16 text-2xl font-black shadow-2xl transition-all group">
                    ENTER SANCTUM <Sparkles className="ml-4 w-7 h-7 group-hover:scale-125 transition-transform" />
                  </Button>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* ── Global Call to Action ──────────────────────── */}
      <section className="py-64 text-center container relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[200px] rounded-full pointer-events-none" />
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-6xl mx-auto px-6"
        >
          <div className="flex justify-center mb-16">
             <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                <Zap className="w-10 h-10 text-indigo-400" />
             </div>
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase italic mb-20 text-shimmer">
             READY FOR <br /> ASCENSION?
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
             <Button size="lg" className="rounded-[2.5rem] px-24 h-32 text-4xl font-black bg-white text-black hover:bg-indigo-600 hover:text-white shadow-[0_0_80px_rgba(79,70,229,0.3)] transition-all active:scale-95 group">
                INQUIRE NOW <ChevronRight className="ml-4 w-10 h-10 group-hover:translate-x-4 transition-transform" />
             </Button>
             <div className="flex items-center gap-8 px-16 py-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl">
                <ShieldCheck className="w-12 h-12 text-indigo-400" />
                <div className="text-left">
                   <p className="text-[12px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-2">Confidence</p>
                   <p className="text-2xl font-bold text-slate-100">Zero Liability</p>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

