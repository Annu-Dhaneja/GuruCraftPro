"use client";

import React, { useState } from "react";
import { 
  BookOpen, Compass, HelpCircle, CheckCircle, ChevronRight, Play,
  Sparkles, Image, Settings, Globe, Layout, Layers, ShieldAlert,
  ArrowRight, Heart, Star, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const GUIDE_SECTIONS = [
  {
    id: "hero",
    title: "1. Editing the Homepage Hero",
    desc: "How to update the main banner and introduction message",
    icon: Layout,
    content: (
      <div className="space-y-6">
        <p className="text-slate-400 text-sm leading-relaxed">
          The <span className="text-indigo-400 font-bold border-b border-indigo-500/20">Hero Section</span> is the very first visual area visitors see when landing on your site. Follow these steps to edit it:
        </p>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">1</span>
            <div className="text-sm">
              <span className="font-bold text-white block">Navigate to Pages</span>
              <p className="text-slate-500">Go to <Link href="/admin/pages" className="text-indigo-400 hover:underline">Pages Catalog</Link> and find the "Home" page card.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">2</span>
            <div className="text-sm">
              <span className="font-bold text-white block">Edit the Luxury Hero block</span>
              <p className="text-slate-500">Click <span className="text-white font-semibold">Edit Page</span>, locate the "Hero" component, and click it to open the parameter forms.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">3</span>
            <div className="text-sm">
              <span className="font-bold text-white block">Apply Changes</span>
              <p className="text-slate-500">Type your new title, subtitle, CTA text (e.g., "Get Consultation"), and select an background image.</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex gap-3 items-start mt-6">
          <Info className="text-indigo-400 w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-300">
            <span className="font-bold uppercase tracking-wider block mb-1">Interactive Tooltip</span>
            Hero Section = The premium primary showcase banner. Keep subtitles short (under 120 chars) to maintain balance.
          </div>
        </div>
      </div>
    )
  },
  {
    id: "images",
    title: "2. Image Management (Upload vs URL)",
    desc: "Understand direct media upload and dynamic remote image URLs",
    icon: Image,
    content: (
      <div className="space-y-6">
        <p className="text-slate-400 text-sm leading-relaxed">
          GuruCraft CMS gives you complete flexibility in media loading. For every image vector field, you have two options:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-3">
            <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Option 1: Direct File Upload</Badge>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click the <span className="text-white font-bold">Upload Cloud</span> button. Choose a file from your system.
              We automatically compress, optimize, and serve it via global high-speed edge CDN servers.
            </p>
            <span className="text-[10px] text-emerald-400 font-bold block">✓ Safe validation checks, max size 5MB</span>
          </div>

          <div className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-3">
            <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20">Option 2: Remote Image URL</Badge>
            <p className="text-xs text-slate-400 leading-relaxed">
              If your image is hosted elsewhere (e.g. Unsplash, imgur), simply copy the image link address and paste it directly into the text input.
            </p>
            <span className="text-[10px] text-indigo-400 font-bold block">✓ Instant updates, no server space consumed</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "dynamic-pages",
    title: "3. Creating Dynamic Pages",
    desc: "Instantiate dynamic route pages in 3 clicks with seeder layouts",
    icon: Globe,
    content: (
      <div className="space-y-6">
        <p className="text-slate-400 text-sm leading-relaxed">
          You don't need a developer to write routes anymore. Use our dynamic slug page builder:
        </p>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">1</span>
            <div className="text-sm">
              <span className="font-bold text-white block">Click "Create Page"</span>
              <p className="text-slate-500">Go to Pages and click the Create Page button next to the search input.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">2</span>
            <div className="text-sm">
              <span className="font-bold text-white block">Enter Metadata & Slug</span>
              <p className="text-slate-500">Give your page a title and slug. E.g. title: <span className="text-white">Sacred Mandalas</span>, slug will auto-format to <span className="text-indigo-400">sacred-mandalas</span>.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">3</span>
            <div className="text-sm">
              <span className="font-bold text-white block">Select seeded layout</span>
              <p className="text-slate-500">Choose "Services Template" or "Spiritual/Art Template" to pre-load component matrices so the canvas is not blank!</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "seo",
    title: "4. SEO Meta Tag Controls",
    desc: "Manage how Google views your website indexing",
    icon: Settings,
    content: (
      <div className="space-y-6">
        <p className="text-slate-400 text-sm leading-relaxed">
          Search engine title tags and meta descriptions are vital for discovery on Google. Every page has separate overrides:
        </p>
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Click the <span className="text-indigo-400 font-bold border border-indigo-500/30 px-2 py-0.5 rounded bg-indigo-500/5">SEO</span> button on any page card to bring up the override panel.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5 space-y-2 text-xs">
            <p className="text-slate-500 font-mono">Example configuration:</p>
            <p className="text-white"><strong className="text-slate-400">Search Title:</strong> Guruji Art Divine Mandalas | GuruCraft Pro</p>
            <p className="text-white"><strong className="text-slate-400">Meta Description:</strong> Explore hand-painted spiritual art portfolios, celestial canvases, and visual installations curated by GuruCraft.</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function AdminHelpGuide() {
  const [activeTab, setActiveTab] = useState("hero");
  const [academyProgress, setAcademyProgress] = useState<string[]>(["hero"]);

  const toggleProgress = (id: string) => {
    if (academyProgress.includes(id)) {
      setAcademyProgress(academyProgress.filter(item => item !== id));
    } else {
      setAcademyProgress([...academyProgress, id]);
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto text-left pb-16">
      
      {/* Onboarding Banner */}
      <div className="bg-gradient-to-tr from-indigo-900/40 via-purple-950/20 to-slate-950 p-8 rounded-[2.5rem] border border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 font-bold text-[9px] uppercase tracking-wider mb-2">
            Onboarding Academy
          </Badge>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
            CMS Admin Guide & Masterclass
          </h1>
          <p className="text-slate-400 text-sm italic max-w-xl">
            Welcome to the simplified console! Complete these guides to master page layout configuration, dynamic seeding, and custom themes.
          </p>
        </div>
        
        {/* Progress tracker */}
        <div className="bg-black/50 p-6 rounded-2xl border border-white/5 min-w-[240px] text-center space-y-2 shrink-0">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Academy Progress</span>
          <div className="text-3xl font-black italic text-indigo-400">
            {Math.round((academyProgress.length / GUIDE_SECTIONS.length) * 100)}%
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            {academyProgress.length} of {GUIDE_SECTIONS.length} checkpoints completed
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar (40%) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Guide Bookmarks</span>
          {GUIDE_SECTIONS.map((section) => {
            const isActive = activeTab === section.id;
            const isCompleted = academyProgress.includes(section.id);
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveTab(section.id)}
                className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 ${
                  isActive 
                    ? "border-indigo-500 bg-indigo-500/10" 
                    : "border-white/5 bg-slate-900/40 hover:border-white/10"
                }`}
              >
                <div className="flex gap-3 items-center min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isActive ? "bg-indigo-600 border-transparent text-white" : "bg-white/5 border-white/10 text-slate-400"
                  }`}>
                    <section.icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-white block truncate">{section.title}</span>
                    <span className="text-[10px] text-slate-500 truncate block italic">{section.desc}</span>
                  </div>
                </div>
                
                <input 
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleProgress(section.id);
                  }}
                  className="w-4 h-4 rounded border-white/20 bg-slate-900 text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0"
                  title="Mark as read"
                />
              </button>
            );
          })}
        </div>

        {/* Content Box (60%) */}
        <div className="lg:col-span-8">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 min-h-[400px] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="border-b border-white/5 pb-6 mb-8 flex justify-between items-center">
                <div>
                  <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-2.5 py-0.5 font-bold text-[8px] uppercase tracking-wider">
                    Interactive Lesson
                  </Badge>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mt-2">
                    {GUIDE_SECTIONS.find(s => s.id === activeTab)?.title}
                  </h2>
                </div>
                
                <button
                  onClick={() => toggleProgress(activeTab)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                    academyProgress.includes(activeTab)
                      ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <CheckCircle size={14} /> 
                  {academyProgress.includes(activeTab) ? "Completed" : "Mark Complete"}
                </button>
              </div>

              {/* Body */}
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {GUIDE_SECTIONS.find(s => s.id === activeTab)?.content}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="border-t border-white/5 pt-8 mt-12 flex justify-between items-center text-xs">
              <span className="text-slate-500 italic font-semibold">GuruCraft Pro Console Onboarding Guide</span>
              <Button 
                onClick={() => {
                  const idx = GUIDE_SECTIONS.findIndex(s => s.id === activeTab);
                  const nextIdx = (idx + 1) % GUIDE_SECTIONS.length;
                  setActiveTab(GUIDE_SECTIONS[nextIdx].id);
                }}
                variant="ghost" 
                className="hover:bg-indigo-500/10 hover:text-indigo-400 font-bold uppercase tracking-wider rounded-xl gap-2"
              >
                Next lesson <ChevronRight size={14} />
              </Button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
