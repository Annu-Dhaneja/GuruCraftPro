"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading, GlassCard, PremiumGrid } from "./UI";

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  price?: string;
  badge?: string;
}

interface FeatureGridProps {
  title?: string;
  badge?: string;
  description?: string;
  items: FeatureItem[];
  columns?: 1 | 2 | 3 | 4;
}

export function FeatureGrid({ props }: { props: FeatureGridProps }) {
  const { title, badge, description, items, columns = 3 } = props;

  return (
    <section className="py-24 md:py-40 relative overflow-hidden">
      <div className="container">
        {(title || description) && (
          <SectionHeading 
            badge={badge || "Core Capabilities"}
            title={title || "Strategic Infrastructure"}
            description={description}
          />
        )}

        <PremiumGrid columns={columns as any}>
          {items?.map((item, i) => {
            const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Sparkles;
            return (
              <GlassCard
                key={i}
                className="group flex flex-col"
              >
                <div className="flex justify-between items-start mb-10 relative z-10">
                   <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <Icon className="w-7 h-7 text-indigo-600 group-hover:text-white" />
                   </div>
                   {item.badge && (
                     <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full uppercase tracking-widest border border-indigo-100 italic">
                       {item.badge}
                     </span>
                   )}
                </div>
                
                <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase italic group-hover:text-indigo-600 transition-colors leading-none">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed font-light mb-10 italic flex-1">
                  {item.description}
                </p>

                {item.price && (
                  <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-8">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] italic">Architecture Cost:</span>
                    <span className="text-2xl font-black italic group-hover:text-indigo-600 transition-all uppercase">{item.price}</span>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </PremiumGrid>
      </div>
    </section>
  );
}
