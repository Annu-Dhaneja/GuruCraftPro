"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";

export default function AdminAboutPage() {
  return (
    <CMSEditor 
      segment="about" 
      title="About Page CMS" 
      description="Manage the content of the About Us page."
    >
      {(data, { handleNestedChange }) => (
        <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto pb-20">
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CMSEditor.Label>Badge Text</CMSEditor.Label>
                <CMSEditor.Input value={data.hero?.badge} onChange={(v) => handleNestedChange("hero", "badge", v)} />
              </div>
              <div>
                <CMSEditor.Label>Title Prefix</CMSEditor.Label>
                <CMSEditor.Input value={data.hero?.title_prefix} onChange={(v) => handleNestedChange("hero", "title_prefix", v)} />
              </div>
              <div>
                <CMSEditor.Label>Title Highlight</CMSEditor.Label>
                <CMSEditor.Input value={data.hero?.title_highlight} onChange={(v) => handleNestedChange("hero", "title_highlight", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Hero Story / Description</CMSEditor.Label>
                <CMSEditor.Input value={data.hero?.description} isRich onChange={(v) => handleNestedChange("hero", "description", v)} />
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Founder Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CMSEditor.Label>Founder Name</CMSEditor.Label>
                <CMSEditor.Input value={data.founder?.name} onChange={(v) => handleNestedChange("founder", "name", v)} />
              </div>
              <div>
                <CMSEditor.Label>Founder Title</CMSEditor.Label>
                <CMSEditor.Input value={data.founder?.title} onChange={(v) => handleNestedChange("founder", "title", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Founder Badge</CMSEditor.Label>
                <CMSEditor.Input value={data.founder?.badge} onChange={(v) => handleNestedChange("founder", "badge", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Main Title</CMSEditor.Label>
                <CMSEditor.Input value={data.founder?.main_title} onChange={(v) => handleNestedChange("founder", "main_title", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Main Description</CMSEditor.Label>
                <CMSEditor.Input value={data.founder?.main_description} isRich onChange={(v) => handleNestedChange("founder", "main_description", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Profile Image URL</CMSEditor.Label>
                <CMSEditor.ImageUpload value={data.founder?.image} onChange={(v) => handleNestedChange("founder", "image", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Tags (Comma separated)</CMSEditor.Label>
                <CMSEditor.Input value={data.founder?.tags?.join(", ")} onChange={(v) => handleNestedChange("founder", "tags", v.split(",").map(s => s.trim()))} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Bio Paragraphs (One per line)</CMSEditor.Label>
                <CMSEditor.Input 
                  value={data.founder?.bio?.join("\n") || ""} 
                  isTextarea
                  placeholder="Enter bio paragraphs, each on a new line..."
                  onChange={(v) => handleNestedChange("founder", "bio", v.split("\n"))}
                />
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Philosophy
            </h2>
            <div className="space-y-6">
              <div>
                <CMSEditor.Label>Philosophy Title</CMSEditor.Label>
                <CMSEditor.Input value={data.philosophy?.title} onChange={(v) => handleNestedChange("philosophy", "title", v)} />
              </div>
              <div>
                <CMSEditor.Label>Philosophy Narrative</CMSEditor.Label>
                <CMSEditor.Input value={data.philosophy?.description} isRich onChange={(v) => handleNestedChange("philosophy", "description", v)} />
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Vision & Innovation
            </h2>
            <div className="space-y-6">
              <div>
                <CMSEditor.Label>Section Title</CMSEditor.Label>
                <CMSEditor.Input value={data.ai_human?.title} onChange={(v) => handleNestedChange("ai_human", "title", v)} />
              </div>
              <div>
                <CMSEditor.Label>Section Overview</CMSEditor.Label>
                <CMSEditor.Input value={data.ai_human?.description} isRich onChange={(v) => handleNestedChange("ai_human", "description", v)} />
              </div>
              <div>
                <CMSEditor.Label>Key Value Propositions (One per line)</CMSEditor.Label>
                <CMSEditor.Input 
                  value={data.ai_human?.features?.join("\n") || ""} 
                  isTextarea
                  onChange={(v) => handleNestedChange("ai_human", "features", v.split("\n"))}
                />
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Toolkit & Expertise
            </h2>
            <div className="space-y-6">
              <div>
                <CMSEditor.Label>Tools Title</CMSEditor.Label>
                <CMSEditor.Input value={data.tools?.title} onChange={(v) => handleNestedChange("tools", "title", v)} />
              </div>
              <div>
                <CMSEditor.Label>Tools List (Comma separated)</CMSEditor.Label>
                <CMSEditor.Input value={data.tools?.tools?.join(", ")} onChange={(v) => handleNestedChange("tools", "tools", v.split(",").map(s => s.trim()))} />
              </div>
            </div>
          </section>
        </div>
      )}
    </CMSEditor>
  );
}
