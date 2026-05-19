"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading, GlassCard, PremiumGrid } from "./UI";

interface Step {
  title: string;
  description: string;
}

interface ProcessFlowProps {
  title?: string;
  badge?: string;
  description?: string;
  steps: Step[];
}

export function ProcessFlow({ props }: { props: ProcessFlowProps }) {
  const { title, badge, description, steps } = props || {};

  return (
    <section className="py-24 md:py-40 relative overflow-hidden bg-slate-50/50 border-y border-slate-100">
      <div className="container">
        <SectionHeading 
            align="center"
            badge={badge || "Operational Protocol"}
            title={title || "Strategic Execution"}
            description={description}
        />

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-600/20 to-transparent" />
          
          <PremiumGrid columns={4}>
            {(steps || []).map((step, i) => (
              <GlassCard
                key={i}
                className="text-center group hover:scale-105 transition-all duration-500"
              >
                <div className="w-20 h-20 mx-auto rounded-3xl bg-white border border-slate-100 flex items-center justify-center mb-10 text-indigo-600 font-black text-3xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl relative z-10 italic">
                  {i + 1}
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase italic group-hover:text-indigo-600 transition-colors leading-none">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-lg font-light italic leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            ))}
          </PremiumGrid>
        </div>
      </div>
    </section>
  );
}
