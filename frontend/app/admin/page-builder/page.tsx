"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layers, Plus, Save, Trash2, Edit2, GripVertical, Check } from "lucide-react";

export default function PageBuilder() {
  const [pages] = useState(["home", "about", "services", "contact", "vantage-ecom"]);
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPage(selectedPage);
  }, [selectedPage]);

  const loadPage = async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/v1/cms/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPageData(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetchWithAuth(`/api/v1/cms/${selectedPage}`, {
        method: "PUT",
        body: JSON.stringify(pageData)
      });
      if (res.ok) {
        alert("Page Saved Successfully!");
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const handleAddComponent = () => {
    if (!pageData.components) pageData.components = [];
    const newComponents = [...pageData.components, { name: "new_section", type: "hero", props: { title: "New Section" } }];
    setPageData({ ...pageData, components: newComponents });
  };

  const updateComponentProps = (index: number, key: string, value: any) => {
    const updated = [...pageData.components];
    updated[index].props[key] = value;
    setPageData({ ...pageData, components: updated });
  };

  const removeComponent = (index: number) => {
    const updated = [...pageData.components];
    updated.splice(index, 1);
    setPageData({ ...pageData, components: updated });
  };

  if (loading) return <div className="p-10">Loading page data...</div>;

  return (
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black mb-2">Universal Page Builder</h1>
          <p className="text-slate-400">Manage all dynamic website pages from a single interface.</p>
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 text-white"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
          >
            {pages.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
          </select>
          <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700">
            {saving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Page</>}
          </Button>
        </div>
      </div>

      {!pageData?.components ? (
        <div className="p-20 text-center border border-dashed border-white/10 rounded-2xl">
          <Layers className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Components Found</h3>
          <p className="text-slate-500 mb-6">This page might still be using the legacy flat format. Click below to initialize the component array.</p>
          <Button onClick={handleAddComponent}>Initialize V3 Schema</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-xl font-bold">Page SEO & Meta</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400">Page Title</label>
                <Input 
                  className="bg-black/50" 
                  value={pageData.title || ""} 
                  onChange={e => setPageData({...pageData, title: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Meta Description</label>
                <Input 
                  className="bg-black/50" 
                  value={pageData._ssot_meta?.description || ""} 
                  onChange={e => setPageData({...pageData, _ssot_meta: {...pageData._ssot_meta, description: e.target.value}})} 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Page Components</h3>
              <Button onClick={handleAddComponent} size="sm" variant="outline"><Plus className="w-4 h-4 mr-2"/> Add Component</Button>
            </div>
            
            {pageData.components.map((comp: any, idx: number) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 flex gap-6">
                <div className="cursor-move text-slate-600 mt-2">
                  <GripVertical />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                      <Input 
                        className="bg-black/50 w-48 font-bold" 
                        value={comp.name} 
                        onChange={(e) => {
                          const updated = [...pageData.components];
                          updated[idx].name = e.target.value;
                          setPageData({...pageData, components: updated});
                        }}
                      />
                      <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">TYPE: {comp.type}</span>
                    </div>
                    <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => removeComponent(idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
                    {Object.entries(comp.props || {}).map(([key, val]: [string, any]) => (
                      <div key={key}>
                        <label className="text-xs text-slate-400 uppercase tracking-widest mb-1 block">{key}</label>
                        {typeof val === 'string' && val.length > 50 ? (
                          <Textarea 
                            className="bg-black/50 font-mono text-sm" 
                            value={val} 
                            onChange={(e) => updateComponentProps(idx, key, e.target.value)} 
                          />
                        ) : typeof val === 'object' ? (
                          <Textarea 
                            className="bg-black/50 font-mono text-sm text-amber-400 h-32" 
                            value={JSON.stringify(val, null, 2)} 
                            onChange={(e) => {
                              try { updateComponentProps(idx, key, JSON.parse(e.target.value)) } catch(err) {}
                            }} 
                          />
                        ) : (
                          <Input 
                            className="bg-black/50 font-mono text-sm" 
                            value={String(val)} 
                            onChange={(e) => updateComponentProps(idx, key, e.target.value)} 
                          />
                        )}
                      </div>
                    ))}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-4 border-dashed"
                      onClick={() => updateComponentProps(idx, "new_prop", "value")}
                    >
                      <Plus className="w-3 h-3 mr-2" /> Add Property
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
