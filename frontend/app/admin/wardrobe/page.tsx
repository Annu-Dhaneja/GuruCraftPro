"use client";

import { useState, useEffect } from "react";
import { UploadCloud, Trash2, Plus, Sparkles, Filter, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getApiUrl } from "@/lib/utils";
import Link from "next/link";

const GENDERS = ["Male", "Female", "Unisex"];
const AGES = ["Kids", "Teens", "Adult", "Senior"];
const STYLES = ["Formal", "Casual", "Traditional", "Fusion"];

export default function AdminWardrobePage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [filters, setFilters] = useState({ gender: "", age: "", style: "" });
    const [newItem, setNewItem] = useState({ name: "", gender: "Female", age: "Adult", style: "Casual", images: [] as File[] });

    useEffect(() => {
        fetchItems();
    }, [filters]);

    const fetchItems = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const query = new URLSearchParams();
        if (filters.gender && filters.gender !== "null") query.append("gender", filters.gender);
        if (filters.age && filters.age !== "null") query.append("age_group", filters.age);
        if (filters.style && filters.style !== "null") query.append("style", filters.style);

        try {
            const res = await fetch(getApiUrl(`/api/v1/wardrobe/items?${query.toString()}`), {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.images.length === 0) return;

        setUploading(true);
        const token = localStorage.getItem("token");
        
        try {
            // Upload each image sequentially
            for (const file of newItem.images) {
                const formData = new FormData();
                formData.append("name", newItem.name || file.name.split('.')[0]); // Use file name if name not provided
                formData.append("gender", newItem.gender);
                formData.append("age_group", newItem.age);
                formData.append("style", newItem.style);
                formData.append("image", file);

                await fetch(getApiUrl("/api/v1/wardrobe/items"), {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData
                });
            }
            
            setNewItem({ ...newItem, name: "", images: [] });
            fetchItems();
        } catch (e) {
            console.error("Bulk Upload Error:", e);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this clothing item?")) return;
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(getApiUrl(`/api/v1/wardrobe/items/${id}`), {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchItems();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 pb-20">
            {/* Simple Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Wardrobe Management</h1>
                        <p className="text-muted-foreground text-sm font-medium mt-1">Bulk manage clothing photos for the Suggestion Engine.</p>
                    </div>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
                    <span className="text-xs font-bold text-indigo-300">{items.length} Assets Live</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Bulk Upload Form */}
                <div className="lg:col-span-1 border border-white/10 bg-slate-900 rounded-2xl p-6 h-fit shadow-xl">
                    <h2 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                        <Plus className="w-5 h-5 text-indigo-400" />
                        Bulk Add Pieces
                    </h2>
                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-muted-foreground">Common Name Prefix (Optional)</Label>
                            <Input 
                                className="bg-white/5 border-white/10"
                                value={newItem.name} 
                                onChange={e => setNewItem({...newItem, name: e.target.value})} 
                                placeholder="e.g. Summer Collection" 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-muted-foreground">Gender</Label>
                                <Select value={newItem.gender} onValueChange={v => setNewItem({...newItem, gender: v})}>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-muted-foreground">Age</Label>
                                <Select value={newItem.age} onValueChange={v => setNewItem({...newItem, age: v})}>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AGES.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-muted-foreground">Default Style</Label>
                            <Select value={newItem.style} onValueChange={v => setNewItem({...newItem, style: v})}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STYLES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-muted-foreground">Clothing Photos</Label>
                            <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 hover:border-indigo-500/50 transition-colors group cursor-pointer text-center bg-white/5">
                                <input 
                                    type="file" 
                                    multiple
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    onChange={e => {
                                        const files = Array.from(e.target.files || []);
                                        setNewItem({...newItem, images: files});
                                    }}
                                />
                                {newItem.images.length > 0 ? (
                                    <div className="text-xs font-bold text-indigo-400 capitalize">{newItem.images.length} Photos Selected</div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <UploadCloud className="w-8 h-8 text-muted-foreground" />
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Drag & Drop Multiple</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 rounded-xl transition-all active:scale-[0.98]" 
                            disabled={uploading || newItem.images.length === 0}
                        >
                            {uploading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Processing Bulk...
                                </span>
                            ) : `Upload ${newItem.images.length} Items`}
                        </Button>
                    </form>
                </div>

                {/* Assets Grid */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                        <Filter className="w-4 h-4 text-indigo-400" />
                        <Select value={filters.gender} onValueChange={v => setFilters({...filters, gender: v})}>
                            <SelectTrigger className="w-[120px] bg-transparent border-0 font-bold focus:ring-0 text-xs">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="null">All Genders</SelectItem>
                                {GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={filters.age} onValueChange={v => setFilters({...filters, age: v})}>
                            <SelectTrigger className="w-[120px] bg-transparent border-0 font-bold focus:ring-0 text-xs">
                                <SelectValue placeholder="Age Group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="null">All Ages</SelectItem>
                                {AGES.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={filters.style} onValueChange={v => setFilters({...filters, style: v})}>
                            <SelectTrigger className="w-[120px] bg-transparent border-0 font-bold focus:ring-0 text-xs">
                                <SelectValue placeholder="Style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="null">All Styles</SelectItem>
                                {STYLES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {loading ? (
                            <div className="col-span-full py-20 text-center text-muted-foreground font-medium">Loading Items...</div>
                        ) : items.length === 0 ? (
                            <div className="col-span-full py-20 border border-dashed border-white/10 rounded-2xl text-center text-muted-foreground italic font-medium">
                                No clothing pieces found matching these filters.
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-slate-950">
                                    <img 
                                        src={item.image_url.startsWith("http") ? item.image_url : getApiUrl(item.image_url)} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        alt={item.name} 
                                    />
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                                        <h4 className="text-[10px] font-black uppercase text-white mb-2 truncate px-2 w-full">{item.name || "Unnamed"}</h4>
                                        <div className="flex flex-col gap-1 mb-4">
                                            <span className="text-[8px] font-bold text-white/50">{item.gender} • {item.age_group}</span>
                                            <span className="text-[8px] bg-indigo-500/80 px-2 py-0.5 rounded-full text-white font-bold">{item.style}</span>
                                        </div>
                                        <Button variant="destructive" size="sm" className="h-8 px-3 rounded-lg font-bold" onClick={() => handleDelete(item.id)}>
                                            <Trash2 className="w-3 h-3 mr-2" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
        </div>
    );
}
