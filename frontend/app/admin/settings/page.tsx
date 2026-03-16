"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { 
  Settings, 
  Share2, 
  Mail, 
  Search, 
  ShieldCheck,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github
} from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <CMSEditor 
      segment="settings" 
      title="General Settings" 
      description="Control global site parameters, socials, and contact intelligence."
    >
      {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
        <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto pb-20">
          
          {/* Site Identity */}
          <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/5 blur-3xl rounded-full -ml-32 -mt-32 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            
            <h2 className="text-3xl font-black mb-10 flex items-center gap-4 text-white relative z-10">
              <Globe className="text-indigo-500 w-8 h-8" />
              Strategic Identity
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-2">
                <CMSEditor.Label>Platform Brand Name</CMSEditor.Label>
                <CMSEditor.Input 
                  value={data.site_name || ""} 
                  onChange={(v) => handleNestedChange("", "site_name", v)} 
                  placeholder="e.g. Gurucraftpro Analytics"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <CMSEditor.Label>Global SEO Meta Description</CMSEditor.Label>
                <CMSEditor.Input 
                  value={data.meta_description || ""} 
                  isTextarea
                  onChange={(v) => handleNestedChange("", "meta_description", v)} 
                  placeholder="High-level site intelligence for search engines..."
                />
              </div>
            </div>
          </section>

          {/* Contact Directives */}
          <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600/5 blur-3xl rounded-full -mr-32 -mb-32 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            
            <h2 className="text-3xl font-black mb-10 flex items-center gap-4 text-white relative z-10">
              <Mail className="text-emerald-500 w-8 h-8" />
              Contact Communications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-2">
                <CMSEditor.Label>Support Intelligence Email</CMSEditor.Label>
                <CMSEditor.Input 
                  value={data.contact_email || ""} 
                  onChange={(v) => handleNestedChange("", "contact_email", v)} 
                />
              </div>
              <div className="space-y-2">
                <CMSEditor.Label>Direct Telecom Number</CMSEditor.Label>
                <CMSEditor.Input 
                  value={data.contact_phone || ""} 
                  onChange={(v) => handleNestedChange("", "contact_phone", v)} 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <CMSEditor.Label>Operational Headquarters Address</CMSEditor.Label>
                <CMSEditor.Input 
                  value={data.address || ""} 
                  onChange={(v) => handleNestedChange("", "address", v)} 
                />
              </div>
            </div>
          </section>

          {/* Social Presence Matrix */}
          <section className="bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <h2 className="text-3xl font-black mb-10 flex items-center gap-4 text-white relative z-10">
              <Share2 className="text-amber-500 w-8 h-8" />
              Social Presence Matrix
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {[
                { key: "facebook", icon: Facebook, label: "Facebook Page" },
                { key: "twitter", icon: Twitter, label: "Twitter / X Profile" },
                { key: "instagram", icon: Instagram, label: "Instagram Grid" },
                { key: "linkedin", icon: Linkedin, label: "LinkedIn Company" },
                { key: "github", icon: Github, label: "GitHub Repository" },
              ].map((social) => (
                <div key={social.key} className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4 hover:border-amber-500/20 transition-all group/card">
                  <div className="flex items-center gap-3">
                    <social.icon className="w-5 h-5 text-amber-500/50 group-hover/card:text-amber-500 transition-colors" />
                    <span className="text-xs font-black uppercase tracking-widest text-white/60">{social.label}</span>
                  </div>
                  <CMSEditor.Input 
                    value={data.social_links?.[social.key] || ""} 
                    onChange={(v) => {
                      const newSocials = { ...data.social_links, [social.key]: v };
                      handleNestedChange("", "social_links", newSocials);
                    }} 
                    placeholder="https://..."
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Maintenance & Security */}
          <section className="p-10 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
             <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/5">
                   <ShieldCheck className="text-indigo-400 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">System Calibration</h3>
                  <p className="text-sm text-muted-foreground mt-1">Maintain platform integrity and operational security.</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase text-indigo-400">Security Key</p>
                  <p className="text-xs font-mono text-white/40">••••••••••••••••</p>
               </div>
               <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95">
                  Rotate Keys
               </button>
             </div>
          </section>

        </div>
      )}
    </CMSEditor>
  );
}
