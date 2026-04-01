"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Plus, 
  Trash2, 
  Layers, 
  Wand2, 
  CheckCircle2, 
  Shirt, 
  Ruler, 
  BookOpen, 
  Sparkles,
  ShoppingBag,
  IndianRupee
} from "lucide-react";

export default function AdminVantageEcomPage() {
  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      <div className="relative mb-12 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border-b border-white/5" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">Vantage E-com Smart Menu</h1>
          <p className="text-muted-foreground text-lg max-w-xl mt-4">Orchestrate categorized e-commerce services and strategic blueprints.</p>
        </div>
      </div>

      <CMSEditor 
        segment="vantage-ecom" 
        title="Smart Menu Editor" 
        description="Manage the 3 core service categories: Creative, Technical, and Strategic Knowledge."
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem, handleChange }) => (
          <div className="space-y-16 max-w-6xl mx-auto text-left">
            
            {/* HERO SECTION */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group">
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                <Sparkles className="w-8 h-8 text-indigo-500" /> Hero Experience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Main Title</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Growth Tagline</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.subtitle} onChange={(v) => handleNestedChange("hero", "subtitle", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>Hero Visual Masterpiece</CMSEditor.Label>
                  <CMSEditor.ImageUpload value={data.hero?.image} onChange={(v) => handleNestedChange("hero", "image", v)} />
                </div>
                <div className="md:col-span-2">
                  <CMSEditor.Label>Elevator Pitch (Description)</CMSEditor.Label>
                  <CMSEditor.Input value={data.hero?.description} isTextarea onChange={(v) => handleNestedChange("hero", "description", v)} />
                </div>
              </div>
            </section>

            {/* CATEGORY A: CREATIVE */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                   <Layers className="w-8 h-8 text-indigo-400" /> Category A: Creative
                 </h2>
                 <Button onClick={() => addArrayItem("category_a", "items", { title: "New Creative Service", description: "", price: "From ₹0", icon: "Wand2" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Service
                 </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(data.category_a?.items || []).map((item: any, i: number) => (
                  <ServiceItemEditor 
                    key={i} 
                    item={item} 
                    onUpdate={(field, val) => handleArrayChange("category_a", "items", i, field, val)}
                    onRemove={() => removeArrayItem("category_a", "items", i)}
                  />
                ))}
              </div>
            </section>

            {/* CATEGORY B: TECHNICAL */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                   <Shirt className="w-8 h-8 text-emerald-400" /> Category B: Technical
                 </h2>
                 <Button onClick={() => addArrayItem("category_b", "items", { title: "New Technical Task", description: "", price: "From ₹0", icon: "Ruler" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Task
                 </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(data.category_b?.items || []).map((item: any, i: number) => (
                  <ServiceItemEditor 
                    key={i} 
                    item={item} 
                    onUpdate={(field, val) => handleArrayChange("category_b", "items", i, field, val)}
                    onRemove={() => removeArrayItem("category_b", "items", i)}
                  />
                ))}
              </div>
            </section>

            {/* CATEGORY C: STRATEGY */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                   <BookOpen className="w-8 h-8 text-amber-500" /> Category C: Strategy
                 </h2>
                 <Button onClick={() => addArrayItem("category_c", "items", { title: "New Strategy Asset", description: "", price: "From ₹0", icon: "Zap" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Asset
                 </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(data.category_c?.items || []).map((item: any, i: number) => (
                  <ServiceItemEditor 
                    key={i} 
                    item={item} 
                    onUpdate={(field, val) => handleArrayChange("category_c", "items", i, field, val)}
                    onRemove={() => removeArrayItem("category_c", "items", i)}
                  />
                ))}
              </div>
            </section>

          </div>
        )}
      </CMSEditor>
    </div>
  );
}

function ServiceItemEditor({ item, onUpdate, onRemove }: { item: any, onUpdate: (f: string, v: any) => void, onRemove: () => void }) {
  return (
    <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 relative group hover:border-indigo-500/30 transition-all">
      <Button 
        variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
        onClick={onRemove}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
              <CMSEditor.Label>Service Title</CMSEditor.Label>
              <CMSEditor.Input value={item.title} onChange={(v) => onUpdate("title", v)} placeholder="e.g. Ghost Mannequin" />
           </div>
           <div>
              <CMSEditor.Label>Price Descriptor</CMSEditor.Label>
              <CMSEditor.Input value={item.price} onChange={(v) => onUpdate("price", v)} placeholder="From ₹499" />
           </div>
        </div>
        <div>
           <CMSEditor.Label>Service Description</CMSEditor.Label>
           <CMSEditor.Input value={item.description} isTextarea onChange={(v) => onUpdate("description", v)} placeholder="Describe the impact..." />
        </div>
        <div>
           <CMSEditor.Label>Visual Metaphor (Icon)</CMSEditor.Label>
           <select 
              value={item.icon} 
              onChange={(e) => onUpdate("icon", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
           >
              <option value="Wand2">Magic Wand (Creative)</option>
              <option value="Layers">Layers (Editing)</option>
              <option value="CheckCircle2">Checkmark (Compliance)</option>
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
