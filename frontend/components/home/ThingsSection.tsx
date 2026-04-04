"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Sparkles,
  Camera,
  Layers,
  Shirt,
  Paintbrush,
  ArrowRight,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ThingItem {
  title: string;
  description: string;
  link?: string;
}

interface ThingsSectionProps {
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    featured_title?: string;
    featured_description?: string;
    featured_link?: string;
    items?: ThingItem[];
  };
}

const defaultItems: ThingItem[] = [
  {
    title: "Guruji Ke Sakshat Darshan (AR 3D View)",
    description:
      "Experience the divine presence with our exclusive AR 3D View technology. Bringing Guruji's blessings to your home in an immersive way.",
    link: "/guruji-darshan",
  },
  {
    title: "AI-Powered Try-On",
    description:
      "Experience garments virtually before committing. Our AI engine maps clothing onto your body in real-time.",
    link: "/ai-lab",
  },
  {
    title: "Custom Fashion Design",
    description:
      "From concept sketches to final patterns — bespoke fashion design tailored to your brand identity.",
    link: "/services",
  },
  {
    title: "Brand Identity Systems",
    description:
      "Complete visual identity packages including logo, typography, color systems, and brand guidelines.",
    link: "/services",
  },
  {
    title: "Photo Retouching & Enhancement",
    description:
      "Professional-grade image editing, background removal, color correction, and product photography enhancement.",
    link: "/services",
  },
  {
    title: "Print & Packaging Design",
    description:
      "Eye-catching packaging, brochures, business cards, and print collateral that make brands unforgettable.",
    link: "/services",
  },
];

const iconMap = [Paintbrush, Sparkles, Shirt, Palette, Camera, Layers];
const colorMap = [
  "from-amber-500 to-orange-600",
  "from-indigo-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-emerald-500 to-teal-600",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-fuchsia-600",
];

export function ThingsSection({ data }: ThingsSectionProps) {
  const badge = data?.badge || "INSIGHTS";
  const title = data?.title || "Things You Should Know";
  const subtitle =
    data?.subtitle ||
    "Discover the creative capabilities, signature art, and design services that set us apart at Gurucraftpro.";
  const items = data?.items?.length ? data.items : defaultItems;
  const featuredTitle = data?.featured_title || "Premium Guruji Art Sanctuary";
  const featuredDescription =
    data?.featured_description ||
    "A divine collection featuring hand-crafted spiritual masterpieces. Experience the intersection of sacred geometry and contemporary elite design.";
  const featuredLink = data?.featured_link || "/services/guru-ji-art";

  return (
    <section className="py-48 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      {/* Cinematic Background */}
      <div className="absolute inset-0 neural-mesh opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <span className="inline-flex items-center px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 backdrop-blur-xl mb-10">
            {badge}
          </span>
          <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white mb-10 leading-[0.8] uppercase italic text-shimmer">
            {title}
          </h2>
          <p className="text-2xl text-zinc-500 font-light italic leading-relaxed border-x border-white/5 px-10 py-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* ── Featured "Story Box" ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <div className="relative group rounded-[4rem] overflow-hidden border border-white/5 bg-zinc-900/40 backdrop-blur-3xl p-12 md:p-20 glass-card">
            <div className="shimmer-sweep absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                    Elite Feature 01
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase italic leading-none">
                  {featuredTitle}
                </h3>
                <p className="text-xl text-zinc-500 font-light italic leading-relaxed">
                  {featuredDescription}
                </p>
              </div>

              <Link href={featuredLink}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-indigo-600 hover:text-white h-24 rounded-2xl px-12 font-black transition-all shadow-2xl active:scale-95 text-xl tracking-tighter uppercase italic group/btn"
                >
                  EXPLORE <ArrowRight className="ml-3 h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Card Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            const gradient = colorMap[index % colorMap.length];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative bg-zinc-950/40 border border-white/5 rounded-[3rem] p-12 transition-all duration-700 hover:border-indigo-500/20 glass-card"
              >
                <div className="shimmer-sweep absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
                
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors uppercase italic tracking-tight">
                  {item.title}
                </h3>
                <p className="text-base text-zinc-500 font-light italic leading-relaxed mb-8">
                  {item.description}
                </p>

                {item.link && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] italic group-hover:text-white transition-colors"
                  >
                    ACCESS <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-32 text-center"
        >
          <Link href="/services">
            <Button
              className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white px-16 h-20 text-lg font-black uppercase tracking-widest transition-all italic"
            >
              The Full Catalog <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
