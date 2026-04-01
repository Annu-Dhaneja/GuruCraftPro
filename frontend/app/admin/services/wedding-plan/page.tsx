"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { 
  Heart,
  Ghost,
  Sparkles, 
  History, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Layout,
  Star,
  MapPin,
  Palette,
  Utensils,
  Calendar,
  Gift
} from "lucide-react";

export default function AdminWeddingPlanPage() {
  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      <div className="relative mb-12 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-transparent border-b border-white/5" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white font-serif italic">Wedding Plan Orchestration</h1>
          <p className="text-muted-foreground text-lg max-w-xl mt-4 italic font-serif">Curate the epitome of elegance and luxury for eternal stories.</p>
        </div>
      </div>

      <CMSEditor 
        segment="wedding-plan" 
        title="Wedding Content Studio" 
        description="Manage hero aesthetics, brand heritage, and signature service packages."
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem, handleChange }) => (
          <div className="space-y-16 max-w-6xl mx-auto text-left font-serif">
            
            {/* HERO & BRAND BADGE */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group">
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white italic">
                <Sparkles className="w-8 h-8 text-[#D4AF37]" /> Hero Experience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Exquisite Badge Text</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.badge} onChange={(v) => handleNestedChange("hero", "badge", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Title (e.g. Crafting Your)</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Title Highlight (e.g. Eternal Story)</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.title_highlight} onChange={(v) => handleNestedChange("hero", "title_highlight", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>Background Masterpiece (Image)</CMSEditor.Label>
                  <CMSEditor.ImageUpload value={data.hero?.image} onChange={(v) => handleNestedChange("hero", "image", v)} />
                </div>
                <div className="md:col-span-2">
                  <CMSEditor.Label>Aspirational Description</CMSEditor.Label>
                  <CMSEditor.Input value={data.hero?.description} isTextarea onChange={(v) => handleNestedChange("hero", "description", v)} />
                </div>
              </div>
            </section>

            {/* THE HERITAGE SECTION */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4 italic">
                <Layout className="w-8 h-8 text-rose-400" /> The Heritage Narrative
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Title Prefix</CMSEditor.Label>
                    <CMSEditor.Input value={data.heritage?.title_prefix} onChange={(v) => handleNestedChange("heritage", "title_prefix", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Title Highlight</CMSEditor.Label>
                    <CMSEditor.Input value={data.heritage?.title_highlight} onChange={(v) => handleNestedChange("heritage", "title_highlight", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Heritage Image</CMSEditor.Label>
                    <CMSEditor.ImageUpload value={data.heritage?.image} onChange={(v) => handleNestedChange("heritage", "image", v)} />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Narrative Description</CMSEditor.Label>
                    <CMSEditor.Input value={data.heritage?.description} isTextarea onChange={(v) => handleNestedChange("heritage", "description", v)} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <CMSEditor.Label>Core Pillars (Features)</CMSEditor.Label>
                      {data.heritage?.features?.length < 4 && (
                        <Button size="sm" variant="ghost" onClick={() => addArrayItem("heritage", "features", { icon: "Star", label: "New Pillar", desc: "" })}>
                          <Plus className="w-3 h-3 mr-1" /> Add
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {(data.heritage?.features || []).map((feat: any, i: number) => (
                        <div key={i} className="p-4 rounded-2xl bg-black/40 border border-white/5 relative group">
                           <Button 
                             variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                             onClick={() => removeArrayItem("heritage", "features", i)}
                           >
                             <Trash2 className="w-3 h-3" />
                           </Button>
                           <div className="grid grid-cols-3 gap-3">
                              <select 
                                value={feat.icon} 
                                onChange={(e) => handleArrayChange("heritage", "features", i, "icon", e.target.value)}
                                className="bg-zinc-900 border border-white/10 rounded-lg text-xs p-2 text-white"
                              >
                                <option value="MapPin">Map/Scouting</option>
                                <option value="Palette">Decor/Art</option>
                                <option value="Utensils">Catering</option>
                                <option value="Calendar">Timeline</option>
                                <option value="Star">Star/Elite</option>
                              </select>
                              <CMSEditor.Input value={feat.label} onChange={(v) => handleArrayChange("heritage", "features", i, "label", v)} placeholder="Label" />
                              <CMSEditor.Input value={feat.desc} onChange={(v) => handleArrayChange("heritage", "features", i, "desc", v)} placeholder="Metric/Desc" />
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SIGNATURE PACKAGES */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4 italic">
                   <Gift className="w-8 h-8 text-[#D4AF37]" /> Signature Experiences
                 </h2>
                 <Button onClick={() => addArrayItem("", "packages", { name: "New Tier", price: "Starting ₹0", features: [], highlight: false })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Package
                 </Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {(data.packages || []).map((pkg: any, i: number) => (
                   <div key={i} className={`p-8 rounded-[2.5rem] bg-black/40 border relative group transition-all ${pkg.highlight ? 'border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/5' : 'border-white/5'}`}>
                      <Button 
                        variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => removeArrayItem("", "packages", i)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                           <div className="flex-1">
                              <CMSEditor.Label>Package Name</CMSEditor.Label>
                              <CMSEditor.Input value={pkg.name} onChange={(v) => handleArrayChange("", "packages", i, "name", v)} />
                           </div>
                           <div className="flex items-center gap-2 mt-8 ml-4">
                              <CMSEditor.Label>Highlight</CMSEditor.Label>
                              <input 
                                type="checkbox" 
                                checked={pkg.highlight} 
                                onChange={(e) => handleArrayChange("", "packages", i, "highlight", e.target.checked)}
                                className="w-5 h-5 rounded border-white/10"
                              />
                           </div>
                        </div>
                        <div>
                           <CMSEditor.Label>Price Descriptor</CMSEditor.Label>
                           <CMSEditor.Input value={pkg.price} onChange={(v) => handleArrayChange("", "packages", i, "price", v)} />
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center">
                              <CMSEditor.Label>Exquisite Features</CMSEditor.Label>
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px]" onClick={() => {
                                const newFeatures = [...(pkg.features || []), "New Luxury Perk"];
                                handleArrayChange("", "packages", i, "features", newFeatures);
                              }}>
                                <Plus className="w-2 h-2 mr-1" /> Add Perk
                              </Button>
                           </div>
                           <div className="space-y-2">
                             {(pkg.features || []).map((feat: string, j: number) => (
                               <div key={j} className="flex gap-2 items-center">
                                  <CMSEditor.Input 
                                    value={feat} 
                                    onChange={(v) => {
                                      const newFeatures = [...pkg.features];
                                      newFeatures[j] = v;
                                      handleArrayChange("", "packages", i, "features", newFeatures);
                                    }} 
                                  />
                                  <Button 
                                    variant="ghost" size="icon" className="h-8 w-8 text-rose-500" 
                                    onClick={() => {
                                      const newFeatures = pkg.features.filter((_: any, idx: number) => idx !== j);
                                      handleArrayChange("", "packages", i, "features", newFeatures);
                                    }}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                               </div>
                             ))}
                           </div>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* ARTISTIC GALLERY */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4 italic">
                   <ImageIcon className="w-8 h-8 text-emerald-400" /> Glimpses of Forever (Gallery)
                 </h2>
                 <Button onClick={() => {
                   const newGallery = [...(data.gallery || []), ""];
                   handleChange("gallery", newGallery);
                 }}>
                   <Plus className="w-4 h-4 mr-2" /> Add Image
                 </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(data.gallery || []).map((img: string, i: number) => (
                  <div key={i} className="space-y-2 group relative">
                     <CMSEditor.ImageUpload value={img} onChange={(v) => {
                        const newGallery = [...data.gallery];
                        newGallery[i] = v;
                        handleChange("gallery", newGallery);
                     }} />
                     <Button 
                       variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                       onClick={() => {
                          const newGallery = data.gallery.filter((_: any, idx: number) => idx !== i);
                          handleChange("gallery", newGallery);
                       }}
                     >
                       <Trash2 className="w-3 h-3" />
                     </Button>
                  </div>
                ))}
              </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4 italic">
                <Heart className="w-8 h-8 text-rose-500" /> Final Call to Action
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>CTA Title</CMSEditor.Label>
                    <CMSEditor.Input value={data.cta?.title} onChange={(v) => handleNestedChange("cta", "title", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Button Label</CMSEditor.Label>
                    <CMSEditor.Input value={data.cta?.button_text} onChange={(v) => handleNestedChange("cta", "button_text", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>Closing Narrative</CMSEditor.Label>
                  <CMSEditor.Input value={data.cta?.description} isTextarea onChange={(v) => handleNestedChange("cta", "description", v)} />
                </div>
              </div>
            </section>

          </div>
        )}
      </CMSEditor>
    </div>
  );
}
