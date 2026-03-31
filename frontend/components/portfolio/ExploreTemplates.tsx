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
    <section className="py-24 relative overflow-hidden bg-slate-950">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready-to-use Assets</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Templates</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Jumpstart your projects with our curated collection of professional design templates and AI-powered assets.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative h-80 rounded-3xl overflow-hidden border border-white/5 bg-slate-900 shadow-2xl transition-all duration-500 group-hover:border-emerald-500/30 group-hover:shadow-emerald-500/10">
                {/* Image */}
                {template.image ? (
                  <img 
                    src={template.image} 
                    alt={template.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Layout className="w-12 h-12 text-slate-700" />
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-slate-300 text-sm line-clamp-2 mb-6">
                      {template.description}
                    </p>
                    
                    <Link 
                      href={template.link || "#"} 
                      className="inline-flex items-center gap-2 text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 rounded-full transition-all group-hover:shadow-lg group-hover:shadow-emerald-600/30"
                    >
                      Use Template
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
