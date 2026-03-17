"use client";

import { motion } from "framer-motion";
import { 
  Music, 
  Sparkles, 
  Eye, 
  Box, 
  ArrowRight,
  Wifi,
  Volume2,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function GurujiDarshanContent({ data }: { data?: any }) {
  const heroTitlePrefix = data?.hero_title_prefix || "Guruji Ke";
  const heroTitleHighlight = data?.hero_title_highlight || "Sakshat Darshan";
  const heroSubtitle = data?.hero_subtitle || "Immerse yourself in divine energy with our cutting-edge AR technology and spiritual craftsmanship.";
  const arTitlePrefix = data?.ar_title_prefix || "Bringing Blessings";
  const arTitleHighlight = data?.ar_title_highlight || "Into Your Home";
  const arSubtitle = data?.ar_subtitle || "Our 'Guruji Ke Sakshat Darshan' feature uses high-fidelity 3D scanning and spatial computing to create an lifelike presence in your personal space.";
  const satsangTitlePrefix = data?.satsang_title_prefix || "Premium Guruji";
  const satsangTitleHighlight = data?.satsang_title_highlight || "Satsang Box";
  const satsangSubtitle = data?.satsang_subtitle || "A masterpiece of spiritual art and technology. The Satsang Story Box brings the sacred sounds of Bhajans and Mantras pre-loaded in a beautifully crafted box.";
  return (
    <div className="flex flex-col">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-950 py-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519750783846-e3b596e7d84d?q=80&w=1974&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-widest text-zinc-300 uppercase">Divine Experience</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9]"
          >
            {heroTitlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600">
              {heroTitleHighlight}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-12"
          >
            {heroSubtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-white rounded-full px-10 h-16 text-lg font-bold shadow-2xl shadow-amber-600/20">
              Experience AR View <Eye className="ml-2 w-5 h-5" />
            </Button>
            <Link href="#satsang-box">
              <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 text-white rounded-full px-10 h-16 text-lg font-bold backdrop-blur-md">
                Learn About Satsang Box
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── AR Section ───────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-background relative border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg font-bold text-sm">
                <Wifi className="w-4 h-4" /> AUGMENTED REALITY
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                {arTitlePrefix} <br /> 
                <span className="text-indigo-400">{arTitleHighlight}</span>
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed font-light">
                {arSubtitle}
              </p>
              
              <ul className="space-y-4">
                {[
                  "360° Life-like 3D Rendering",
                  "Real-time Lighting Integration",
                  "Accessible on any Smartphone",
                  "Spiritual and Divine Experience"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl"
            >
               {/* This would be the AR Viewer or Video */}
               <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10">
                   <Wand2 className="w-10 h-10 text-white" />
                 </div>
                 <Image 
                  src="https://images.unsplash.com/photo-1514833150113-bc7519969062?q=80&w=2070&auto=format&fit=crop"
                  alt="AR Experience Preview"
                  fill
                  className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                 <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-1 opacity-70">Interactive</p>
                    <p className="text-2xl font-bold">Start AR Darshan</p>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Satsang Box Section ────────────────────────────── */}
      <section id="satsang-box" className="py-24 md:py-32 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
                {satsangTitlePrefix} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-6xl md:text-8xl">
                  {satsangTitleHighlight}
                </span>
              </h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                {satsangSubtitle}
              </p>
            </div>
            
            <div className="hidden md:flex flex-col items-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <Box className="w-16 h-16 text-purple-400 mb-4" />
                <p className="text-sm font-bold text-white tracking-widest uppercase">Collector's Edition</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
            {[
              {
                icon: Music,
                title: "Pre-loaded Bhajans",
                description: "Over 50+ hand-picked sacred bhajans for daily spiritual connection.",
                color: "text-blue-400",
                bg: "bg-blue-400/10"
              },
              {
                icon: Volume2,
                title: "Premium Audio",
                description: "High-fidelity internal speakers for crystal clear divine sounds.",
                color: "text-purple-400",
                bg: "bg-purple-400/10"
              },
              {
                icon: Heart,
                title: "Artistic Design",
                description: "Hand-painted motifs and traditional craftsmanship on every box.",
                color: "text-pink-400",
                bg: "bg-pink-400/10"
              },
              {
                icon: Box,
                title: "Portable & Rechargeable",
                description: "Built-in battery with long playback time for satsang everywhere.",
                color: "text-emerald-400",
                bg: "bg-emerald-400/10"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 flex flex-col items-center">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-1 bg-white/5 backdrop-blur-xl max-w-4xl w-full">
              <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 md:gap-12 bg-zinc-950/80 rounded-[22px]">
                 <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image 
                      src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
                      alt="Premium Satsang Box"
                      fill
                      className="object-cover"
                    />
                 </div>
                 <div className="w-full md:w-1/2 flex flex-col">
                    <h3 className="text-3xl font-bold text-white mb-4">Own the Experience</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                       Be among the first to own the Premium Guruji Satsang Box. A perfect gift 
                       for yourself or your loved ones who cherish spiritual connection.
                    </p>
                    <div className="flex flex-col gap-4">
                      <Button className="bg-white text-black hover:bg-zinc-200 h-14 rounded-full font-bold text-lg">
                        Inquire Now <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      <p className="text-center text-zinc-500 text-sm italic">*Limited Edition Hand-crafted Pieces</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Minimal placeholder icons to prevent build errors if others are missing
function Wand2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z" />
      <path d="m14 7 3 3" />
      <path d="M5 6v4" />
      <path d="M19 14v4" />
      <path d="M10 2v2" />
      <path d="M7 8H3" />
      <path d="M21 16h-4" />
      <path d="M11 3H9" />
    </svg>
  )
}
