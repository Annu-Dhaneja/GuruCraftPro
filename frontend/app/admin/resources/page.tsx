"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, BookOpen, Terminal, Download, PlayCircle, Sparkles } from "lucide-react";

export default function AdminResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      <div className="relative mb-12 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-b border-white/5" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">Resources & Learn</h1>
          <p className="text-muted-foreground text-lg max-w-xl mt-4">Manage tutorials, AI prompts, and free assets for your community.</p>
        </div>
      </div>

      <CMSEditor 
        segment="resources" 
        title="Resources Hub Editor" 
        description="Full control over the educational and asset library."
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
          <div className="space-y-16 max-w-6xl mx-auto text-left">
            
            {/* HERO SECTION */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group">
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                <Sparkles className="w-8 h-8 text-amber-500" /> Hero Section
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Main Title</CMSEditor.Label>
                    <CMSEditor.Input value={data.resources_hero?.title} onChange={(v) => handleNestedChange("resources_hero", "title", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Subtitle Badge</CMSEditor.Label>
                    <CMSEditor.Input value={data.resources_hero?.subtitle} onChange={(v) => handleNestedChange("resources_hero", "subtitle", v)} />
                  </div>
                </div>
                <div>
                    <CMSEditor.Label>Description Narrative</CMSEditor.Label>
                    <CMSEditor.Input value={data.resources_hero?.description} isTextarea onChange={(v) => handleNestedChange("resources_hero", "description", v)} />
                </div>
              </div>
            </section>

            {/* CATEGORIES */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                   <BookOpen className="w-8 h-8 text-indigo-500" /> Content Categories
                 </h2>
                 <Button onClick={() => addArrayItem("resources_categories", "items", { id: "new", name: "New Category", icon: "BookOpen" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Category
                 </Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {(data.resources_categories?.items || []).map((cat: any, i: number) => (
                   <div key={i} className="p-6 rounded-3xl bg-black/40 border border-white/5 relative group">
                      <Button 
                        variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => removeArrayItem("resources_categories", "items", i)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <div className="space-y-4">
                        <CMSEditor.Input value={cat.name} onChange={(v) => handleArrayChange("resources_categories", "items", i, "name", v)} placeholder="Name" />
                        <CMSEditor.Input value={cat.id} onChange={(v) => handleArrayChange("resources_categories", "items", i, "id", v)} placeholder="Slug (e.g. tutorials)" />
                      </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* FEATURED POST */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <h2 className="text-3xl font-bold mb-10 text-white">Featured Masterclass</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <CMSEditor.Label>Featured Title</CMSEditor.Label>
                      <CMSEditor.Input value={data.resources_featured?.post_title} onChange={(v) => handleNestedChange("resources_featured", "post_title", v)} />
                    </div>
                    <div>
                      <CMSEditor.Label>Summary</CMSEditor.Label>
                      <CMSEditor.Input value={data.resources_featured?.description} isTextarea onChange={(v) => handleNestedChange("resources_featured", "description", v)} />
                    </div>
                  </div>
                  <div>
                     <CMSEditor.Label>Visual Asset</CMSEditor.Label>
                     <CMSEditor.ImageUpload value={data.resources_featured?.image} onChange={(v) => handleNestedChange("resources_featured", "image", v)} />
                  </div>
               </div>
            </section>

            {/* PROMPT LIBRARY */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                   <Terminal className="w-8 h-8 text-emerald-500" /> AI Prompt Library
                 </h2>
                 <Button onClick={() => addArrayItem("resources_prompts", "items", { title: "New Prompt", category: "Midjourney" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Prompt
                 </Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {(data.resources_prompts?.items || []).map((p: any, i: number) => (
                   <div key={i} className="p-6 rounded-3xl bg-black/40 border border-white/5 relative group">
                      <Button 
                        variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => removeArrayItem("resources_prompts", "items", i)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <div className="space-y-4">
                        <CMSEditor.Input value={p.title} onChange={(v) => handleArrayChange("resources_prompts", "items", i, "title", v)} placeholder="Prompt Name" />
                        <CMSEditor.Input value={p.category} onChange={(v) => handleArrayChange("resources_prompts", "items", i, "category", v)} placeholder="Platform" />
                      </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* FREE ASSETS */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-10">
                 <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                   <Download className="w-8 h-8 text-pink-500" /> Free Design Assets
                 </h2>
                 <Button onClick={() => addArrayItem("resources_free_resources", "items", { title: "New Asset", type: "PDF" })}>
                   <Plus className="w-4 h-4 mr-2" /> Add Asset
                 </Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {(data.resources_free_resources?.items || []).map((a: any, i: number) => (
                   <div key={i} className="p-6 rounded-3xl bg-black/40 border border-white/5 relative group">
                      <Button 
                        variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => removeArrayItem("resources_free_resources", "items", i)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <div className="space-y-4">
                        <CMSEditor.Input value={a.title} onChange={(v) => handleArrayChange("resources_free_resources", "items", i, "title", v)} placeholder="Asset Name" />
                        <CMSEditor.Input value={a.type} onChange={(v) => handleArrayChange("resources_free_resources", "items", i, "type", v)} placeholder="File Type" />
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
