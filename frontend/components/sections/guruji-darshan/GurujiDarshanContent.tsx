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
  Heart,
  ShoppingBag,
  IndianRupee,
  CheckCircle2,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CameraDarshan } from "@/components/sections/guruji-darshan/CameraDarshan";
import { AnimatePresence } from "framer-motion";

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
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <AnimatePresence>
        {isCameraOpen && <CameraDarshan onClose={() => setIsCameraOpen(false)} />}
      </AnimatePresence>
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
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-widest text-zinc-300 uppercase">Divine Experience</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9]"
          >
            {heroTitlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-600">
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
            <Button 
                onClick={() => setIsCameraOpen(true)}
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-10 h-16 text-lg font-bold shadow-2xl shadow-indigo-600/20"
            >
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
                <div 
                    onClick={() => setIsCameraOpen(true)}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                >
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

      {/* ── Dynamic Product Shop ─────────────────────────── */}
      {data?.products && data.products.length > 0 && (
        <section className="py-24 md:py-32 bg-zinc-900/50 border-t border-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Spiritual Shop</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">Explore Our Curated Artifacts</h2>
              <p className="text-zinc-400 text-lg font-light">Each piece is hand-selected and infused with divine energy to support your spiritual journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.products.map((product: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-zinc-950 rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-indigo-500/30 transition-all duration-500"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image 
                      src={product.image_url || "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3"} 
                      alt={product.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />
                    <div className="absolute top-6 right-6">
                       <div className="bg-indigo-500 text-white font-bold px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5" />
                          {product.price_inr}
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-10 relative">
                    <div className="absolute -top-12 left-10 w-24 h-24 bg-zinc-900 rounded-3xl border border-white/10 flex items-center justify-center p-3 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
                       <div className="w-full h-full rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                          <Image 
                            src={product.image_url || "/images/brand/logo-dark-v4.svg"} 
                            alt="thumb" 
                            width={100} 
                            height={100} 
                            className="w-full h-full object-cover rounded-xl"
                          />
                       </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">{product.title}</h3>
                    <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8 min-h-[60px]">
                      {product.description}
                    </p>
                    
                    <Link href={product.buy_link || "/contact"}>
                      <Button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl h-14 font-bold transition-all group-hover:bg-indigo-600 group-hover:border-indigo-500 group-hover:text-white">
                        Inquire Details <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Daily Wisdom Section ──────────────────────────── */}
      <section className="py-24 relative bg-[#020617] border-t border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent rounded-[3rem]" />
          <div className="container mx-auto px-4 md:px-6 relative flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-6">{data?.vachan?.badge || "Daily Vachan"}</p>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9] mb-8 text-white">
                      {data?.vachan?.quote || "\"Infinite peace begins within the soul.\""}
                  </h2>
                  <p className="text-zinc-400 font-medium italic mb-12">
                      {data?.vachan?.description || "Receive a personalized AI-generated spiritual quote every morning based on your journey and meditation goals."}
                  </p>
                  <Button className="rounded-full bg-white hover:bg-zinc-200 text-black font-black px-8">
                      SUBSCRIBE TO WISDOM
                  </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  {[1,2,3,4].map(i => (
                      <div key={i} className="w-40 h-56 rounded-3xl bg-white/5 border border-white/5 p-4 flex flex-col justify-end hover:border-indigo-500/30 transition-all">
                          <div className="w-full h-1 bg-indigo-500/20 rounded-full mb-4" />
                          <p className="text-[10px] font-bold text-slate-500 mb-1 italic">June {i+10}</p>
                          <p className="text-[10px] font-black uppercase tracking-tighter line-clamp-2 text-white">Sacred Morning Vachan</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* ── 7-Day Divine Consultation Section ──────────── */}
      <section className="py-32 md:py-48 relative overflow-hidden bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[16/10] rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/10 group"
            >
                <Image 
                    src="https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=2574"
                    alt="Consultation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                    <span className="text-5xl md:text-6xl font-black text-white italic tracking-tighter">7-Day</span>
                    <p className="text-indigo-500 font-black uppercase tracking-widest text-xs md:text-sm">Divine Sprint</p>
                </div>
            </motion.div>

            <div className="text-left space-y-10">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter italic leading-none text-white">The 7-Day Artist Link</h2>
                <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-xl">
                    Every premium acquisition includes a personalized 1-on-1 session with our lead artisan within 7 days. We refine the energy alignment and placement of your artifact.
                </p>
                <ul className="space-y-6">
                    {["Initial Energy Mapping", "Vedic Placement Consultation", "7-Day Signature Verification"].map((point, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-zinc-300">
                          <CheckCircle2 className="h-6 w-6 text-indigo-500" />
                          <span className="font-bold">{point}</span>
                      </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>

      {/* ── Final Sacred CTA ───────────────────────────── */}
      <section className="py-32 md:py-64 text-center relative overflow-hidden bg-zinc-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-indigo-600/5 blur-[200px] rounded-full pointer-events-none" />
        <Award className="w-16 h-16 md:w-20 md:h-20 text-indigo-500/50 mx-auto mb-12 md:mb-16 animate-pulse" />
        <h2 className="text-5xl md:text-7xl lg:text-[10rem] font-black mb-8 md:mb-12 tracking-tighter leading-[0.8] italic uppercase text-white">
            Own the Divine
        </h2>
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-zinc-500 font-light mb-16 md:mb-24 italic border-y border-white/5 py-8 md:py-12 px-6 md:px-10 backdrop-blur-sm">
            Limitless protection and blessings await. Experience the intersection of art and divinity.
        </p>
        <Button size="lg" className="bg-indigo-600 hover:bg-white hover:text-black text-white rounded-2xl px-12 md:px-24 h-20 md:h-28 text-2xl md:text-3xl font-black shadow-[0_0_100px_rgba(99,102,241,0.3)] transition-all active:scale-95" asChild>
          <Link href="/contact">ENTER THE SANCTUM</Link>
        </Button>
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
