"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  ShoppingCart, 
  Globe, 
  Zap, 
  ShieldCheck,
  TrendingUp,
  Layout,
  ArrowRight,
  Smartphone,
  Cloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function VantageEcomContent() {
  const stats = [
    { label: "Conversion Lift", value: "+40%" },
    { label: "Page Speed", value: "< 1.2s" },
    { label: "Uptime", value: "99.9%" },
    { label: "ROI Average", value: "x12" }
  ];

  return (
    <div className="flex flex-col bg-white text-slate-900 selection:bg-blue-600/10">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 skew-x-12 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-600/5 -skew-x-12 -translate-x-10" />
        </div>

        <div className="container relative z-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-sm font-bold uppercase tracking-widest">
                    <Zap className="w-4 h-4 fill-blue-600" /> VANTAGE PLATFORM V2.0
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-slate-900">
                    The Future of <br />
                    <span className="text-blue-600">E-Commerce</span>
                </h1>

                <p className="max-w-2xl text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
                    Vantage is more than a store—it's a high-performance ecosystem. 
                    AI-driven automation, lightning-fast interfaces, and data-backed 
                    conversion science.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 h-16 text-lg font-bold shadow-xl shadow-blue-600/20 group">
                        Live Demo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="border-slate-200 hover:bg-white text-slate-600 rounded-2xl px-10 h-16 text-lg font-bold shadow-sm">
                        View Feature Deck
                    </Button>
                </div>

                <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-3xl font-black text-slate-900">{s.value}</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative shine-effect image-hover-zoom rounded-3xl"
            >
                <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-white bg-slate-200">
                    <Image 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="Platform Dashboard"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent" />
                </div>
                {/* Floating Elements */}
                <div className="absolute -bottom-10 -left-10 p-6 bg-white rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Sales Growth</p>
                        <p className="text-xl font-black">+142%</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* ── Feature Grid ─────────────────────────────────── */}
      <section className="py-32 container px-4">
        <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Built for Scale</h2>
            <p className="text-xl text-slate-500 font-light">
                Enterprise-grade architecture tailored for high-growth brands. 
                Everything you need to dominate your niche.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
                { icon: Layout, title: "Modern Storefront", desc: "Headless CMS integration with Next.js for sub-second page loads." },
                { icon: ShoppingCart, title: "Smart Checkout", desc: "1-click payments and dynamic cart recovery systems." },
                { icon: BarChart3, title: "Deep Analytics", desc: "Track every customer touchpoint with integrated BI tools." },
                { icon: Globe, title: "Global Ready", desc: "Multi-currency, multi-language, and localized tax systems." },
                { icon: ShieldCheck, title: "Safe & Secure", desc: "PCI compliance and advanced fraud protection built-in." },
                { icon: Cloud, title: "Cloud Scale", desc: "Auto-scaling infrastructure to handle massive traffic spikes." }
            ].map((f, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-600/20 hover:bg-blue-600/[0.02] transition-all group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                        <f.icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* ── Visual Section ──────────────────────────────── */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="relative shine-effect image-hover-zoom rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                        alt="Data View"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-50" />
                </div>

                <div className="space-y-10">
                    <h2 className="text-4xl md:text-7xl font-black leading-tight tracking-tight">Data Integrity. <br /> Total Insight.</h2>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                        Say goodbye to opaque reporting. Vantage provides a unified view of 
                        your entire operation—from inventory levels to customer lifetime value.
                    </p>
                    
                    <ul className="space-y-6">
                        {["Real-time Inventory Management", "Advanced Customer Segmenting", "Automated Marketing Triggers"].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-xl font-bold">
                                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* ── Device Showcase ──────────────────────────────── */}
      <section className="py-32 bg-white">
        <div className="container px-4 text-center">
            <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-8" />
            <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tight">Commerce Anywhere</h2>
            <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-20 font-light">
                Optimized for every screen. From high-conversion mobile apps to 
                immersive desktop experiences.
            </p>
            
            <div className="flex justify-center">
                <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-100 shine-effect image-hover-zoom">
                    <Image 
                        src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=2662&auto=format&fit=crop"
                        alt="E-com Multi-device"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* ── Call to Action ──────────────────────────────── */}
      <section className="py-40 bg-blue-600 text-center text-white relative">
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="container relative z-10 px-4">
            <h2 className="text-5xl md:text-9xl font-black mb-10 tracking-tighter">GO GLOBAL</h2>
            <p className="max-w-xl mx-auto text-xl md:text-2xl text-blue-100 font-light mb-16 italic">
                Join the 200+ brands scaling with Vantage. 
                Your journey to the top starts here.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 rounded-2xl px-16 h-20 text-2xl font-black shadow-2xl">
                Start Your Free Trial
            </Button>
        </div>
      </section>
    </div>
  );
}
