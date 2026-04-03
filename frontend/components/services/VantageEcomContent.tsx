"use client";

import { motion } from "framer-motion";
import { 
  Wand2, 
  Layers, 
  CheckCircle2, 
  Shirt, 
  Ruler, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Zap,
  Cpu,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function VantageEcomContent({ data }: { data?: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 } as const
    }
  };

  const hero = data?.hero || {
    title: "VantageEcom",
    subtitle: "SMART MENU LAYOUT",
    description: "Complete product enhancement solutions and e-commerce strategies designed for global scale.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  };

  const categories = [
    {
       id: "category_a",
       title: data?.category_a?.title || "Creative Product Post-Production",
       description: "High-end visual refinement for lifestyle and studio photography.",
       items: data?.category_a?.items || []
    },
    {
       id: "category_b",
       title: data?.category_b?.title || "Technical E-com Assets",
       description: "Precision-engineered mockups and technical brand templates.",
       items: data?.category_b?.items || []
    },
    {
       id: "category_c",
       title: data?.category_c?.title || "Knowledge & Strategy",
       description: "Educational blueprints for scaling your digital merchant venture.",
       items: data?.category_c?.items || []
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Wand2": return Wand2;
      case "Layers": return Layers;
      case "CheckCircle2": return CheckCircle2;
      case "Shirt": return Shirt;
      case "Ruler": return Ruler;
      case "BookOpen": return BookOpen;
      case "Zap": return Zap;
      case "Cpu": return Cpu;
      case "Monitor": return Monitor;
      default: return Sparkles;
    }
  };

  return (
    <div className="flex flex-col bg-slate-950 text-white selection:bg-indigo-500/30 overflow-hidden relative">
      {/* ── Neural Mesh Background ─────────────────────── */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 neural-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

      {/* ── Scan Line Animation ───────────────────────── */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent z-50 scan-line pointer-events-none" />

      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src={hero.image}
            alt="E-commerce Professional"
            fill
            className="object-cover opacity-10 scale-105 blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950" />
        </div>

        {/* Cinematic Backdrop Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full animate-bounce [animation-duration:8s]" />

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 backdrop-blur-xl"
          >
            <Cpu className="w-4 h-4 animate-spin-slow" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase whitespace-nowrap">{hero.subtitle}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.8] uppercase italic"
          >
            <span className="text-shimmer">{hero.title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-16 px-6"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button size="lg" className="bg-indigo-600 hover:bg-white hover:text-black rounded-2xl px-12 h-20 text-xl font-black transition-all shadow-2xl shadow-indigo-500/20 group">
              INITIATE GROWTH <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Smart Menu Grid (Cipher Glass) ──────────────── */}
      <section className="py-40 relative z-10">
        <div className="container px-4">
          <div className="space-y-48">
            {categories.map((cat, catIdx) => (
              <motion.div
                key={cat.id}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* Category Header */}
                <div className="mb-24 max-w-3xl text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-20 bg-indigo-500" />
                    <span className="text-indigo-500 font-black text-xs tracking-[0.6em] uppercase">SYSTEM BLOCK {String.fromCharCode(65 + catIdx)}</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">{cat.title}</h2>
                  <p className="text-slate-500 text-xl font-light leading-relaxed border-l border-white/10 pl-8">{cat.description}</p>
                </div>

                {/* Items Matrix (Industrial Glass Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {cat.items.map((item: any, i: number) => {
                    const IconComp = getIcon(item.icon);
                    return (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="group glass-card p-12 rounded-[3.5rem] relative neon-border-glow shimmer-sweep"
                      >
                         <div className="relative z-10">
                           <div className="flex justify-between items-start mb-12">
                              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-600 transition-all duration-500">
                                 <IconComp className="w-8 h-8 text-indigo-400 group-hover:text-white" />
                              </div>
                              <span className="text-[10px] font-black text-white/20 group-hover:text-indigo-400/50 transition-colors">0{i+1}</span>
                           </div>
                           
                           <h3 className="text-3xl font-black mb-6 tracking-tight uppercase group-hover:text-indigo-400 transition-colors leading-[1.1]">{item.title}</h3>
                           <p className="text-slate-400 text-base leading-relaxed mb-12 font-light min-h-[72px]">
                              {item.description}
                           </p>
                           
                           <div className="flex items-end justify-between mt-auto">
                              <div className="flex flex-col">
                                <span className="text-[9px] text-indigo-500 font-black uppercase tracking-[0.25em] mb-1">Architecture Cost</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-3xl font-black group-hover:text-shimmer transition-all">{item.price}</span>
                                </div>
                              </div>
                              <Link href="/contact">
                                <Button size="icon" className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-white hover:text-black transition-all shadow-xl active:scale-90">
                                   <ArrowRight className="w-6 h-6" />
                                </Button>
                              </Link>
                           </div>
                         </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Performance Banner ─────────────────────── */}
      <section className="py-24 border-y border-white/5 bg-slate-900/20 backdrop-blur-3xl">
        <div className="container px-4 flex flex-wrap justify-between items-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           {['Conversion Optimized', 'Enterprise Ready', 'Global Redundancy', '24/7 Priority Support'].map((stat, idx) => (
             <div key={idx} className="flex items-center gap-4">
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-black uppercase tracking-widest">{stat}</span>
             </div>
           ))}
        </div>
      </section>

      {/* ── Call to Action ──────────────────────────────── */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5" />
        <div className="container relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter mb-16 leading-[0.8] uppercase italic">
                ESTABLISH <br /> <span className="text-shimmer">DOMINANCE.</span>
              </h2>
              <p className="text-2xl text-slate-400 font-light mb-16 max-w-3xl mx-auto border-y border-white/5 py-10">
                {data?.cta?.description || "Deploy our elite post-production and strategy assets to command your niche."}
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <Button size="lg" className="rounded-2xl px-16 h-24 text-2xl font-black bg-white text-black hover:bg-indigo-600 hover:text-white shadow-[0_0_50px_rgba(79,70,229,0.3)] transition-all">
                  ACTIVATE BLUEPRINT <Sparkles className="ml-3 w-6 h-6 animate-pulse" />
                </Button>
                <div className="flex items-center gap-5 px-10 py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                   <ShieldCheck className="w-8 h-8 text-indigo-400" />
                   <div className="text-left">
                     <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Standard</p>
                     <p className="text-lg font-bold text-slate-100">Zero Vulnerability</p>
                   </div>
                </div>
              </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}

