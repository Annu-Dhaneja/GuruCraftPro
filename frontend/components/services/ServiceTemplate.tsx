"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Wand2, Star, Shield, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { GurujiArtContent } from "@/components/guruji-art/GurujiArtContent";
import { VantageEcomContent } from "@/components/services/VantageEcomContent";

interface Section {
  id?: number;
  type: string;
  slug: string;
  content: any;
}

interface ServiceData {
  title?: string;
  slug?: string;
  meta?: {
    title: string;
    description: string;
  };
  sections?: Section[];
  hero?: any;
  features?: any;
  cta?: any;
}

export function ServiceTemplate({ data, slug: passedSlug }: { data: ServiceData, slug?: string }) {
  if (!data) {
    // ...
  }

  const slug = passedSlug || data.slug;

  const sections = data.sections || [
    data.hero ? { type: "hero", slug: "hero", content: data.hero } : null,
    data.features ? { type: "features", slug: "features", content: { items: data.features } } : null,
    data.cta ? { type: "cta", slug: "cta", content: data.cta } : null,
  ].filter(Boolean) as Section[];

  // Specialized Page Mapping
  if (slug === "guru-ji-art") {
    return <GurujiArtContent data={data} />;
  }

  if (slug === "vantage-ecom") {
    return <VantageEcomContent data={data} />;
  }

  if (slug === "7-day-cloths") {
    const { redirect } = require("next/navigation");
    redirect("/wardrobe");
    return null;
  }

  // Fallback for Construction / Generic
  if (sections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-6 text-center overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full" />
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative z-10"
        >
          <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center mb-10 mx-auto border border-indigo-500/20">
             <Wand2 className="w-10 h-10 text-indigo-400 animate-spin-slow" />
          </div>
          <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase italic text-white">Atelier Under Renovation</h2>
          <p className="text-zinc-500 text-lg max-w-sm mx-auto font-light leading-relaxed mb-12">
            Our artisans are currently crafting specialized digital experiences for {data.title || "this service"}. 
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="rounded-2xl border-white/10 px-8 h-14 font-bold" asChild>
              <Link href="/services">Return to Catalog</Link>
            </Button>
            <Button className="rounded-2xl bg-indigo-600 px-8 h-14 font-black transition-all hover:bg-white hover:text-black shadow-xl" asChild>
              <Link href="/contact">Priority Request</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={data.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col min-h-screen bg-zinc-950 selection:bg-indigo-500/30"
      >
        {sections.map((section, idx) => {
          switch (section.type) {
            case "hero":
              return <HeroSection key={section.slug || idx} content={section.content} />;
            case "features":
              return <FeaturesSection key={section.slug || idx} content={section.content} />;
            case "cta":
              return <CTASection key={section.slug || idx} content={section.content} />;
            default:
              return null;
          }
        })}
      </motion.div>
    </AnimatePresence>
  );
}

function HeroSection({ content }: { content: any }) {
  const { title, subtitle, description } = content;
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-32 border-b border-white/5">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.1)_0%,transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full neural-mesh opacity-20 pointer-events-none" />
      
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-2xl text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10"
        >
          <Star className="w-3 h-3 fill-indigo-500" />
          {subtitle || "Premium Service"}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.8] uppercase italic text-shimmer"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl mx-auto text-2xl md:text-3xl text-zinc-500 font-light leading-relaxed italic border-x border-white/5 px-12 py-4"
        >
          {description}
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="mt-16"
        >
           <Button size="lg" className="bg-indigo-600 hover:bg-white hover:text-black rounded-2xl px-16 h-20 text-xl font-black shadow-2xl transition-all">
              LEARN MORE <ArrowRight className="ml-3 w-6 h-6" />
           </Button>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection({ content }: { content: any }) {
  const items = Array.isArray(content?.items) ? content.items : [];
  return (
    <section className="py-48 container relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {items.map((item: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group glass-card p-12 rounded-[4rem] border border-white/5 hover:border-indigo-500/20 transition-all duration-700 relative overflow-hidden"
          >
            <div className="shimmer-sweep absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-10 relative z-10">
               <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-600 transition-all duration-500 shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-indigo-400 group-hover:text-white" />
               </div>
               <span className="text-[10px] font-black text-white/10 group-hover:text-indigo-500/50 transition-colors uppercase tracking-widest">Feature 0{idx+1}</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors">{item.title}</h3>
            <p className="text-zinc-500 text-xl font-light leading-relaxed line-clamp-3 italic">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ content }: { content: any }) {
  const { title, link, description } = content;
  return (
    <section className="py-64 text-center container relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[180px] rounded-full" />
      <div className="max-w-4xl mx-auto space-y-12 relative z-10 px-6">
        <Shield className="w-16 h-16 text-indigo-500 mx-auto mb-10 animate-pulse" />
        <h2 className="text-6xl md:text-[8rem] font-black leading-[0.8] tracking-tighter uppercase italic">
          {title || "Start Your Project"}
        </h2>
        {description && <p className="text-2xl text-zinc-500 font-light italic max-w-2xl mx-auto border-y border-white/5 py-10">{description}</p>}
        <Button size="lg" className="rounded-2xl px-20 h-24 text-2xl font-black bg-white text-black hover:bg-indigo-600 hover:text-white shadow-2xl transition-all" asChild>
          <Link href={link || "/contact"}>GET STARTED <ArrowUpRight className="ml-3 w-8 h-8" /></Link>
        </Button>
      </div>
    </section>
  );
}
