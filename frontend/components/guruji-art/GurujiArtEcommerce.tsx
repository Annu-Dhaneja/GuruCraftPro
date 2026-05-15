"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  ShoppingBag,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  Filter,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getApiUrl } from "@/lib/utils";

interface Product {
  id: string | number;
  title: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  category?: string;
  rating?: number;
}

interface GurujiArtData {
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
  };
  products?: Product[];
}

export function GurujiArtEcommerce({ data }: { data?: GurujiArtData }) {
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Canvas Art", "Digital Art", "Sculptures", "Satsang Gear"];

  const defaultProducts: Product[] = [
    {
      id: 1,
      title: "Satsang Story Box v4",
      description: "Pre-loaded with 100+ Bhajans, Mantras and Aarti. Premium wood finish with celestial violet accents.",
      price: "₹4,999",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000",
      badge: "Best Seller",
      category: "Satsang Gear",
      rating: 5
    },
    {
      id: 2,
      title: "Divine AR Canvas",
      description: "Interactive AR-enabled portrait of Guruji. Scan with your phone to experience a sacred 3D aura.",
      price: "₹2,499",
      image: "https://images.unsplash.com/photo-1514833150113-bc7519969062?q=80&w=2000",
      badge: "AR Tech",
      category: "Canvas Art",
      rating: 4.9
    },
    {
      id: 3,
      title: "Infinite Peace Sculpture",
      description: "3D printed and hand-finished meditative sculpture, optimized for spiritual resonance.",
      price: "₹7,999",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000",
      badge: "Limited Edition",
      category: "Sculptures",
      rating: 5
    },
    {
      id: 4,
      title: "Meditative Peace: Original Oil",
      description: "A transcendental masterpiece on archival canvas. Channeled through 40 days of silence.",
      price: "₹14,999",
      image: "/guru_ji_meditative_peace_art_1775301939462.png",
      badge: "Unique Original",
      category: "Canvas Art",
      rating: 5
    },
    {
        id: 5,
        title: "Celestial Aura: Divine Digital",
        description: "High-vibrational digital painting optimized for 8K displays. Features a radiant violet blessing field.",
        price: "₹1,499",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000",
        badge: "Digital Asset",
        category: "Digital Art",
        rating: 4.8
    },
    {
        id: 6,
        title: "Sacred Crystal Bracelet",
        description: "Hand-strung crystals energized for protection and peace. Fits all wrist sizes.",
        price: "₹999",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000",
        badge: "New Arrival",
        category: "Satsang Gear",
        rating: 4.7
    }
  ];

  const products = data?.products || defaultProducts;

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const formatImage = (src?: string) => {
    if (!src) return "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000";
    return src.startsWith('http') || src.startsWith('/') ? src : getApiUrl(src);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* ── Fixed Header ───────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Sparkles className="w-6 h-6 text-white" />
             </div>
             <span className="text-xl font-black uppercase tracking-tighter italic">Divine <span className="text-indigo-500">Studio</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search divine artifacts..." 
                 className="bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64 transition-all"
               />
            </div>
            
            <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-white/5 transition-all">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-black border-2 border-zinc-950">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero / Collection Header ────────────────── */}
      <section className="pt-40 pb-20 px-6 border-b border-white/5">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-12 bg-indigo-500" />
              <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em]">Official Collection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic uppercase"
            >
              Sacred Art & <br /> 
              <span className="text-shimmer bg-gradient-to-r from-indigo-100 via-violet-300 to-indigo-500 bg-clip-text text-transparent">
                Divine Creations.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-400 font-light italic leading-relaxed max-w-2xl border-l border-white/10 pl-8"
            >
              Experience the intersection of high-fidelity technology and sacred spiritual craftsmanship. Each artifact is an investment in peace.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Filters & Product Grid ──────────────────── */}
      <section className="py-20 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-500" /> Categories
              </h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block text-lg font-bold transition-all hover:translate-x-2 ${
                      activeCategory === cat ? "text-indigo-500 italic translate-x-4" : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-3xl">
               <Zap className="w-8 h-8 text-indigo-500 mb-6" />
               <h4 className="text-xl font-black mb-4 uppercase italic">7-Day Divine Sprint</h4>
               <p className="text-sm text-zinc-400 leading-relaxed italic mb-6">Every premium acquisition includes a 1-on-1 energy alignment session within 7 days.</p>
               <Button variant="outline" className="w-full border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-xl h-12 text-xs font-black uppercase tracking-widest transition-all">
                 Learn More
               </Button>
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative flex flex-col bg-zinc-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-2xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image 
                      src={formatImage(product.image)}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                      onError={(e: any) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                    
                    {product.badge && (
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    <button className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:border-indigo-600 group/btn">
                       <ShoppingBag className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-indigo-500 transition-colors leading-none">
                        {product.title}
                      </h3>
                    </div>
                    
                    <p className="text-zinc-500 text-sm font-light mb-8 leading-relaxed italic line-clamp-2 h-10">
                      {product.description}
                    </p>

                    <div className="mt-auto">
                       <div className="flex items-center justify-between mb-8">
                          <div className="flex flex-col">
                             <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">Exchange</span>
                             <span className="text-3xl font-black text-white">{product.price}</span>
                          </div>
                          <div className="flex items-center gap-1">
                             <Star className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                             <span className="text-xs font-black text-indigo-500">{product.rating || "5.0"}</span>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <Button 
                            onClick={handleAddToCart}
                            className="h-14 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black font-black uppercase text-[10px] tracking-widest transition-all"
                          >
                             Cart+
                          </Button>
                          <Button className="h-14 rounded-2xl bg-indigo-600 text-white hover:bg-white hover:text-black font-black uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-indigo-600/20">
                             Buy Now
                          </Button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Indicators ────────────────────────── */}
      <section className="py-32 border-y border-white/5 bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-indigo-500" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase italic mb-1">Verified Sacred</h4>
                <p className="text-sm text-zinc-500 italic">Authenticity certificates included.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
                <Truck className="w-8 h-8 text-indigo-500" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase italic mb-1">Elite Logistics</h4>
                <p className="text-sm text-zinc-500 italic">Insured shipping to 40+ countries.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
                <RotateCcw className="w-8 h-8 text-indigo-500" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase italic mb-1">Manifest Guarantee</h4>
                <p className="text-sm text-zinc-500 italic">Full exchange if energy doesn't align.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer / CTA ────────────────────────────── */}
      <section className="py-64 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[200px] rounded-full pointer-events-none" />
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="container mx-auto px-6"
        >
          <Sparkles className="w-16 h-16 text-indigo-500/50 mx-auto mb-12 animate-pulse" />
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase italic leading-none">
            Ready for <br /> <span className="text-shimmer bg-gradient-to-r from-indigo-100 via-violet-300 to-indigo-500 bg-clip-text text-transparent">Ascension?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-zinc-500 font-light mb-16 italic">
            Join the community of seekers who have transformed their space with Divine Studio artifacts.
          </p>
          <Button size="lg" className="h-24 px-16 rounded-2xl bg-white text-black hover:bg-indigo-600 hover:text-white text-2xl font-black uppercase italic transition-all group" asChild>
             <Link href="/contact">Contact Concierge <Truck className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" /></Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
