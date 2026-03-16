"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { useState } from "react";

export default function AdminConsultationPage() {
  const [selectedStyle, setSelectedStyle] = useState("Formal");
  const [selectedPhase, setSelectedPhase] = useState("Foundation");

  const styles = ["Formal", "Casual", "Traditional", "Fusion"];
  const phases = ["Foundation", "Comfort", "Statement", "Relaxation"];

  return (
    <CMSEditor 
      segment="consultation" 
      title="Consultation CMS" 
      description="Manage the outfit templates for the 7-Day Clothing Consultation algorithm."
    >
      {(data, { handleArrayChange, handleChange }) => {
        // Safe navigation
        const styleData = data[selectedStyle] || {};
        const phaseItems = styleData[selectedPhase] || [];

        return (
          <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Selectors */}
              <div className="w-full md:w-72 shrink-0 space-y-8">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-4">Target Style</h3>
                  <div className="flex flex-col gap-2">
                    {styles.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedStyle(s)}
                        className={`text-left px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedStyle === s 
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 ring-1 ring-white/20 scale-[1.02]" 
                          : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-4">Target Phase</h3>
                  <div className="flex flex-col gap-2">
                    {phases.map(p => (
                      <button
                        key={p}
                        onClick={() => setSelectedPhase(p)}
                        className={`text-left px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedPhase === p 
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 ring-1 ring-white/20 scale-[1.02]" 
                          : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editor Area */}
              <div className="flex-1 space-y-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
                    <span className="text-indigo-500">{selectedStyle}</span>
                    <span className="w-1 h-6 bg-white/10 rounded-full" />
                    <span className="text-muted-foreground font-medium text-2xl">{selectedPhase}</span>
                  </h2>
                  <div className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                    ALGORITHM TEMPLATES
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {phaseItems.map((item: any, i: number) => (
                    <div key={i} className="group bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl relative">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
                       
                       <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs font-black text-white/30 tracking-widest uppercase">Configuration Template {i + 1}</div>
                        </div>
                        
                        <div>
                          <CMSEditor.Label>Design Title</CMSEditor.Label>
                          <CMSEditor.Input 
                            value={item.title} 
                            onChange={(v) => {
                               const newData = { ...data };
                               newData[selectedStyle][selectedPhase][i].title = v;
                               handleChange("", newData);
                            }} 
                          />
                        </div>
                        <div>
                          <CMSEditor.Label>Stylist Recommendation / Description</CMSEditor.Label>
                          <CMSEditor.Input 
                            value={item.description} 
                            isRich
                            onChange={(v) => {
                               const newData = { ...data };
                               newData[selectedStyle][selectedPhase][i].description = v;
                               handleChange("", newData);
                            }} 
                          />
                        </div>
                        <div>
                          <CMSEditor.Label>Visual Asset Reference</CMSEditor.Label>
                          <CMSEditor.ImageUpload 
                            value={item.image} 
                            onChange={(v) => {
                               const newData = { ...data };
                               newData[selectedStyle][selectedPhase][i].image = v;
                               handleChange("", newData);
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {phaseItems.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                      No templates defined for this combination.
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-xs text-indigo-300 font-medium leading-relaxed">
              <span className="font-bold text-white uppercase mr-2">Algorithm Logic Note:</span>
              The 7-day algorithm utilizes Template 1 for mid-week stabilization and alternates between templates 1 & 2 for peak impact phases. 
              Ensure at least 2 templates are defined for Foundation, Statement, and Relaxation phases for optimal variation.
            </div>
          </div>
        );
      }}
    </CMSEditor>
  );
}
