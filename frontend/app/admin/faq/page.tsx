"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function AdminFAQPage() {
  return (
    <CMSEditor 
      segment="faq" 
      title="FAQ CMS" 
      description="Manage frequently asked questions and categories."
    >
      {(data, { handleArrayChange, addArrayItem, removeArrayItem, handleChange }) => {
        const sections = data.sections || [];

        return (
          <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                FAQ Structure
              </h2>
              <Button onClick={() => addArrayItem("", "sections", { category: "New Category", items: [] })} className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" /> Add Category
              </Button>
            </div>

            <div className="space-y-10">
              {sections.map((section: any, sectionIdx: number) => (
                <div key={sectionIdx} className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
                  <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <CMSEditor.Label>Category Name</CMSEditor.Label>
                      <CMSEditor.Input 
                        value={section.category} 
                        onChange={(v) => handleArrayChange("", "sections", sectionIdx, "category", v)}
                      />
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeArrayItem("", "sections", sectionIdx)} className="mt-6">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Questions in this Category</h3>
                      <Button variant="outline" size="sm" onClick={() => {
                        const newItems = [...(section.items || []), { question: "New Question", answer: "" }];
                        handleArrayChange("", "sections", sectionIdx, "items", newItems);
                      }}>
                        <Plus className="w-3 h-3 mr-2" /> Add Question
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {(section.items || []).map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4 hover:border-white/10 transition-colors">
                          <div className="flex justify-between gap-4">
                            <div className="flex-1">
                             <CMSEditor.Label>Question</CMSEditor.Label>
                             <CMSEditor.Input 
                                value={item.question} 
                                onChange={(v) => {
                                  const newItems = [...section.items];
                                  newItems[itemIdx].question = v;
                                  handleArrayChange("", "sections", sectionIdx, "items", newItems);
                                }} 
                             />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => {
                              const newItems = section.items.filter((_: any, i: number) => i !== itemIdx);
                              handleArrayChange("", "sections", sectionIdx, "items", newItems);
                            }} className="mt-6 text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div>
                            <CMSEditor.Label>Answer</CMSEditor.Label>
                            <CMSEditor.Input 
                              value={item.answer} 
                              isRich
                              onChange={(v) => {
                                const newItems = [...section.items];
                                newItems[itemIdx].answer = v;
                                handleArrayChange("", "sections", sectionIdx, "items", newItems);
                              }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </CMSEditor>
  );
}
