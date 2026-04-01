"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shirt, 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink, 
  CloudOff,
  Sparkles,
  ArrowRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface WardrobeItem {
  id: number;
  name: string;
  image_url: string;
  gender: string;
  age_group: string;
  style: string;
}

export function WardrobeGrid() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ gender: "", style: "", age_group: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchItems();
  }, [filter]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      let url = `${API_URL}/api/v1/wardrobe/items?`;
      if (filter.gender) url += `gender=${filter.gender}&`;
      if (filter.style) url += `style=${filter.style}&`;
      if (filter.age_group) url += `age_group=${filter.age_group}&`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to fetch wardrobe");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Wardrobe Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      
      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 sticky top-20 z-30 shadow-2xl">
        <div className="relative group flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
          <input 
            type="text"
            placeholder="Search your exquisite collection..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <select 
            className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-500/50"
            value={filter.gender}
            onChange={(e) => setFilter({...filter, gender: e.target.value})}
          >
            <option value="">All Genders</option>
            <option value="Male">Gentlemen</option>
            <option value="Female">Ladies</option>
            <option value="Unisex">Unisex</option>
          </select>

          <select 
            className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-500/50"
            value={filter.style}
            onChange={(e) => setFilter({...filter, style: e.target.value})}
          >
            <option value="">All Styles</option>
            <option value="Casual">Casual Elite</option>
            <option value="Formal">Formal Royal</option>
            <option value="Ethnic">Ethnic Traditional</option>
            <option value="Party">Avant-Garde</option>
          </select>

          <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-white/5" onClick={fetchItems}>
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* ITEMS GRID */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-white/5 rounded-[2rem] animate-pulse border border-white/10" />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <Card className="bg-slate-900/40 border-white/10 overflow-hidden rounded-[2.5rem] backdrop-blur-sm group-hover:border-indigo-500/30 transition-all duration-500 shadow-xl group-hover:shadow-indigo-500/10">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={getImageUrl(item.image_url)} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                       <Button variant="secondary" size="sm" className="w-full rounded-xl bg-white/10 backdrop-blur-md border-white/20 hover:bg-white text-black font-bold">
                         <Sparkles className="w-4 h-4 mr-2" /> Try Virtually
                       </Button>
                    </div>
                    {item.image_url.startsWith("http") && (
                      <Badge className="absolute top-4 right-4 bg-indigo-600/80 backdrop-blur-md border-white/10">
                        <ExternalLink className="w-3 h-3 mr-1" /> External Link
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-bold text-white truncate group-hover:text-indigo-300 transition-colors">{item.name}</h3>
                    <div className="flex flex-wrap gap-2">
                       <Badge variant="outline" className="bg-white/5 border-white/5 text-[10px] uppercase tracking-tighter">{item.style}</Badge>
                       <Badge variant="outline" className="bg-white/5 border-white/5 text-[10px] uppercase tracking-tighter">{item.gender}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 bg-slate-900/40 rounded-[3rem] border border-white/5 backdrop-blur-sm">
           <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <CloudOff className="w-8 h-8 text-zinc-500" />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-white">Wardrobe is empty</h3>
              <p className="text-muted-foreground mt-2">Start your digital curation in the Admin Studio.</p>
           </div>
           <Button asChild variant="outline" className="rounded-2xl px-8 border-white/10">
              <Link href="/admin/wardrobe">Access Admin Studio <ArrowRight className="ml-2 w-4 h-4" /></Link>
           </Button>
        </div>
      )}

      {/* CTA SECTION */}
      <div className="mt-32 p-1 relative rounded-[3rem] overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 animate-gradient" />
         <div className="relative bg-slate-950 p-12 rounded-[2.9rem] flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left">
               <h2 className="text-3xl md:text-5xl font-black tracking-tighter">PLAN YOUR LOOKS</h2>
               <p className="text-zinc-400 max-w-md">Our AI engine analyzes your wardrobe to suggest the perfect 7-day outfit rotation based on your style DNA.</p>
            </div>
            <Button size="lg" className="rounded-full px-12 h-16 text-lg bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/40" asChild>
               <Link href="/services/7-day-cloths">Generate Style Forecast <ArrowRight className="ml-2" /></Link>
            </Button>
         </div>
      </div>
    </div>
  );
}
