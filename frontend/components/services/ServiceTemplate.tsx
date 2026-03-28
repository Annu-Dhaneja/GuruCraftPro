"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Feature {
  title: string;
  description: string;
}

interface ServiceData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image?: string;
  };
  features: Feature[];
  cta: {
    title: string;
    link: string;
  };
}

export function ServiceTemplate({ data }: { data: ServiceData }) {
  if (!data) return null;

  const { hero, features, cta } = data;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24 border-b border-border">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Premium {hero.subtitle}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
          >
            {hero.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
          >
            {hero.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-indigo-500/10" asChild>
              <Link href={cta.link}>
                {cta.title} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────── */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Visual Section Placeholder ─────────────────── */}
      <section className="py-24 bg-muted/30 border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-border">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-background to-purple-500/10" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 p-8 bg-background/50 backdrop-blur-md rounded-2xl border border-white/10 text-center">
                   <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
                      <Wand2 className="w-8 h-8 text-indigo-500" />
                   </div>
                   <p className="font-bold text-xl uppercase tracking-widest text-muted-foreground">Expert Craftsmanship</p>
                </div>
             </div>
             {hero.image && (
                <Image 
                  src={hero.image} 
                  alt={hero.title} 
                  fill 
                  className="object-cover opacity-30 grayscale mix-blend-overlay"
                />
             )}
          </div>
        </div>
      </section>

      {/* ── Final Call to Action ──────────────────────────── */}
      <section className="py-32 text-center container mx-auto px-4 md:px-6">
         <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
               Elevate your brand with our <br />
               <span className="text-indigo-500">{hero.title}</span> solutions.
            </h2>
            <p className="text-lg text-muted-foreground">
               Every project is a unique collaboration. Let's start building your vision today.
            </p>
            <Button size="lg" variant="outline" className="rounded-full px-12 h-14" asChild>
               <Link href="/contact">Book a Consultation</Link>
            </Button>
         </div>
      </section>
    </div>
  );
}
