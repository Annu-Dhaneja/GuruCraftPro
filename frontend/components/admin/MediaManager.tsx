"use client";

import React, { useEffect, useState } from "react";
import { 
    Image as ImageIcon, 
    Plus, 
    Search, 
    Filter, 
    MoreVertical, 
    Download, 
    Trash2,
    Grid,
    List as ListIcon,
    Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiUrl, safeFetch } from "@/lib/utils";
import { BulkUrlImportModal } from "./media/BulkUrlImportModal";

export function MediaManager() {
    const [media, setMedia] = useState<any[]>([]);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

    const fetchMedia = async () => {
        const res = await safeFetch(getApiUrl("/api/v1/cms/media"), {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.ok) setMedia(await res.json());
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    return (
        <div className="space-y-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <Input 
                            placeholder="Filter assets by name or tag..." 
                            className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl italic font-medium"
                        />
                    </div>
                    <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/10 hover:bg-white/5">
                        <Filter size={18} />
                    </Button>
                </div>
                <div className="flex gap-4">
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                        <Button variant="ghost" size="icon" className="rounded-xl bg-white/10"><Grid size={18} /></Button>
                        <Button variant="ghost" size="icon" className="rounded-xl text-slate-500"><ListIcon size={18} /></Button>
                    </div>
                    <Button 
                        variant="outline"
                        onClick={() => setIsBulkModalOpen(true)}
                        className="h-14 w-14 rounded-2xl border-white/10 hover:bg-white/5 text-indigo-400"
                    >
                        <LinkIcon size={18} />
                    </Button>
                    <Button className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-white hover:text-black font-black transition-all gap-2">
                        <Plus size={18} /> UPLOAD ASSET
                    </Button>
                </div>
            </div>

            <BulkUrlImportModal 
                isOpen={isBulkModalOpen} 
                onClose={() => setIsBulkModalOpen(false)} 
                onSuccess={fetchMedia}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {media.length > 0 ? media.map((item) => (
                    <div key={item.id} className="group relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-slate-900">
                        <img 
                            src={item.file_url} 
                            alt={item.file_name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                            <p className="text-[10px] font-bold truncate mb-2">{item.file_name}</p>
                            <div className="flex gap-2">
                                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all">
                                    <Download size={12} />
                                </Button>
                                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-rose-500/20 backdrop-blur-md border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
                                    <Trash2 size={12} />
                                </Button>
                            </div>
                        </div>
                    </div>
                )) : (
                    Array.from({length: 12}).map((_, i) => (
                        <div key={i} className="aspect-square rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center p-6 text-center animate-pulse">
                            <ImageIcon className="w-8 h-8 text-slate-700 mb-2" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-800">Empty Sector</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
