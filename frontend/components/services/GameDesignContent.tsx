"use client";

import { motion } from "framer-motion";
import { 
  Gamepad2, 
  Cpu, 
  Layers, 
  Box, 
  Zap, 
  ShieldCheck,
  MousePointer2,
  ArrowRight,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function GameDesignContent() {
  const containerVariants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.15 }
  };

  const itemVariants = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { type: "spring", stiffness: 300, damping: 24 }
  };

  return (
    <div className="flex flex-col bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Neon Grid Effect */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="container relative z-10 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: -20, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 inline-flex items-center gap-3 px-6 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-xl group cursor-pointer"
            >
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-cyan-300">Next Gen Assets</span>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 italic"
            >
                LEVEL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] uppercase">
                    BEYOND
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-3xl mx-auto text-xl md:text-2xl text-zinc-400 font-medium mb-16 leading-relaxed"
            >
                We architect immersive digital realms. High-fidelity 3D assets, cinematic environments, 
                and core gameplay mechanics crafted for the boldest creators.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-8"
            >
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl px-12 h-20 text-xl font-black italic shadow-2xl shadow-cyan-600/30 group">
                    ENTER STUDIO <MousePointer2 className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 rounded-2xl px-12 h-20 text-xl font-bold backdrop-blur-md">
                    VIEW PORTFOLIO
                </Button>
            </motion.div>
        </div>
      </section>

      {/* ── Capabilities Grid ─────────────────────────── */}
      <section className="py-40 bg-[#050505]">
        <div className="container px-4 text-center mb-32">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic">POWER SYSTEM</h2>
            <p className="text-zinc-500 text-xl">Integrated solutions for AAA-Grade Game Architecture.</p>
        </div>

        <motion.div 
            variants={containerVariants}
            className="container px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
            {[
                { icon: Layers, title: "Environment", desc: "Procedural world-building & cinematic lighting." },
                { icon: Box, title: "3D Assets", desc: "Optimized high-poly to low-poly modeling." },
                { icon: Zap, title: "FX System", desc: "Advanced particle effects & visual impact." },
                { icon: Cpu, title: "AI Logic", desc: "Complex NPC behavior & state machines." }
            ].map((skill, i) => (
                <motion.div
                    key={i}
                    variants={itemVariants}
                    className="p-10 rounded-[40px] border border-white/5 bg-white/[0.03] backdrop-blur-3xl hover:border-cyan-500/50 hover:bg-cyan-500/[0.05] transition-all group"
                >
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                        <skill.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{skill.title}</h3>
                    <p className="text-zinc-500 leading-relaxed font-medium">{skill.desc}</p>
                </motion.div>
            ))}
        </motion.div>
      </section>

      {/* ── Environment Showcase ─────────────────────── */}
      <section className="py-40 relative">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
            <div className="w-[1200px] h-[600px] bg-purple-600/20 blur-[200px] rounded-full" />
        </div>
        
        <div className="container px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-10"
            >
                <div className="inline-flex items-center gap-3 text-purple-400 bg-purple-400/10 px-4 py-2 rounded-xl font-bold text-sm tracking-widest uppercase">
                    <Monitor className="w-4 h-4" /> Unreal Engine 5.4+
                </div>
                <h2 className="text-6xl md:text-8xl font-black mb-8 italic leading-none">THE WORLD <br /> <span className="text-purple-400">IS YOURS</span></h2>
                <p className="text-2xl text-zinc-400 font-light leading-relaxed">
                    We specialize in high-fidelity environments that blur the line between 
                    reality and imagination. Optimized for real-time performance.
                </p>
                
                <div className="flex flex-col gap-6">
                    {["Dynamic Weather Systems", "Global Illumination", "Native Asset Integration", "Zero-Lag Performance"].map((f, i) => (
                        <div key={i} className="flex items-center gap-4 text-xl font-bold">
                            <ShieldCheck className="w-6 h-6 text-cyan-500" /> {f}
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                className="relative aspect-video rounded-[60px] overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(168,85,247,0.3)] group cursor-crosshair shine-effect image-hover-zoom"
            >
                <Image 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                    alt="Game Design Preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-12 left-12">
                    <p className="text-xs font-bold leading-none tracking-widest uppercase mb-2 opacity-50">Experimental</p>
                    <p className="text-3xl font-black italic">CYBER CITY PHASE-01</p>
                </div>
            </motion.div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────── */}
      <section className="py-40 bg-[#050505] border-y border-white/5">
        <div className="container px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
                { step: "01", title: "Mechanics", desc: "Developing the core loop and player feel." },
                { step: "02", title: "Creation", desc: "High-fidelity assets and cinematic worlds." },
                { step: "03", title: "Delivery", desc: "Tested, optimized, and ready for launch." }
            ].map((item, i) => (
                <div key={i} className="relative group p-12 hover:bg-white/[0.02] rounded-3xl transition-colors">
                    <span className="absolute -top-12 -left-4 text-9xl font-black text-white/5 group-hover:text-cyan-500/10 transition-colors">{item.step}</span>
                    <h4 className="text-4xl font-black mb-6 italic">{item.title}</h4>
                    <p className="text-xl text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* ── Call to Action ───────────────────────────── */}
      <section className="py-60 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full" />
        <div className="container px-4 relative z-10">
            <Gamepad2 className="w-24 h-24 text-cyan-400 mx-auto mb-12 animate-pulse" />
            <h2 className="text-6xl md:text-[10rem] font-black mb-12 tracking-tighter italic grayscale hover:grayscale-0 transition-all duration-700">START MATCH</h2>
            <p className="max-w-2xl mx-auto text-2xl text-zinc-500 mb-16 italic font-medium">READY TO BUILD THE FUTURE OF GAMING?</p>
            <Button size="lg" className="bg-white text-black hover:bg-cyan-500 hover:text-white rounded-[32px] px-24 h-24 text-4xl font-black italic shadow-2xl transition-all duration-300">
                BOOT UP NOW <ArrowRight className="ml-4 w-10 h-10" />
            </Button>
        </div>
      </section>
    </div>
  );
}
