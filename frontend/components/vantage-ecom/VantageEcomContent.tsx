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
  Cloud,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function VantageEcomContent({ data }: { data?: any }) {
  const safeHero = data?.hero || {};
  
  const categories = [];
  if (data?.category_a) categories.push(data.category_a);
  if (data?.category_b) categories.push(data.category_b);
  if (data?.category_c) categories.push(data.category_c);

  return (
    <div className="flex flex-col bg-white text-slate-900 selection:bg-blue-600/10">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-slate-50">
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
                    <Zap className="w-4 h-4 fill-blue-600" /> {safeHero.subtitle || "VANTAGE PLATFORM V2.0"}
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-slate-900">
                    <span className="text-blue-600">{safeHero.title || "VantageEcom"}</span>
                </h1>

                <p 
                    className="max-w-2xl text-xl md:text-2xl text-slate-500 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: safeHero.description || "High-performance ecosystem." }}
                />

                <div className="flex flex-wrap gap-6 pt-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 h-16 text-lg font-bold shadow-xl shadow-blue-600/20 group">
                        Live Demo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="border-slate-200 hover:bg-white text-slate-600 rounded-2xl px-10 h-16 text-lg font-bold shadow-sm">
                        View Feature Deck
                    </Button>
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
                        src={safeHero.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"}
                        alt="Platform Dashboard"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent" />
                </div>
            </motion.div>
        </div>
      </section>

      {/* ── CMS Categories ─────────────────────────────────── */}
      {categories.map((category: any, catIndex: number) => (
          <section key={catIndex} className={`py-32 container px-4 ${catIndex % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="text-center max-w-3xl mx-auto mb-24">
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight text-slate-900">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(category.items || []).map((item: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-3xl bg-white border border-slate-100 shadow-xl overflow-hidden hover:border-blue-600/30 transition-all group flex flex-col"
                    >
                        {item.image && (
                            <div className="w-full aspect-video relative overflow-hidden bg-slate-100">
                                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        )}
                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                            </div>
                            <p className="text-blue-600 font-bold mb-4">{item.price}</p>
                            <p className="text-slate-500 leading-relaxed mb-8 flex-1" dangerouslySetInnerHTML={{ __html: item.description }} />
                            
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-12">
                                Learn More
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
          </section>
      ))}

      {/* ── Global Call to Action ──────────────────────────────── */}
      <section className="py-40 bg-blue-600 text-center text-white relative">
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="container relative z-10 px-4">
            <h2 className="text-5xl md:text-9xl font-black mb-10 tracking-tighter">GO GLOBAL</h2>
            <p className="max-w-xl mx-auto text-xl md:text-2xl text-blue-100 font-light mb-16 italic">
                Join the brands scaling with Vantage. 
                Your journey to the top starts here.
            </p>
            <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 rounded-2xl px-16 h-20 text-2xl font-black shadow-2xl">
                    Start Your Free Trial
                </Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
