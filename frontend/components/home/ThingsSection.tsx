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
  const badge = data?.badge || "EXPLORE";
  const title = data?.title || "Things You Should Know";
  const subtitle =
    data?.subtitle ||
    "Discover the creative capabilities, signature art, and design services that set us apart.";
  const items = data?.items?.length ? data.items : defaultItems;
  const featuredTitle = data?.featured_title || "Premium Guruji Satsang Box Ya Satsang Story – Pre-loaded Bhajans & Mantras";
  const featuredDescription =
    data?.featured_description ||
    "A divine collection featuring hand-crafted spiritual masterpeices. The Satsang Box comes pre-loaded with sacred Bhajans and Mantras to create a serene atmosphere in your home.";
  const featuredLink = data?.featured_link || "/guruji-darshan";

  return (
    <section className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            {badge}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            {title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {title.split(" ").slice(-2).join(" ")}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
            {subtitle}
          </p>
        </motion.div>

        {/* ── Featured "Story Box" ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-950 backdrop-blur-xl p-8 md:p-12">
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-2xl">
                {/* Live indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                    Featured — Live View
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                  {featuredTitle}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {featuredDescription}
                </p>
              </div>

              <Link href={featuredLink}>
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 rounded-xl px-8 py-6 font-bold whitespace-nowrap text-base group/btn"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Card Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            const gradient = colorMap[index % colorMap.length];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/15 hover:bg-zinc-900/80 transition-all duration-500"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Action */}
                {item.link && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Explore
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                )}

                {/* Hover glow */}
                <div
                  className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link href="/services">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-6 font-semibold"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
