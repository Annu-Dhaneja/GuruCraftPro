"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, 
    ShoppingBag, 
    Filter, 
    ChevronDown, 
    Heart, 
    Eye, 
    Star, 
    ArrowRight,
    SlidersHorizontal,
    Plus,
    X,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore"; // I'll create this store next

const categories = ["All Creations", "Spiritual Art", "E-commerce Assets", "Branding Kits", "Invitation Suites"];

const products = [
    { id: '1', name: "Divine Aura Bracelet", price: 2499, category: "Spiritual Art", image: "https://images.unsplash.com/photo-1611078838275-5fc0c75ff0d1?q=80&w=800", rating: 4.9, reviews: 124 },
    { id: '2', name: "Vantage Master Bundle", price: 9999, category: "E-commerce Assets", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800", rating: 5.0, reviews: 86 },
    { id: '3', name: "Elite Wedding Identity", price: 15999, category: "Branding Kits", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800", rating: 4.8, reviews: 42 },
    { id: '4', name: "Infinity Peace Pendant", price: 4999, category: "Spiritual Art", image: "https://images.unsplash.com/photo-1573408302315-924f7a250517?q=80&w=800", rating: 4.9, reviews: 58 },
    { id: '5', name: "Product Mockup Suite", price: 3499, category: "E-commerce Assets", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800", rating: 4.7, reviews: 93 },
    { id: '6', name: "Royal Invitation Kit", price: 7999, category: "Invitation Suites", image: "https://images.unsplash.com/photo-1510076857177-74700760beaa?q=80&w=800", rating: 5.0, reviews: 31 },
];

export default function LuxuryShopPage() {
    const [activeCategory, setActiveCategory] = useState("All Creations");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const addItem = useCartStore((state: any) => state.addItem);

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
                            <span>Elite Marketplace</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white">
                            THE <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-amber-200 to-primary">COLLECTION</span>
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
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="h-10 px-6 rounded-full border border-white/10 gap-2 text-[10px] font-black uppercase tracking-widest"
                    >
                        <SlidersHorizontal className="w-4 h-4" /> FILTERS
                    </Button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.filter(p => activeCategory === "All Creations" || p.category === activeCategory).map((product, i) => (
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
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80"
                                    />
                                    
                                    {/* Action Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <div className="flex items-center gap-3">
                                            <Button 
                                                onClick={() => addItem({ ...product, quantity: 1 })}
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
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <Star className="w-3 h-3 fill-amber-400" />
                                        <span className="text-[10px] font-black">{product.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-bold tracking-tighter text-slate-300">₹{product.price.toLocaleString()}</p>
                                    <Link href={`/shop/${product.id}`} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center gap-2 group/link">
                                        DETAILS <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
