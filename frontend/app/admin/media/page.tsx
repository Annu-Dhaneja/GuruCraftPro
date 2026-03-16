"use client";

import { useEffect, useState } from "react";
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Copy, 
  ExternalLink,
  Search,
  Filter,
  Grid,
  List,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(getApiUrl("/api/v1/cms/media"))
      .then(res => res.json())
      .then(data => {
        setMedia(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Media Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const copyToClipboard = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Asset Intelligence</h1>
          <p className="text-muted-foreground font-medium mt-2">Centralized media matrix for all platform visuals.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-6 px-8 font-bold shadow-xl shadow-indigo-600/20">
          <Upload className="w-5 h-5 mr-3" />
          Ingest Assets
        </Button>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search asset database..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
                <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                    <button className="p-2 bg-indigo-500 text-white rounded-lg shadow-lg"><Grid className="w-4 h-4" /></button>
                    <button className="p-2 text-muted-foreground hover:text-white"><List className="w-4 h-4" /></button>
                </div>
            </div>
        </div>

        {media.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {media.map((asset) => (
              <div key={asset.id} className="group relative bg-black/40 rounded-3xl border border-white/5 overflow-hidden hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
                <div className="aspect-square bg-white/5 relative flex items-center justify-center overflow-hidden">
                   {asset.file_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                     <img src={asset.file_url} alt={asset.file_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   ) : (
                     <ImageIcon className="w-10 h-10 text-white/20" />
                   )}
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => copyToClipboard(asset.file_url, asset.id)}
                        className="p-2 bg-white/10 hover:bg-indigo-500 rounded-lg text-white transition-colors"
                      >
                        {copiedId === asset.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button className="p-2 bg-white/10 hover:bg-destructive rounded-lg text-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>
                <div className="p-4">
                    <p className="text-xs font-bold text-white truncate">{asset.file_name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">
                        {new Date(asset.uploaded_at).toLocaleDateString()}
                    </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-32 text-center space-y-6">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5 text-muted-foreground group">
                <ImageIcon className="w-10 h-10 group-hover:text-indigo-400 transition-colors" />
             </div>
             <div className="max-w-xs mx-auto">
                <h3 className="text-lg font-bold text-white mb-2">Primary Matrix Empty</h3>
                <p className="text-sm text-muted-foreground font-medium">No assets have been detected in the central repository. Ingest files to begin orchestration.</p>
             </div>
             <Button className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-bold hover:bg-indigo-500/20">
                Upload First Asset
             </Button>
          </div>
        )}
      </div>

       <div className="p-8 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 group hover:border-indigo-500/30 transition-all">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
             <ExternalLink className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Advanced Object Storage</h3>
          <p className="text-sm text-muted-foreground max-w-md font-medium">Your assets are currently stored in local physical sectors. For global scale, consider synchronizing with a Cloud Spatial Repository (S3/Cloudinary).</p>
      </div>
    </div>
  );
}
