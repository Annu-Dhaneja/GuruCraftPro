"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function AdminGurujiPage() {
  return (
    <CMSEditor 
      segment="guruji" 
      title="Guruji Darshan CMS" 
      description="Manage the content for Guruji Ke Sakshat Darshan and Satsang Box."
    >
      {(data, { handleNestedChange }) => (
        <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto pb-20">
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-amber-500">
              <span className="w-2 h-8 bg-amber-500 rounded-full" />
              Hero Section (Sakshat Darshan)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CMSEditor.Label>Title Prefix</CMSEditor.Label>
                <CMSEditor.Input value={data?.hero_title_prefix} onChange={(v) => handleNestedChange("", "hero_title_prefix", v)} />
              </div>
              <div>
                <CMSEditor.Label>Title Highlight</CMSEditor.Label>
                <CMSEditor.Input value={data?.hero_title_highlight} onChange={(v) => handleNestedChange("", "hero_title_highlight", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Hero Subtitle</CMSEditor.Label>
                <CMSEditor.Input value={data?.hero_subtitle} isRich onChange={(v) => handleNestedChange("", "hero_subtitle", v)} />
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-emerald-500">
              <span className="w-2 h-8 bg-emerald-500 rounded-full" />
              AR Section (Bringing Blessings)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CMSEditor.Label>Title Prefix</CMSEditor.Label>
                <CMSEditor.Input value={data?.ar_title_prefix} onChange={(v) => handleNestedChange("", "ar_title_prefix", v)} />
              </div>
              <div>
                <CMSEditor.Label>Title Highlight</CMSEditor.Label>
                <CMSEditor.Input value={data?.ar_title_highlight} onChange={(v) => handleNestedChange("", "ar_title_highlight", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>AR Subtitle</CMSEditor.Label>
                <CMSEditor.Input value={data?.ar_subtitle} isRich onChange={(v) => handleNestedChange("", "ar_subtitle", v)} />
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-purple-500">
              <span className="w-2 h-8 bg-purple-500 rounded-full" />
              Satsang Box Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CMSEditor.Label>Title Prefix</CMSEditor.Label>
                <CMSEditor.Input value={data?.satsang_title_prefix} onChange={(v) => handleNestedChange("", "satsang_title_prefix", v)} />
              </div>
              <div>
                <CMSEditor.Label>Title Highlight</CMSEditor.Label>
                <CMSEditor.Input value={data?.satsang_title_highlight} onChange={(v) => handleNestedChange("", "satsang_title_highlight", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Satsang Box Subtitle</CMSEditor.Label>
                <CMSEditor.Input value={data?.satsang_subtitle} isRich onChange={(v) => handleNestedChange("", "satsang_subtitle", v)} />
              </div>
            </div>
          </section>

        </div>
      )}
    </CMSEditor>
  );
}
