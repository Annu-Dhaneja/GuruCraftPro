"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { GurujiArtContent } from "@/components/guruji-art/GurujiArtContent";
import { VantageEcomContent } from "@/components/services/VantageEcomContent";


interface Section {
  id?: number;
  type: string;
  slug: string;
  content: any;
}

interface ServiceData {
  title?: string;
  slug?: string;
  meta?: {
    title: string;
    description: string;
  };
  sections?: Section[];
  hero?: any;
  features?: any;
  cta?: any;
}

export function ServiceTemplate({ data }: { data: ServiceData }) {
  // Defensive check with fallback for legacy/flattened CMS structures
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground font-bold tracking-widest uppercase italic">Loading experience...</div>
      </div>
    );
  }

  // If data.sections is missing, we check for direct keys (hero, features, cta) 
  // which is the common flattened structure from our CMS repository.
  const sections = data.sections || [
    data.hero ? { type: "hero", slug: "hero", content: data.hero } : null,
    data.features ? { type: "features", slug: "features", content: { items: data.features } } : null,
    data.cta ? { type: "cta", slug: "cta", content: data.cta } : null,
  ].filter(Boolean) as Section[];

  if (data.slug === "guru-ji-art") {
    return <GurujiArtContent data={data} />;
  }

  if (data.slug === "vantage-ecom") {
    return <VantageEcomContent data={data} />;
  }


  if (sections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <Wand2 className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
        <h2 className="text-xl font-bold mb-2">Experience under construction</h2>
        <p className="text-muted-foreground text-sm max-w-xs">We're putting the finishing touches on this service. Please check back shortly.</p>
        <Button variant="link" asChild className="mt-4"><Link href="/services">Back to Services</Link></Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {sections.map((section, idx) => {
        switch (section.type) {
          case "hero":
            return <HeroSection key={section.slug || idx} content={section.content} />;
          case "features":
            return <FeaturesSection key={section.slug || idx} content={section.content} />;
          case "cta":
            return <CTASection key={section.slug || idx} content={section.content} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function HeroSection({ content }: { content: any }) {
  const { title, subtitle, description, image } = content;
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24 border-b border-border">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3 h-3" />
          Premium {subtitle || "Service"}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

function FeaturesSection({ content }: { content: any }) {
  const items = Array.isArray(content?.items) ? content.items : [];
  return (
    <section className="py-24 container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {items.map((item: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ content }: { content: any }) {
  const { title, link, description } = content;
  return (
    <section className="py-32 text-center container mx-auto px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          {title || "Start Your Project"}
        </h2>
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
        <Button size="lg" className="rounded-full px-12 h-14" asChild>
          <Link href={link || "/contact"}>Get Started <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </div>
    </section>
  );
}
