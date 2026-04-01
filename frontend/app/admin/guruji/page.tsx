"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Eye, 
  Box, 
  Plus, 
  Trash2, 
  ShoppingBag,
  IndianRupee,
  Layout
} from "lucide-react";

export default function AdminGurujiPage() {
  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      <div className="relative mb-12 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border-b border-white/5" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">Guru Ji Darshan Manager</h1>
          <p className="text-muted-foreground text-lg max-w-xl mt-4">Manage the divine AR experience and the spiritual product shop.</p>
        </div>
      </div>

      <CMSEditor 
        segment="guruji" 
        title="Guruji Content Editor" 
        description="Full control over the AR experience descriptions and product catalog."
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem, handleChange }) => (
          <div className="space-y-16 max-w-6xl mx-auto text-left">
            
            {/* HERO SECTION */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group">
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                <Sparkles className="w-8 h-8 text-amber-500" /> Hero Section
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Title Prefix</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero_title_prefix} onChange={(v) => handleChange("hero_title_prefix", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Title Highlight</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero_title_highlight} onChange={(v) => handleChange("hero_title_highlight", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>Hero Subtitle</CMSEditor.Label>
                  <CMSEditor.Input value={data.hero_subtitle} isTextarea onChange={(v) => handleChange("hero_subtitle", v)} />
                </div>
              </div>
            </section>

            {/* AR EXPERIENCE */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4">
                <Eye className="w-8 h-8 text-indigo-500" /> AR Experience Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>AR Title Prefix</CMSEditor.Label>
                    <CMSEditor.Input value={data.ar_title_prefix} onChange={(v) => handleChange("ar_title_prefix", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>AR Title Highlight</CMSEditor.Label>
                    <CMSEditor.Input value={data.ar_title_highlight} onChange={(v) => handleChange("ar_title_highlight", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>AR Subtitle</CMSEditor.Label>
                  <CMSEditor.Input value={data.ar_subtitle} isTextarea onChange={(v) => handleChange("ar_subtitle", v)} />
                </div>
              </div>
            </section>

            {/* SATSANG BOX FEATURE */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4">
                <Box className="w-8 h-8 text-purple-500" /> Satsang Box Feature
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Satsang Title Prefix</CMSEditor.Label>
                    <CMSEditor.Input value={data.satsang_title_prefix} onChange={(v) => handleChange("satsang_title_prefix", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Satsang Title Highlight</CMSEditor.Label>
                    <CMSEditor.Input value={data.satsang_title_highlight} onChange={(v) => handleChange("satsang_title_highlight", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>Satsang Subtitle</CMSEditor.Label>
                  <CMSEditor.Input value={data.satsang_subtitle} isTextarea onChange={(v) => handleChange("satsang_subtitle", v)} />
                </div>
              </div>
            </section>

            {/* PRODUCT SHOP */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                   <ShoppingBag className="w-8 h-8 text-orange-500" /> Spiritual Shop
                 </h2>
                 <Button onClick={() => addArrayItem("", "products", { title: "New Product", description: "", price_inr: "0", image_url: "", buy_link: "/contact" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Product
                 </Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {(data.products || []).map((prod: any, i: number) => (
                   <div key={i} className="p-8 rounded-[2rem] bg-black/40 border border-white/5 relative group hover:border-orange-500/30 transition-all">
                      <Button 
                        variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => removeArrayItem("", "products", i)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                              <CMSEditor.Label>Product Title</CMSEditor.Label>
                              <CMSEditor.Input value={prod.title} onChange={(v) => handleArrayChange("", "products", i, "title", v)} placeholder="e.g. Satsang Box" />
                           </div>
                           <div>
                              <CMSEditor.Label>Price (INR)</CMSEditor.Label>
                              <div className="relative">
                                 <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                                 <CMSEditor.Input value={prod.price_inr} onChange={(v) => handleArrayChange("", "products", i, "price_inr", v)} placeholder="4,999" />
                              </div>
                           </div>
                        </div>
                        <div>
                           <CMSEditor.Label>Description</CMSEditor.Label>
                           <CMSEditor.Input value={prod.description} isTextarea onChange={(v) => handleArrayChange("", "products", i, "description", v)} placeholder="Describe the divine features..." />
                        </div>
                        <div>
                           <CMSEditor.Label>Product Image</CMSEditor.Label>
                           <CMSEditor.ImageUpload value={prod.image_url} onChange={(v) => handleArrayChange("", "products", i, "image_url", v)} />
                        </div>
                        <div>
                           <CMSEditor.Label>Shop/Contact Link</CMSEditor.Label>
                           <CMSEditor.Input value={prod.buy_link} onChange={(v) => handleArrayChange("", "products", i, "buy_link", v)} placeholder="/contact" />
                        </div>
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
