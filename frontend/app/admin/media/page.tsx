"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Folder, Image as ImageIcon, Copy, FileIcon, Search } from "lucide-react";
import Image from "next/image";

export default function MediaManager() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/v1/media");
      if (res.ok) setMedia(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/media/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });
      if (res.ok) {
        loadMedia();
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
    setUploading(false);
  };

  const deleteMedia = async (id: number) => {
    if(!confirm("Are you sure you want to delete this file?")) return;
    try {
      const res = await fetchWithAuth(`/api/v1/media/${id}`, { method: "DELETE" });
      if (res.ok) loadMedia();
    } catch(e) { console.error(e); }
  };

  const copyUrl = (url: string) => {
    // Construct full URL using backend url since images are hosted there
    const fullUrl = process.env.NEXT_PUBLIC_API_URL + url;
    navigator.clipboard.writeText(fullUrl);
    alert("URL Copied to clipboard!");
  };

  const filteredMedia = media.filter(m => m.file_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-10 space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">Media Manager</h1>
          <p className="text-slate-400">Manage all assets and images across the platform.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              className="pl-10 bg-slate-900 border-white/10 w-64" 
              placeholder="Search files..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button disabled={uploading} className="bg-indigo-600 relative overflow-hidden">
            {uploading ? "Uploading..." : <><Upload className="w-4 h-4 mr-2"/> Upload File</>}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleUpload}
            />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">Loading media...</div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredMedia.map(m => {
              const isImage = m.file_name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
              const url = process.env.NEXT_PUBLIC_API_URL + m.file_url;
              
              return (
                <div key={m.id} className="group glass-card rounded-xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-colors">
                  <div className="aspect-square bg-black/50 relative flex items-center justify-center">
                    {isImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt={m.file_name} className="object-cover w-full h-full" />
                    ) : (
                      <FileIcon className="w-12 h-12 text-slate-600" />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" onClick={() => copyUrl(m.file_url)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => deleteMedia(m.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium truncate" title={m.file_name}>{m.file_name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {m.size_bytes ? `${(m.size_bytes / 1024).toFixed(1)} KB` : 'Unknown size'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredMedia.length === 0 && (
            <div className="p-20 text-center text-slate-500 border border-dashed border-white/10 rounded-2xl">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No media files found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
