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
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function GurujiArtContent() {
  const artworks = [
    {
      title: "Divine Presence",
      desc: "Oil on canvas, 36x48 inches. Capturing the eternal calm and wisdom.",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop"
    },
    {
      title: "Sacred Geometry",
      desc: "Digital Art. The mathematical harmony of the universe.",
      src: "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "The Golden Lotus",
      desc: "Acrylic with Gold Foil. Symbolizing purity and spiritual awakening.",
      src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col bg-zinc-950 text-white selection:bg-amber-500/30">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-amber-600/10 blur-[150px] rounded-full animate-pulse" />
          <Image 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
            alt="Artistic Backdrop"
            fill
            className="object-cover opacity-20 filter grayscale"
          />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-12 inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-xl"
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-amber-200">The Divine Studio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter mb-10"
          >
            Guruji <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-amber-600">
              Art & Creation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-400 font-light italic mb-16 leading-relaxed"
          >
            "Art is not just a visual experience; it's a spiritual journey that connects 
            the soul to the divine frequency."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-white rounded-full px-12 h-18 text-xl font-bold shadow-2xl shadow-amber-600/20">
              Explore Gallery <Eye className="ml-2 w-6 h-6" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 rounded-full px-12 h-18 text-xl font-bold backdrop-blur-md">
              Custom Commissions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Artwork Grid ─────────────────────────────────── */}
      <section className="py-32 container px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-bold mb-8">Sacred Masterpieces</h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              Every stroke is a meditation. Our collection ranges from traditional oil 
              paintings to ground-breaking digital sacred geometry.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
              <Palette className="w-8 h-8 text-amber-500 mb-2" />
              <span className="text-xs font-bold tracking-widest text-[#D4AF37]">Authentic</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {artworks.map((art, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 mb-8 shadow-2xl shine-effect image-hover-zoom">
                <Image 
                  src={art.src}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <Flame className="w-8 h-8 text-orange-500 mb-4 animate-bounce" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">{art.title}</h3>
              <p className="text-zinc-500 font-light italic leading-relaxed">{art.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Story Section ────────────────────────────────── */}
      <section className="py-32 bg-white/5 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] opacity-5 pointer-events-none" />
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative aspect-square rounded-[80px] overflow-hidden border border-white/20 shadow-2xl rotate-3 scale-95 shine-effect image-hover-zoom"
             >
                <Image 
                  src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop"
                  alt="Process"
                  fill
                  className="object-cover"
                />
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-8"
             >
                <History className="w-12 h-12 text-amber-500 mb-4" />
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">The Legacy of <br /> Divine Art</h2>
                <p className="text-xl text-zinc-400 font-light leading-relaxed">
                  Our journey began with a simple mission: to make the divine visible. 
                  Annu Design Studio bridges the gap between ancient spiritual symbolism 
                  and modern artistic expression.
                </p>
                <div className="space-y-6 pt-4">
                   {[
                     "Hand-painted traditional techniques",
                     "Premium archival quality materials",
                     "Each piece blessed and personalized",
                     "International Shipping & Packaging"
                   ].map((item, idx) => (
                     <div key={idx} className="flex items-center gap-4 text-zinc-300">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        {item}
                     </div>
                   ))}
                </div>
                <Button className="mt-8 bg-white text-black hover:bg-zinc-200 h-16 rounded-full px-12 font-bold flex gap-3">
                   Request Custom Work <ArrowRight className="w-5 h-5" />
                </Button>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── Call to Action ──────────────────────────────── */}
      <section className="py-40 text-center container px-4 relative">
        <Award className="w-16 h-16 text-amber-500 mx-auto mb-12 animate-pulse" />
        <h2 className="text-5xl md:text-8xl font-bold mb-10">Own a Masterpiece</h2>
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-500 font-light mb-16 italic">
          "A home with divine art is a home with divine protection." - Guruji
        </p>
        <div className="flex flex-wrap justify-center gap-8">
           <Button className="bg-amber-600 hover:bg-amber-500 text-white rounded-full px-20 h-20 text-2xl font-bold shadow-2xl">
             Browse Original Collection
           </Button>
        </div>
      </section>
    </div>
  );
}
