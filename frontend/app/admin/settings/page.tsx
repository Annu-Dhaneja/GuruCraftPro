"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Globe, 
  Share2, 
  Navigation, 
  Layout, 
  Plus, 
  Trash2, 
  Shield,
  Palette
} from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      <div className="relative mb-12 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border-b border-white/5" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">Global Configuration</h1>
          <p className="text-muted-foreground text-lg max-w-xl mt-4">Architect the core brand identity and site-wide orchestration settings.</p>
        </div>
      </div>

      <CMSEditor 
        segment="site_config" 
        title="Site Core Editor" 
        description="Modify branding, navigation, and global SEO parameters."
      >
        {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
          <div className="space-y-16 max-w-6xl mx-auto text-left">
            
            {/* BRAND IDENTITY */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative group">
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                <Palette className="w-8 h-8 text-indigo-500" /> Brand Identity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <CMSEditor.Label>Company Name</CMSEditor.Label>
                    <CMSEditor.Input value={data.brand?.name} onChange={(v) => handleNestedChange("brand", "name", v)} />
                  </div>
                  <div>
                    <CMSEditor.Label>Logo Text (Fallback)</CMSEditor.Label>
                    <CMSEditor.Input value={data.brand?.logo_text} onChange={(v) => handleNestedChange("brand", "logo_text", v)} />
                  </div>
                </div>
                <div>
                  <CMSEditor.Label>Logo Asset (SVG/PNG)</CMSEditor.Label>
                  <CMSEditor.ImageUpload value={data.brand?.logo_url} onChange={(v) => handleNestedChange("brand", "logo_url", v)} />
                </div>
                <div className="md:col-span-2">
                  <CMSEditor.Label>Brand Tagline</CMSEditor.Label>
                  <CMSEditor.Input value={data.brand?.tagline} isTextarea onChange={(v) => handleNestedChange("brand", "tagline", v)} />
                </div>
              </div>
            </section>

            {/* NAVIGATION ORCHESTRATION */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                  <Navigation className="w-8 h-8 text-emerald-500" /> Navigation Matrix
                </h2>
                <Button onClick={() => addArrayItem("", "nav", { label: "New Link", href: "/", style: "default" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Link
                </Button>
              </div>
              <div className="space-y-4">
                {(data.nav || []).map((item: any, i: number) => (
                  <div key={i} className="p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-center gap-6 relative group">
                    <Button 
                      variant="destructive" size="icon" className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                      onClick={() => removeArrayItem("", "nav", i)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    <div className="flex-1 w-full">
                       <CMSEditor.Label>Label</CMSEditor.Label>
                       <CMSEditor.Input value={item.label} onChange={(v) => handleArrayChange("", "nav", i, "label", v)} />
                    </div>
                    <div className="flex-1 w-full">
                       <CMSEditor.Label>Hyperlink</CMSEditor.Label>
                       <CMSEditor.Input value={item.href} onChange={(v) => handleArrayChange("", "nav", i, "href", v)} />
                    </div>
                    <div className="w-full md:w-48">
                       <CMSEditor.Label>Style Architecture</CMSEditor.Label>
                       <select 
                         value={item.style} 
                         onChange={(e) => handleArrayChange("", "nav", i, "style", e.target.value)}
                         className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                       >
                         <option value="default">Standard</option>
                         <option value="special">Highlighted (Indigo)</option>
                         <option value="guru">Sacred (Orange)</option>
                       </select>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SOCIAL CONNECTIVITY */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4">
                <Share2 className="w-8 h-8 text-pink-500" /> Social Connectivity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.keys(data.social || {}).filter(k => k !== 'accepting_projects').map((platform) => (
                  <div key={platform}>
                    <CMSEditor.Label>{platform.charAt(0).toUpperCase() + platform.slice(1)} URL</CMSEditor.Label>
                    <CMSEditor.Input 
                      value={data.social[platform]} 
                      onChange={(v) => handleNestedChange("social", platform, v)} 
                    />
                  </div>
                ))}
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 lg:col-span-3">
                   <div className="flex-1">
                      <p className="text-sm font-bold text-white">Accepting All New Projects</p>
                      <p className="text-xs text-muted-foreground">Toggles the "Available for work" status across the UI.</p>
                   </div>
                   <input 
                      type="checkbox" 
                      checked={data.social?.accepting_projects} 
                      onChange={(e) => handleNestedChange("social", "accepting_projects", e.target.checked)}
                      className="w-6 h-6 rounded-lg bg-indigo-500"
                   />
                </div>
              </div>
            </section>

            {/* FOOTER ARCHITECTURE */}
            <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4">
                <Layout className="w-8 h-8 text-amber-500" /> Footer Architecture
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <CMSEditor.Label>Explore Cluster</CMSEditor.Label>
                    <Button size="sm" variant="ghost" onClick={() => addArrayItem("", "footer_explore", { label: "New Link", href: "/" })}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  {(data.footer_explore || []).map((lnk: any, i: number) => (
                    <div key={i} className="flex gap-2 items-center">
                      <CMSEditor.Input value={lnk.label} onChange={(v) => handleArrayChange("", "footer_explore", i, "label", v)} />
                      <CMSEditor.Input value={lnk.href} onChange={(v) => handleArrayChange("", "footer_explore", i, "href", v)} />
                      <Button variant="destructive" size="icon" className="flex-shrink-0 h-10 w-10" onClick={() => removeArrayItem("", "footer_explore", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <CMSEditor.Label>Support Cluster</CMSEditor.Label>
                    <Button size="sm" variant="ghost" onClick={() => addArrayItem("", "footer_support", { label: "New Link", href: "/" })}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  {(data.footer_support || []).map((lnk: any, i: number) => (
                    <div key={i} className="flex gap-2 items-center">
                      <CMSEditor.Input value={lnk.label} onChange={(v) => handleArrayChange("", "footer_support", i, "label", v)} />
                      <CMSEditor.Input value={lnk.href} onChange={(v) => handleArrayChange("", "footer_support", i, "href", v)} />
                      <Button variant="destructive" size="icon" className="flex-shrink-0 h-10 w-10" onClick={() => removeArrayItem("", "footer_support", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 pt-10 border-t border-white/5">
                <CMSEditor.Label>Copyright Legal Text</CMSEditor.Label>
                <CMSEditor.Input value={data.footer_bottom?.copyright} onChange={(v) => handleNestedChange("footer_bottom", "copyright", v)} />
              </div>
            </section>

          </div>
        )}
      </CMSEditor>
    </div>
  );
}
