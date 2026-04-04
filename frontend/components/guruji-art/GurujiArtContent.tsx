"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight,
  Sun,
  Award,
  CheckCircle2,
  ShoppingBag,
  Heart,
  Infinity,
  ShoppingCart,
  Zap,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { getApiUrl } from "@/lib/utils";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  category?: string;
}

interface GurujiArtData {
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
  };
  products?: Product[];
  trial_section?: {
    title?: string;
    description?: string;
    image?: string;
    points?: string[];
  };
  cta?: {
    title?: string;
    description?: string;
    link?: string;
  };
}

export function GurujiArtContent({ data }: { data?: GurujiArtData }) {
  const [cartCount, setCartCount] = useState(0);

  // --- Dynamic Content Mapping ---
  const hero = data?.hero || {
    title: "Sacred Offerings",
    subtitle: "The Divine Shop",
    description: "Own a manifestation of divine energy. Every piece is an investment in peace, protection, and prosperity.",
    image: "/images/user_provided/generated-image-2026-02-23_14-29-24 (1).jpg"
  };

  const products = data?.products || [
    {
      id: 1,
      title: "Meditative Peace: Original Oil",
      description: "A transcendental masterpiece on archival canvas. Channeled through 40 days of silence, featuring sacred geometry and an indigo-gold aura that radiates tranquility.",
      price: "₹14,999",
      image: "/guru_ji_meditative_peace_art_1775301939462.png",
      badge: "Unique Original",
      category: "Canvas Art"
    },
    {
      id: 2,
      title: "Golden Aura: Divine Digital",
      description: "High-vibrational digital painting optimized for 8K displays. Features a radiant amber blessing field designed to enhance spiritual frequency.",
      price: "₹1,499",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000",
      badge: "Digital Asset",
      category: "Digital Art"
    }
  ];

  const trial = data?.trial_section || {
    title: "The 7-Day Artist Link",
    description: "Every premium acquisition includes a personalized 1-on-1 session with our lead artisan within 7 days. We refine the energy alignment and placement of your artifact.",
    image: "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=2574",
    points: ["Initial Energy Mapping", "Vedic Placement Consultation", "7-Day Signature Verification"]
  };

  const cta = data?.cta || {
    title: "Own the Divine",
    description: "Limitless protection and blessings await. Experience the intersection of art and divinity.",
    link: "/contact"
  };

  const formatImage = (src?: string) => {
    if (!src) return "";
    return src.startsWith('http') || src.startsWith('/') ? src : getApiUrl(src);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col bg-zinc-950 text-white selection:bg-amber-500/30 overflow-x-hidden font-sans">
      {/* ── Fixed Cart Button ────────────────────────── */}
      <div className="fixed top-24 right-8 z-[100]">
        <Button className="h-16 w-16 rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all relative">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] h-6 w-6 flex items-center justify-center rounded-full font-black border-2 border-zinc-950">
              {cartCount}
            </span>
          )}
        </Button>
      </div>

      {/* ── Aura Background ──────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-amber-600/5 blur-[180px] rounded-full animate-pulse [animation-duration:12s]" />
      </div>

      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-amber-500/5 border border-amber-500/10 backdrop-blur-3xl"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-amber-200">{hero.subtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[10rem] font-black tracking-tighter mb-12 leading-[0.8] italic uppercase"
          >
            {hero.title?.split(' ').slice(0, -1).join(' ')} <br />
            <span className="text-shimmer bg-gradient-to-r from-amber-100 via-orange-300 to-amber-500 bg-clip-text text-transparent">
              {hero.title?.split(' ').slice(-1)}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-400 font-light italic mb-20 leading-relaxed border-x border-white/10 py-6 px-12"
          >
            {hero.description}
          </motion.p>

          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4 items-center px-6 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                <span className="text-sm font-black uppercase tracking-widest text-amber-100">7-Day Divine Consultation Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Shelf ────────────────────────────── */}
      <section className="py-20 relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {products.map((product, i) => (
            <motion.div
              key={product.id || i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group flex flex-col rounded-[3.5rem] bg-zinc-950/40 border border-white/5 hover:border-amber-500/20 transition-all duration-700 glass-card overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image 
                  src={formatImage(product.image)}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  onError={(e: any) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                {product.badge && (
                  <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                          {product.badge}
                      </span>
                  </div>
                )}
              </div>

              <div className="p-12 flex flex-col flex-grow text-left">
                <div className="mb-6 flex justify-between items-start">
                    <h3 className="text-3xl font-black italic tracking-tight text-white group-hover:text-amber-500 transition-colors uppercase">
                    {product.title}
                    </h3>
                    <div className="text-zinc-600 font-black text-[10px] uppercase tracking-widest">{product.category || "Sacred Art"}</div>
                </div>
                
                <p className="text-zinc-500 text-base font-light mb-12 leading-relaxed italic border-l border-amber-500/20 pl-6 h-24 overflow-hidden">
                  {product.description}
                </p>
                
                <div className="mt-auto">
                    <div className="flex items-end justify-between mb-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Exchange</span>
                            <span className="text-5xl font-black text-white">{product.price}</span>
                        </div>
                        <div className="text-amber-500 flex gap-1">
                            <Star className="h-4 w-4 fill-amber-500" />
                            <Star className="h-4 w-4 fill-amber-500" />
                            <Star className="h-4 w-4 fill-amber-500" />
                            <Star className="h-4 w-4 fill-amber-500" />
                            <Star className="h-4 w-4 fill-amber-500" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button 
                            onClick={handleAddToCart}
                            className="flex-1 h-20 rounded-2xl bg-zinc-900 border border-white/5 text-white hover:bg-zinc-800 font-black uppercase transition-all"
                        >
                            <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                        </Button>
                        <Button className="flex-1 h-20 rounded-2xl bg-amber-600 text-white hover:bg-white hover:text-black font-black uppercase transition-all shadow-xl shadow-amber-600/20">
                            Buy Now
                        </Button>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 7-Day Divine Consultation Section ──────────── */}
      <section className="py-48 relative overflow-hidden bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[16/10] rounded-[4rem] overflow-hidden border border-white/10 group"
            >
                <Image 
                    src={formatImage(trial.image)}
                    alt="Consultation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-12 left-12">
                    <span className="text-6xl font-black text-white italic tracking-tighter">7-Day</span>
                    <p className="text-amber-500 font-black uppercase tracking-widest text-sm">Divine Sprint</p>
                </div>
            </motion.div>

            <div className="text-left space-y-10">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none">{trial.title}</h2>
                <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl">
                    {trial.description}
                </p>
                <ul className="space-y-6">
                    {(trial.points || []).map((point, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-zinc-300">
                          <CheckCircle2 className="h-6 w-6 text-amber-500" />
                          <span className="font-bold">{point}</span>
                      </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>

      {/* ── Final Sacred CTA ───────────────────────────── */}
      <section className="py-64 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-amber-600/5 blur-[200px] rounded-full pointer-events-none" />
        <Award className="w-20 h-20 text-amber-500/50 mx-auto mb-16 animate-pulse" />
        <h2 className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter leading-[0.8] italic uppercase">
            {cta.title}
        </h2>
        <p className="max-w-3xl mx-auto text-2xl text-zinc-500 font-light mb-24 italic border-y border-white/5 py-12 px-10 backdrop-blur-sm">
            {cta.description}
        </p>
        <Button size="lg" className="bg-amber-600 hover:bg-white hover:text-black text-white rounded-2xl px-24 h-28 text-3xl font-black shadow-[0_0_100px_rgba(217,119,6,0.3)] transition-all active:scale-95" asChild>
          <Link href={cta.link || "/contact"}>ENTER THE SANCTUM</Link>
        </Button>
      </section>
    </div>
  );
}
