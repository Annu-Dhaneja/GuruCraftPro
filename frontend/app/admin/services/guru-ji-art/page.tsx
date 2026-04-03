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
  ShoppingBag,
  Zap,
  BookOpen
} from "lucide-react";
import { useState } from "react";

export default function AdminGuruJiArtPage() {
  const [activeTab, setActiveTab] = useState("hero");

  const tabs = [
    { id: "hero", label: "Hero", icon: Zap },
    { id: "artworks", label: "Artworks", icon: Palette },
    { id: "products", label: "Shop", icon: ShoppingBag },
    { id: "story", label: "Story", icon: BookOpen },
  ];

  return (
    <CMSEditor 
      segment="guru-ji-art" 
      title="Divine Studio Manager" 
      description="Refine your sacred art sections independently."
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
                <h2 className="text-2xl font-bold mb-8 text-indigo-300">Hero Atmosphere</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                  <div className="space-y-6">
                    <div>
                      <CMSEditor.Label>Studio Subtitle</CMSEditor.Label>
                      <CMSEditor.Input value={data.hero?.subtitle} onChange={(v) => handleNestedChange("hero", "subtitle", v)} />
                    </div>
                    <div>
                      <CMSEditor.Label>Main Divine Title</CMSEditor.Label>
                      <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                    </div>
                  </div>
                  <div>
                    <CMSEditor.Label>Atmosphere Image</CMSEditor.Label>
                    <CMSEditor.ImageUpload value={data.hero?.image} onChange={(v) => handleNestedChange("hero", "image", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <CMSEditor.Label>Spiritual Narrative</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.description} isTextarea onChange={(v) => handleNestedChange("hero", "description", v)} />
                  </div>
                </div>
              </section>
            )}

            {/* ARTWORKS SECTION */}
            {activeTab === "artworks" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-indigo-300">Sacred Masterpieces</h2>
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("", "artworks", { title: "New Artwork", desc: "Oil on Canvas", src: "" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Artwork
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(data.artworks || []).map((art: any, i: number) => (
                    <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/5 relative group text-left">
                       <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 h-8 w-8 rounded-xl" onClick={() => removeArrayItem("", "artworks", i)}><Trash2 className="w-3 h-3" /></Button>
                       <div className="space-y-4">
                         <CMSEditor.ImageUpload value={art.src} onChange={(v) => handleArrayChange("", "artworks", i, "src", v)} />
                         <CMSEditor.Input value={art.title} onChange={(v) => handleArrayChange("", "artworks", i, "title", v)} placeholder="Title" />
                         <CMSEditor.Input value={art.desc} onChange={(v) => handleArrayChange("", "artworks", i, "desc", v)} placeholder="Dimensions/Medium" />
                       </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SHOP SECTION */}
            {activeTab === "products" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-orange-500">Divine Collection</h2>
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("", "products", { title: "New Spiritual Offering", slug: "", description: "", price: "₹0", priceType: "Fixed", category: "Guru Ji Art", subCategory: "", tags: "", image: "", status: "active", displayOrder: 99 })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {(data.products || []).map((prod: any, i: number) => (
                    <div key={i} className="p-8 rounded-[2rem] bg-black/40 border border-white/5 relative group hover:border-indigo-500/30 transition-all text-left">
                       <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-xl" onClick={() => removeArrayItem("", "products", i)}>
                         <Trash2 className="w-3 h-3" />
                       </Button>
                       <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                         <div>
                           <CMSEditor.Label>Product Image</CMSEditor.Label>
                           <CMSEditor.ImageUpload value={prod.image} onChange={(v) => handleArrayChange("", "products", i, "image", v)} />
                         </div>
                         <div className="space-y-6">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                               <div><CMSEditor.Label>Title</CMSEditor.Label><CMSEditor.Input value={prod.title} onChange={(v) => handleArrayChange("", "products", i, "title", v)} placeholder="Product Name" /></div>
                               <div><CMSEditor.Label>Slug</CMSEditor.Label><CMSEditor.Input value={prod.slug} onChange={(v) => handleArrayChange("", "products", i, "slug", v)} placeholder="product-slug" /></div>
                               <div><CMSEditor.Label>Price</CMSEditor.Label><CMSEditor.Input value={prod.price} onChange={(v) => handleArrayChange("", "products", i, "price", v)} placeholder="Price (e.g. ₹9,999)" /></div>
                               <div>
                                  <CMSEditor.Label>Price Type</CMSEditor.Label>
                                  <select value={prod.priceType || 'Fixed'} onChange={(e) => handleArrayChange("", "products", i, "priceType", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">
                                     <option value="Fixed">Fixed</option>
                                     <option value="Free">Free</option>
                                     <option value="Subscription">Subscription</option>
                                     <option value="Custom">Custom</option>
                                  </select>
                               </div>
                               <div><CMSEditor.Label>Category</CMSEditor.Label><CMSEditor.Input value={prod.category} onChange={(v) => handleArrayChange("", "products", i, "category", v)} placeholder="Guru Ji Art" /></div>
                               <div><CMSEditor.Label>Sub Category</CMSEditor.Label><CMSEditor.Input value={prod.subCategory} onChange={(v) => handleArrayChange("", "products", i, "subCategory", v)} placeholder="e.g. Digital Content" /></div>
                               <div><CMSEditor.Label>Tags</CMSEditor.Label><CMSEditor.Input value={prod.tags} onChange={(v) => handleArrayChange("", "products", i, "tags", v)} placeholder="spiritual, quotes" /></div>
                               <div>
                                  <CMSEditor.Label>Status</CMSEditor.Label>
                                  <select value={prod.status || 'active'} onChange={(e) => handleArrayChange("", "products", i, "status", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">
                                     <option value="active">Active</option>
                                     <option value="inactive">Inactive</option>
                                  </select>
                               </div>
                               <div className="xl:col-span-2">
                                  <CMSEditor.Label>Display Order</CMSEditor.Label>
                                  <input type="number" value={prod.displayOrder || 0} onChange={(e) => handleArrayChange("", "products", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50" />
                               </div>
                            </div>
                            <div>
                               <CMSEditor.Label>Description</CMSEditor.Label>
                               <CMSEditor.Input value={prod.description} isTextarea onChange={(v) => handleArrayChange("", "products", i, "description", v)} placeholder="Spiritual Narrative..." />
                            </div>
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* STORY SECTION */}
            {activeTab === "story" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 text-indigo-300">The Legacy Narrative</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                  <div className="space-y-6">
                    <CMSEditor.Input value={data.story?.title} onChange={(v) => handleNestedChange("story", "title", v)} placeholder="Story Title" />
                    <CMSEditor.Input value={data.story?.description} isTextarea onChange={(v) => handleNestedChange("story", "description", v)} placeholder="The Legacy Story..." />
                  </div>
                  <div>
                    <CMSEditor.ImageUpload value={data.story?.image} onChange={(v) => handleNestedChange("story", "image", v)} />
                  </div>
                </div>
              </section>
            )}

          </div>
        </div>
      )}
    </CMSEditor>
  );
}
