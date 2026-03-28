"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function AdminAboutPage() {
  return (
    <CMSEditor 
      segment="about" 
      title="About Page CMS" 
      description="Manage the content of the About Us page."
    >
      {(data, { handleNestedChange, handleArrayChange, handleNestedArrayChange, addArrayItem, removeArrayItem }) => (
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
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div>
                <CMSEditor.Label>Section Title</CMSEditor.Label>
                <CMSEditor.Input value={data.team?.title} onChange={(v) => handleNestedChange("team", "title", v)} />
              </div>
              <div>
                <CMSEditor.Label>Section Subtitle</CMSEditor.Label>
                <CMSEditor.Input value={data.team?.subtitle} onChange={(v) => handleNestedChange("team", "subtitle", v)} />
              </div>
            </div>
            
            <div className="space-y-6">
              {(data.team?.members || []).map((member: any, i: number) => (
                <div key={i} className="bg-slate-900/60 p-6 rounded-2xl border border-white/10 backdrop-blur-md relative group">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute -top-3 -right-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" 
                    onClick={() => removeArrayItem("team", "members", i)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="md:col-span-1">
                      <CMSEditor.Label>Profile Photo</CMSEditor.Label>
                      <CMSEditor.ImageUpload value={member?.image} onChange={(v) => handleArrayChange("team", "members", i, "image", v)} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div><CMSEditor.Label>Name</CMSEditor.Label><CMSEditor.Input value={member?.name} onChange={(v) => handleArrayChange("team", "members", i, "name", v)} /></div>
                        <div><CMSEditor.Label>Role</CMSEditor.Label><CMSEditor.Input value={member?.role} onChange={(v) => handleArrayChange("team", "members", i, "role", v)} /></div>
                      </div>
                      <div>
                        <CMSEditor.Label>Skills (Comma separated)</CMSEditor.Label>
                        <CMSEditor.Input 
                          value={Array.isArray(member?.skills) ? member?.skills.join(", ") : (member?.skills || "")} 
                          onChange={(v) => handleArrayChange("team", "members", i, "skills", v.split(",").map(s => s.trim()))} 
                          placeholder="e.g. Designer, Developer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <CMSEditor.Label>Social Media & Links</CMSEditor.Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2">
                      <div><CMSEditor.Input value={member?.social?.instagram} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "instagram", v)} placeholder="Instagram URL" /></div>
                      <div><CMSEditor.Input value={member?.social?.facebook} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "facebook", v)} placeholder="Facebook URL" /></div>
                      <div><CMSEditor.Input value={member?.social?.github} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "github", v)} placeholder="GitHub URL" /></div>
                      <div><CMSEditor.Input value={member?.social?.linkedin} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "linkedin", v)} placeholder="LinkedIn URL" /></div>
                      <div><CMSEditor.Input value={member?.social?.twitter} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "twitter", v)} placeholder="X / Twitter" /></div>
                      <div><CMSEditor.Input value={member?.social?.threads} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "threads", v)} placeholder="Threads" /></div>
                      <div><CMSEditor.Input value={member?.social?.behance} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "behance", v)} placeholder="Behance" /></div>
                      <div><CMSEditor.Input value={member?.social?.youtube} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "youtube", v)} placeholder="YouTube" /></div>
                      <div><CMSEditor.Input value={member?.social?.website} onChange={(v) => handleNestedArrayChange("team", "members", i, "social", "website", v)} placeholder="Website" /></div>
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full h-16 border-dashed border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-2xl text-muted-foreground hover:text-indigo-400 border-2" 
                onClick={() => addArrayItem("team", "members", { name: "New Member", role: "Specialist", image: "", skills: [], social: {} })}
              >
                <Plus className="w-5 h-5 mr-3" /> Add Team Genius
              </Button>
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

              {/* Added Values Editor */}
              <div className="pt-6">
                <h3 className="text-lg font-medium mb-4 flex justify-between items-center text-indigo-200 uppercase tracking-widest text-xs">
                   Core Values
                   <Button variant="outline" size="sm" onClick={() => addArrayItem("philosophy", "values", { title: "New Value", desc: "", icon: "Heart", color: "text-indigo-500", bg: "bg-indigo-500/10" })}>
                     <Plus className="w-4 h-4 mr-2" /> Add 
                   </Button>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {(data.philosophy?.values || []).map((val: any, i: number) => (
                      <div key={i} className="p-4 bg-black/40 border border-white/10 rounded-xl relative group">
                         <Button variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeArrayItem("philosophy", "values", i)}>
                            <Trash2 className="w-3 h-3" />
                         </Button>
                         <div className="space-y-3">
                            <CMSEditor.Input value={val.title} onChange={(v) => handleArrayChange("philosophy", "values", i, "title", v)} placeholder="Title" />
                            <CMSEditor.Input value={val.desc} isTextarea onChange={(v) => handleArrayChange("philosophy", "values", i, "desc", v)} placeholder="Description" />
                         </div>
                      </div>
                   ))}
                </div>
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
              Toolkit & Discovery Process
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <CMSEditor.Label>Tools Title</CMSEditor.Label>
                  <CMSEditor.Input value={data.tools?.title} onChange={(v) => handleNestedChange("tools", "title", v)} />
                </div>
                <div>
                  <CMSEditor.Label>Tools List (Comma separated)</CMSEditor.Label>
                  <CMSEditor.Input value={data.tools?.tools?.join(", ")} onChange={(v) => handleNestedChange("tools", "tools", v.split(",").map(s => s.trim()))} />
                </div>
              </div>

              {/* Added Steps Editor */}
              <div className="pt-6 border-t border-white/5 mt-6">
                 <h3 className="text-lg font-medium mb-4 flex justify-between items-center text-indigo-200 uppercase tracking-widest text-xs">
                    Workflow Steps
                    <Button variant="outline" size="sm" onClick={() => addArrayItem("tools", "steps", { title: "New Step", desc: "" })}>
                       <Plus className="w-4 h-4 mr-2" /> Add
                    </Button>
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {(data.tools?.steps || []).map((step: any, i: number) => (
                       <div key={i} className="flex gap-4 items-start bg-black/40 border border-white/10 p-4 rounded-xl relative group">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                             <CMSEditor.Input value={step.title} onChange={(v) => handleArrayChange("tools", "steps", i, "title", v)} placeholder="Step Title" />
                             <CMSEditor.Input value={step.desc} onChange={(v) => handleArrayChange("tools", "steps", i, "desc", v)} placeholder="Quick Desc" />
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => removeArrayItem("tools", "steps", i)}>
                             <Trash2 className="w-3 h-3" />
                          </Button>
                       </div>
                    ))}
                 </div>
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Services Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div>
                <CMSEditor.Label>Section Title</CMSEditor.Label>
                <CMSEditor.Input value={data.services_preview?.title} onChange={(v) => handleNestedChange("services_preview", "title", v)} />
              </div>
            </div>
            
            <div className="space-y-4">
              {(data.services_preview?.services || []).map((svc: any, i: number) => (
                <div key={i} className="flex gap-4 items-start bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex-1 space-y-2">
                    <CMSEditor.Input value={svc?.title} onChange={(v) => handleArrayChange("services_preview", "services", i, "title", v)} placeholder="Service Title" />
                    <CMSEditor.Input value={svc?.description} isTextarea onChange={(v) => handleArrayChange("services_preview", "services", i, "description", v)} placeholder="Short description" />
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeArrayItem("services_preview", "services", i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => addArrayItem("services_preview", "services", { title: "New Service", description: "" })}>
                <Plus className="w-4 h-4 mr-2" /> Add Service Preview
              </Button>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Trust Section & Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <CMSEditor.Label>Section Title</CMSEditor.Label>
                <CMSEditor.Input value={data.trust_section?.title} onChange={(v) => handleNestedChange("trust_section", "title", v)} />
              </div>
              <div className="md:col-span-2">
                <CMSEditor.Label>Section Description</CMSEditor.Label>
                <CMSEditor.Input value={data.trust_section?.description} isTextarea onChange={(v) => handleNestedChange("trust_section", "description", v)} />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <h3 className="text-lg font-medium border-l-2 border-indigo-500 pl-4 mb-4">Core Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(data.trust_section?.strengths || []).map((strength: any, i: number) => (
                  <div key={i} className="bg-muted/10 p-4 rounded-xl border border-border group relative">
                    <div className="space-y-4">
                      <CMSEditor.Input value={strength?.title} onChange={(v) => handleArrayChange("trust_section", "strengths", i, "title", v)} placeholder="Title" />
                      <CMSEditor.Input value={strength?.desc} isTextarea onChange={(v) => handleArrayChange("trust_section", "strengths", i, "desc", v)} placeholder="Description" />
                    </div>
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeArrayItem("trust_section", "strengths", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="h-[120px]" onClick={() => addArrayItem("trust_section", "strengths", { title: "New Strength", desc: "" })}>
                  <Plus className="w-4 h-4" /> Add Strength
                </Button>
              </div>

              <h3 className="text-lg font-medium border-l-2 border-indigo-500 pl-4 mb-4">Company Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(data.trust_section?.stats || []).map((stat: any, i: number) => (
                  <div key={i} className="bg-muted/10 p-4 rounded-xl border border-border group relative">
                    <div className="space-y-4">
                      <CMSEditor.Input value={stat?.value} onChange={(v) => handleArrayChange("trust_section", "stats", i, "value", v)} placeholder="Value (e.g. 500+)" />
                      <CMSEditor.Input value={stat?.label} onChange={(v) => handleArrayChange("trust_section", "stats", i, "label", v)} placeholder="Label (e.g. Happy Clients)" />
                    </div>
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeArrayItem("trust_section", "stats", i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addArrayItem("trust_section", "stats", { value: "0", label: "New Stat" })}>
                  <Plus className="w-4 h-4" /> Add Stat
                </Button>
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Call to Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CMSEditor.Label>CTA Title</CMSEditor.Label>
                <CMSEditor.Input value={data.about_cta?.title} onChange={(v) => handleNestedChange("about_cta", "title", v)} />
              </div>
              <div>
                <CMSEditor.Label>Button Link</CMSEditor.Label>
                <CMSEditor.Input value={data.about_cta?.link} onChange={(v) => handleNestedChange("about_cta", "link", v)} />
              </div>
            </div>
          </section>
        </div>
      )}
    </CMSEditor>
  );
}
