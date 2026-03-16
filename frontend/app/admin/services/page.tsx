"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function AdminServicesPage() {
  return (
    <CMSEditor 
      segment="services" 
      title="Services CMS" 
      description="Manage service tiers, pricing, and features."
    >
      {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
        <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto pb-20">
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CMSEditor.Label>Hero Title</CMSEditor.Label>
                <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Market Proposition / Description</CMSEditor.Label>
                <CMSEditor.Input value={data.hero?.description} isRich onChange={(v) => handleNestedChange("hero", "description", v)} />
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                Service Tiers
              </h2>
              <Button onClick={() => addArrayItem("", "tiers", { name: "New Tier", badge: "New", description: "", features: [], icon: "Sparkles" })} className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">
                <Plus className="w-4 h-4 mr-2" /> Add Tier
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {data.tiers?.map((tier: any, i: number) => (
                <div key={i} className="group bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl relative">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
                  <div className="flex justify-between items-start gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <CMSEditor.Label>Tier Name</CMSEditor.Label>
                        <CMSEditor.Input value={tier.name} onChange={(v) => handleArrayChange("", "tiers", i, "name", v)} />
                      </div>
                      <div>
                        <CMSEditor.Label>Badge</CMSEditor.Label>
                        <CMSEditor.Input value={tier.badge} onChange={(v) => handleArrayChange("", "tiers", i, "badge", v)} />
                      </div>
                      <div className="md:col-span-2">
                        <CMSEditor.Label>Tier Narrative</CMSEditor.Label>
                        <CMSEditor.Input value={tier.description} isRich onChange={(v) => handleArrayChange("", "tiers", i, "description", v)} />
                      </div>
                      <div>
                        <CMSEditor.Label>Icon (Sparkles, User, PenTool)</CMSEditor.Label>
                        <CMSEditor.Input value={tier.icon} onChange={(v) => handleArrayChange("", "tiers", i, "icon", v)} />
                      </div>
                      <div>
                         <CMSEditor.Label>Image</CMSEditor.Label>
                         <CMSEditor.ImageUpload value={tier.image} onChange={(v) => handleArrayChange("", "tiers", i, "image", v)} />
                      </div>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeArrayItem("", "tiers", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <CMSEditor.Label>Core Features (One per line)</CMSEditor.Label>
                    <CMSEditor.Input 
                      value={tier.features?.join("\n") || ""} 
                      isTextarea
                      onChange={(v) => handleArrayChange("", "tiers", i, "features", v.split("\n"))}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Delivery Process
            </h2>
            <div className="space-y-6">
              <div>
                <CMSEditor.Label>Process Title</CMSEditor.Label>
                <CMSEditor.Input value={data.process?.title} onChange={(v) => handleNestedChange("process", "title", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Process Overview</CMSEditor.Label>
                <CMSEditor.Input value={data.process?.description} isRich onChange={(v) => handleNestedChange("process", "description", v)} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4 flex justify-between items-center">
                  Steps
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("process", "steps", { title: "New Step", desc: "" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Step
                  </Button>
                </h3>
                <div className="space-y-4">
                  {data.process?.steps?.map((step: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start bg-muted/10 p-4 rounded-lg border border-border">
                       <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                         <CMSEditor.Input value={step.title} onChange={(v) => handleArrayChange("process", "steps", i, "title", v)} placeholder="Step Title" />
                         <CMSEditor.Input value={step.desc} onChange={(v) => handleArrayChange("process", "steps", i, "desc", v)} placeholder="Step Description" />
                       </div>
                       <Button variant="destructive" size="icon" onClick={() => removeArrayItem("process", "steps", i)}>
                         <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                Frequently Asked Questions
              </h2>
              <Button onClick={() => addArrayItem("", "faq", { q: "New Question", a: "" })} className="bg-white/10 hover:bg-white/20 text-white border-white/10 px-6">
                <Plus className="w-4 h-4 mr-2" /> Add FAQ
              </Button>
            </div>
            <div className="space-y-6">
              {data.faq?.map((faq: any, i: number) => (
                <div key={i} className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4 hover:border-white/10 transition-colors">
                  <div className="flex justify-between gap-4">
                    <CMSEditor.Input value={faq.q} onChange={(v) => handleArrayChange("", "faq", i, "q", v)} placeholder="Question" />
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("", "faq", i)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CMSEditor.Input value={faq.a} isRich onChange={(v) => handleArrayChange("", "faq", i, "a", v)} placeholder="Detailed Answer..." />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </CMSEditor>
  );
}
