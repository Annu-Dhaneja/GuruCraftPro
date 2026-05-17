"use client";

import React from "react";
import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Navigation, Palette, Plus, Trash2, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminNavbarConfig() {
  return (
    <div className="min-h-screen bg-slate-950/20 pb-20 text-left">
      <div className="relative mb-12 py-10 overflow-hidden rounded-3xl border border-white/5 bg-slate-900/30">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-[9px] tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full w-fit mb-3">
            <ShieldCheck size={12} /> Global Matrix
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase">Navbar Orchestration</h1>
          <p className="text-slate-400 text-lg max-w-xl mt-3 font-light italic">Architect the core brand logo, taglines, and top navigation header routes.</p>
        </div>
      </div>

      <CMSEditor 
        segment="site_config" 
        title="Navbar Brand & Link Config" 
        description="Modify active header layouts, drop-down link styling, and identity assets."
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
          <div className="space-y-16 max-w-6xl mx-auto">
            
            {/* BRAND IDENTITY */}
            <section className="bg-slate-900/20 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative group">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4 text-white">
                <Palette className="w-8 h-8 text-indigo-500" /> Brand Identity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Company Name</CMSEditor.Label>
                    <CMSEditor.Input value={data.brand?.name} onChange={(v) => handleNestedChange("brand", "name", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Logo Text (Fallback)</CMSEditor.Label>
                    <CMSEditor.Input value={data.brand?.logo_text} onChange={(v) => handleNestedChange("brand", "logo_text", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>Logo Asset (SVG/PNG)</CMSEditor.Label>
                  <CMSEditor.ImageUpload value={data.brand?.logo_url} onChange={(v) => handleNestedChange("brand", "logo_url", v)} />
                </div>
                <div className="md:col-span-2">
                  <CMSEditor.Label>Brand Tagline</CMSEditor.Label>
                  <CMSEditor.Input value={data.brand?.tagline} isTextarea onChange={(v) => handleNestedChange("brand", "tagline", v)} />
                </div>
              </div>
            </section>

            {/* NAVIGATION ORCHESTRATION */}
            <section className="bg-slate-900/20 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white flex items-center gap-4">
                  <Navigation className="w-8 h-8 text-emerald-500" /> Navigation Link Matrix
                </h2>
                <Button 
                  onClick={() => addArrayItem("", "nav", { label: "New Link", href: "/", style: "default" })}
                  className="bg-indigo-600 hover:bg-white hover:text-black font-black text-xs uppercase tracking-wider h-11 px-6 rounded-xl transition-all"
                >
                  Add Nav Link
                </Button>
              </div>
              <div className="space-y-4">
                {(data.nav || []).map((item: any, i: number) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-black/40 border border-white/5 flex flex-col md:flex-row items-center gap-6 relative group transition-all hover:border-indigo-500/20">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-full"
                      onClick={() => removeArrayItem("", "nav", i)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                    <div className="flex-1 w-full">
                       <CMSEditor.Label>Link Name (Label)</CMSEditor.Label>
                       <CMSEditor.Input value={item.label} onChange={(v) => handleArrayChange("", "nav", i, "label", v)} />
                    </div>
                    <div className="flex-1 w-full">
                       <CMSEditor.Label>Hyperlink Destination (Href)</CMSEditor.Label>
                       <CMSEditor.Input value={item.href} onChange={(v) => handleArrayChange("", "nav", i, "href", v)} />
                    </div>
                    <div className="w-full md:w-56">
                       <CMSEditor.Label>Link Accent Style</CMSEditor.Label>
                       <select 
                         value={item.style} 
                         onChange={(e) => handleArrayChange("", "nav", i, "style", e.target.value)}
                         className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-medium h-[46px]"
                       >
                         <option value="default">Standard</option>
                         <option value="special">Highlighted (Indigo)</option>
                         <option value="guru">Sacred (Orange)</option>
                       </select>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}
      </CMSEditor>
    </div>
  );
}
