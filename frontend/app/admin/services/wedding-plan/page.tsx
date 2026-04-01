"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { 
  Heart,
  Sparkles, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Zap,
  Layout,
  Gift,
  Send
} from "lucide-react";
import { useState } from "react";

export default function AdminWeddingPlanPage() {
  const [activeTab, setActiveTab] = useState("hero");

  const tabs = [
    { id: "hero", label: "Hero", icon: Zap },
    { id: "heritage", label: "Heritage", icon: Layout },
    { id: "packages", label: "Packages", icon: Gift },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "cta", label: "CTA", icon: Send },
  ];

  return (
    <CMSEditor 
      segment="services/wedding-plan" 
      title="Wedding Masterpiece Manager" 
      description="Refine your luxury wedding service sections independently."
    >
      {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem, handleChange }) => (
        <div className="max-w-4xl mx-auto pb-20 font-sans">
          
          {/* TAB NAVIGATION */}
          <div className="flex flex-wrap items-center gap-2 mb-12 p-1.5 bg-slate-900/40 rounded-2xl border border-white/5 backdrop-blur-sm sticky top-24 z-20">
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* HERO SECTION */}
            {activeTab === "hero" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 text-indigo-300">Hero Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                  <div className="space-y-6">
                    <div>
                      <CMSEditor.Label>Exquisite Badge Text</CMSEditor.Label>
                      <CMSEditor.Input value={data.hero?.badge} onChange={(v) => handleNestedChange("hero", "badge", v)} />
                    </div>
                    <div>
                      <CMSEditor.Label>Main Title Piece</CMSEditor.Label>
                      <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                    </div>
                    <div>
                      <CMSEditor.Label>Title Highlight (Gold)</CMSEditor.Label>
                      <CMSEditor.Input value={data.hero?.title_highlight} onChange={(v) => handleNestedChange("hero", "title_highlight", v)} />
                    </div>
                  </div>
                  <div>
                    <CMSEditor.Label>Hero Masterpiece Image</CMSEditor.Label>
                    <CMSEditor.ImageUpload value={data.hero?.image} onChange={(v) => handleNestedChange("hero", "image", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <CMSEditor.Label>Narrative Pitch</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.description} isTextarea onChange={(v) => handleNestedChange("hero", "description", v)} />
                  </div>
                </div>
              </section>
            )}

            {/* HERITAGE SECTION */}
            {activeTab === "heritage" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 text-indigo-300">The Heritage Story</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                  <div className="space-y-6">
                    <CMSEditor.Input value={data.heritage?.title_prefix} onChange={(v) => handleNestedChange("heritage", "title_prefix", v)} placeholder="Title Prefix" />
                    <CMSEditor.Input value={data.heritage?.title_highlight} onChange={(v) => handleNestedChange("heritage", "title_highlight", v)} placeholder="Title Highlight" />
                    <CMSEditor.ImageUpload value={data.heritage?.image} onChange={(v) => handleNestedChange("heritage", "image", v)} />
                  </div>
                  <div className="space-y-6">
                    <CMSEditor.Input value={data.heritage?.description} isTextarea onChange={(v) => handleNestedChange("heritage", "description", v)} placeholder="The Story..." />
                    <div className="space-y-4">
                      <div className="flex justify-between items-center"><CMSEditor.Label>Core Pillars</CMSEditor.Label></div>
                      {(data.heritage?.features || []).map((feat: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 relative group">
                          <Button variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6 rounded-lg" onClick={() => removeArrayItem("heritage", "features", i)}><Trash2 className="w-3 h-3" /></Button>
                          <div className="flex gap-2">
                             <CMSEditor.Input value={feat.label} onChange={(v) => handleArrayChange("heritage", "features", i, "label", v)} placeholder="Label" />
                             <CMSEditor.Input value={feat.desc} onChange={(v) => handleArrayChange("heritage", "features", i, "desc", v)} placeholder="Desc" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* PACKAGES SECTION */}
            {activeTab === "packages" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-indigo-300">Signature Experiences</h2>
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("", "packages", { name: "New Tier", price: "Starting ₹0", features: [], highlight: false })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Package
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {(data.packages || []).map((pkg: any, i: number) => (
                    <div key={i} className="p-8 rounded-2xl bg-black/40 border border-white/5 relative group text-left">
                       <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 h-8 w-8 rounded-xl" onClick={() => removeArrayItem("", "packages", i)}><Trash2 className="w-3 h-3" /></Button>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <CMSEditor.Input value={pkg.name} onChange={(v) => handleArrayChange("", "packages", i, "name", v)} placeholder="Package Name" />
                         <CMSEditor.Input value={pkg.price} onChange={(v) => handleArrayChange("", "packages", i, "price", v)} placeholder="Starting Price" />
                         <div className="md:col-span-2">
                           <CMSEditor.Label>Features (One per line)</CMSEditor.Label>
                           <CMSEditor.Input value={pkg.features?.join("\n") || ""} isTextarea onChange={(v) => handleArrayChange("", "packages", i, "features", v.split("\n"))} />
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* GALLERY SECTION */}
            {activeTab === "gallery" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-indigo-300">Visual Portfolio</h2>
                  <Button variant="outline" size="sm" onClick={() => { const ng = [...(data.gallery || []), ""]; handleChange("gallery", ng); }}>
                    <Plus className="w-4 h-4 mr-2" /> Add Image
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {(data.gallery || []).map((img: string, i: number) => (
                    <div key={i} className="space-y-2 relative group">
                       <CMSEditor.ImageUpload value={img} onChange={(v) => { const ng = [...data.gallery]; ng[i] = v; handleChange("gallery", ng); }} />
                       <Button variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6 rounded-lg" onClick={() => { const ng = data.gallery.filter((_: any, idx: number) => idx !== i); handleChange("gallery", ng); }}><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA SECTION */}
            {activeTab === "cta" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 text-indigo-300">Conversion Focus</h2>
                <div className="space-y-6 text-left">
                  <CMSEditor.Input value={data.cta?.title} onChange={(v) => handleNestedChange("cta", "title", v)} placeholder="CTA Heading" />
                  <CMSEditor.Input value={data.cta?.button_text} onChange={(v) => handleNestedChange("cta", "button_text", v)} placeholder="Button Label" />
                  <CMSEditor.Input value={data.cta?.description} isTextarea onChange={(v) => handleNestedChange("cta", "description", v)} placeholder="Bottom Narrative..." />
                </div>
              </section>
            )}

          </div>
        </div>
      )}
    </CMSEditor>
  );
}

  );
}
