"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Eye, 
  Palette, 
  History, 
  ArrowRight,
  Sun,
  Flame,
  Award,
  CheckCircle2,
  IndianRupee,
  ShoppingBag,
  Heart,
  Infinity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getApiUrl } from "@/lib/utils";

interface GurujiArtData {
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
  };
  artworks?: Array<{
    title: string;
    desc: string;
    src: string;
  }>;
  story?: {
    title?: string;
    description?: string;
    points?: string[];
    image?: string;
  };
  cta?: {
    title?: string;
    description?: string;
    link?: string;
  };
  products?: Array<{
    title: string;
    description: string;
    price: string;
    image: string;
  }>;
}

export function GurujiArtContent({ data }: { data?: GurujiArtData }) {
  const hero = data?.hero || {
    title: "Guru Ji Art Work",
    subtitle: "THE DIVINE COLLECTION",
    description: "Experience the intersection of sacred symbolism and contemporary artistry. Our studio crafts premium bracelets, daily wisdom, and spiritual digital assets designed to bring peace and positivity to your life.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
  };

  const artworks = data?.artworks || [];
  const story = data?.story || {
    title: "The Legacy of Divine Art",
    description: "Annu Design Studio bridges the gap between ancient spiritual symbolism and modern artistic expression.",
    points: ["Hand-painted traditional techniques", "Premium archival quality materials"],
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop"
  };

  const cta = data?.cta || {
    title: "Own a Masterpiece",
    description: "\"A home with divine art is a home with divine protection.\" - Guruji"
  };

  const formatImage = (src?: string) => {
    if (!src) return "";
    return src.startsWith('http') || src.startsWith('/') ? src : getApiUrl(src);
  };

  return (
    <div className="flex flex-col bg-zinc-950 text-white selection:bg-amber-500/30 overflow-x-hidden font-sans">
      {/* ── Aura Background & Sacred Light ───────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.08)_0%,transparent_50%)]" />
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-amber-600/5 blur-[180px] rounded-full animate-pulse [animation-duration:12s]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-600/5 blur-[150px] rounded-full animate-pulse [animation-duration:8s]" />
        
        {/* Divine Light Ray Effect */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-[conic-gradient(from_270deg_at_50%_0%,rgba(255,255,255,0.03)_0deg,transparent_60deg)] opacity-40 blur-3xl transform -rotate-12" />
      </div>

      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 md:px-10">
        <div className="absolute inset-0 z-0">
          <Image 
            src={formatImage(hero.image)}
            alt="Artistic Backdrop"
            fill
            className="object-cover opacity-20 filter grayscale scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-12 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-amber-500/5 border border-amber-500/10 backdrop-blur-3xl"
          >
            <Infinity className="w-4 h-4 text-amber-500/50" />
            <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-amber-200/60 leading-none">{hero.subtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-12 leading-[0.8] font-serif italic"
          >
            {hero.title?.split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-shimmer bg-gradient-to-r from-amber-100 via-orange-300 to-amber-500 bg-clip-text text-transparent">
              {hero.title?.split(' ').slice(2).join(' ')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-zinc-400 font-light italic mb-20 leading-relaxed border-x border-white/5 py-4 px-10"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8"
          >
            <Button size="lg" className="bg-amber-600 hover:bg-white hover:text-black text-white rounded-2xl px-16 h-20 text-xl font-bold shadow-2xl shadow-amber-600/20 group transition-all duration-500">
              EXPLORE COLLECTION <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 rounded-2xl px-16 h-20 text-xl font-bold backdrop-blur-xl">
              CUSTOM VISION
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Artwork Museum Grid ────────────────────────── */}
      <section className="py-48 max-w-7xl mx-auto px-6 md:px-10 relative" id="gallery">
        <div className="flex flex-col lg:flex-row justify-between items-baseline mb-32 gap-12">
          <div className="max-w-3xl text-left">
             <div className="inline-flex items-center gap-3 text-amber-500 font-bold text-xs uppercase tracking-[0.4em] mb-6">
                <div className="w-12 h-[1px] bg-amber-500" /> SACRED ATELIER
             </div>
            <h2 className="text-5xl md:text-8xl font-bold mb-10 tracking-tighter font-serif">Original Masterpieces</h2>
            <p className="text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl border-l-2 border-amber-500/20 pl-8 italic">
              Transcending the physical medium. Every piece is a channeled manifestation of spiritual frequency and Vedic geometric harmony.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
             <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Curated Excellence</span>
             <div className="px-10 py-6 bg-zinc-900/50 border border-white/5 rounded-[2rem] flex flex-col items-center backdrop-blur-2xl">
               <Award className="w-12 h-12 text-amber-500 mb-2 animate-bounce [animation-duration:4s]" />
               <span className="text-[10px] font-black tracking-widest text-amber-200 uppercase">Artist Certified Proofs</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
          {artworks.map((art: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/5 bg-zinc-900 mb-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:border-amber-500/20 group-hover:-translate-y-4 shimmer-sweep">
                <Image 
                  src={formatImage(art.src)}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent group-hover:via-amber-500/10 transition-colors duration-1000" />
                <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <Sun className="w-6 h-6 text-amber-200" />
                </div>
              </div>
              <div className="px-6 text-left">
                <h3 className="text-3xl font-bold mb-3 group-hover:text-amber-500 transition-colors uppercase tracking-tight font-serif italic">{art.title}</h3>
                <p className="text-zinc-500 font-light italic leading-relaxed text-base">{art.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Sacred Product Emporium ─────────────────────── */}
      {data?.products && data.products.length > 0 && (
        <section className="py-48 relative overflow-hidden bg-zinc-900/20 backdrop-blur-3xl border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="text-center mb-32">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-500 mb-10 backdrop-blur-2xl"
               >
                 <Sparkles className="w-5 h-5 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">Spiritual Talismans</span>
               </motion.div>
               <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-10 font-serif lowercase italic">divine offerings</h2>
               <p className="text-zinc-500 text-2xl max-w-2xl mx-auto font-light leading-relaxed">Blessed artifacts carrying the intention of protection, prosperity, and peace.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {data.products.map((product: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 25, stiffness: 100, delay: i * 0.1 }}
                  className="group relative flex flex-col rounded-[4.5rem] bg-zinc-950/40 border border-white/5 hover:border-amber-500/20 transition-all duration-700 overflow-hidden glass-card shadow-2xl overflow-hidden"
                >
                  {/* Product Visual Overlay */}
                  <div className="absolute top-0 right-0 p-8 z-20">
                     <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-amber-600 group-hover:scale-125 transition-all duration-500">
                        <Heart className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                     </div>
                  </div>

                  {/* Product Image Wrapper */}
                  <div className="relative aspect-square overflow-hidden shadow-inner">
                    <Image 
                      src={formatImage(product.image)}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  </div>

                  {/* Product Premium Content */}
                  <div className="p-14 flex flex-col flex-grow text-left relative z-10">
                    <h3 className="text-3xl font-extrabold mb-4 group-hover:text-shimmer bg-gradient-to-r from-amber-100 to-amber-500 bg-clip-text text-transparent transition-all tracking-tight font-serif italic">
                      {product.title}
                    </h3>
                    <p className="text-zinc-500 text-sm font-light mb-12 leading-relaxed italic border-l border-amber-500/10 pl-6">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                       <div className="flex flex-col">
                          <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em] mb-2">Sacred Exchange</span>
                          <span className="text-4xl font-extrabold text-white flex items-center gap-1">
                             <span className="text-amber-500 opacity-50 text-2xl font-light italic mr-1">₹</span> {product.price.replace('₹', '')}
                          </span>
                       </div>
                       <Button size="icon" className="w-18 h-18 rounded-full bg-white text-black hover:bg-amber-600 hover:text-white transition-all shadow-2xl active:scale-90">
                          <ShoppingBag className="w-7 h-7" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── The Legacy Journey ──────────────────────────── */}
      <section className="py-48 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative aspect-[4/5] rounded-[6rem] overflow-hidden border border-white/5 shadow-2xl group"
           >
              <Image 
                src={formatImage(story.image)}
                alt="Process"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-16 left-16">
                 <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-3xl border border-white/10">
                    <History className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-black tracking-widest uppercase">Traditional Heritage</span>
                 </div>
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-12 text-left"
           >
              <h2 className="text-5xl md:text-8xl font-bold leading-[0.8] tracking-tighter font-serif italic">
                 {story.title}
              </h2>
              <p className="text-2xl text-zinc-500 font-light leading-relaxed max-w-xl">
                {story.description}
              </p>
              <div className="grid grid-cols-1 gap-8 pt-6">
                 {(story.points || []).map((item, idx) => (
                   <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6 group"
                   >
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-600 transition-all">
                        <CheckCircle2 className="w-6 h-6 text-amber-500 group-hover:text-white" />
                      </div>
                      <span className="text-xl font-medium text-zinc-300 group-hover:text-white transition-colors">{item}</span>
                   </motion.div>
                 ))}
              </div>
              <Button size="lg" className="mt-12 bg-white text-black hover:bg-amber-600 hover:text-white h-24 rounded-2xl px-16 text-2xl font-black flex gap-5 transition-all shadow-2xl">
                 COMMISSION ARTWORK <Palette className="w-7 h-7" />
              </Button>
           </motion.div>
        </div>
      </section>

      {/* ── Divine Final Call ───────────────────────────── */}
      <section className="py-64 text-center max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-amber-600/5 blur-[200px] rounded-full pointer-events-none" />
        <Award className="w-20 h-20 text-amber-500/50 mx-auto mb-16 animate-pulse" />
        <h2 className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter leading-[0.8] font-serif lowercase italic">
          {cta.title}
        </h2>
        <p className="max-w-3xl mx-auto text-2xl md:text-4xl text-zinc-500 font-light mb-24 italic leading-relaxed border-y border-white/5 py-12 px-10 backdrop-blur-sm">
          {cta.description}
        </p>
        <Button size="lg" className="bg-amber-600 hover:bg-white hover:text-black text-white rounded-2xl px-24 h-28 text-3xl font-black shadow-[0_0_80px_rgba(217,119,6,0.25)] transition-all active:scale-95">
          ENTER THE SANCTUM
        </Button>
      </section>
    </div>
  );
}

