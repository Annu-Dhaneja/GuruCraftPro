"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getApiUrl, safeFetch } from "@/lib/utils";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Globe, Layout, ShoppingCart, BarChart3, Cloud, Box, Layers, Cpu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// ── Dynamic Icon Resolver ──────────────────────────────────────────────
const iconMap: Record<string, any> = {
  ArrowRight, Sparkles, Zap, ShieldCheck, Globe, Layout, ShoppingCart, BarChart3, Cloud, Box, Layers, Cpu,
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name];
  return Icon ? <Icon className={className} /> : <Sparkles className={className} />;
}

// ── COMPONENT RENDERERS ────────────────────────────────────────────────
// Each renderer maps to a component "type" from the CMS.

function HeroRenderer({ props }: { props: any }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-purple-950/30" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {props?.badge && (
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.3em] uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full mb-8">
            {props.badge}
          </span>
        )}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          {props?.title_prefix && <span className="text-white">{props.title_prefix} </span>}
          {props?.title_highlight && <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{props.title_highlight}</span>}
          {props?.headline_prefix && <span className="text-white">{props.headline_prefix} </span>}
          {props?.headline_highlight && <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{props.headline_highlight}</span>}
          {props?.headline_suffix && <span className="text-white">{props.headline_suffix}</span>}
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {props?.description || props?.subheadline || ""}
        </p>
        {props?.stats && (
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {(props.stats as any[]).map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

function FeaturesRenderer({ props }: { props: any }) {
  return (
    <section className="py-24 px-6 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black mb-4">{props?.title || "Features"}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{props?.description || ""}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(props?.items || []).map((item: any, i: number) => (
            <motion.div
              key={i}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:bg-white/[0.04]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <DynamicIcon name={item.icon || "Sparkles"} className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc || item.description || ""}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTARenderer({ props }: { props: any }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-16 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-white/5"
        >
          <h2 className="text-4xl font-black mb-4">
            {props?.title || props?.headline || "Ready to Start?"}
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {props?.description || props?.subtext || ""}
          </p>
          <Link href={props?.cta_link || "/contact"}>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full">
              {props?.cta_text || "Get Started"} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function GenericRenderer({ name, props }: { name?: string; props: any }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">{name}</h3>
          {props?.title && <h2 className="text-3xl font-black mb-4">{props.title}</h2>}
          {props?.description && <p className="text-slate-400 mb-6">{props.description}</p>}
          {props?.quote && (
            <blockquote className="text-2xl font-serif italic text-indigo-300 border-l-4 border-indigo-500 pl-6 my-6">
              {props.quote}
            </blockquote>
          )}
          {props?.badge && !props?.title && (
            <span className="inline-block text-xs font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full mb-4">
              {props.badge}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT REGISTRY ─────────────────────────────────────────────────
const COMPONENT_MAP: Record<string, React.FC<{ props: any }>> = {
  hero: HeroRenderer,
  features: FeaturesRenderer,
  cta: CTARenderer,
};

function resolveRenderer(name: string, type?: string): React.FC<{ props: any; name?: string }> {
  // 1. Check by type
  if (type && COMPONENT_MAP[type]) return COMPONENT_MAP[type];
  // 2. Guess by name
  if (name.includes("hero")) return HeroRenderer;
  if (name.includes("features") || name.includes("categories")) return FeaturesRenderer;
  if (name.includes("cta") || name.includes("newsletter")) return CTARenderer;
  // 3. Fallback
  return GenericRenderer;
}

// ── PAGE COMPONENT ─────────────────────────────────────────────────────
export default function DynamicPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    safeFetch(getApiUrl(`/api/v1/cms/${slug}`))
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Not found");
      })
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setPageData(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 animate-pulse">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black text-white">404</h1>
          <p className="text-slate-400">This page doesn&apos;t exist or has no CMS data.</p>
          <Link href="/">
            <Button variant="outline" className="mt-4">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // The CMS returns flattened data: { hero: {...}, features: {...}, _ssot_meta: {...}, title: "..." }
  const { _ssot_meta, title, ...components } = pageData;

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24">
      {/* Dynamic SEO would go here with next/head in pages router */}
      {Object.entries(components).map(([name, props]: [string, any]) => {
        const Renderer = resolveRenderer(name);
        return <Renderer key={name} props={props} name={name} />;
      })}
    </main>
  );
}
