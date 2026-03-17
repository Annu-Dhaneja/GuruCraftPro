"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function AILabAdminPage() {
    return (
        <CMSEditor
            segment="ai_lab"
            title="AI Design Lab Settings"
            description="Manage the hero section and tool cards for the AI Design Lab page."
        >
            {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
                <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto">
                    <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                            Hero Section
                        </h2>
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <CMSEditor.Label>Title</CMSEditor.Label>
                                <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                            </div>
                            <div>
                                <CMSEditor.Label>Subtitle</CMSEditor.Label>
                                <CMSEditor.Input value={data.hero?.subtitle} onChange={(v) => handleNestedChange("hero", "subtitle", v)} />
                            </div>
                            <div>
                                <CMSEditor.Label>Description</CMSEditor.Label>
                                <CMSEditor.Input isTextarea value={data.hero?.description} onChange={(v) => handleNestedChange("hero", "description", v)} />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
                                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                                AI Tools
                            </h2>
                            <Button 
                                onClick={() => addArrayItem("", "tools", { title: "New Tool", description: "", icon: "Wand2", status: "Coming Soon", color: "text-indigo-400", bg: "bg-indigo-500/10" })}
                                className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add AI Tool
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8">
                            {data.tools?.map((tool: any, i: number) => (
                                <div key={i} className="group bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
                                    <div className="flex flex-col gap-6 relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <CMSEditor.Label>Tool Title</CMSEditor.Label>
                                                <CMSEditor.Input value={tool.title} onChange={(v) => handleArrayChange("", "tools", i, "title", v)} />
                                            </div>
                                            <div>
                                                <CMSEditor.Label>Status (e.g. Active, Beta, Coming Soon)</CMSEditor.Label>
                                                <CMSEditor.Input value={tool.status} onChange={(v) => handleArrayChange("", "tools", i, "status", v)} />
                                            </div>
                                            <div>
                                                <CMSEditor.Label>Icon Name (e.g. PenTool, Image, Box, Wand2, Type, Layout)</CMSEditor.Label>
                                                <CMSEditor.Input value={tool.icon} onChange={(v) => handleArrayChange("", "tools", i, "icon", v)} />
                                            </div>
                                            <div>
                                                <CMSEditor.Label>Color Class (e.g. text-blue-500)</CMSEditor.Label>
                                                <CMSEditor.Input value={tool.color} onChange={(v) => handleArrayChange("", "tools", i, "color", v)} />
                                            </div>
                                            <div>
                                                <CMSEditor.Label>Background Class (e.g. bg-blue-500/10)</CMSEditor.Label>
                                                <CMSEditor.Input value={tool.bg} onChange={(v) => handleArrayChange("", "tools", i, "bg", v)} />
                                            </div>
                                        </div>
                                        <div>
                                            <CMSEditor.Label>Description</CMSEditor.Label>
                                            <CMSEditor.Input isTextarea value={tool.description} onChange={(v) => handleArrayChange("", "tools", i, "description", v)} />
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <Button 
                                            variant="destructive" 
                                            size="icon" 
                                            className="h-10 w-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                            onClick={() => removeArrayItem("", "tools", i)}
                                        >
                                            <Trash2 className="h-5 w-5" />
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
