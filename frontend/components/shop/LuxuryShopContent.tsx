"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    ShoppingBag, 
    Heart, 
    Star, 
    ArrowRight,
    SlidersHorizontal,
    Loader2,
    PackageOpen
} from "lucide-react";
import Link from "next/link";
import { cn, fetchWithAuth } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

const categories = ["All Creations", "Spiritual Art", "E-commerce Assets", "Branding Kits", "Invitation Suites"];

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
    inventory_count: number;
    is_active: boolean;
}

export function LuxuryShopContent({ cmsData }: { cmsData?: any }) {
    const [activeCategory, setActiveCategory] = useState("All Creations");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    const addItem = useCartStore((state: any) => state.addItem);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const path = activeCategory === "All Creations" 
                    ? "/api/v1/products"
                    : `/api/v1/products?category=${encodeURIComponent(activeCategory)}`;
                const res = await fetchWithAuth(path);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error("Products fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeCategory]);

    const filtered = products.filter(p =>
        searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const safeHero = cmsData?.hero || {};

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-8 lg:px-16 overflow-hidden">
            {/* Mesh Background */}
            <div className="fixed inset-0 z-0 mesh-gradient opacity-10 pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-6"
                        >
                            <ShoppingBag className="w-3 h-3" />
                            <span>{safeHero.badge || "Elite Marketplace"}</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white">
                            {safeHero.title_prefix || "THE"} <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-amber-200 to-primary">{safeHero.title_highlight || "COLLECTION"}</span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-col items-end gap-6">
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-6 py-3 w-full md:w-80">
                            <Search className="w-4 h-4 text-slate-500" />
                            <input 
                                type="text" 
                                placeholder="Search creations..."
                                className="bg-transparent border-none outline-none text-sm font-medium w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                                    activeCategory === cat 
                                        ? "bg-primary text-black" 
                                        : "bg-white/5 text-slate-500 hover:text-white border border-white/5"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    
                    <Button 
                        variant="ghost" 
                        className="h-10 px-6 rounded-full border border-white/10 gap-2 text-[10px] font-black uppercase tracking-widest"
                    >
                        <SlidersHorizontal className="w-4 h-4" /> FILTERS
                    </Button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading ? (
                        Array.from({length: 6}).map((_, i) => (
                            <div key={i} className="glass-card rounded-[3rem] p-4 border-white/5">
                                <div className="aspect-[4/5] rounded-[2.5rem] bg-white/5 animate-pulse" />
                                <div className="px-6 py-4 space-y-3">
                                    <div className="h-6 bg-white/5 rounded-full w-3/4 animate-pulse" />
                                    <div className="h-4 bg-white/5 rounded-full w-1/2 animate-pulse" />
                                </div>
                            </div>
                        ))
                    ) : filtered.length > 0 ? (
                        filtered.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="glass-card rounded-[3rem] p-4 mb-6 border-white/5 group-hover:border-primary/20 transition-all duration-700">
                                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-900 relative">
                                        <img 
                                            src={product.image_url} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80"
                                        />
                                        
                                        {/* Action Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                            <div className="flex items-center gap-3">
                                                <Button 
                                                    onClick={() => addItem({ id: String(product.id), name: product.name, price: product.price, image: product.image_url, quantity: 1 })}
                                                    className="flex-1 h-12 rounded-2xl bg-primary text-black font-black text-[10px] uppercase tracking-widest hover:bg-primary/90"
                                                >
                                                    QUICK ADD
                                                </Button>
                                                <Button variant="secondary" className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 p-0">
                                                    <Heart className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="absolute top-8 left-8">
                                            <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="px-6 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">{product.name}</h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl font-bold tracking-tighter text-slate-300">₹{product.price.toLocaleString()}</p>
                                        <Link href={`/shop/${product.id}`} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center gap-2 group/link">
                                            DETAILS <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
                            <PackageOpen className="w-20 h-20 text-slate-800 mb-6" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">No Creations Found</h3>
                            <p className="text-sm text-slate-500 max-w-md">
                                {searchQuery ? `No results for "${searchQuery}".` : "The marketplace is being curated. Check back soon."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
