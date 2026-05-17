"use client";

import React, { useEffect, useState } from "react";
import { safeFetch, getApiUrl } from "@/lib/utils";
import { resolveComponent } from "@/lib/cms-registry";

const GenericRenderer: React.FC<{ props: any }> = ({ props }) => (
  <section className="py-20 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 my-8 mx-4">
    <div className="container px-8">
      <pre className="text-[10px] text-slate-500 overflow-auto max-h-64">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  </section>
);

export function DynamicPageContent({ slug }: { slug: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function loadPage() {
      try {
        setLoading(true);
        const res = await safeFetch(getApiUrl(`/api/v1/cms/${slug}`));
        if (!res.ok) throw new Error("Failed to load page content");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-black tracking-widest text-[10px] uppercase italic animate-pulse">
            Accessing Neural Content...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-black italic mb-4">404: SEGMENT MISSING</h1>
          <p className="text-slate-400 mb-8">The neural segment you are looking for does not exist or has been relocated.</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-8 py-3 bg-white text-black font-black italic rounded-full hover:bg-indigo-500 hover:text-white transition-all"
          >
            RETURN TO SOURCE
          </button>
        </div>
      </div>
    );
  }

  const rawComponents = data.components || data;
  
  // Cleanly deduplicate components by ID
  const components = Array.isArray(rawComponents)
    ? rawComponents.filter((comp: any, idx: number, self: any[]) => 
        comp && typeof comp === "object" && comp.id !== undefined
          ? self.findIndex((c: any) => c && c.id === comp.id) === idx
          : true
      )
    : rawComponents;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {Array.isArray(components) ? (
        components.map((comp: any, idx: number) => {
          const Renderer = resolveComponent(comp.name, comp.type) || GenericRenderer;
          
          // Cleanly unwrap nested "props"
          let actualProps = comp.props || {};
          while (actualProps && typeof actualProps === "object" && "props" in actualProps) {
            actualProps = actualProps.props;
          }
          
          return <Renderer key={comp.id || idx} props={actualProps} />;
        })
      ) : (
        Object.entries(components).map(([name, props]: [string, any]) => {
          if (name.startsWith("_")) return null;
          const Renderer = resolveComponent(name) || GenericRenderer;
          
          // Cleanly unwrap nested "props"
          let actualProps = props || {};
          while (actualProps && typeof actualProps === "object" && "props" in actualProps) {
            actualProps = actualProps.props;
          }
          
          return <Renderer key={name} props={actualProps} />;
        })
      )}
    </main>
  );
}
