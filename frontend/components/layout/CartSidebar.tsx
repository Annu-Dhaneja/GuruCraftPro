"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CartSidebar() {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#020617] border-l border-white/5 z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-black uppercase tracking-tighter italic">Your <span className="text-primary">Selection</span></h2>
                            </div>
                            <Button variant="ghost" size="icon" onClick={toggleCart} className="rounded-full hover:bg-white/5">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                                    <ShoppingBag className="w-16 h-16 mb-4" />
                                    <p className="text-sm font-bold uppercase tracking-widest">Your bag is empty</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        <div className="w-24 h-32 rounded-2xl bg-slate-900 overflow-hidden flex-shrink-0 border border-white/5">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-2">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-sm font-black uppercase tracking-tight line-clamp-2">{item.name}</h3>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => removeItem(item.id)}
                                                        className="h-6 w-6 text-slate-500 hover:text-rose-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <p className="text-xs font-bold text-primary mt-1">₹{item.price.toLocaleString()}</p>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-white/5 rounded-lg border border-white/5">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:text-primary transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-black w-6 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:text-primary transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/5 bg-[#020617]/80 backdrop-blur-xl">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Subtotal</span>
                                <span className="text-2xl font-black tracking-tighter">₹{getTotal().toLocaleString()}</span>
                            </div>
                            
                            <Link href="/checkout" onClick={toggleCart}>
                                <Button 
                                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs gap-2"
                                    disabled={items.length === 0}
                                >
                                    PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            
                            <p className="text-center text-[10px] text-slate-600 mt-6 font-bold uppercase tracking-widest">
                                Free Luxury Shipping Included
                            </p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
