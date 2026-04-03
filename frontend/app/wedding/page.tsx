import Link from "next/link";
import { Sparkles, Heart, IndianRupee, Calendar, ArrowRight, Camera, Music, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Planning Suite | Annu Design Studio",
  description: "A luxury, end-to-end wedding planning experience. Explore our master planning tools: budget tracker, timeline organizer, and royal consultation services.",
};

const TOOLS = [
  {
    href: "/wedding/budget",
    icon: IndianRupee,
    color: "from-amber-500 to-yellow-600",
    glow: "rgba(245,158,11,0.3)",
    badge: "Financial Command",
    title: "Budget Manager",
    description: "Orchestrate every rupee of your investment. Live budget tracking, category breakdowns, and real-time financial harmony for your masterpiece.",
    cta: "Open Budget Suite"
  },
  {
    href: "/services/wedding-plan",
    icon: Calendar,
    color: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.3)",
    badge: "Our Atelier",
    title: "Wedding Planning Services",
    description: "From intimate ceremonies to grand royal galas — explore our Elite, Royal, and Imperial packages crafted with unparalleled precision.",
    cta: "Explore Packages"
  },
  {
    href: "/ai-lab",
    icon: Sparkles,
    color: "from-indigo-500 to-purple-600",
    glow: "rgba(99,102,241,0.3)",
    badge: "AI Powered",
    title: "AI Style Lab",
    description: "Leverage our virtual try-on engine for your wedding outfits. Curate a 7-day bridal wardrobe plan with AI-powered style intelligence.",
    cta: "Try AI Stylist"
  }
];

const FEATURES = [
  { icon: Palette, label: "Custom Decor Artistry" },
  { icon: Camera, label: "Photography & Cinema" },
  { icon: Music, label: "Live Entertainment" },
  { icon: Heart, label: "Full Concierge Service" },
];

export default function WeddingHubPage() {
  return (
    <main className="min-h-screen bg-[#FCFBF7] text-[#2C2C2C] selection:bg-[#D4AF37]/30 flex flex-col">
      {/* ── Cinematic Hero ──────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FCFBF7]" />

        {/* Floating Badge */}
        <div className="relative z-10 px-6 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
            <span className="text-xs font-black tracking-[0.35em] uppercase italic">Annu Design Studio</span>
          </div>

          <h1 className="text-6xl md:text-[7rem] font-serif text-white italic leading-none tracking-tighter">
            The Wedding <br />
            <span className="text-[#D4AF37] not-italic drop-shadow-2xl">Planning Suite</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-light leading-relaxed">
            Every masterpiece begins with a vision. Our end-to-end tools, AI stylist, and concierge planning
            transform your dream into an unforgettable royal experience.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/wedding/budget">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8962F] text-white rounded-full px-10 h-14 text-lg font-serif italic shadow-2xl shadow-amber-500/30 transition-transform active:scale-95">
                Open Budget Suite <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/services/wedding-plan">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-full px-10 h-14 text-lg font-serif italic backdrop-blur-sm">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feature Pills ───────────────────────────────── */}
      <section className="py-16 bg-[#FCFBF7] relative">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-[#2C2C2C]/70">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
                <f.icon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="text-sm font-bold tracking-wide">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Planning Tools Grid ──────────────────────────── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] font-serif italic text-2xl block mb-4">Your Planning Command Center</span>
            <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
              Everything You Need, <br /> In One Suite
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.map((tool, i) => (
              <Link href={tool.href} key={i} className="group block">
                <div
                  className="h-full bg-white border border-[#D4AF37]/10 rounded-[2.5rem] p-10 flex flex-col gap-6 shadow-xl hover:shadow-[0_20px_60px_var(--glow)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden"
                  style={{ '--glow': tool.glow } as React.CSSProperties}
                >
                  {/* Top glow */}
                  <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${tool.color} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity`} />

                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-2xl`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D4AF37] mb-2 block">{tool.badge}</span>
                    <h3 className="text-2xl font-serif italic mb-3">{tool.title}</h3>
                    <p className="text-zinc-500 font-light leading-relaxed text-sm">{tool.description}</p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-[#2C2C2C] group-hover:text-[#D4AF37] transition-colors">
                    {tool.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="py-40 text-center relative bg-[#2C2C2C] text-white mt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 px-6 container max-w-4xl mx-auto">
          <Heart className="w-12 h-12 text-[#D4AF37] mx-auto mb-10 animate-pulse" />
          <h2 className="text-5xl md:text-7xl font-serif italic mb-8 tracking-tighter">Your Forever Begins Here.</h2>
          <p className="text-zinc-400 text-xl font-light italic max-w-xl mx-auto mb-16">
            Schedule your private consultation with our Imperial concierge team and start crafting your masterpiece.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8962F] text-white rounded-full px-16 h-20 text-2xl font-serif italic shadow-2xl transition-transform active:scale-95">
              Begin the Journey
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
