"use client";

import React, { useEffect, useState } from "react";
import { 
  FileText, Plus, Search, Edit, Eye, Trash2, Globe, 
  Clock, ToggleLeft, ToggleRight, Sparkles, Settings,
  Home, Users, Layers, Mail, Shield, BookOpen, Cpu, Heart,
  Terminal, FileImage, ShoppingBag, CheckCircle, AlertTriangle, Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getApiUrl, safeFetch, fetchWithAuth } from "@/lib/utils";
import Link from "next/link";

// 13 REQUIRED PAGES SCHEMAS
const REQUIRED_PAGES = [
  { slug: "home", title: "Home Page", desc: "GurucraftPro Neural Landing Interface", icon: Home },
  { slug: "about", title: "About Studio", desc: "Our studio narrative, core vision, and master capabilities", icon: Users },
  { slug: "services", title: "Ecosystem Services", desc: "Specialized client services catalogs and service modules", icon: Sparkles },
  { slug: "portfolio", title: "Portfolio Outputs", desc: "Showcase client projects and premium work displays", icon: Layers },
  { slug: "contact", title: "Contact Interface", desc: "Customer communication gateways and intake submission points", icon: Mail },
  { slug: "privacy", title: "Privacy Protocol", desc: "General terms of service and compliance legal document", icon: Shield },
  { slug: "resources", title: "Resource Library", desc: "Helper articles, developer assets, and master documentation", icon: BookOpen },
  { slug: "ai-lab", title: "AI Creative Lab", desc: "Background remover tool and generative design playgrounds", icon: Cpu },
  { slug: "guruji-darshan", title: "Guruji Darshan", desc: "Sacred painting exhibits and spiritual design collections", icon: Layers },
  { slug: "wedding-plan", title: "Wedding Showcase", desc: "Luxury wedding coordination matrices and styling catalogs", icon: Heart },
  { slug: "game-design", title: "Game Design Studio", desc: "Interactive game prototypes and custom asset assets", icon: Terminal },
  { slug: "photo-editor", title: "Photo Editor Center", desc: "Visual canvas filters, backgrounds, and styling suites", icon: FileImage },
  { slug: "vantage-ecom", title: "Vantage Ecom", desc: "Integrated digital commerce layouts and shop pages", icon: ShoppingBag },
];

export default function CMSPageManager() {
  const [dbPages, setDbPages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSeoPage, setSelectedSeoPage] = useState<any | null>(null);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [isSavingSeo, setIsSavingSeo] = useState(false);

  // NEW PAGE BUILDER STATES
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newSeoTitle, setNewSeoTitle] = useState("");
  const [newSeoDesc, setNewSeoDesc] = useState("");
  const [newLayout, setNewLayout] = useState("empty");
  const [isCreatingPage, setIsCreatingPage] = useState(false);

  // DUPLICATE PAGE STATES
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [sourcePage, setSourcePage] = useState<any | null>(null);
  const [dupTitle, setDupTitle] = useState("");
  const [dupSlug, setDupSlug] = useState("");
  const [isDuplicating, setIsDuplicating] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await safeFetch(getApiUrl("/api/v1/cms/pages"), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        setDbPages(await res.json());
      }
    } catch (e) {
      console.error("Failed to load CMS pages list:", e);
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if database has page initialized
  const getDbPage = (slug: string) => {
    // Normalization check
    let targetSlug = slug;
    if (slug === "guruji-darshan") targetSlug = "guru-ji-art";
    else if (slug === "wedding-plan") targetSlug = "wedding-showcase";
    else if (slug === "clothing-consultation") targetSlug = "7-day-clothing-consultation";

    return dbPages.find(p => p.slug === targetSlug);
  };

  // Toggle published vs draft status
  const handleTogglePublish = async (slug: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const res = await fetchWithAuth(`/api/v1/cms/pages/${slug}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchPages();
      }
    } catch (e) {
      console.error("Publish toggle failed:", e);
    }
  };

  // Initialize un-seeded page record
  const handleInitializePage = async (page: typeof REQUIRED_PAGES[0]) => {
    let targetSlug = page.slug;
    if (page.slug === "guruji-darshan") targetSlug = "guru-ji-art";
    else if (page.slug === "wedding-plan") targetSlug = "wedding-showcase";

    try {
      const res = await fetchWithAuth("/api/v1/cms/pages", {
        method: "POST",
        body: JSON.stringify({
          title: page.title,
          slug: targetSlug,
          status: "draft",
          meta_title: page.title,
          meta_description: page.desc
        })
      });
      if (res.ok) {
        fetchPages();
      } else {
        alert("Failed to initialize database record for " + page.title);
      }
    } catch (e) {
      console.error("Failed to initialize page:", e);
    }
  };

  // Open SEO settings drawer
  const openSeoEditor = (dbPage: any) => {
    setSelectedSeoPage(dbPage);
    setSeoTitle(dbPage.meta_title || dbPage.title || "");
    setSeoDesc(dbPage.meta_description || "");
  };

  // Save SEO modifications
  const handleSaveSeo = async () => {
    if (!selectedSeoPage) return;
    setIsSavingSeo(true);
    try {
      const res = await fetchWithAuth(`/api/v1/cms/pages/${selectedSeoPage.slug}`, {
        method: "PUT",
        body: JSON.stringify({
          meta_title: seoTitle,
          meta_description: seoDesc
        })
      });
      if (res.ok) {
        setSelectedSeoPage(null);
        fetchPages();
      } else {
        alert("Failed to update SEO tags.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingSeo(false);
    }
  };

  // Delete page
  const handleDeletePage = async (slug: string) => {
    if (!confirm("Are you absolutely sure you want to delete this page? This destroys all component layouts!")) return;
    try {
      const res = await fetchWithAuth(`/api/v1/cms/pages/${slug}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchPages();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreatePage = async () => {
    if (!newTitle || !newSlug) {
      alert("Title and Slug are required.");
      return;
    }
    setIsCreatingPage(true);
    try {
      const res = await fetchWithAuth("/api/v1/cms/pages", {
        method: "POST",
        body: JSON.stringify({
          title: newTitle,
          slug: newSlug,
          status: "draft",
          meta_title: newSeoTitle || newTitle,
          meta_description: newSeoDesc || "Dynamic visual page"
        })
      });

      if (!res.ok) {
        throw new Error("Failed to create page record.");
      }

      let seedComponents: any[] = [];
      if (newLayout === "services") {
        seedComponents = [
          {
            name: `hero_${Date.now().toString().slice(-4)}`,
            type: "hero",
            props: { title: newTitle, subtitle: "Specialized client service matrix", cta_text: "Consult Us", cta_link: "/contact", bg_image: "/images/hero-bg.jpg" },
            order: 0
          },
          {
            name: `features_${Date.now().toString().slice(-4)}`,
            type: "features",
            props: { title: "Custom Ecosystem Capabilities", items: [{ title: "Intelligent Customization", desc: "Instantly tailored brand designs." }] },
            order: 1
          }
        ];
      } else if (newLayout === "spiritual") {
        seedComponents = [
          {
            name: `hero_${Date.now().toString().slice(-4)}`,
            type: "hero",
            props: { title: `${newTitle} Sacred Showcase`, subtitle: "Spiritual mandala visual design collection", cta_text: "View Gallery", cta_link: "/portfolio" },
            order: 0
          },
          {
            name: `testimonials_${Date.now().toString().slice(-4)}`,
            type: "testimonials",
            props: { title: "Sacred Endorsements", quotes: [{ author: "Visionary Seeker", role: "Spiritual Advisor", quote: "A sublime visual experience that communicates celestial peace." }] },
            order: 1
          }
        ];
      }

      if (seedComponents.length > 0) {
        await fetchWithAuth(`/api/v1/cms/${newSlug}`, {
          method: "PUT",
          body: JSON.stringify({
            title: newTitle,
            slug: newSlug,
            meta: { title: newSeoTitle || newTitle, description: newSeoDesc || "Dynamic visual page" },
            components: seedComponents
          })
        });
      }

      setCreateModalOpen(false);
      setNewTitle("");
      setNewSlug("");
      setNewSeoTitle("");
      setNewSeoDesc("");
      setNewLayout("empty");
      fetchPages();
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsCreatingPage(false);
    }
  };

  const handleDuplicatePage = async () => {
    if (!sourcePage || !dupTitle || !dupSlug) {
      alert("Title and Slug are required.");
      return;
    }
    setIsDuplicating(true);
    try {
      const getRes = await fetchWithAuth(`/api/v1/cms/${sourcePage.slug}`);
      if (!getRes.ok) throw new Error("Failed to fetch source page layouts");
      const sourceData = await getRes.json();

      const createRes = await fetchWithAuth("/api/v1/cms/pages", {
        method: "POST",
        body: JSON.stringify({
          title: dupTitle,
          slug: dupSlug,
          status: "draft",
          meta_title: sourcePage.meta_title || dupTitle,
          meta_description: sourcePage.meta_description || "Duplicate layout"
        })
      });
      if (!createRes.ok) throw new Error("Failed to create duplicate page record");

      await fetchWithAuth(`/api/v1/cms/${dupSlug}`, {
        method: "PUT",
        body: JSON.stringify({
          title: dupTitle,
          slug: dupSlug,
          meta: { title: sourcePage.meta_title || dupTitle, description: sourcePage.meta_description || "Duplicate layout" },
          components: sourceData.components || []
        })
      });

      setDuplicateModalOpen(false);
      setSourcePage(null);
      setDupTitle("");
      setDupSlug("");
      fetchPages();
    } catch (e: any) {
      alert("Duplication failed: " + e.message);
    } finally {
      setIsDuplicating(false);
    }
  };

  // Merge REQUIRED_PAGES and dynamic dbPages not represented in REQUIRED_PAGES
  const allPagesToDisplay = [...REQUIRED_PAGES];

  dbPages.forEach((dbPage) => {
    // See if this dbPage matches any required page normalized slug
    const matchesRequired = REQUIRED_PAGES.some((req) => {
      let targetSlug = req.slug;
      if (req.slug === "guruji-darshan") targetSlug = "guru-ji-art";
      else if (req.slug === "wedding-plan") targetSlug = "wedding-showcase";
      else if (req.slug === "clothing-consultation") targetSlug = "7-day-clothing-consultation";
      return targetSlug === dbPage.slug;
    });

    if (!matchesRequired) {
      // Add it as a dynamic page!
      allPagesToDisplay.push({
        slug: dbPage.slug,
        title: dbPage.title || `Dynamic: ${dbPage.slug}`,
        desc: dbPage.meta_description || "Custom dynamic slug page builder canvas.",
        icon: Globe,
        isDynamic: true,
      } as any);
    }
  });

  const filteredPages = allPagesToDisplay.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto text-left">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-4 w-full md:w-auto max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input 
              placeholder="Search pages by title or slug..." 
              className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl italic font-medium text-white placeholder:text-slate-500 focus:border-indigo-500/50"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setCreateModalOpen(true)}
            className="h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider px-6 gap-2 transition-all shadow-lg shadow-indigo-500/20 shrink-0"
          >
            <Plus size={16} /> Create Page
          </Button>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 italic">
          <Clock size={16} className="text-indigo-400" />
          <span>Synchronized with Local SQLite Core</span>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPages.map((reqPage) => {
          const dbPage = getDbPage(reqPage.slug);
          const isInitialized = !!dbPage;
          const status = dbPage?.status || "draft";
          const lastUpdated = dbPage?.updated_at || dbPage?.created_at;

          return (
            <div 
              key={reqPage.slug} 
              className={`glass-card p-8 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden flex flex-col justify-between h-[360px] ${
                isInitialized 
                  ? "border-white/5 hover:border-indigo-500/30" 
                  : "border-dashed border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <div>
                {/* Header status bar */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                    isInitialized 
                      ? "bg-white/5 border-white/10 group-hover:bg-indigo-600 group-hover:border-transparent text-slate-400 group-hover:text-white" 
                      : "bg-white/[0.02] border-white/5 text-slate-600"
                  }`}>
                    <reqPage.icon size={22} />
                  </div>
                  
                  {isInitialized ? (
                    <Badge 
                      onClick={() => handleTogglePublish(dbPage.slug, status)}
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full cursor-pointer transition-all border ${
                        status === "published" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                      }`}
                    >
                      {status}
                    </Badge>
                  ) : (
                    <Badge className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-slate-600">
                      Uninitialized
                    </Badge>
                  )}
                </div>

                {/* Meta details */}
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-indigo-400 transition-colors mb-2 truncate">
                  {reqPage.title}
                </h3>
                <p className="text-slate-500 text-xs font-mono mb-4 flex items-center gap-1.5">
                  <Globe size={11} /> /{dbPage?.slug || reqPage.slug}
                </p>
                <p className="text-slate-400 text-xs font-medium italic leading-relaxed mb-6 line-clamp-2">
                  {reqPage.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {isInitialized && lastUpdated && (
                  <div className="text-[10px] text-slate-600 font-bold italic flex items-center gap-1">
                    <Clock size={12} /> Updated {new Date(lastUpdated).toLocaleDateString()}
                  </div>
                )}

                {isInitialized ? (
                  <div className="flex gap-2">
                    <Link href={`/admin/pages/${dbPage.slug}`} className="flex-1">
                      <Button className="w-full h-11 rounded-xl bg-white text-black hover:bg-indigo-600 hover:text-white font-black text-xs transition-all tracking-wider uppercase gap-1">
                        <Edit size={12} /> Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={() => openSeoEditor(dbPage)}
                      className="h-11 rounded-xl border-white/5 hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-400 transition-colors font-bold text-xs px-3"
                      title="Edit SEO Meta"
                    >
                      SEO
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSourcePage(dbPage);
                        setDupTitle(`${dbPage.title} Copy`);
                        setDupSlug(`${dbPage.slug}-copy`);
                        setDuplicateModalOpen(true);
                      }}
                      className="h-11 rounded-xl border-white/5 hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-400 transition-colors font-bold text-xs px-3"
                      title="Duplicate Layout"
                    >
                      <Copy size={13} />
                    </Button>
                    <Link href={`/${dbPage.slug}?preview=true`} target="_blank">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-11 w-11 rounded-xl border-white/5 hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-400"
                        title="Live Preview"
                      >
                        <Eye size={14} />
                      </Button>
                    </Link>
                    {["admin", "super-admin"].includes(localStorage.getItem("role")?.toLowerCase() || "") && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeletePage(dbPage.slug)}
                        className="h-11 w-11 rounded-xl text-rose-500 hover:bg-rose-500/10 hover:text-rose-400"
                        title="Delete Page"
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleInitializePage(reqPage)}
                    className="w-full h-11 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white font-black text-xs transition-all tracking-wider uppercase gap-2 border border-indigo-500/20"
                  >
                    <Plus size={14} /> Initialize Database Record
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Polish Create Page Dialog Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">
              Create Dynamic Page
            </h3>
            <p className="text-slate-500 text-sm italic mb-8">
              Construct a custom slug page with a pre-seeded component structure.
            </p>

            <div className="space-y-6 mb-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Page Title</label>
                  <Input 
                    placeholder="e.g. My New Page"
                    className="bg-black/50 border-white/10 h-12 text-white font-medium rounded-xl focus:border-indigo-500/50"
                    value={newTitle}
                    onChange={e => {
                      setNewTitle(e.target.value);
                      // Auto slugify
                      setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Page Slug</label>
                  <Input 
                    placeholder="e.g. my-new-page"
                    className="bg-black/50 border-white/10 h-12 text-white font-medium rounded-xl focus:border-indigo-500/50"
                    value={newSlug}
                    onChange={e => setNewSlug(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Select Layout Preset</label>
                <div className="grid grid-cols-3 gap-3">
                  {["empty", "services", "spiritual"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setNewLayout(preset)}
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center p-3 transition-all ${
                        newLayout === preset 
                          ? "border-indigo-500 bg-indigo-500/10 text-white font-bold" 
                          : "border-white/5 bg-black/30 hover:border-white/10 text-slate-400"
                      }`}
                    >
                      <span className="text-xs uppercase tracking-widest font-black">{preset}</span>
                      <span className="text-[9px] text-slate-500 mt-1 italic">
                        {preset === "empty" ? "Blank canvas" : preset === "services" ? "Ecom features" : "Art exhibits"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Meta Title</label>
                  <Input 
                    placeholder="Search engine title tag"
                    className="bg-black/50 border-white/10 h-12 text-white font-medium rounded-xl focus:border-indigo-500/50"
                    value={newSeoTitle}
                    onChange={e => setNewSeoTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Meta Description</label>
                  <Input 
                    placeholder="Search engine meta desc"
                    className="bg-black/50 border-white/10 h-12 text-white font-medium rounded-xl focus:border-indigo-500/50"
                    value={newSeoDesc}
                    onChange={e => setNewSeoDesc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleCreatePage} 
                disabled={isCreatingPage}
                className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider transition-all"
              >
                {isCreatingPage ? "Creating Page..." : "Instantiate Page"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setCreateModalOpen(false)}
                className="h-12 rounded-xl border-white/10 text-slate-400 hover:bg-white/5 font-black text-xs uppercase tracking-wider px-6"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Polish Duplicate Page Dialog Modal */}
      {duplicateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">
              Duplicate Layout
            </h3>
            <p className="text-slate-500 text-sm italic mb-8">
              Copying all components, themes, and configuration from <span className="text-indigo-400 font-extrabold font-mono">/{sourcePage?.slug}</span>
            </p>

            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Target Page Title</label>
                <Input 
                  className="bg-black/50 border-white/10 h-12 text-white font-medium rounded-xl focus:border-indigo-500/50"
                  value={dupTitle}
                  onChange={e => {
                    setDupTitle(e.target.value);
                    setDupSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Target Slug</label>
                <Input 
                  className="bg-black/50 border-white/10 h-12 text-white font-medium rounded-xl focus:border-indigo-500/50"
                  value={dupSlug}
                  onChange={e => setDupSlug(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleDuplicatePage} 
                disabled={isDuplicating}
                className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider transition-all"
              >
                {isDuplicating ? "Duplicating Layout..." : "Duplicate Page Layout"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setDuplicateModalOpen(false);
                  setSourcePage(null);
                }}
                className="h-12 rounded-xl border-white/10 text-slate-400 hover:bg-white/5 font-black text-xs uppercase tracking-wider px-6"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Glassmorphic SEO editor Dialog Modal */}
      {selectedSeoPage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">
              SEO Engine Override
            </h3>
            <p className="text-slate-500 text-sm italic mb-8">
              Adjusting Search Meta data tags for <span className="text-indigo-400">/{selectedSeoPage.slug}</span>
            </p>

            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Search Title (Meta Title)</label>
                <Input 
                  className="bg-black/50 border-white/10 h-12 text-white font-medium rounded-xl focus:border-indigo-500/50"
                  value={seoTitle}
                  onChange={e => setSeoTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Meta Description</label>
                <textarea 
                  className="w-full bg-black/50 border border-white/10 min-h-[120px] rounded-xl p-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 resize-none font-medium"
                  value={seoDesc}
                  onChange={e => setSeoDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleSaveSeo} 
                disabled={isSavingSeo}
                className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider transition-all"
              >
                {isSavingSeo ? "Saving..." : "Save SEO Override"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setSelectedSeoPage(null)}
                className="h-12 rounded-xl border-white/10 text-slate-400 hover:bg-white/5 font-black text-xs uppercase tracking-wider px-6"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
