"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Layout, Sparkles } from "lucide-react";
import Link from "next/link";

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ExploreTemplatesProps {
  templates: Template[];
}

export function ExploreTemplates({ templates }: ExploreTemplatesProps) {
  if (!templates || templates.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-slate-950/50">
      {/* Immersive Emerald Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full animate-pulse delay-1000" />
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Spotlight Templates
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white"
          >
            Jumpstart Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Creativity</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-slate-400 max-w-2xl mx-auto text-xl font-light"
          >
            Professional-grade assets and AI-orchestrated layouts ready for your next big move.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="relative h-[450px] rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-2xl shadow-3xl transition-all duration-700 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] group-hover:-translate-y-4">
                {/* Background Visual */}
                <div className="absolute inset-0">
                    {template.image ? (
                    <img 
                        src={template.image} 
                        alt={template.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-50 grayscale group-hover:grayscale-0"
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                        <Layout className="w-16 h-16 text-slate-700" />
                    </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>

                {/* Interactive Content Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
                  <div className="space-y-6">
                    <div className="space-y-2 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                        <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                        {template.title}
                        </h3>
                        <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-3">
                        {template.description}
                        </p>
                    </div>
                    
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                    >
                        <Link 
                            href={template.link || "#"} 
                            className="inline-flex items-center gap-3 text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-600/20"
                        >
                            Use This Template
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Accent */}
                <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                    <Layout className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
