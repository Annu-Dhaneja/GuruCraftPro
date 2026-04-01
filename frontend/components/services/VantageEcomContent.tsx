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
  Zap
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const hero = data?.hero || {
    title: "Vantage E-com Growth",
    subtitle: "Smart Scale Solutions",
    description: "Premium post-production and technical assets designed for high-conversion e-commerce brands.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2000"
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
      default: return Zap;
    }
  };

  return (
    <div className="flex flex-col bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-32">
        <div className="absolute inset-0 z-0">
          <Image 
            src={hero.image}
            alt="E-commerce Professional"
            fill
            className="object-cover opacity-20 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black tracking-widest uppercase">{hero.subtitle}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-xl text-slate-400 font-light leading-relaxed mb-12"
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      {/* ── Smart Menu Grid ───────────────────────────── */}
      <section className="py-32 relative">
        <div className="container px-4">
          <div className="space-y-32">
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
                <div className="mb-16 max-w-2xl">
                  <span className="text-indigo-500 font-black text-xs tracking-[0.4em] uppercase mb-4 block">Section {String.fromCharCode(65 + catIdx)}</span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{cat.title}</h2>
                  <p className="text-slate-500 text-lg">{cat.description}</p>
                </div>

                {/* Items Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.items.map((item: any, i: number) => {
                    const IconComp = getIcon(item.icon);
                    return (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="group p-10 rounded-[2.5rem] bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden"
                      >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative z-10">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                             <IconComp className="w-7 h-7" />
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-10 font-light min-h-[60px]">
                             {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-auto">
                             <div className="flex flex-col">
                               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Premium Service</span>
                               <span className="text-xl font-black text-white">{item.price}</span>
                             </div>
                             <Link href="/contact" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <ArrowRight className="w-5 h-5" />
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

      {/* ── CTA Block ─────────────────────────────────── */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5" />
        <div className="container relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10">
                {data?.cta?.title || "Ready to Scale?"}
              </h2>
              <p className="text-xl text-slate-400 font-light mb-12 max-w-2xl mx-auto">
                {data?.cta?.description || "Optimize your store for global conversion today."}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" className="rounded-2xl px-12 h-16 text-lg font-bold bg-white text-black hover:bg-indigo-500 hover:text-white shadow-2xl shadow-indigo-500/20 transition-all">
                  Get My Growth Blueprint <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                   <ShieldCheck className="w-6 h-6 text-emerald-400" />
                   <p className="text-sm font-bold text-slate-300">Enterprise Ready</p>
                </div>
              </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
