"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, UploadCloud } from "lucide-react";
import { getApiUrl } from "@/lib/utils";

const InputLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-semibold text-indigo-300 mb-2 tracking-wide uppercase">{children}</label>
);

const Input = ({ value, onChange, isTextarea = false, placeholder, isRich = false }: { value: string, onChange: (v: string) => void, isTextarea?: boolean, placeholder?: string, isRich?: boolean }) => {
  const className = "flex w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm ring-offset-indigo-500 placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all text-white shadow-inner";
  
  if (isRich || isTextarea) {
    return (
      <div className="relative w-full group">
        {isRich && (
          <div className="absolute -top-10 left-0 flex gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity bg-slate-800 p-1 rounded-t-lg border border-white/10 border-b-0">
             <button type="button" className="px-2 py-1 text-[10px] hover:bg-white/10 rounded">Bold</button>
             <button type="button" className="px-2 py-1 text-[10px] hover:bg-white/10 rounded">Italic</button>
             <button type="button" className="px-2 py-1 text-[10px] hover:bg-white/10 rounded">List</button>
          </div>
        )}
        <textarea 
          value={value || ""} 
          onChange={e => onChange(e.target.value)} 
          className={`${className} min-h-[120px] resize-none ${isRich ? 'rounded-tl-none' : ''}`} 
          placeholder={placeholder} 
        />
      </div>
    );
  }
  return <input type="text" value={value || ""} onChange={e => onChange(e.target.value)} className={className} placeholder={placeholder} />;
};

const ImageUploadField = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(getApiUrl("/api/v1/cms/upload-image"), {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input value={value} onChange={onChange} />
        <div className="relative flex-shrink-0">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            onChange={handleUpload}
            disabled={uploading}
            title="Upload new image"
          />
          <Button type="button" variant="secondary" className="pointer-events-none rounded-lg" disabled={uploading}>
            <UploadCloud className="w-4 h-4 mr-2" />
            {uploading ? "..." : "Upload"}
          </Button>
        </div>
      </div>
      {value && (
        <div className="mt-4 p-3 bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl group relative max-w-sm">
          <img
            src={value}
            className="h-auto w-full max-h-[220px] object-cover rounded-lg border border-white/5 transition-transform group-hover:scale-[1.02]"
            alt="preview"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground truncate max-w-[80%]">{value}</span>
            <button onClick={() => onChange("")} className="text-[10px] text-destructive hover:underline">Remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

const DEFAULT_HOME_DATA = {
  hero: { badge: "", headline_prefix: "", headline_highlight: "", headline_suffix: "", subheadline: "" },
  trust_strip: { stats: [], companies: [] },
  service_category_rail: { title: "", categories: [] },
  virtual_dressing_room: { badge_text: "", title: "", description: "", image: "", button_text: "", button_link: "" },
  portfolio_preview: { badge_text: "", title: "", description: "", button_text: "", button_link: "", projects: [] },
  ai_lab_preview: { title_prefix: "", title_highlight: "", description: "", primary_button_text: "", primary_button_link: "", secondary_button_text: "", secondary_button_link: "" },
  how_it_works: { title: "", subtitle: "", steps: [] },
  main_services: { title_prefix: "", title_target: "", subtitle: "", services: [] },
  testimonials: { title: "", list: [] },
  final_cta: { title: "", description: "", primary_button_text: "", primary_button_link: "", secondary_button_text: "", secondary_button_link: "" }
};

export default function AdminHomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    fetch(getApiUrl("/api/v1/cms/home"), {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then(d => {
        // Merge with defaults to ensure all fields exist
        const mergedData = { ...DEFAULT_HOME_DATA, ...d };
        setData(mergedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Admin Home Fetch Error:", err);
        setError(err.message || "Failed to connect to backend");
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setStatus("Saving...");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(getApiUrl("/api/v1/cms/home"), {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setStatus("Saved successfully!");
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("Error saving to backend.");
      }
    } catch (e) {
      setStatus("Error saving data.");
    }
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: string, arrayName: string, index: number, field: string, value: any) => {
    setData((prev: any) => {
      const newArray = [...prev[section][arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return {
        ...prev,
        [section]: { ...prev[section], [arrayName]: newArray }
      };
    });
  };

  const removeArrayItem = (section: string, arrayName: string, index: number) => {
    setData((prev: any) => {
      const newArray = prev[section][arrayName].filter((_: any, i: number) => i !== index);
      return {
        ...prev,
        [section]: { ...prev[section], [arrayName]: newArray }
      };
    });
  };

  const addArrayItem = (section: string, arrayName: string, emptyItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [arrayName]: [...prev[section][arrayName], emptyItem] }
    }));
  };

  if (loading) return (
    <div className="p-20 flex flex-col items-center justify-center text-white min-h-[400px]">
      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
      <div className="text-lg font-medium animate-pulse">Initializing Design Lab...</div>
    </div>
  );

  if (error || !data) return (
    <div className="p-10 text-white flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl max-w-md">
        <div className="text-red-400 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Connection Failed</h2>
        <p className="text-muted-foreground text-sm mb-6">
          The Design Lab couldn't connect to the backend at <code className="text-indigo-300 font-mono bg-indigo-500/10 px-1 rounded">{getApiUrl()}</code>.
          Ensure your Render backend is live and CORS is configured correctly.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline" className="border-white/10 hover:bg-white/5">
          Retry Sync
        </Button>
      </div>
    </div>
  );

  const tabs = [
    { id: "hero", label: "Hero Section" },
    { id: "trust_strip", label: "Trust Strip" },
    { id: "categories", label: "Service Templates" },
    { id: "virtual", label: "Virtual Try-On" },
    { id: "portfolio", label: "Portfolio Grid" },
    { id: "ailab", label: "AI Design Lab" },
    { id: "how_it_works", label: "How It Works" },
    { id: "main_services", label: "Main Services" },
    { id: "testimonials", label: "Testimonials" },
    { id: "cta", label: "Final CTA" },
  ];


    return (
      <div className="p-4 md:p-8 min-h-screen max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 rotate-3 group hover:rotate-0 transition-transform duration-300">
               <Save className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white">Design Lab CMS</h1>
              <p className="text-muted-foreground font-medium mt-1">Professional Content & Strategy Management</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
               <div className={`text-xs font-bold uppercase tracking-widest ${status.includes("success") ? "text-emerald-400" : "text-amber-400"}`}>
                 System Status
               </div>
               <div className="text-sm font-medium text-white/60">{status || "Standby"}</div>
            </div>
            <Button onClick={handleSave} className="bg-white text-black hover:bg-white/90 px-8 py-6 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
              Save All Changes
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 ring-1 ring-white/20"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl ring-1 ring-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Hero Tab */}
            {activeTab === "hero" && data?.hero && (
              <div className="space-y-8 animate-in fade-in">
                <h2 className="text-2xl font-bold mb-8 text-indigo-300">Hero Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div><InputLabel>Annoucement Badge</InputLabel><Input value={data.hero?.badge} onChange={(v) => handleNestedChange("hero", "badge", v)} /></div>
                  <div><InputLabel>Headline Prefix</InputLabel><Input value={data.hero?.headline_prefix} onChange={(v) => handleNestedChange("hero", "headline_prefix", v)} /></div>
                  <div><InputLabel>Headline Highlight</InputLabel><Input value={data.hero?.headline_highlight} onChange={(v) => handleNestedChange("hero", "headline_highlight", v)} /></div>
                  <div><InputLabel>Headline Suffix</InputLabel><Input value={data.hero?.headline_suffix} onChange={(v) => handleNestedChange("hero", "headline_suffix", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Detailed Subheadline</InputLabel><Input value={data.hero?.subheadline} isRich onChange={(v) => handleNestedChange("hero", "subheadline", v)} /></div>
                </div>
              </div>
            )}

            {/* Trust Strip Tab */}
            {activeTab === "trust_strip" && data?.trust_strip && (
              <div className="space-y-8 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Trust Strip Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {(data?.trust_strip?.stats || []).map((stat: any, i: number) => (
                    <div key={i} className="bg-muted/30 p-4 rounded-lg space-y-4 border border-border">
                      <div><InputLabel>Label</InputLabel><Input value={stat?.label} onChange={(v) => handleArrayChange("trust_strip", "stats", i, "label", v)} /></div>
                      <div><InputLabel>Value</InputLabel><Input value={stat?.value} onChange={(v) => handleArrayChange("trust_strip", "stats", i, "value", v)} /></div>
                    </div>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border mt-12">Trusted Companies</h2>
                <div className="space-y-4">
                  {(data?.trust_strip?.companies || []).map((company: any, i: number) => (
                    <div key={i} className="flex gap-4 items-center bg-muted/30 p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <InputLabel>Company Name</InputLabel>
                        <Input value={company?.name} onChange={(v) => handleArrayChange("trust_strip", "companies", i, "name", v)} />
                      </div>
                      <div className="flex-1">
                        <InputLabel>Logo URL / Upload</InputLabel>
                        <ImageUploadField value={company?.logo} onChange={(v) => handleArrayChange("trust_strip", "companies", i, "logo", v)} />
                      </div>
                      <Button variant="destructive" size="icon" className="mt-6" onClick={() => removeArrayItem("trust_strip", "companies", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem("trust_strip", "companies", { name: "New Company", logo: "" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Company
                  </Button>
                </div>
              </div>
            )}

            {/* Service Templates Tab */}
            {activeTab === "categories" && data?.service_category_rail && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Service Templates</h2>
                <div className="mb-8">
                  <InputLabel>Section Title</InputLabel>
                  <Input value={data.service_category_rail?.title} onChange={(v) => handleNestedChange("service_category_rail", "title", v)} />
                </div>

                <div className="space-y-4">
                  {(data?.service_category_rail?.categories || []).map((cat: any, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row gap-4 items-start bg-muted/30 p-4 rounded-lg border border-border">
                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div><InputLabel>Category Title</InputLabel><Input value={cat?.title} onChange={(v) => handleArrayChange("service_category_rail", "categories", i, "title", v)} /></div>
                          <div><InputLabel>Link Route</InputLabel><Input value={cat?.href} onChange={(v) => handleArrayChange("service_category_rail", "categories", i, "href", v)} /></div>
                          <div><InputLabel>Tailwind Color Class</InputLabel><Input value={cat?.color} onChange={(v) => handleArrayChange("service_category_rail", "categories", i, "color", v)} /></div>
                        </div>
                        <div><InputLabel>Image URL / Upload</InputLabel><ImageUploadField value={cat?.image} onChange={(v) => handleArrayChange("service_category_rail", "categories", i, "image", v)} /></div>
                      </div>
                      <Button variant="destructive" size="icon" className="shrink-0" onClick={() => removeArrayItem("service_category_rail", "categories", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem("service_category_rail", "categories", { title: "New Template", href: "/", color: "from-blue-500/80", image: "" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Template
                  </Button>
                </div>
              </div>
            )}

            {/* Virtual Try-On Tab */}
            {activeTab === "virtual" && data?.virtual_dressing_room && (
              <div className="space-y-8 animate-in fade-in">
                <h2 className="text-2xl font-bold mb-8 text-indigo-300">Virtual Try-On Lab</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div><InputLabel>Badge Text</InputLabel><Input value={data.virtual_dressing_room?.badge_text} onChange={(v) => handleNestedChange("virtual_dressing_room", "badge_text", v)} /></div>
                  <div><InputLabel>Main Title</InputLabel><Input value={data.virtual_dressing_room?.title} onChange={(v) => handleNestedChange("virtual_dressing_room", "title", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Introduction Description</InputLabel><Input value={data.virtual_dressing_room?.description} isRich onChange={(v) => handleNestedChange("virtual_dressing_room", "description", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Preview Experience Asset</InputLabel><ImageUploadField value={data.virtual_dressing_room?.image} onChange={(v) => handleNestedChange("virtual_dressing_room", "image", v)} /></div>
                  <div><InputLabel>Primary Button Text</InputLabel><Input value={data.virtual_dressing_room?.button_text} onChange={(v) => handleNestedChange("virtual_dressing_room", "button_text", v)} /></div>
                  <div><InputLabel>Destination Path</InputLabel><Input value={data.virtual_dressing_room?.button_link} onChange={(v) => handleNestedChange("virtual_dressing_room", "button_link", v)} /></div>
                </div>
              </div>
            )}

            {/* Portfolio Grid Tab */}
            {activeTab === "portfolio" && data?.portfolio_preview && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Portfolio Grid Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div><InputLabel>Badge Text</InputLabel><Input value={data.portfolio_preview?.badge_text} onChange={(v) => handleNestedChange("portfolio_preview", "badge_text", v)} /></div>
                  <div><InputLabel>Title</InputLabel><Input value={data.portfolio_preview?.title} onChange={(v) => handleNestedChange("portfolio_preview", "title", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Impactful Portfolio Description</InputLabel><Input value={data.portfolio_preview?.description} isRich onChange={(v) => handleNestedChange("portfolio_preview", "description", v)} /></div>
                  <div><InputLabel>Button Text</InputLabel><Input value={data.portfolio_preview?.button_text} onChange={(v) => handleNestedChange("portfolio_preview", "button_text", v)} /></div>
                  <div><InputLabel>Button Link Route</InputLabel><Input value={data.portfolio_preview?.button_link} onChange={(v) => handleNestedChange("portfolio_preview", "button_link", v)} /></div>
                </div>

                <h3 className="text-lg font-medium mb-4">Projects</h3>
                <div className="space-y-4">
                  {(data?.portfolio_preview?.projects || []).map((project: any, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row gap-4 items-start bg-muted/30 p-4 rounded-lg border border-border">
                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><InputLabel>Project Title</InputLabel><Input value={project?.title} onChange={(v) => handleArrayChange("portfolio_preview", "projects", i, "title", v)} /></div>
                          <div><InputLabel>Category</InputLabel><Input value={project?.category} onChange={(v) => handleArrayChange("portfolio_preview", "projects", i, "category", v)} /></div>
                          <div><InputLabel>Project ID</InputLabel><Input value={project?.id} onChange={(v) => handleArrayChange("portfolio_preview", "projects", i, "id", v)} /></div>
                          <div><InputLabel>Case Study URL</InputLabel><Input value={project?.case_study_url} onChange={(v) => handleArrayChange("portfolio_preview", "projects", i, "case_study_url", v)} /></div>
                          <div><InputLabel>Live Preview URL</InputLabel><Input value={project?.live_url} onChange={(v) => handleArrayChange("portfolio_preview", "projects", i, "live_url", v)} /></div>
                        </div>

                        <div>
                          <InputLabel>Color Palette (Hex codes)</InputLabel>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {(project?.colors || []).map((color: string, colorIdx: number) => (
                              <div key={colorIdx} className="flex items-center gap-2 bg-muted/40 px-2 py-1 rounded border border-border">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                <span className="text-[10px] uppercase font-mono">{color}</span>
                                <button onClick={() => {
                                  const newColors = (project?.colors || []).filter((_: any, idx: number) => idx !== colorIdx);
                                  handleArrayChange("portfolio_preview", "projects", i, "colors", newColors);
                                }}>×</button>
                              </div>
                            ))}
                          </div>
                          <Input value="" onChange={(v) => {
                            if (v.endsWith(",")) {
                              const newColor = v.slice(0, -1).trim();
                              if (newColor.startsWith("#")) {
                                handleArrayChange("portfolio_preview", "projects", i, "colors", [...(project?.colors || []), newColor]);
                              }
                            }
                          }} placeholder="#Hex, to add" />
                        </div>

                        <div><InputLabel>Image URL / Upload</InputLabel><ImageUploadField value={project?.image} onChange={(v) => handleArrayChange("portfolio_preview", "projects", i, "image", v)} /></div>
                      </div>
                      <Button variant="destructive" size="icon" className="shrink-0" onClick={() => removeArrayItem("portfolio_preview", "projects", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem("portfolio_preview", "projects", { id: Date.now(), title: "New Project", category: "Category", image: "", live_url: "", case_study_url: "", colors: ["#000000"] })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                  </Button>
                </div>
              </div>
            )}

            {/* AI Lab Preview Tab */}
            {activeTab === "ailab" && data?.ai_lab_preview && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">AI Lab Preview Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><InputLabel>Title Prefix</InputLabel><Input value={data.ai_lab_preview?.title_prefix} onChange={(v) => handleNestedChange("ai_lab_preview", "title_prefix", v)} /></div>
                  <div><InputLabel>Title Highlight</InputLabel><Input value={data.ai_lab_preview?.title_highlight} onChange={(v) => handleNestedChange("ai_lab_preview", "title_highlight", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Technology & Vision Description</InputLabel><Input value={data.ai_lab_preview?.description} isRich onChange={(v) => handleNestedChange("ai_lab_preview", "description", v)} /></div>
                  <div><InputLabel>Primary Button Text</InputLabel><Input value={data.ai_lab_preview?.primary_button_text} onChange={(v) => handleNestedChange("ai_lab_preview", "primary_button_text", v)} /></div>
                  <div><InputLabel>Primary Button Link</InputLabel><Input value={data.ai_lab_preview?.primary_button_link} onChange={(v) => handleNestedChange("ai_lab_preview", "primary_button_link", v)} /></div>
                  <div><InputLabel>Secondary Button Text</InputLabel><Input value={data.ai_lab_preview?.secondary_button_text} onChange={(v) => handleNestedChange("ai_lab_preview", "secondary_button_text", v)} /></div>
                  <div><InputLabel>Secondary Button Link</InputLabel><Input value={data.ai_lab_preview?.secondary_button_link} onChange={(v) => handleNestedChange("ai_lab_preview", "secondary_button_link", v)} /></div>
                </div>
              </div>
            )}

            {/* How It Works Tab */}
            {activeTab === "how_it_works" && data?.how_it_works && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">How It Works Section</h2>
                <div className="space-y-4 mb-8">
                  <div><InputLabel>Title</InputLabel><Input value={data.how_it_works?.title} onChange={(v) => handleNestedChange("how_it_works", "title", v)} /></div>
                  <div><InputLabel>Subtitle</InputLabel><Input value={data.how_it_works?.subtitle} isTextarea onChange={(v) => handleNestedChange("how_it_works", "subtitle", v)} /></div>
                </div>
                <h3 className="text-lg font-medium mb-4">Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(data.how_it_works?.steps || []).map((step: any, i: number) => (
                    <div key={i} className="bg-muted/30 p-4 rounded-lg space-y-4 border border-border">
                      <div className="font-medium text-sm text-indigo-400 mb-2">Step {i + 1}</div>
                      <div><InputLabel>Title</InputLabel><Input value={step?.title} onChange={(v) => handleArrayChange("how_it_works", "steps", i, "title", v)} /></div>
                      <div><InputLabel>Description</InputLabel><Input value={step?.description} isTextarea onChange={(v) => handleArrayChange("how_it_works", "steps", i, "description", v)} /></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Graphic Design Services Tab */}
            {activeTab === "graphic_svc" && data?.graphic_design_services && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Graphic Services Grid</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div><InputLabel>Badge Text</InputLabel><Input value={data.graphic_design_services?.badge_text} onChange={(v) => handleNestedChange("graphic_design_services", "badge_text", v)} /></div>
                  <div><InputLabel>Title</InputLabel><Input value={data.graphic_design_services?.title} onChange={(v) => handleNestedChange("graphic_design_services", "title", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Description</InputLabel><Input value={data.graphic_design_services?.description} isTextarea onChange={(v) => handleNestedChange("graphic_design_services", "description", v)} /></div>
                </div>

                <h3 className="text-lg font-medium mb-4">Service Options</h3>
                <div className="space-y-4">
                  {(data.graphic_design_services?.services || []).map((service: any, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row gap-4 items-start bg-muted/30 p-4 rounded-lg border border-border">
                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div><InputLabel>Service Name</InputLabel><Input value={service?.title} onChange={(v) => handleArrayChange("graphic_design_services", "services", i, "title", v)} /></div>
                          <div><InputLabel>Starting Price</InputLabel><Input value={service?.price} onChange={(v) => handleArrayChange("graphic_design_services", "services", i, "price", v)} /></div>
                          <div><InputLabel>Tailwind Gradient</InputLabel><Input value={service?.color} onChange={(v) => handleArrayChange("graphic_design_services", "services", i, "color", v)} /></div>
                        </div>
                        <div><InputLabel>Background Image URL / Upload</InputLabel><ImageUploadField value={service?.image} onChange={(v) => handleArrayChange("graphic_design_services", "services", i, "image", v)} /></div>
                        <div><InputLabel>Description</InputLabel><Input value={service?.description} onChange={(v) => handleArrayChange("graphic_design_services", "services", i, "description", v)} /></div>
                      </div>
                      <Button variant="destructive" size="icon" className="shrink-0" onClick={() => removeArrayItem("graphic_design_services", "services", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem("graphic_design_services", "services", { title: "New Service", description: "", price: "₹999+", image: "", color: "from-blue-500/80 to-indigo-500/80" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Service Option
                  </Button>
                </div>
              </div>
            )}

            {/* About Section Tab */}
            {activeTab === "about" && data?.about_section && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">About Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2"><InputLabel>Story Statement</InputLabel><Input value={data.about_section?.title} isRich onChange={(v) => handleNestedChange("about_section", "title", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Foundational Narrative (P1)</InputLabel><Input value={data.about_section?.paragraph1} isRich onChange={(v) => handleNestedChange("about_section", "paragraph1", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Visionary Narrative (P2)</InputLabel><Input value={data.about_section?.paragraph2} isRich onChange={(v) => handleNestedChange("about_section", "paragraph2", v)} /></div>

                  {/* Stats */}
                  <div className="bg-muted/30 p-4 rounded-lg space-y-4 border border-border md:col-span-2">
                    <h3 className="font-medium">Quick Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <InputLabel>Stat 1 Value</InputLabel><Input value={data.about_section?.stat1_value} onChange={(v) => handleNestedChange("about_section", "stat1_value", v)} />
                        <div className="mt-2"><InputLabel>Stat 1 Label</InputLabel><Input value={data.about_section?.stat1_label} onChange={(v) => handleNestedChange("about_section", "stat1_label", v)} /></div>
                      </div>
                      <div>
                        <InputLabel>Stat 2 Value</InputLabel><Input value={data.about_section?.stat2_value} onChange={(v) => handleNestedChange("about_section", "stat2_value", v)} />
                        <div className="mt-2"><InputLabel>Stat 2 Label</InputLabel><Input value={data.about_section?.stat2_label} onChange={(v) => handleNestedChange("about_section", "stat2_label", v)} /></div>
                      </div>
                      <div>
                        <InputLabel>Stat 3 Value</InputLabel><Input value={data.about_section?.stat3_value} onChange={(v) => handleNestedChange("about_section", "stat3_value", v)} />
                        <div className="mt-2"><InputLabel>Stat 3 Label</InputLabel><Input value={data.about_section?.stat3_label} onChange={(v) => handleNestedChange("about_section", "stat3_label", v)} /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === "testimonials" && data?.testimonials && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Testimonials Section</h2>
                <div className="mb-8">
                  <InputLabel>Section Title</InputLabel>
                  <Input value={data.testimonials?.title} onChange={(v) => handleNestedChange("testimonials", "title", v)} />
                </div>

                <div className="space-y-4">
                  {(data.testimonials?.list || []).map((testimonial: any, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row gap-4 items-start bg-muted/30 p-4 rounded-lg border border-border">
                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div><InputLabel>Author Name</InputLabel><Input value={testimonial?.author} onChange={(v) => handleArrayChange("testimonials", "list", i, "author", v)} /></div>
                          <div><InputLabel>Author Role</InputLabel><Input value={testimonial?.role} onChange={(v) => handleArrayChange("testimonials", "list", i, "role", v)} /></div>
                          <div>
                            <InputLabel>Rating (out of 5)</InputLabel>
                            <input
                              type="number" min="1" max="5"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={testimonial?.rating}
                              onChange={(e) => handleArrayChange("testimonials", "list", i, "rating", parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                        <div><InputLabel>Experience Details</InputLabel><Input value={testimonial?.content} isRich onChange={(v) => handleArrayChange("testimonials", "list", i, "content", v)} /></div>
                      </div>
                      <Button variant="destructive" size="icon" className="shrink-0" onClick={() => removeArrayItem("testimonials", "list", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem("testimonials", "list", { id: Date.now(), content: "", author: "Jane Doe", role: "CEO", rating: 5 })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                  </Button>
                </div>
              </div>
            )}

            {/* Blog Preview Tab */}
            {activeTab === "blog" && data?.blog_preview && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Blog Preview Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div><InputLabel>Badge Text</InputLabel><Input value={data.blog_preview?.badge_text} onChange={(v) => handleNestedChange("blog_preview", "badge_text", v)} /></div>
                  <div><InputLabel>Title</InputLabel><Input value={data.blog_preview?.title} onChange={(v) => handleNestedChange("blog_preview", "title", v)} /></div>
                  <div><InputLabel>Button Text</InputLabel><Input value={data.blog_preview?.button_text} onChange={(v) => handleNestedChange("blog_preview", "button_text", v)} /></div>
                  <div><InputLabel>Button Link Route</InputLabel><Input value={data.blog_preview?.button_link} onChange={(v) => handleNestedChange("blog_preview", "button_link", v)} /></div>
                </div>

                <h3 className="text-lg font-medium mb-4">Blog Posts</h3>
                <div className="space-y-4">
                  {(data.blog_preview?.posts || []).map((post: any, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row gap-4 items-start bg-muted/30 p-4 rounded-lg border border-border">
                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><InputLabel>Post Title</InputLabel><Input value={post?.title} onChange={(v) => handleArrayChange("blog_preview", "posts", i, "title", v)} /></div>
                          <div><InputLabel>Post ID (Link slug)</InputLabel><Input value={post?.id} onChange={(v) => handleArrayChange("blog_preview", "posts", i, "id", v)} /></div>
                          <div><InputLabel>Date</InputLabel><Input value={post?.date} onChange={(v) => handleArrayChange("blog_preview", "posts", i, "date", v)} /></div>
                          <div><InputLabel>Category</InputLabel><Input value={post?.category} onChange={(v) => handleArrayChange("blog_preview", "posts", i, "category", v)} /></div>
                          <div><InputLabel>Read Time</InputLabel><Input value={post?.readTime} onChange={(v) => handleArrayChange("blog_preview", "posts", i, "readTime", v)} /></div>
                        </div>
                        <div><InputLabel>Image URL / Upload</InputLabel><ImageUploadField value={post?.image} onChange={(v) => handleArrayChange("blog_preview", "posts", i, "image", v)} /></div>
                        <div><InputLabel>Excerpt / Description</InputLabel><Input value={post?.excerpt} isTextarea onChange={(v) => handleArrayChange("blog_preview", "posts", i, "excerpt", v)} /></div>
                      </div>
                      <Button variant="destructive" size="icon" className="shrink-0" onClick={() => removeArrayItem("blog_preview", "posts", i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem("blog_preview", "posts", { id: "new-post", title: "New Blog Post", excerpt: "", date: "Jan 01, 2026", category: "News", readTime: "5 min read", image: "" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Blog Post
                  </Button>
                </div>
              </div>
            )}

            {/* Final CTA Tab */}
            {activeTab === "cta" && data?.final_cta && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Final Call To Action Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2"><InputLabel>Title</InputLabel><Input value={data.final_cta?.title} onChange={(v) => handleNestedChange("final_cta", "title", v)} /></div>
                  <div className="md:col-span-2"><InputLabel>Description</InputLabel><Input value={data.final_cta?.description} isTextarea onChange={(v) => handleNestedChange("final_cta", "description", v)} /></div>
                  <div><InputLabel>Primary Button Text</InputLabel><Input value={data.final_cta?.primary_button_text} onChange={(v) => handleNestedChange("final_cta", "primary_button_text", v)} /></div>
                  <div><InputLabel>Primary Button Link Route</InputLabel><Input value={data.final_cta?.primary_button_link} onChange={(v) => handleNestedChange("final_cta", "primary_button_link", v)} /></div>
                  <div><InputLabel>Secondary Button Text</InputLabel><Input value={data.final_cta?.secondary_button_text} onChange={(v) => handleNestedChange("final_cta", "secondary_button_text", v)} /></div>
                  <div><InputLabel>Secondary Button Link Route</InputLabel><Input value={data.final_cta?.secondary_button_link} onChange={(v) => handleNestedChange("final_cta", "secondary_button_link", v)} /></div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
