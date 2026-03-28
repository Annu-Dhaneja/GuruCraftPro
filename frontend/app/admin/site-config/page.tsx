"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2 } from "lucide-react";
import { getApiUrl } from "@/lib/utils";

const InputLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-semibold text-indigo-300 mb-2 tracking-wide uppercase">{children}</label>
);

const Input = ({ value, onChange, isTextarea = false, placeholder }: { value: string, onChange: (v: string) => void, isTextarea?: boolean, placeholder?: string }) => {
  const className = "flex w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm ring-offset-indigo-500 placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all text-white shadow-inner";
  
  if (isTextarea) {
    return (
      <textarea 
        value={value || ""} 
        onChange={e => onChange(e.target.value)} 
        className={`${className} min-h-[120px] resize-none`} 
        placeholder={placeholder} 
      />
    );
  }
  return <input type="text" value={value || ""} onChange={e => onChange(e.target.value)} className={className} placeholder={placeholder} />;
};

export default function SiteConfigAdmin() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/cms/site_config"), {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch site config data");
      const json = await res.json();
      
      // Initialize with empty arrays if not present
      if (!json.nav) json.nav = [];
      if (!json.footer_explore) json.footer_explore = [];
      if (!json.footer_support) json.footer_support = [];
      if (!json.social) json.social = { accepting_projects: true, instagram: "", dribbble: "", linkedin: "", twitter: "" };
      if (!json.brand) json.brand = { name: "", logo_text: "", tagline: "" };
      if (!json.footer_bottom) json.footer_bottom = { copyright: "" };
      
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/cms/site_config"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to save changes");
      alert("Changes saved successfully! Refresh the page to see updates on the main site.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path: string[], value: any) => {
    setData((prev: any) => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  // Nav Handlers
  const addNavItem = () => {
    setData((prev: any) => ({
      ...prev,
      nav: [...(prev.nav || []), { label: "New Link", href: "/", style: "default" }]
    }));
  };
  
  const updateNavItem = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newNav = [...prev.nav];
      newNav[index] = { ...newNav[index], [field]: value };
      return { ...prev, nav: newNav };
    });
  };
  
  const removeNavItem = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      nav: prev.nav.filter((_: any, i: number) => i !== index)
    }));
  };

  // Footer Link Handlers
  const addFooterExplore = () => {
    setData((prev: any) => ({ ...prev, footer_explore: [...(prev.footer_explore || []), { label: "New Link", href: "/" }] }));
  };
  const updateFooterExplore = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newLinks = [...prev.footer_explore];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, footer_explore: newLinks };
    });
  };
  const removeFooterExplore = (index: number) => {
    setData((prev: any) => ({ ...prev, footer_explore: prev.footer_explore.filter((_: any, i: number) => i !== index) }));
  };

  const addFooterSupport = () => {
    setData((prev: any) => ({ ...prev, footer_support: [...(prev.footer_support || []), { label: "New Link", href: "/" }] }));
  };
  const updateFooterSupport = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newLinks = [...prev.footer_support];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, footer_support: newLinks };
    });
  };
  const removeFooterSupport = (index: number) => {
    setData((prev: any) => ({ ...prev, footer_support: prev.footer_support.filter((_: any, i: number) => i !== index) }));
  };

  if (loading) return <div className="p-8 mt-16 ml-64 text-white">Loading configuration...</div>;
  if (error) return <div className="p-8 mt-16 ml-64 text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-8 mt-16 ml-64 text-white">No data found.</div>;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950 text-white min-h-screen">
      <div className="max-w-4xl mx-auto pb-32">
        <div className="flex items-center justify-between mb-8 bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-xl sticky top-4 z-10 shadow-2xl">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Site Configuration</h1>
            <p className="text-muted-foreground mt-1">Manage global navigation, footer, and brand settings</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 px-8 rounded-full h-12">
            <Save className="w-5 h-5 mr-3" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="space-y-12">
          {/* Brand Info section */}
          <section className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">1</span>
              Brand Identity
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div><InputLabel>Brand Name</InputLabel><Input value={data.brand?.name} onChange={v => updateField(["brand", "name"], v)} /></div>
              <div><InputLabel>Logo Text</InputLabel><Input value={data.brand?.logo_text} onChange={v => updateField(["brand", "logo_text"], v)} /></div>
              <div className="md:col-span-2 lg:col-span-3"><InputLabel>Tagline</InputLabel><Input value={data.brand?.tagline} onChange={v => updateField(["brand", "tagline"], v)} /></div>
            </div>
          </section>

          {/* Social Links section */}
          <section className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 shadow-xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-sm">2</span>
              Social Links & Status
            </h2>
            <div className="mb-6 flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 w-fit">
              <input 
                type="checkbox" 
                checked={data.social?.accepting_projects || false} 
                onChange={e => updateField(["social", "accepting_projects"], e.target.checked)}
                className="w-5 h-5 rounded border-white/10 bg-black/40 text-indigo-500 focus:ring-indigo-500/50"
              />
              <span className="font-medium text-white">Show "Accepting New Projects" badge in footer</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div><InputLabel>Instagram URL</InputLabel><Input value={data.social?.instagram} onChange={v => updateField(["social", "instagram"], v)} placeholder="https://instagram.com/..." /></div>
              <div><InputLabel>Facebook URL</InputLabel><Input value={data.social?.facebook} onChange={v => updateField(["social", "facebook"], v)} placeholder="https://facebook.com/..." /></div>
              <div><InputLabel>Twitter/X URL</InputLabel><Input value={data.social?.twitter} onChange={v => updateField(["social", "twitter"], v)} placeholder="https://twitter.com/..." /></div>
              <div><InputLabel>LinkedIn URL</InputLabel><Input value={data.social?.linkedin} onChange={v => updateField(["social", "linkedin"], v)} placeholder="https://linkedin.com/..." /></div>
              <div><InputLabel>GitHub URL</InputLabel><Input value={data.social?.github} onChange={v => updateField(["social", "github"], v)} placeholder="https://github.com/..." /></div>
              <div><InputLabel>Threads URL</InputLabel><Input value={data.social?.threads} onChange={v => updateField(["social", "threads"], v)} placeholder="https://threads.net/..." /></div>
              <div><InputLabel>Behance URL</InputLabel><Input value={data.social?.behance} onChange={v => updateField(["social", "behance"], v)} placeholder="https://behance.net/..." /></div>
              <div><InputLabel>YouTube URL</InputLabel><Input value={data.social?.youtube} onChange={v => updateField(["social", "youtube"], v)} placeholder="https://youtube.com/..." /></div>
              <div><InputLabel>WhatsApp Number/URL</InputLabel><Input value={data.social?.whatsapp} onChange={v => updateField(["social", "whatsapp"], v)} placeholder="https://wa.me/91..." /></div>
              <div><InputLabel>Dribbble URL</InputLabel><Input value={data.social?.dribbble} onChange={v => updateField(["social", "dribbble"], v)} placeholder="https://dribbble.com/..." /></div>
            </div>
          </section>

          {/* Navigation Items */}
          <section className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">3</span>
                Top Navigation Links
              </h2>
              <Button onClick={addNavItem} variant="outline" className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10">
                <Plus className="w-4 h-4 mr-2" /> Add Link
              </Button>
            </div>
            <div className="space-y-4">
              {data.nav.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-black/30 rounded-xl border border-white/5">
                  <div className="grid gap-4 flex-1 md:grid-cols-3">
                    <div>
                      <InputLabel>Label</InputLabel>
                      <Input value={item.label} onChange={v => updateNavItem(i, "label", v)} />
                    </div>
                    <div>
                      <InputLabel>URL Context (href)</InputLabel>
                      <Input value={item.href} onChange={v => updateNavItem(i, "href", v)} />
                    </div>
                    <div>
                      <InputLabel>Style Theme</InputLabel>
                      <select 
                        value={item.style || "default"} 
                        onChange={e => updateNavItem(i, "style", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white"
                      >
                        <option value="default">Default</option>
                        <option value="special">Special (Gradient/Indigo)</option>
                        <option value="guru">Guru (Amber/Bold)</option>
                      </select>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeNavItem(i)} className="mt-8 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Links */}
          <div className="grid gap-12 lg:grid-cols-2">
            <section className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Footer: Explore</h2>
                <Button onClick={addFooterExplore} variant="secondary" size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-3">
                {data.footer_explore.map((item: any, i: number) => (
                  <div key={i} className="flex gap-3 items-center">
                    <Input value={item.label} onChange={v => updateFooterExplore(i, "label", v)} placeholder="Label" />
                    <Input value={item.href} onChange={v => updateFooterExplore(i, "href", v)} placeholder="/URL" />
                    <Button variant="ghost" size="icon" onClick={() => removeFooterExplore(i)} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Footer: Support</h2>
                <Button onClick={addFooterSupport} variant="secondary" size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-3">
                {data.footer_support.map((item: any, i: number) => (
                  <div key={i} className="flex gap-3 items-center">
                    <Input value={item.label} onChange={v => updateFooterSupport(i, "label", v)} placeholder="Label" />
                    <Input value={item.href} onChange={v => updateFooterSupport(i, "href", v)} placeholder="/URL" />
                    <Button variant="ghost" size="icon" onClick={() => removeFooterSupport(i)} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <section className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 shadow-xl">
            <h2 className="text-xl font-bold mb-6">Footer Text</h2>
            <div><InputLabel>Copyright Text</InputLabel><Input value={data.footer_bottom?.copyright} onChange={v => updateField(["footer_bottom", "copyright"], v)} placeholder="© 2026 Brand. All rights reserved." /></div>
          </section>

        </div>
      </div>
    </div>
  );
}
