"use client";

import { useEffect, useState } from "react";
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
  BookOpen,
  CheckCircle2,
  Heart,
  Camera,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { getApiUrl, fetchWithAuth } from "@/lib/utils";

const iconMap: Record<string, any> = { Wand2, Monitor, BookOpen, Sparkles, Cpu, Palette, Heart, Camera, ShoppingBag, Zap };

export default function ServicesPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchWithAuth("/api/v1/cms/services")
      .then(res => res.ok ? res.json() : null)
      .then(d => {
        setData(d);
      })
      .catch(err => console.error("Services CMS error:", err));
  }, []);

  const hero = data?.hero || { title: "ELITE ECOSYSTEM", description: "Explore our professional-grade services." };
  const tiers = data?.tiers || [];
  const process = data?.process || { title: "", description: "", steps: [] };
  const products = data?.products || [];
  const cta = data?.cta || { title: "READY FOR ASCENSION?", description: "", button_text: "INQUIRE NOW", button_href: "/contact" };

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
            <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{hero.title}</span>
          </h1>
          
          <div 
            className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-16 italic px-6"
            dangerouslySetInnerHTML={{ __html: hero.description }}
          />
        </div>
      </section>

      {/* ── Tiers / Services Layout ───────── */}
      <section className="py-32 relative z-10">
        <div className="container px-4">
          <div className="flex items-center gap-4 mb-20">
            <div className="h-[1px] w-20 bg-indigo-500" />
            <span className="text-indigo-500 font-black text-xs tracking-[0.6em] uppercase">OUR SERVICE TIERS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {tiers.map((tier: any, idx: number) => {
              const Icon = iconMap[tier.icon] || Sparkles;
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10 rounded-[4rem]" />
                
                <Link href={`/services/${tier.id || ''}`} className="block glass-card p-12 rounded-[4rem] h-full relative neon-border-glow shimmer-sweep border border-white/10 hover:border-indigo-500/30 bg-black/20">
                   <div className="flex justify-between items-start mb-12">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                         <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex items-center gap-4">
                        {tier.badge && (
                            <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-indigo-300">
                                {tier.badge}
                            </span>
                        )}
                        <ArrowRight className="w-8 h-8 text-white/5 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
                      </div>
                   </div>
                   
                   <h3 className="text-3xl font-black mb-6 tracking-tight uppercase italic group-hover:text-shimmer transition-all leading-none">{tier.name}</h3>
                   <div className="text-slate-500 text-lg font-light leading-relaxed mb-10 italic" dangerouslySetInnerHTML={{ __html: tier.description }} />
                   
                   {tier.features && tier.features.length > 0 && (
                     <div className="space-y-4 pt-8 border-t border-white/5">
                        {tier.features.map((f: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                             <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                             <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">{f}</span>
                          </div>
                        ))}
                     </div>
                   )}
                </Link>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* ── Process Section ─────────────── */}
      {process && process.steps && process.steps.length > 0 && (
          <section className="py-32 relative overflow-hidden bg-zinc-950/50 border-y border-white/5">
            <div className="container relative z-10 px-4">
              <div className="text-center mb-20">
                 <h2 className="text-4xl md:text-6xl font-black leading-[0.8] tracking-tighter uppercase italic">{process.title}</h2>
                 {process.description && (
                     <div className="mt-6 text-xl text-slate-500 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: process.description }} />
                 )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {process.steps.map((step: any, i: number) => (
                      <div key={i} className="relative p-8 glass-card rounded-3xl border border-white/10 text-center group hover:bg-white/5 transition-all">
                          <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 font-black text-xl border border-indigo-500/30 group-hover:scale-110 transition-transform">
                              {i + 1}
                          </div>
                          <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                          <p className="text-slate-400 text-sm">{step.desc}</p>
                      </div>
                  ))}
              </div>
            </div>
          </section>
      )}

      {/* ── Products Section ─────────────── */}
      {products && products.length > 0 && (
          <section className="py-32 relative z-10">
            <div className="container px-4">
              <div className="flex items-center gap-4 mb-20">
                <div className="h-[1px] w-20 bg-indigo-500" />
                <span className="text-indigo-500 font-black text-xs tracking-[0.6em] uppercase">MARKETPLACE PRODUCTS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {products.map((prod: any, i: number) => (
                      <div key={i} className="glass-card rounded-[3rem] overflow-hidden border border-white/10 group flex flex-col md:flex-row">
                          {prod.image && (
                              <div className="w-full md:w-1/2 aspect-square relative overflow-hidden bg-slate-900">
                                  <Image src={prod.image} alt={prod.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                              </div>
                          )}
                          <div className="p-10 w-full md:w-1/2 flex flex-col justify-center">
                              <h3 className="text-2xl font-black mb-2">{prod.title}</h3>
                              <p className="text-indigo-400 font-bold mb-6">{prod.price}</p>
                              <p className="text-slate-400 mb-8" dangerouslySetInnerHTML={{ __html: prod.description }} />
                              <Button className="bg-white text-black hover:bg-slate-200 rounded-full font-bold w-fit">
                                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                          </div>
                      </div>
                  ))}
              </div>
            </div>
          </section>
      )}

      {/* ── Global Call to Action ──────────────────────── */}
      <section className="py-40 text-center container relative">
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
          <h2 className="text-5xl md:text-[8rem] font-black leading-[0.9] tracking-tighter uppercase italic mb-8 text-shimmer">
             {cta.title}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16" dangerouslySetInnerHTML={{ __html: cta.description }} />
          
          <div className="flex flex-wrap justify-center gap-10">
             <Link href={cta.button_href || cta.link || "/contact"}>
                 <Button size="lg" className="rounded-[2.5rem] px-16 h-24 text-2xl font-black bg-white text-black hover:bg-indigo-600 hover:text-white shadow-[0_0_80px_rgba(79,70,229,0.3)] transition-all active:scale-95 group">
                    {cta.button_text || "INQUIRE NOW"} <ChevronRight className="ml-4 w-8 h-8 group-hover:translate-x-4 transition-transform" />
                 </Button>
             </Link>
          </div>
        </motion.div>
      </section>

      
    </div>
  );
}
