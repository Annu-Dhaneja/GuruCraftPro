"use client";

import React from "react";
import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Layout, Share2, Plus, Trash2, ShieldCheck, HelpCircle } from "lucide-react";

export default function AdminFooterConfig() {
  return (
    <div className="min-h-screen bg-slate-950/20 pb-20 text-left">
      <div className="relative mb-12 py-10 overflow-hidden rounded-3xl border border-white/5 bg-slate-900/30">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-[9px] tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full w-fit mb-3">
            <ShieldCheck size={12} /> Global Matrix
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase">Footer Configuration</h1>
          <p className="text-slate-400 text-lg max-w-xl mt-3 font-light italic">Architect support pathways, social indices, explore menus, and legal copyright signatures.</p>
        </div>
      </div>

      <CMSEditor 
        segment="site_config" 
        title="Footer Structure Config" 
        description="Modify active footer indices, explorer nodes, and platform social badges."
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
          <div className="space-y-16 max-w-6xl mx-auto">
            
            {/* SOCIAL CONNECTIVITY */}
            <section className="bg-slate-900/20 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 text-white flex items-center gap-4">
                <Share2 className="w-8 h-8 text-indigo-500" /> Social Connectivity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.keys(data.social || {}).filter(k => k !== 'accepting_projects').map((platform) => (
                  <div key={platform}>
                    <CMSEditor.Label>{platform.charAt(0).toUpperCase() + platform.slice(1)} URL</CMSEditor.Label>
                    <CMSEditor.Input 
                      value={data.social[platform]} 
                      onChange={(v) => handleNestedChange("social", platform, v)} 
                    />
                  </div>
                ))}
                
                <div className="flex items-center justify-between gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 md:col-span-2 lg:col-span-4 mt-4">
                   <div className="space-y-1">
                      <p className="text-sm font-black uppercase tracking-wider text-white">Accepting All New Projects</p>
                      <p className="text-xs text-slate-500 font-medium italic">Toggles the global active "Available for work" project badge across the UI footer blocks.</p>
                   </div>
                   <input 
                      type="checkbox" 
                      checked={data.social?.accepting_projects} 
                      onChange={(e) => handleNestedChange("social", "accepting_projects", e.target.checked)}
                      className="w-6 h-6 rounded-lg accent-indigo-500 cursor-pointer"
                   />
                </div>
              </div>
            </section>

            {/* FOOTER EXPLORE & SUPPORT MENUS */}
            <section className="bg-slate-900/20 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 text-white flex items-center gap-4">
                <Layout className="w-8 h-8 text-emerald-500" /> Navigation Clusters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Explore link tree */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <CMSEditor.Label>Explore Menus Cluster</CMSEditor.Label>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => addArrayItem("", "footer_explore", { label: "New Link", href: "/" })}
                      className="h-8 text-[10px] text-indigo-400 font-black uppercase tracking-wider hover:bg-indigo-500/10 rounded-lg px-3"
                    >
                      + Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(data.footer_explore || []).map((lnk: any, i: number) => (
                      <div key={i} className="flex gap-3 items-center bg-black/30 p-4 rounded-2xl border border-white/5 relative group">
                        <div className="flex-1">
                          <CMSEditor.Input value={lnk.label} onChange={(v) => handleArrayChange("", "footer_explore", i, "label", v)} placeholder="Label..." />
                        </div>
                        <div className="flex-1">
                          <CMSEditor.Input value={lnk.href} onChange={(v) => handleArrayChange("", "footer_explore", i, "href", v)} placeholder="Href..." />
                        </div>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-10 w-10 shrink-0 rounded-xl" 
                          onClick={() => removeArrayItem("", "footer_explore", i)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support link tree */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <CMSEditor.Label>Support Menu Cluster</CMSEditor.Label>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => addArrayItem("", "footer_support", { label: "New Link", href: "/" })}
                      className="h-8 text-[10px] text-indigo-400 font-black uppercase tracking-wider hover:bg-indigo-500/10 rounded-lg px-3"
                    >
                      + Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(data.footer_support || []).map((lnk: any, i: number) => (
                      <div key={i} className="flex gap-3 items-center bg-black/30 p-4 rounded-2xl border border-white/5 relative group">
                        <div className="flex-1">
                          <CMSEditor.Input value={lnk.label} onChange={(v) => handleArrayChange("", "footer_support", i, "label", v)} placeholder="Label..." />
                        </div>
                        <div className="flex-1">
                          <CMSEditor.Input value={lnk.href} onChange={(v) => handleArrayChange("", "footer_support", i, "href", v)} placeholder="Href..." />
                        </div>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-10 w-10 shrink-0 rounded-xl" 
                          onClick={() => removeArrayItem("", "footer_support", i)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* copyright footer details */}
              <div className="mt-12 pt-10 border-t border-white/5 space-y-4">
                <CMSEditor.Label>Copyright Legal Text Signature</CMSEditor.Label>
                <CMSEditor.Input value={data.footer_bottom?.copyright} onChange={(v) => handleNestedChange("footer_bottom", "copyright", v)} />
              </div>
            </section>

          </div>
        )}
      </CMSEditor>
    </div>
  );
}
