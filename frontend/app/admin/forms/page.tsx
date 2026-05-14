"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Save, Trash2, LayoutList, Settings } from "lucide-react";

export default function FormBuilder() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState<any>(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/v1/forms");
      if (res.ok) setForms(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const createNewForm = () => {
    setActiveForm({
      name: "New Form",
      slug: "new-form",
      is_active: true,
      config: {},
      fields: []
    });
  };

  const addField = () => {
    setActiveForm({
      ...activeForm,
      fields: [...activeForm.fields, { label: "New Field", type: "text", required: false, options: [] }]
    });
  };

  const updateField = (index: number, key: string, val: any) => {
    const updated = [...activeForm.fields];
    updated[index][key] = val;
    setActiveForm({ ...activeForm, fields: updated });
  };

  const removeField = (index: number) => {
    const updated = [...activeForm.fields];
    updated.splice(index, 1);
    setActiveForm({ ...activeForm, fields: updated });
  };

  const saveForm = async () => {
    try {
      const res = await fetchWithAuth("/api/v1/forms", {
        method: "POST",
        body: JSON.stringify(activeForm)
      });
      if (res.ok) {
        alert("Form Saved!");
        loadForms();
        setActiveForm(null);
      }
    } catch (e) { console.error(e); }
  };

  if (loading) return <div className="p-10">Loading forms...</div>;

  return (
    <div className="p-10 flex gap-10 h-full">
      {/* Sidebar List */}
      <div className="w-64 border-r border-white/10 pr-6 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">Forms</h2>
          <Button size="sm" onClick={createNewForm}><Plus className="w-4 h-4" /></Button>
        </div>
        {forms.map(f => (
          <div 
            key={f.id} 
            className={`p-3 rounded-lg cursor-pointer transition-colors ${activeForm?.id === f.id ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/5'}`}
            onClick={() => setActiveForm(f)}
          >
            <div className="font-bold">{f.name}</div>
            <div className="text-xs text-slate-500">/{f.slug}</div>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto pr-6">
        {activeForm ? (
          <div className="space-y-8 pb-20">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-black">Edit Form</h1>
              <Button onClick={saveForm} className="bg-indigo-600"><Save className="w-4 h-4 mr-2"/> Save Form</Button>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><Settings className="w-5 h-5"/> Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400">Form Name</label>
                  <Input className="bg-black/50" value={activeForm.name} onChange={e => setActiveForm({...activeForm, name: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm text-slate-400">URL Slug</label>
                  <Input className="bg-black/50" value={activeForm.slug} onChange={e => setActiveForm({...activeForm, slug: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2"><LayoutList className="w-5 h-5"/> Fields</h3>
                <Button variant="outline" size="sm" onClick={addField}><Plus className="w-4 h-4 mr-2"/> Add Field</Button>
              </div>

              {activeForm.fields?.map((field: any, idx: number) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 flex gap-4 items-start">
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-slate-400">Field Label</label>
                      <Input className="bg-black/50" value={field.label} onChange={e => updateField(idx, 'label', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Type</label>
                      <select 
                        className="w-full h-10 px-3 rounded-md bg-black/50 border border-white/10 text-sm"
                        value={field.type}
                        onChange={e => updateField(idx, 'type', e.target.value)}
                      >
                        <option value="text">Short Text</option>
                        <option value="textarea">Long Text</option>
                        <option value="email">Email</option>
                        <option value="select">Dropdown</option>
                        <option value="checkbox">Checkbox</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <input 
                        type="checkbox" 
                        checked={field.required} 
                        onChange={e => updateField(idx, 'required', e.target.checked)} 
                        className="w-4 h-4 rounded bg-black/50 border-white/10"
                      />
                      <label className="text-sm">Required Field</label>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-red-400 mt-5" onClick={() => removeField(idx)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              {(!activeForm.fields || activeForm.fields.length === 0) && (
                <div className="text-center p-10 border border-dashed border-white/10 rounded-2xl text-slate-500">
                  No fields added yet. Click 'Add Field' to start building.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
            <LayoutList className="w-16 h-16 opacity-20" />
            <p>Select a form from the sidebar or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
