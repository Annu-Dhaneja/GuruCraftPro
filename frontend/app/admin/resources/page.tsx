"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function ResourcesAdminPage() {
    return (
        <CMSEditor
            segment="resources"
            title="Resources & Learn CMS"
            description="Manage tutorials, prompts, tools, categories, and hero settings."
        >
            {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem, handleChange }) => (
                <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto">
                    <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                            Learn Hero
                        </h2>
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <CMSEditor.Label>Title</CMSEditor.Label>
                                <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                            </div>
                            <div>
                                <CMSEditor.Label>Description</CMSEditor.Label>
                                <CMSEditor.Input isTextarea value={data.hero?.description} onChange={(v) => handleNestedChange("hero", "description", v)} />
                            </div>
                        </div>
                    </section>
                    
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
                                        if (newCat && !data.categories?.includes(newCat)) {
                                            handleChange("categories", [...(data.categories || []), newCat]);
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
                                Tutorials
                            </h2>
                            <Button 
                                onClick={() => addArrayItem("", "tutorials", { title: "New Tutorial", category: "General", duration: "10 mins" })}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add Tutorial
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.tutorials?.map((item: any, i: number) => (
                                <div key={i} className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-xl relative group">
                                    <div className="space-y-4">
                                        <div>
                                            <CMSEditor.Label>Title</CMSEditor.Label>
                                            <CMSEditor.Input value={item.title} onChange={(v) => handleArrayChange("", "tutorials", i, "title", v)} />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <CMSEditor.Label>Category</CMSEditor.Label>
                                                <CMSEditor.Input value={item.category} onChange={(v) => handleArrayChange("", "tutorials", i, "category", v)} />
                                            </div>
                                            <div className="flex-1">
                                                <CMSEditor.Label>Duration</CMSEditor.Label>
                                                <CMSEditor.Input value={item.duration} onChange={(v) => handleArrayChange("", "tutorials", i, "duration", v)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-500/10 hover:text-red-500" onClick={() => removeArrayItem("", "tutorials", i)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
                                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                                Prompt Library
                            </h2>
                            <Button 
                                onClick={() => addArrayItem("", "prompts", { title: "New Prompt", text: "Prompt text here...", style: "Design", image: "" })}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add Prompt
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.prompts?.map((item: any, i: number) => (
                                <div key={i} className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-xl relative group">
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <CMSEditor.Label>Title</CMSEditor.Label>
                                                <CMSEditor.Input value={item.title} onChange={(v) => handleArrayChange("", "prompts", i, "title", v)} />
                                            </div>
                                            <div className="flex-1">
                                                <CMSEditor.Label>Style</CMSEditor.Label>
                                                <CMSEditor.Input value={item.style} onChange={(v) => handleArrayChange("", "prompts", i, "style", v)} />
                                            </div>
                                        </div>
                                        <div>
                                            <CMSEditor.Label>Prompt Text</CMSEditor.Label>
                                            <CMSEditor.Input isTextarea value={item.text} onChange={(v) => handleArrayChange("", "prompts", i, "text", v)} />
                                        </div>
                                        <div>
                                            <CMSEditor.Label>Image Preview</CMSEditor.Label>
                                            <CMSEditor.ImageUpload value={item.image} onChange={(v) => handleArrayChange("", "prompts", i, "image", v)} />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-500/10 hover:text-red-500" onClick={() => removeArrayItem("", "prompts", i)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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
