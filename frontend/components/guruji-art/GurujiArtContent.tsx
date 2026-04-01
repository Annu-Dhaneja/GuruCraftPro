"use client";

import { motion } from "framer-motion";
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
  ShoppingBag
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
    title: "Guru Ji Art & Creation",
    subtitle: "THE DIVINE STUDIO",
    description: "\"Art is not just a visual experience; it's a spiritual journey that connects the soul to the divine frequency.\"",
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
    <div className="flex flex-col bg-zinc-950 text-white selection:bg-amber-500/30 overflow-x-hidden">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 md:px-10">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square bg-amber-600/10 blur-[150px] rounded-full animate-pulse" />
          <Image 
            src={formatImage(hero.image)}
            alt="Artistic Backdrop"
            fill
            className="object-cover opacity-20 filter grayscale"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-12 inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-xl"
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-200">{hero.subtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 leading-[0.9]"
          >
            {hero.title?.split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-amber-600">
              {hero.title?.split(' ').slice(2).join(' ')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-light italic mb-16 leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-3xl border border-white/5"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-white rounded-full px-12 h-16 md:h-20 text-lg md:text-xl font-bold shadow-2xl shadow-amber-600/30 group">
              Explore Gallery <Eye className="ml-2 w-6 h-6 group-hover:scale-125 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 rounded-full px-12 h-16 md:h-20 text-lg md:text-xl font-bold backdrop-blur-md">
              Order Custom Piece
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Artwork Grid ─────────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6 md:px-10" id="gallery">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl text-left">
             <div className="inline-flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest mb-4">
                <Palette className="w-4 h-4" /> The Collection
             </div>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">Sacred Masterpieces</h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              Every stroke is a meditation. Our collection ranges from traditional oil 
              paintings to ground-breaking digital sacred geometry.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center">
              <Award className="w-10 h-10 text-amber-500 mb-2" />
              <span className="text-[10px] font-bold tracking-widest text-amber-200 uppercase">Authentic Artist Proofs</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {artworks.map((art: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 mb-8 shadow-2xl transition-all duration-700 group-hover:border-amber-500/30 group-hover:shadow-amber-500/5">
                <Image 
                  src={formatImage(art.src)}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Flame className="w-10 h-10 text-orange-500 animate-pulse" />
                </div>
              </div>
              <div className="px-4 text-left">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{art.title}</h3>
                <p className="text-zinc-500 font-light italic leading-relaxed text-sm">{art.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Divine Product Shop ───────────────────────────── */}
      {data?.products && data.products.length > 0 && (
        <section className="py-40 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="text-center mb-20">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-6"
               >
                 <Sparkles className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Spiritual Offerings</span>
               </motion.div>
               <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">Divine Collection</h2>
               <p className="text-zinc-400 text-lg max-w-xl mx-auto font-light">Carry the divine frequency with you through our curated spiritual lifestyle products.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {data.products.map((product: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-amber-500/30 transition-all duration-500 overflow-hidden"
                >
                  {/* Product Image Wrapper */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image 
                      src={formatImage(product.image)}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Product Content */}
                  <div className="p-10 flex flex-col flex-grow text-left">
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-amber-500 transition-colors tracking-tight">{product.title}</h3>
                    <p className="text-zinc-500 text-sm font-light mb-10 leading-relaxed italic">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                       <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Premium Offering</span>
                          <span className="text-3xl font-bold text-white flex items-center gap-1">
                             <IndianRupee className="w-5 h-5 text-amber-500" /> {product.price.replace('₹', '')}
                          </span>
                       </div>
                       <Button size="icon" className="w-16 h-16 rounded-full bg-white text-black hover:bg-amber-500 hover:text-white transition-all shadow-xl">
                          <ShoppingBag className="w-6 h-6" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ── Story Section ────────────────────────────────── */}
      <section className="py-40 bg-zinc-900/50 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/textures/canvas.png')] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative aspect-square rounded-[80px] overflow-hidden border-2 border-white/10 shadow-2xl group"
             >
                <Image 
                  src={formatImage(story.image)}
                  alt="Process"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-amber-900/20 mix-blend-overlay" />
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-10 text-left"
             >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                   <History className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-4xl md:text-7xl font-bold leading-[0.9] tracking-tighter">
                   {story.title}
                </h2>
                <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl">
                  {story.description}
                </p>
                <div className="grid grid-cols-1 gap-6 pt-4">
                   {(story.points || []).map((item, idx) => (
                     <div key={idx} className="flex items-center gap-4 text-zinc-200">
                        <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0" />
                        <span className="text-lg font-medium">{item}</span>
                     </div>
                   ))}
                </div>
                <Button className="mt-8 bg-white text-black hover:bg-amber-500 hover:text-white h-20 rounded-full px-12 text-xl font-bold flex gap-4 transition-all">
                   Request Custom Work <ArrowRight className="w-6 h-6" />
                </Button>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── Call to Action ──────────────────────────────── */}
      <section className="py-48 text-center max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
        <Award className="w-16 h-16 text-amber-500 mx-auto mb-12 animate-pulse" />
        <h2 className="text-6xl md:text-9xl font-bold mb-10 tracking-tighter break-words leading-none">
          {cta.title}
        </h2>
        <p className="max-w-2xl mx-auto text-xl md:text-3xl text-zinc-500 font-light mb-20 italic leading-relaxed">
          {cta.description}
        </p>
        <div className="flex flex-wrap justify-center gap-8">
           <Button className="bg-amber-600 hover:bg-amber-500 text-white rounded-full px-20 h-24 text-2xl md:text-3xl font-bold shadow-2xl shadow-amber-600/30 transition-transform active:scale-95">
             Browse Original Collection
           </Button>
        </div>
      </section>
    </div>
  );
}
