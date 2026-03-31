"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminIndividualServicePage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const serviceName = slug ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Service";

  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      {/* Premium Header Container */}
      <div className="relative mb-12 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border-b border-white/5" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <Button variant="ghost" asChild className="hover:bg-white/5 -ml-3 text-muted-foreground hover:text-white transition-colors">
                <Link href="/admin/services">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
                  {serviceName}
                </h1>
                <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2">
                   <Sparkles className="w-3 h-3 text-indigo-400" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Advanced CMS</span>
                </div>
              </div>
              <p className="text-muted-foreground text-lg max-w-xl">
                Customize every pixel of the {serviceName} experience. Changes will reflect instantly on the live site.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CMSEditor 
        segment={slug} 
        title={`${serviceName} Experience Editor`} 
        description={`Full control over high-conversion content for ${serviceName}.`}
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
          <div className="space-y-16 max-w-6xl mx-auto">
            
            {/* HERO SECTION: GLASSMORPHIC CARD */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 rounded-full my-10 -ml-1" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-500" />
              
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                Hero Experience
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <CMSEditor.Label>Hero Headline</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} placeholder="e.g. Divine Guru Ji Art" />
                  </div>
                  <div className="space-y-3">
                    <CMSEditor.Label>Experience Badge (Subtitle)</CMSEditor.Label>
                    <CMSEditor.Input value={data.hero?.subtitle} onChange={(v) => handleNestedChange("hero", "subtitle", v)} placeholder="e.g. SACRED MASTERPIECES" />
                  </div>
                </div>
                
                <div className="space-y-3">
                   <CMSEditor.Label>Experience Narrative (Description)</CMSEditor.Label>
                   <CMSEditor.Input 
                    value={data.hero?.description} 
                    isRich 
                    onChange={(v) => handleNestedChange("hero", "description", v)} 
                    placeholder="Tell the story of this service..."
                   />
                </div>
                
                <div className="md:col-span-2 pt-6 border-t border-white/5">
                   <CMSEditor.Label>Primary Background / Feature Visual</CMSEditor.Label>
                   <CMSEditor.ImageUpload value={data.hero?.image} onChange={(v) => handleNestedChange("hero", "image", v)} />
                </div>
              </div>
            </section>

            {/* FEATURES SECTION: DYNAMIC GRID */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-full my-10 -ml-1" />
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/10 blur-[80px] rounded-full group-hover:bg-emerald-600/20 transition-all duration-500" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <h2 className="text-3xl font-bold flex items-center gap-4 text-white">
                  Signature Features
                </h2>
                <Button 
                  onClick={() => addArrayItem("", "features", { title: "New Feature", description: "" })} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-8 py-6 rounded-2xl font-bold h-auto"
                >
                  <Plus className="w-5 h-5 mr-3" /> Add Feature Highlight
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(data.features || []).map((feature: any, i: number) => (
                  <div key={i} className="p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 relative group/feature shadow-xl">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute -top-3 -right-3 rounded-full opacity-0 group-hover/feature:opacity-100 transition-opacity shadow-lg"
                      onClick={() => removeArrayItem("", "features", i)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="space-y-6">
                      <div>
                        <CMSEditor.Label>Feature Name</CMSEditor.Label>
                        <CMSEditor.Input value={feature.title} onChange={(v) => handleArrayChange("", "features", i, "title", v)} placeholder="What's unique?" />
                      </div>
                      <div>
                        <CMSEditor.Label>Benefit Description</CMSEditor.Label>
                        <CMSEditor.Input value={feature.description} isTextarea onChange={(v) => handleArrayChange("", "features", i, "description", v)} placeholder="Explain the value..." />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CALL TO ACTION SECTION */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-pink-500 rounded-full my-10 -ml-1" />
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-600/10 blur-[80px] rounded-full group-hover:bg-pink-600/20 transition-all duration-500" />
               
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                Conversion Point
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <CMSEditor.Label>Action Button Text</CMSEditor.Label>
                  <CMSEditor.Input value={data.cta?.title} onChange={(v) => handleNestedChange("cta", "title", v)} placeholder="e.g. Scale My Brand" />
                </div>
                <div className="space-y-3">
                  <CMSEditor.Label>Action Target URL</CMSEditor.Label>
                  <CMSEditor.Input value={data.cta?.link} onChange={(v) => handleNestedChange("cta", "link", v)} placeholder="e.g. /contact" />
                </div>
              </div>
            </section>

          </div>
        )}
      </CMSEditor>
    </div>
  );
}
