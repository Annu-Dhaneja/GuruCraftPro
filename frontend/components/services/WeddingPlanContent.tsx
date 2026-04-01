"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Sparkles, 
  Star, 
  MapPin, 
  Music, 
  Camera, 
  Utensils, 
  Palette,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function WeddingPlanContent({ data }: { data?: any }) {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  // Extract data with fallbacks
  const hero = data?.hero || {
    badge: "Exquisite Celebrations",
    title: "Crafting Your",
    title_highlight: "Eternal Story",
    description: "From intimate gatherings to grand royal galas, we orchestrate every detail with unparalleled precision and artistic flair.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
  };

  const heritage = data?.heritage || {
    title_prefix: "Where Vision Meets",
    title_highlight: "Impeccable Execution",
    description: "At Annu Design Studio, we believe a wedding is not just an event; it's a masterpiece in the making. Our holistic approach integrates traditional elegance with contemporary sophistication.",
    features: [
      { icon: "MapPin", label: "Destinations", desc: "Global Scouting" },
      { icon: "Palette", label: "Decor", desc: "Custom Artistry" },
      { icon: "Utensils", label: "Catering", desc: "Gourmet Cuisines" },
      { icon: "Calendar", label: "Timeline", desc: "Seamless Flow" }
    ],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
  };

  const packages = data?.packages || [
    {
      name: "Elite",
      price: "Starting ₹2.5L",
      features: ["Day-of Coordination", "Vendor Liaison", "Guest Concierge", "Traditional Decor"],
      highlight: false
    },
    {
      name: "Royal",
      price: "Starting ₹7.5L",
      features: ["Full Concept Design", "Global Sourcing", "Multi-day Management", "Luxury Transfers"],
      highlight: true
    },
    {
      name: "Imperial",
      price: "Custom Quote",
      features: ["Celebrity Management", "Charters & Private Jets", "Global Destinations", "Ultra-Luxury Decor"],
      highlight: false
    }
  ];

  const gallery = data?.gallery || [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069",
    "https://images.unsplash.com/photo-1522673607200-1648482ce486?q=80&w=2069",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070"
  ];

  const cta = data?.cta || {
    title: "Ready to Begin?",
    description: "Every detail matters when it comes to yours forever. Let's start planning your masterpiece today.",
    button_text: "Schedule Your Private Consultation"
  };

  // Helper to map icon names to components
  const getIcon = (name: string) => {
    switch (name) {
      case "MapPin": return MapPin;
      case "Palette": return Palette;
      case "Utensils": return Utensils;
      case "Calendar": return Calendar;
      case "Heart": return Heart;
      case "Music": return Music;
      case "Camera": return Camera;
      default: return Star;
    }
  };

  return (
    <div className="flex flex-col bg-[#FCFBF7] text-[#2C2C2C] selection:bg-[#D4AF37]/30">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={hero.image}
            alt="Luxury Wedding"
            fill
            className="object-cover brightness-75 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FCFBF7]" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase italic">{hero.badge}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif text-white mb-8 italic"
          >
            {hero.title} <br />
            <span className="text-[#D4AF37] not-italic drop-shadow-2xl">{hero.title_highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-light mb-12"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8962F] text-white rounded-full px-10 h-16 text-lg font-serif italic shadow-xl">
              Begin Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-full px-10 h-16 text-lg font-serif italic backdrop-blur-sm">
              View Our Heritage
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── The Heritage Section ────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeUp}>
              <span className="text-[#D4AF37] font-serif italic text-2xl mb-4 block">The Art of Planning</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                {heritage.title_prefix} <br />
                <span className="italic">{heritage.title_highlight}</span>
              </h2>
              <p className="text-xl text-zinc-600 font-light leading-relaxed mb-10">
                {heritage.description}
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                {heritage.features.map((item: any, i: number) => {
                  const IconComp = getIcon(item.icon);
                  return (
                    <div key={i} className="space-y-2">
                      <IconComp className="w-8 h-8 text-[#D4AF37]" />
                      <h4 className="font-bold text-lg">{item.label}</h4>
                      <p className="text-zinc-500 text-sm">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              style={{ borderRadius: "100px 20px 100px 20px" }}
              className="relative aspect-[4/5] overflow-hidden shadow-2xl shine-effect image-hover-zoom"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image 
                src={heritage.image}
                alt="Decor Details"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Signature Experiences ───────────────────────── */}
      <section className="py-32 bg-[#2C2C2C] text-white">
        <div className="container px-4 text-center mb-20">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 italic">Signature Packages</h2>
            <p className="text-zinc-400 text-xl font-light">Tailored perfection for every milestone of your love.</p>
          </motion.div>
        </div>

        <div className="container px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-12 rounded-[40px] border flex flex-col ${pkg.highlight ? 'bg-white/5 border-[#D4AF37]' : 'bg-transparent border-zinc-800'} transition-all hover:scale-[1.02]`}
            >
              <h3 className="text-3xl font-serif mb-2 italic">{pkg.name}</h3>
              <p className={`text-xl font-bold mb-8 ${pkg.highlight ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>{pkg.price}</p>
              <ul className="space-y-4 mb-12 flex-grow">
                {pkg.features.map((f: string, j: number) => (
                  <li key={j} className="flex items-center gap-3 text-zinc-400 font-light text-left">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]/50" /> {f}
                  </li>
                ))}
              </ul>
              <Button className={pkg.highlight ? 'bg-[#D4AF37] hover:bg-[#B8962F]' : 'bg-white/10 hover:bg-white/20'}>
                Contact for {pkg.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Gallery Rail ────────────────────────────────── */}
      <section className="py-32">
        <div className="container px-4 flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif italic mb-4">Glimpses of Forever</h2>
            <p className="text-zinc-500 text-lg">Moments captured in the pursuit of perfection.</p>
          </div>
          <Button variant="ghost" className="text-[#D4AF37] font-serif italic text-xl">View Full Portfolio <ArrowRight className="ml-2 w-5 h-5" /></Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 h-[600px]">
          {gallery.map((src: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden group shine-effect image-hover-zoom ${i % 2 === 0 ? 'mt-12' : 'mb-12'}`}
            >
              <Image 
                src={src}
                alt="Wedding Gallery"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Call to Action ──────────────────────────────── */}
      <section className="py-40 relative bg-[#D4AF37]/5 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container relative z-10 px-4">
          <motion.div {...fadeUp}>
            <Heart className="w-16 h-16 text-[#D4AF37] mx-auto mb-8 animate-pulse" />
            <h2 className="text-5xl md:text-8xl font-serif mb-8 italic">{cta.title}</h2>
            <p className="max-w-2xl mx-auto text-xl text-zinc-600 font-light mb-12 italic">
              {cta.description}
            </p>
            <Link href="/wedding/budget">
              <Button size="lg" className="bg-[#2C2C2C] hover:bg-black text-white rounded-full px-16 h-20 text-2xl font-serif italic shadow-2xl">
                {cta.button_text}
              </Button>
            </Link>

          </motion.div>
        </div>
      </section>
    </div>
  );
}

