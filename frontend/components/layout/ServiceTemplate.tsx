"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveComponent } from "@/lib/cms-registry";

interface Section {
  id?: string | number;
  type: string;
  name?: string;
  props?: any;
  content?: any;
}

interface ServiceData {
  title?: string;
  slug?: string;
  meta?: {
    title: string;
    description: string;
  };
  components?: Section[];
  sections?: Section[];
  hero?: any;
  features?: any;
  cta?: any;
}

export function ServiceTemplate({ data, slug: passedSlug }: { data: ServiceData, slug?: string }) {
  if (!data) return null;

  const slug = passedSlug || data.slug;

  // Handle V3 (components array) or V2 (sections/hero/features)
  const components = data.components || data.sections || [
    data.hero ? { type: "hero", props: data.hero } : null,
    data.features ? { type: "features", props: data.features } : null,
    data.cta ? { type: "cta", props: data.cta } : null,
  ].filter(Boolean) as Section[];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col min-h-screen bg-slate-950 selection:bg-indigo-500/30"
      >
        {components.map((comp, idx) => {
          const Renderer = resolveComponent(comp.name || comp.type || "") || GenericRenderer;
          
          let actualProps = comp.props || comp.content || comp || {};
          while (actualProps && typeof actualProps === "object" && "props" in actualProps) {
            actualProps = actualProps.props;
          }
          
          return <Renderer key={comp.id || idx} {...actualProps} />;
        })}
      </motion.div>
    </AnimatePresence>
  );
}

const GenericRenderer: React.FC<{ props: any }> = ({ props }) => (
    <section className="py-20 border-b border-white/5 bg-black/10">
        <div className="container px-8">
            <div className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">System Debug: Unknown Component</span>
                </div>
                <pre className="text-[10px] text-slate-500 overflow-auto max-h-64 scrollbar-hide">
                    {JSON.stringify(props, null, 2)}
                </pre>
            </div>
        </div>
    </section>
);
