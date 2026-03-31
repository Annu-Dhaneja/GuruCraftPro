"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  Info,
  Tag,
  Users,
  Wind,
  Layers,
  Palette,
  CloudUpload,
  Search,
  Globe,
  PenTool
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import Link from "next/link";

// --- Helpers ---
const Input = ({ value, onChange, className = "" }: { value: string, onChange: (v: string) => void, className?: string }) => (
    <input 
      type="text" 
      value={value || ""} 
      onChange={e => onChange(e.target.value)} 
      className={`bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all ${className}`} 
    />
);

// --- Design Tokens ---
const GENDERS = ["male", "female", "transgender"];
const AGE_GROUPS = ["baby", "kids", "teen", "young_adult", "adult", "senior"];
const STYLES = ["Formal", "Casual", "Traditional", "Fusion"];

export default function AdminClothesPlanner() {
  const [outfits, setOutfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Bulk Upload State
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  
  // Batch Tags
  const [batchTags, setBatchTags] = useState({
    gender: "female",
    age_group: "young_adult",
    style: "Casual",
    season: "All",
    occasion: "Daily wear",
    color: "#000000"
  });

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} selected items?`)) return;
    try {
      for (const id of selectedIds) {
        await fetch(getApiUrl(`/api/v1/outfits/${id}`), { method: "DELETE" });
      }
      setSelectedIds([]);
      fetchOutfits();
    } catch (err) {
      console.error("Bulk delete error:", err);
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/v1/outfits/"));
      const data = await res.json();
      setOutfits(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': [] }
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadBatch = async () => {
    if (files.length === 0) return;
    setUploading(true);
    
    try {
      for (const file of files) {
        const base64 = await toBase64(file);
        
        await fetch(getApiUrl("/api/v1/outfits/"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: base64,
            gender: batchTags.gender,
            age_group: batchTags.age_group,
            style: batchTags.style,
            season: batchTags.season,
            occasion: batchTags.occasion,
            color: batchTags.color
          })
        });
      }
      setFiles([]);
      fetchOutfits();
    } catch (err) {
      console.error("Batch upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this outfit?")) return;
    try {
      const res = await fetch(getApiUrl(`/api/v1/outfits/${id}`), { method: "DELETE" });
      if (res.ok) fetchOutfits();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Fashion Matrix Ingest</h1>
          <p className="text-muted-foreground font-medium mt-2">Scalable orchestration of high-fidelity clothing assets.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Library Scale</p>
                <p className="text-2xl font-bold text-white">{outfits.length} Visuals</p>
            </div>
            <Link href="/services/7-day-clothing-consultation" target="_blank">
                <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/10 hover:bg-white/5 gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">View Live</span>
                </Button>
            </Link>
            <Link href="/admin/services/7-day-clothing-consultation">
                <Button variant="outline" className="h-12 px-6 rounded-2xl border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 gap-2 text-indigo-400">
                    <PenTool className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Edit Content</span>
                </Button>
            </Link>
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                <Layers className="w-6 h-6" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Batch Processing */}
        <div className="lg:col-span-1 space-y-8">
            <section className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 space-y-8 shadow-2xl">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white italic">Bulk Ingestion</h2>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Drag & Drop Orchestration</p>
                </div>

                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-[2.5rem] p-12 text-center transition-all cursor-pointer ${isDragActive ? 'bg-indigo-500/10 border-indigo-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                    <input {...getInputProps()} />
                    <CloudUpload className="w-12 h-12 mx-auto text-indigo-400 mb-4 animate-bounce" />
                    <p className="text-sm font-bold text-white">Drop visuals to index</p>
                    <p className="text-xs text-muted-foreground mt-2">HEIC, JPEG, PNG supported</p>
                </div>

                {files.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-xs font-black uppercase text-white">{files.length} Ready for Sync</span>
                            <button onClick={() => setFiles([])} className="text-[10px] font-black text-rose-400 uppercase hover:text-rose-300">Clear All</button>
                        </div>
                        <div className="max-h-48 overflow-y-auto space-y-2 pr-2 no-scrollbar">
                            {files.map((file, i) => (
                                <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5 group">
                                    <div className="flex items-center gap-3">
                                        <ImageIcon className="w-4 h-4 text-indigo-400" />
                                        <span className="text-xs font-medium text-white truncate max-w-[150px]">{file.name}</span>
                                    </div>
                                    <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-rose-400 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 space-y-10">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white italic">Batch Tagging</h2>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Apply Metadata to Choice</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-3.5 h-3.5" /> Identity Matrix
                        </label>
                        <select 
                            value={batchTags.gender}
                            onChange={(e) => setBatchTags(p=>({...p, gender: e.target.value}))}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        >
                            {GENDERS.map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5" /> Age Group
                        </label>
                        <select 
                            value={batchTags.age_group}
                            onChange={(e) => setBatchTags(p=>({...p, age_group: e.target.value}))}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        >
                            {AGE_GROUPS.map(a => <option key={a} value={a} className="bg-slate-900 uppercase">{a}</option>)}
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                            <Wind className="w-3.5 h-3.5" /> Style Core
                        </label>
                        <select 
                            value={batchTags.style}
                            onChange={(e) => setBatchTags(p=>({...p, style: e.target.value}))}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        >
                            {STYLES.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                        </select>
                    </div>

                    {/* New Color Field */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                            <Palette className="w-3.5 h-3.5" /> Color Accent
                        </label>
                        <div className="flex gap-3">
                            <input 
                                type="color" 
                                value={batchTags.color}
                                onChange={(e) => setBatchTags(p=>({...p, color: e.target.value}))}
                                className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 cursor-pointer p-1"
                            />
                            <Input 
                                value={batchTags.color} 
                                onChange={(v) => setBatchTags(p=>({...p, color: v}))}
                                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 text-xs font-mono font-bold text-white uppercase"
                            />
                        </div>
                    </div>
                </div>

                <Button 
                    onClick={uploadBatch}
                    disabled={uploading || files.length === 0}
                    className="w-full bg-indigo-600 hover:bg-white hover:text-black rounded-2xl py-8 font-black tracking-widest uppercase shadow-2xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                    {uploading ? 'Processing Matrix...' : `Deploy ${files.length} Visuals`}
                </Button>
            </section>
        </div>

        {/* Right Column: Library Display */}
        <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter">INDEXED ASSETS</h2>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgb(16,185,129)]" />
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active Matrix</span>
                    </div>
                </div>
                
                {/* Advanced Filtering */}
                <div className="flex flex-wrap gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-muted-foreground" />
                        <input 
                            placeholder="Filter library..." 
                            className="bg-transparent border-none text-[10px] font-bold text-white focus:ring-0 w-24 outline-none"
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        disabled={selectedIds.length === 0}
                        onClick={handleBulkDelete}
                        className="bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest px-4"
                    >
                        <Trash2 className="w-3 h-3 mr-2" />
                        Purge Selected ({selectedIds.length})
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({length: 6}).map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-white/5 rounded-[2.5rem] animate-pulse border border-white/5" />
                    ))
                ) : outfits.filter(o => !filter || o.style.toLowerCase().includes(filter.toLowerCase()) || o.gender.toLowerCase().includes(filter.toLowerCase())).map((outfit) => (
                    <div 
                        key={outfit.id} 
                        onClick={() => toggleSelection(outfit.id)}
                        className={`group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border transition-all duration-500 shadow-2xl cursor-pointer ${selectedIds.includes(outfit.id) ? 'border-indigo-500 bg-indigo-500/10 scale-[0.98]' : 'border-white/10 hover:border-indigo-500/50'}`}
                    >
                        <img src={outfit.image_url} className={`w-full h-full object-cover transition-transform duration-700 ${selectedIds.includes(outfit.id) ? 'opacity-50' : 'group-hover:scale-110'}`} alt="Outfit" />
                        
                        {/* Selected Indicator */}
                        {selectedIds.includes(outfit.id) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-indigo-500/20 backdrop-blur-[2px]">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-2xl animate-in zoom-in-50 duration-300">
                                    <Check className="w-6 h-6 stroke-[4]" />
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Meta Badges */}
                        <div className="absolute bottom-6 left-6 right-6 space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-indigo-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest">{outfit.style}</span>
                                <span className="bg-white/20 backdrop-blur-md text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest">{outfit.gender}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-white uppercase italic">{outfit.age_group}</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(outfit.id); }}
                                    className="w-8 h-8 bg-rose-500/20 hover:bg-rose-500 transition-all rounded-lg flex items-center justify-center text-rose-400 hover:text-white"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {outfits.length === 0 && !loading && (
                <div className="py-40 text-center space-y-6">
                    <div className="w-20 h-20 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center mx-auto text-muted-foreground">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                    <p className="text-muted-foreground font-medium italic">Archive static. Use the ingestion portal to begin indexing.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
