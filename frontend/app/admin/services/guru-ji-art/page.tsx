"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Palette, 
  History, 
  Sun,
  Flame,
  Award,
  ShoppingBag,
  IndianRupee,
  Layout
} from "lucide-react";

export default function AdminGuruJiArtPage() {
  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      <div className="relative mb-12 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-b border-white/5" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white font-serif italic">Divine Art Studio Orchestration</h1>
          <p className="text-muted-foreground text-lg max-w-xl mt-4 italic font-serif">Curate spiritual visions, sacred masterpieces, and divine collections.</p>
        </div>
      </div>

      <CMSEditor 
        segment="guru-ji-art" 
        title="Divine Studio Manager" 
        description="Manage the hero experience, spiritual story, sacred artworks, and the 'Divine Collection' shop."
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem, handleChange }) => (
          <div className="space-y-16 max-w-6xl mx-auto text-left font-serif">
            
            {/* HERO EXPERIENCE */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group">
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white italic">
                <Sun className="w-8 h-8 text-amber-500" /> Hero Atmosphere
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Studio Subtitle (Badge)</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.subtitle} onChange={(v) => handleNestedChange("hero", "subtitle", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Main Title (Splits into 2 lines)</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>Background Atmosphere (Image)</CMSEditor.Label>
                  <CMSEditor.ImageUpload value={data.hero?.image} onChange={(v) => handleNestedChange("hero", "image", v)} />
                </div>
                <div className="md:col-span-2">
                  <CMSEditor.Label>Spiritual Quote / Description</CMSEditor.Label>
                  <CMSEditor.Input value={data.hero?.description} isTextarea onChange={(v) => handleNestedChange("hero", "description", v)} />
                </div>
              </div>
            </section>

            {/* ARTWORK GALLERY */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4 italic">
                   <Palette className="w-8 h-8 text-amber-400" /> Sacred Masterpieces
                 </h2>
                 <Button onClick={() => addArrayItem("", "artworks", { title: "New Artwork", desc: "Oil on Canvas", src: "" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Artwork
                 </Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {(data.artworks || []).map((art: any, i: number) => (
                   <div key={i} className="p-6 rounded-[2rem] bg-black/40 border border-white/5 relative group transition-all hover:border-amber-500/30">
                      <Button 
                        variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => removeArrayItem("", "artworks", i)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <div className="space-y-4">
                        <CMSEditor.ImageUpload value={art.src} onChange={(v) => handleArrayChange("", "artworks", i, "src", v)} />
                        <CMSEditor.Input value={art.title} onChange={(v) => handleArrayChange("", "artworks", i, "title", v)} placeholder="Title" />
                        <CMSEditor.Input value={art.desc} onChange={(v) => handleArrayChange("", "artworks", i, "desc", v)} placeholder="Dimensions/Medium" />
                      </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* DIVINE COLLECTION SHOP */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4 italic">
                   <ShoppingBag className="w-8 h-8 text-orange-500" /> Divine Collection (Shop)
                 </h2>
                 <Button onClick={() => addArrayItem("", "products", { title: "New Spiritual Offering", description: "", price: "₹0", image: "" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Product
                 </Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {(data.products || []).map((prod: any, i: number) => (
                   <div key={i} className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 relative group transition-all hover:border-orange-500/30">
                      <Button 
                        variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => removeArrayItem("", "products", i)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <CMSEditor.ImageUpload value={prod.image} onChange={(v) => handleArrayChange("", "products", i, "image", v)} />
                        </div>
                        <div className="space-y-4">
                           <CMSEditor.Label>Product Name</CMSEditor.Label>
                           <CMSEditor.Input value={prod.title} onChange={(v) => handleArrayChange("", "products", i, "title", v)} />
                           <CMSEditor.Label>Price Descriptor (INR)</CMSEditor.Label>
                           <CMSEditor.Input value={prod.price} onChange={(v) => handleArrayChange("", "products", i, "price", v)} placeholder="₹9,999" />
                        </div>
                        <div className="md:col-span-2">
                           <CMSEditor.Label>Spiritual Narrative (Description)</CMSEditor.Label>
                           <CMSEditor.Input value={prod.description} isTextarea onChange={(v) => handleArrayChange("", "products", i, "description", v)} />
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* THE LEGACY STORY */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4 italic">
                <History className="w-8 h-8 text-amber-200" /> The Legacy Narrative
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Story Title</CMSEditor.Label>
                    <CMSEditor.Input value={data.story?.title} onChange={(v) => handleNestedChange("story", "title", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Story Narrative</CMSEditor.Label>
                    <CMSEditor.Input value={data.story?.description} isTextarea onChange={(v) => handleNestedChange("story", "description", v)} />
                  </div>
                </div>
                <div className="space-y-6">
                  <CMSEditor.Label>Legacy Image</CMSEditor.Label>
                  <CMSEditor.ImageUpload value={data.story?.image} onChange={(v) => handleNestedChange("story", "image", v)} />
                </div>
              </div>
            </section>

          </div>
        )}
      </CMSEditor>
    </div>
  );
}
