"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminIndividualServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const serviceName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-indigo-400">
           <Sparkles className="w-5 h-5" />
           <span className="font-bold uppercase tracking-widest text-xs">Live Edition</span>
        </div>
      </div>

      <CMSEditor 
        segment={slug} 
        title={`${serviceName} Page CMS`} 
        description={`Manage the content, features, and call-to-action for the ${serviceName} landing page.`}
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
          <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto pb-20">
            
            {/* Hero Section */}
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
                <div>
                  <CMSEditor.Label>Hero Subtitle (Badge Text)</CMSEditor.Label>
                  <CMSEditor.Input value={data.hero?.subtitle} onChange={(v) => handleNestedChange("hero", "subtitle", v)} />
                </div>
                <div className="md:col-span-2">
                  <CMSEditor.Label>Description / Narrative</CMSEditor.Label>
                  <CMSEditor.Input value={data.hero?.description} isRich onChange={(v) => handleNestedChange("hero", "description", v)} />
                </div>
                <div className="md:col-span-2">
                  <CMSEditor.Label>Background/Feature Image URL</CMSEditor.Label>
                  <CMSEditor.ImageUpload value={data.hero?.image} onChange={(v) => handleNestedChange("hero", "image", v)} />
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-emerald-400">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                  Key Features & Highlights
                </h2>
                <Button onClick={() => addArrayItem("", "features", { title: "New Feature", description: "" })} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" /> Add Feature
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(data.features || []).map((feature: any, i: number) => (
                  <div key={i} className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-4 relative group">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeArrayItem("", "features", i)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div>
                      <CMSEditor.Label>Feature Title</CMSEditor.Label>
                      <CMSEditor.Input value={feature.title} onChange={(v) => handleArrayChange("", "features", i, "title", v)} />
                    </div>
                    <div>
                      <CMSEditor.Label>Description</CMSEditor.Label>
                      <CMSEditor.Input value={feature.description} isTextarea onChange={(v) => handleArrayChange("", "features", i, "description", v)} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-pink-400">
                <span className="w-2 h-8 bg-pink-500 rounded-full" />
                Call to Action
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <CMSEditor.Label>Button Text</CMSEditor.Label>
                  <CMSEditor.Input value={data.cta?.title} onChange={(v) => handleNestedChange("cta", "title", v)} />
                </div>
                <div>
                  <CMSEditor.Label>Button Link</CMSEditor.Label>
                  <CMSEditor.Input value={data.cta?.link} onChange={(v) => handleNestedChange("cta", "link", v)} />
                </div>
              </div>
            </section>

          </div>
        )}
      </CMSEditor>
    </div>
  );
}
