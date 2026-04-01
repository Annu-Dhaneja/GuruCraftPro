"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Plus, 
  Trash2, 
  Layers, 
  Wand2, 
  Shirt, 
  Ruler, 
  BookOpen, 
  Sparkles
} from "lucide-react";
import { useState } from "react";

export default function AdminVantageEcomPage() {
  const [activeTab, setActiveTab] = useState("hero");

  const tabs = [
    { id: "hero", label: "Hero", icon: Zap },
    { id: "category_a", label: "Creative (A)", icon: Layers },
    { id: "category_b", label: "Technical (B)", icon: Shirt },
    { id: "category_c", label: "Strategy (C)", icon: BookOpen },
  ];

  return (
    <CMSEditor 
      segment="vantage-ecom" 
      title="Smart Menu Studio" 
      description="Orchestrate your e-commerce service categories with precision."
    >
      {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
        <div className="max-w-4xl mx-auto pb-20">
          
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
                <div className="space-y-6 text-left">
                  <div><CMSEditor.Label>Main Title</CMSEditor.Label><CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} /></div>
                  <div><CMSEditor.Label>Growth Tagline</CMSEditor.Label><CMSEditor.Input value={data.hero?.subtitle} onChange={(v) => handleNestedChange("hero", "subtitle", v)} /></div>
                  <div><CMSEditor.Label>Elevator Pitch</CMSEditor.Label><CMSEditor.Input value={data.hero?.description} isTextarea onChange={(v) => handleNestedChange("hero", "description", v)} /></div>
                  <div><CMSEditor.Label>Hero Visual Asset</CMSEditor.Label><CMSEditor.ImageUpload value={data.hero?.image} onChange={(v) => handleNestedChange("hero", "image", v)} /></div>
                </div>
              </section>
            )}

            {/* CATEGORY A */}
            {activeTab === "category_a" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-indigo-300">Category A: Creative</h2>
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("category_a", "items", { title: "New Service", description: "", price: "From ₹", icon: "Wand2" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Service
                  </Button>
                </div>
                <div className="space-y-6">
                  {(data.category_a?.items || []).map((item: any, i: number) => (
                    <ServiceItemEditor 
                      key={i} 
                      item={item} 
                      onUpdate={(f, v) => handleArrayChange("category_a", "items", i, f, v)}
                      onRemove={() => removeArrayItem("category_a", "items", i)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* CATEGORY B */}
            {activeTab === "category_b" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-emerald-400">Category B: Technical</h2>
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("category_b", "items", { title: "New Task", description: "", price: "From ₹", icon: "Ruler" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Task
                  </Button>
                </div>
                <div className="space-y-6">
                  {(data.category_b?.items || []).map((item: any, i: number) => (
                    <ServiceItemEditor 
                      key={i} 
                      item={item} 
                      onUpdate={(f, v) => handleArrayChange("category_b", "items", i, f, v)}
                      onRemove={() => removeArrayItem("category_b", "items", i)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* CATEGORY C */}
            {activeTab === "category_c" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-amber-500">Category C: Strategy</h2>
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("category_c", "items", { title: "New Asset", description: "", price: "From ₹", icon: "Zap" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Asset
                  </Button>
                </div>
                <div className="space-y-6">
                  {(data.category_c?.items || []).map((item: any, i: number) => (
                    <ServiceItemEditor 
                      key={i} 
                      item={item} 
                      onUpdate={(f, v) => handleArrayChange("category_c", "items", i, f, v)}
                      onRemove={() => removeArrayItem("category_c", "items", i)}
                    />
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      )}
    </CMSEditor>
  );
}

function ServiceItemEditor({ item, onUpdate, onRemove }: { item: any, onUpdate: (f: string, v: any) => void, onRemove: () => void }) {
  return (
    <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 relative group hover:border-indigo-500/30 transition-all text-left">
      <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-xl" onClick={onRemove}>
        <Trash2 className="w-3 h-3" />
      </Button>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div><CMSEditor.Label>Title</CMSEditor.Label><CMSEditor.Input value={item.title} onChange={(v) => onUpdate("title", v)} /></div>
           <div><CMSEditor.Label>Price</CMSEditor.Label><CMSEditor.Input value={item.price} onChange={(v) => onUpdate("price", v)} /></div>
        </div>
        <div><CMSEditor.Label>Description</CMSEditor.Label><CMSEditor.Input value={item.description} isTextarea onChange={(v) => onUpdate("description", v)} /></div>
        <div>
           <CMSEditor.Label>Visual Metaphor (Icon)</CMSEditor.Label>
           <select value={item.icon} onChange={(e) => onUpdate("icon", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white">
              <option value="Wand2">Magic Wand (Creative)</option>
              <option value="Layers">Layers (Editing)</option>
              <option value="Shirt">Apparel (Shirt)</option>
              <option value="Ruler">Measurement (Ruler)</option>
              <option value="BookOpen">Learning (Book)</option>
              <option value="Zap">Strategy (Bolt)</option>
           </select>
        </div>
      </div>
    </div>
  );
}

