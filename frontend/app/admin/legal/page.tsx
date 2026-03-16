"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Shield, Scale, ScrollText } from "lucide-react";
import { useState } from "react";

export default function AdminLegalPage() {
  const [selectedPage, setSelectedPage] = useState("privacy");

  const legalPages = [
    { id: "privacy", label: "Privacy Policy", icon: Shield },
    { id: "terms", label: "Terms of Service", icon: Scale },
    { id: "refunds", label: "Refund Policy", icon: ScrollText },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10">
      <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Legal CMS</h1>
          <p className="text-muted-foreground mt-2">Manage documentation and user agreements.</p>
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
          {legalPages.map(page => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page.id)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${selectedPage === page.id 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                : "text-muted-foreground hover:text-white"
              }`}
            >
              <page.icon className="w-4 h-4" />
              {page.label}
            </button>
          ))}
        </div>
      </div>

      <CMSEditor 
        key={selectedPage}
        segment={selectedPage} 
        title={`${capitalize(selectedPage)} Content`}
        description={`Manage the detailed content and timestamps for the ${selectedPage.replace("_", " ")} page.`}
      >
        {(data, { handleChange, handleNestedChange }) => (
          <div className="space-y-12 animate-in fade-in pb-20">
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <CMSEditor.Label>Page Title</CMSEditor.Label>
                  <CMSEditor.Input value={data.title} onChange={(v) => handleChange("title", v)} />
                </div>
                <div className="space-y-2">
                  <CMSEditor.Label>Last Updated Date</CMSEditor.Label>
                  <CMSEditor.Input value={data.last_updated} onChange={(v) => handleChange("last_updated", v)} />
                </div>
              </div>

              <div className="space-y-2">
                <CMSEditor.Label>Legal Body Content (Full HTML/Rich text supported)</CMSEditor.Label>
                <div className="min-h-[500px]">
                  <CMSEditor.Input 
                    value={data.content} 
                    isRich 
                    isTextarea
                    onChange={(v) => handleChange("content", v)} 
                    placeholder="Enter policy content with sections, paragraphs, and lists..."
                  />
                </div>
              </div>
            </section>

            <div className="p-8 bg-amber-500/5 rounded-3xl border border-amber-500/10 text-amber-200/60 text-xs flex items-start gap-4 italic">
              <span className="font-black text-amber-500 uppercase not-italic">Caution:</span>
              Changes to legal documents may have compliance implications. Ensure all content is reviewed by your legal advisor before publishing live.
            </div>
          </div>
        )}
      </CMSEditor>
    </div>
  );
}

// Helper needed as capitalize() is not native JS String method sometimes in older envs
// but for modern TS/JS project we can use it if defined globally or just helper
function capitalize(str: string) {
    return str.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
}
