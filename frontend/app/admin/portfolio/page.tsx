"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function AdminPortfolioPage() {
  return (
    <CMSEditor 
      segment="portfolio" 
      title="Portfolio CMS" 
      description="Manage your design portfolio projects and categories."
    >
      {(data, { handleArrayChange, addArrayItem, removeArrayItem, handleChange }) => (
        <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto">
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
              <span className="w-2 h-8 bg-indigo-500 rounded-full" />
              Categories
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {data.categories?.map((cat: string, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 group hover:border-indigo-500/50 transition-all">
                  <span className="text-sm font-medium text-indigo-200">{cat}</span>
                  <button 
                    onClick={() => {
                      const newCats = data.categories.filter((_: any, index: number) => index !== i);
                      handleChange("categories", newCats);
                    }}
                    className="text-indigo-400 hover:text-destructive transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="max-w-md">
              <CMSEditor.Input 
                value="" 
                onChange={(v) => {
                  if (v.endsWith(",")) {
                    const newCat = v.slice(0, -1).trim();
                    if (newCat && !data.categories.includes(newCat)) {
                      handleChange("categories", [...data.categories, newCat]);
                    }
                  }
                }} 
                placeholder="Type category and press comma to add..."
              />
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                Projects
              </h2>
              <Button onClick={() => addArrayItem("", "projects", { id: Date.now().toString(), title: "New Project", category: data.categories[0] || "General", image: "", aiAssisted: false, live_url: "", case_study_url: "", colors: ["#000000"] })} className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {data.projects?.map((project: any, i: number) => (
                <div key={i} className="group bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl overflow-hidden relative">
                   {/* Background Gradient Detail */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />

                   <div className="flex flex-col lg:flex-row gap-10 relative z-10">
                    <div className="flex-1 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <CMSEditor.Label>Project Title</CMSEditor.Label>
                          <CMSEditor.Input value={project.title} onChange={(v) => handleArrayChange("", "projects", i, "title", v)} />
                        </div>
                        <div>
                          <CMSEditor.Label>Category</CMSEditor.Label>
                          <select 
                            value={project.category} 
                            onChange={(e) => handleArrayChange("", "projects", i, "category", e.target.value)}
                            className="flex h-11 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm ring-offset-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 text-white appearance-none cursor-pointer hover:bg-black/60 transition-colors"
                          >
                            {data.categories?.map((cat: string) => (
                              <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                          <input 
                            type="checkbox" 
                            checked={project.aiAssisted} 
                            onChange={(e) => handleArrayChange("", "projects", i, "aiAssisted", e.target.checked)}
                            id={`ai-${i}`}
                            className="w-5 h-5 rounded border-white/10 bg-black/40 text-indigo-600 focus:ring-indigo-500/50"
                          />
                          <label htmlFor={`ai-${i}`} className="text-sm font-semibold text-muted-foreground group-hover:text-indigo-300 transition-colors">AI Assisted Project</label>
                        </div>
                        <div>
                          <CMSEditor.Label>Case Study URL</CMSEditor.Label>
                          <CMSEditor.Input value={project.case_study_url} onChange={(v) => handleArrayChange("", "projects", i, "case_study_url", v)} placeholder="/portfolio/details" />
                        </div>
                        <div>
                          <CMSEditor.Label>Live Preview URL</CMSEditor.Label>
                          <CMSEditor.Input value={project.live_url} onChange={(v) => handleArrayChange("", "projects", i, "live_url", v)} placeholder="https://..." />
                        </div>
                      </div>
                      
                      <div>
                        <CMSEditor.Label>Color Palette</CMSEditor.Label>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {(project.colors || []).map((color: string, colorIdx: number) => (
                            <div key={colorIdx} className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 shadow-sm transition-transform hover:scale-105">
                              <div className="w-4 h-4 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: color }} />
                              <span className="text-[10px] font-mono font-bold text-white/70">{color}</span>
                              <button 
                                onClick={() => {
                                  const newColors = project.colors.filter((_: any, idx: number) => idx !== colorIdx);
                                  handleArrayChange("", "projects", i, "colors", newColors);
                                }}
                                className="text-muted-foreground hover:text-destructive transition-colors ml-1"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="max-w-xs">
                          <CMSEditor.Input 
                            value="" 
                            onChange={(v) => {
                              if (v.endsWith(",")) {
                                const newColor = v.slice(0, -1).trim();
                                if (newColor.startsWith("#")) {
                                  handleArrayChange("", "projects", i, "colors", [...(project.colors || []), newColor]);
                                }
                              }
                            }} 
                            placeholder="#Hex + comma to add"
                          />
                        </div>
                      </div>

                      <div>
                        <CMSEditor.Label>Project Asset</CMSEditor.Label>
                        <CMSEditor.ImageUpload value={project.image} onChange={(v) => handleArrayChange("", "projects", i, "image", v)} />
                      </div>
                    </div>

                    <div className="lg:w-12 flex items-start justify-end lg:justify-center">
                      <Button variant="ghost" size="icon" onClick={() => removeArrayItem("", "projects", i)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-12 w-12">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </CMSEditor>
  );
}
