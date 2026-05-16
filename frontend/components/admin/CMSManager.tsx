"use client";

import React, { useEffect, useState } from "react";
import { 
    FileText, 
    Plus, 
    Search, 
    Edit, 
    Eye, 
    Trash2, 
    Globe, 
    Lock,
    Clock,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getApiUrl, safeFetch } from "@/lib/utils";

export function CMSManager() {
    const [pages, setPages] = useState<any[]>([]);

    useEffect(() => {
        const fetchPages = async () => {
            const res = await safeFetch(getApiUrl("/api/v1/cms/pages"), {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.ok) {
                const data = await res.json();
                setPages(data);
            }
        };
        fetchPages();
    }, []);

    return (
        <div className="space-y-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <Input 
                        placeholder="Search pages by title or slug..." 
                        className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl italic font-medium"
                    />
                </div>
                <Button className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-white hover:text-black font-black transition-all gap-2">
                    <Plus size={18} /> CREATE PAGE
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pages.map((page) => (
                    <div key={page.slug} className="glass-card p-10 rounded-[3rem] border border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-indigo-600 transition-all duration-500">
                                <FileText className="w-7 h-7 text-slate-400 group-hover:text-white" />
                            </div>
                            <Badge className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-3",
                                page.status === "published" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            )}>
                                {page.status}
                            </Badge>
                        </div>

                        <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-indigo-400 transition-colors">{page.title}</h3>
                        <p className="text-slate-500 text-sm font-medium italic mb-10 flex items-center gap-2">
                            <Globe size={12} /> /{page.slug}
                        </p>

                        <div className="flex items-center justify-between py-6 border-y border-white/5 mb-10">
                            <div className="flex items-center gap-2 text-slate-500 italic text-xs">
                                <Clock size={14} /> <span>Updated {new Date(page.updated_at || page.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-black uppercase">
                                        {i === 1 ? "SA" : "E"}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button className="flex-1 rounded-2xl bg-white text-black hover:bg-indigo-600 hover:text-white font-black text-xs transition-all">
                                <Edit size={14} className="mr-2" /> MANAGE
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-2xl border-white/5 hover:bg-indigo-500/10 hover:text-indigo-400">
                                <Eye size={16} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";
