"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Sparkles, Layout, Zap, Layers, HelpCircle, ShoppingBag, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminServicesPage() {
  const [activeTab, setActiveTab] = useState("navigator");

  const tabs = [
    { id: "navigator", label: "Pages", icon: Layout },
    { id: "hero", label: "Hero", icon: Zap },
    { id: "cards", label: "Highlights", icon: Layers },
    { id: "tiers", label: "Tiers", icon: Sparkles },
    { id: "process", label: "Process", icon: Zap },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "cta", label: "CTA", icon: Send },
  ];

  return (
    <CMSEditor 
      segment="services" 
      title="Services Manager" 
      description="Select a section below to optimize your service presentation."
    >
      {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
        <div className="max-w-6xl mx-auto pb-20">
          
          {/* TAB NAVIGATION */}
          <div className="flex flex-wrap items-center gap-2 mb-12 p-2 bg-slate-900/40 rounded-2xl border border-white/5 backdrop-blur-sm sticky top-24 z-20">
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* INDIVIDUAL PAGE NAVIGATOR */}
            {activeTab === "navigator" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 text-white">Manage Service Contexts</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { name: "Photo Editor", slug: "photo-editor" },
                    { name: "Wedding Plan", slug: "wedding-plan" },
                    { name: "Guru Ji Art", slug: "guru-ji-art" },
                    { name: "Game Design", slug: "game-design" },
                    { name: "Vantage Ecom", slug: "vantage-ecom" },
                    { name: "Clothes Planner", slug: "7-day-clothing-consultation" }
                  ].map((service) => (
                    <Button key={service.slug} variant="secondary" className="bg-white/5 hover:bg-indigo-600/10 border border-white/10 hover:border-indigo-500/30 h-auto py-6 rounded-2xl group transition-all" asChild>
                      <Link href={`/admin/services/${service.slug}`}>
                        <div className="flex flex-col items-center gap-3">
                          <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold group-hover:text-indigo-400">CONFIGURE</div>
                          <div className="text-lg font-bold text-white group-hover:text-white">{service.name}</div>
                        </div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </section>
            )}

            {/* HERO SECTION */}
            {activeTab === "hero" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 text-indigo-300">Hero Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <CMSEditor.Label>Hero Main Title</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                  </div>
                  <div className="md:col-span-2">
                    <CMSEditor.Label>Value Proposition (Description)</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.description} isRich onChange={(v) => handleNestedChange("hero", "description", v)} />
                  </div>
                </div>
              </section>
            )}

            {/* SERVICE CARD HIGHLIGHTS */}
            {activeTab === "cards" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-indigo-300">Service Highlight Cards</h2>
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("cards", "items", { title: "New Highlight", description: "", icon: "Sparkles" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Card
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {(data.cards?.items || []).map((card: any, i: number) => (
                    <div key={i} className="flex gap-6 items-start bg-black/40 p-8 rounded-2xl border border-white/5">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><CMSEditor.Label>Title</CMSEditor.Label><CMSEditor.Input value={card?.title} onChange={(v) => handleArrayChange("cards", "items", i, "title", v)} /></div>
                        <div><CMSEditor.Label>Icon (e.g. Sparkles, Zap)</CMSEditor.Label><CMSEditor.Input value={card?.icon} onChange={(v) => handleArrayChange("cards", "items", i, "icon", v)} /></div>
                        <div className="md:col-span-2"><CMSEditor.Label>Narrative</CMSEditor.Label><CMSEditor.Input value={card?.description} isTextarea onChange={(v) => handleArrayChange("cards", "items", i, "description", v)} /></div>
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => removeArrayItem("cards", "items", i)} className="rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SERVICE TIERS */}
            {activeTab === "tiers" && (
              <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-indigo-300">Service Tiers</h2>
                  <Button onClick={() => addArrayItem("", "tiers", { name: "New Tier", badge: "New", description: "", features: [], icon: "Sparkles" })} className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-4 h-4 mr-2" /> Add Tier
                  </Button>
                </div>
                <div className="space-y-8">
                  {data.tiers?.map((tier: any, i: number) => (
                    <div key={i} className="bg-black/40 p-8 rounded-2xl border border-white/5 relative group">
                      <div className="flex justify-between items-start gap-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                          <CMSEditor.Input value={tier.name} onChange={(v) => handleArrayChange("", "tiers", i, "name", v)} placeholder="Tier Name" />
                          <CMSEditor.Input value={tier.badge} onChange={(v) => handleArrayChange("", "tiers", i, "badge", v)} placeholder="Badge (e.g. Popular)" />
                          <div className="md:col-span-2">
                             <CMSEditor.Input value={tier.description} isRich onChange={(v) => handleArrayChange("", "tiers", i, "description", v)} />
                          </div>
                          <div>
                             <CMSEditor.Label>Features (One per line)</CMSEditor.Label>
                             <CMSEditor.Input value={tier.features?.join("\n") || ""} isTextarea onChange={(v) => handleArrayChange("", "tiers", i, "features", v.split("\n"))} />
                          </div>
                          <div>
                             <CMSEditor.Label>Visual Asset</CMSEditor.Label>
                             <CMSEditor.ImageUpload value={tier.image} onChange={(v) => handleArrayChange("", "tiers", i, "image", v)} />
                          </div>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => removeArrayItem("", "tiers", i)} className="rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/*faq products cta process logic follows the same section-wise tabs pattern... */}
            {activeTab === "process" && (
                <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                   <h2 className="text-2xl font-bold mb-8 text-indigo-300">Delivery Workflow</h2>
                   <div className="space-y-8">
                       <CMSEditor.Input value={data.process?.title} onChange={(v) => handleNestedChange("process", "title", v)} placeholder="Section Title" />
                       <CMSEditor.Input value={data.process?.description} isRich onChange={(v) => handleNestedChange("process", "description", v)} />
                       
                       <div className="pt-8 border-t border-white/5">
                           <div className="flex justify-between items-center mb-6">
                               <h3 className="text-lg font-bold">Workflow Steps</h3>
                               <Button variant="outline" size="sm" onClick={() => addArrayItem("process", "steps", { title: "New Step", desc: "" })}>
                                   <Plus className="w-4 h-4 mr-2" /> Add Step
                               </Button>
                           </div>
                           <div className="grid grid-cols-1 gap-4">
                               {data.process?.steps?.map((step: any, i: number) => (
                                   <div key={i} className="flex gap-4 p-4 bg-muted/10 rounded-xl border border-white/5 items-center">
                                       <CMSEditor.Input value={step.title} onChange={(v) => handleArrayChange("process", "steps", i, "title", v)} placeholder="Step Title" />
                                       <CMSEditor.Input value={step.desc} onChange={(v) => handleArrayChange("process", "steps", i, "desc", v)} placeholder="Description" />
                                       <Button variant="destructive" size="icon" onClick={() => removeArrayItem("process", "steps", i)} className="rounded-lg">
                                           <Trash2 className="w-4 h-4" />
                                       </Button>
                                   </div>
                               ))}
                           </div>
                       </div>
                   </div>
                </section>
            )}

            {activeTab === "faq" && (
               <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold text-indigo-300">Knowledge Base (FAQ)</h2>
                    <Button onClick={() => addArrayItem("", "faq", { q: "New Question", a: "" })} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" /> Add FAQ
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {data.faq?.map((faq: any, i: number) => (
                      <div key={i} className="bg-black/20 p-8 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex justify-between gap-4">
                          <CMSEditor.Input value={faq.q} onChange={(v) => handleArrayChange("", "faq", i, "q", v)} placeholder="The Question" />
                          <Button variant="destructive" size="icon" onClick={() => removeArrayItem("", "faq", i)} className="rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <CMSEditor.Input value={faq.a} isRich onChange={(v) => handleArrayChange("", "faq", i, "a", v)} placeholder="Detailed Spiritual Answer..." />
                      </div>
                    ))}
                  </div>
               </section>
            )}

            {activeTab === "products" && (
               <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold text-indigo-300">Marketplace Products</h2>
                    <Button onClick={() => addArrayItem("", "products", { title: "New Product", price: "₹0", description: "", image: "" })} className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(data.products || []).map((product: any, i: number) => (
                      <div key={i} className="bg-black/40 p-8 rounded-2xl border border-white/5 relative">
                        <div className="flex justify-between items-start gap-6 mb-6">
                           <div className="flex-1 space-y-4">
                              <CMSEditor.Input value={product.title} onChange={(v) => handleArrayChange("", "products", i, "title", v)} placeholder="Product Title" />
                              <CMSEditor.Input value={product.price} onChange={(v) => handleArrayChange("", "products", i, "price", v)} placeholder="Price descriptor" />
                           </div>
                           <Button variant="destructive" size="icon" onClick={() => removeArrayItem("", "products", i)} className="shrink-0 rounded-xl">
                             <Trash2 className="w-4 h-4" />
                           </Button>
                        </div>
                        <CMSEditor.ImageUpload value={product.image} onChange={(v) => handleArrayChange("", "products", i, "image", v)} />
                        <div className="mt-6">
                           <CMSEditor.Input value={product.description} isTextarea onChange={(v) => handleArrayChange("", "products", i, "description", v)} />
                        </div>
                      </div>
                    ))}
                  </div>
               </section>
            )}

            {activeTab === "cta" && (
               <section className="bg-slate-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-8 text-indigo-300">Conversion Focus (CTA)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <CMSEditor.Label>CTA Headline</CMSEditor.Label>
                      <CMSEditor.Input value={data.cta?.title} onChange={(v) => handleNestedChange("cta", "title", v)} />
                    </div>
                    <div>
                      <CMSEditor.Label>Redirect Link</CMSEditor.Label>
                      <CMSEditor.Input value={data.cta?.link} onChange={(v) => handleNestedChange("cta", "link", v)} />
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

