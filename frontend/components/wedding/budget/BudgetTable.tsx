"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, IndianRupee, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, BudgetItem } from "@/hooks/use-budget";
import { useState } from "react";

interface BudgetTableProps {
  items: BudgetItem[];
  addItem: (category?: string) => void;
  updateItem: (id: string, field: keyof BudgetItem, value: any) => void;
  removeItem: (id: string) => void;
}

export function BudgetTable({ items, addItem, updateItem, removeItem }: BudgetTableProps) {
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const filteredItems = filterCategory === "All" 
    ? items 
    : items.filter(item => item.category === filterCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-4 py-4 border-y border-[#D4AF37]/10">
        <Filter className="w-4 h-4 text-[#D4AF37]" />
        <button 
          onClick={() => setFilterCategory("All")}
          className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${filterCategory === "All" ? 'bg-[#D4AF37] text-white' : 'text-zinc-400 hover:text-[#D4AF37]'}`}
        >
          All Categories
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${filterCategory === cat ? 'bg-[#D4AF37] text-white' : 'text-zinc-400 hover:text-[#D4AF37]'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-6 px-10 py-6 bg-[#2C2C2C] text-white rounded-t-[30px] font-serif italic text-lg shadow-xl shadow-black/5">
        <div className="col-span-4">Particulars</div>
        <div className="col-span-2">Estimated (₹)</div>
        <div className="col-span-2">Actual (₹)</div>
        <div className="col-span-2">Paid (₹)</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Table Body */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center px-6 md:px-10 py-6 bg-white border border-[#D4AF37]/10 rounded-[30px] shadow-sm hover:shadow-md hover:border-[#D4AF37]/30 transition-all group"
            >
              {/* Item & Category */}
              <div className="col-span-1 md:col-span-4 space-y-2">
                <input
                  value={item.item}
                  onChange={(e) => updateItem(item.id, "item", e.target.value)}
                  className="w-full bg-transparent border-0 font-serif italic text-xl focus:ring-0 placeholder:text-zinc-300"
                  placeholder="e.g. Traditional Decor"
                />
                <select
                  value={item.category}
                  onChange={(e) => updateItem(item.id, "category", e.target.value)}
                  className="bg-transparent border-0 text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] p-0 focus:ring-0 cursor-pointer"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Estimated */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 px-4 py-3 bg-[#FCFBF7] rounded-xl border border-[#D4AF37]/5">
                <IndianRupee className="w-3 h-3 text-[#D4AF37]" />
                <input
                  type="number"
                  value={item.estimated || ""}
                  onChange={(e) => updateItem(item.id, "estimated", Number(e.target.value))}
                  className="w-full bg-transparent border-0 text-sm font-bold focus:ring-0 p-0"
                />
              </div>

              {/* Actual */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 px-4 py-3 bg-[#FCFBF7] rounded-xl border border-[#D4AF37]/5">
                <IndianRupee className="w-3 h-3 text-[#D4AF37]" />
                <input
                  type="number"
                  value={item.actual || ""}
                  onChange={(e) => updateItem(item.id, "actual", Number(e.target.value))}
                  className="w-full bg-transparent border-0 text-sm font-bold focus:ring-0 p-0"
                />
              </div>

              {/* Paid */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 px-4 py-3 bg-[#FCFBF7] rounded-xl border border-[#D4AF37]/5">
                <IndianRupee className="w-3 h-3 text-[#D4AF37]" />
                <input
                  type="number"
                  value={item.paid || ""}
                  onChange={(e) => updateItem(item.id, "paid", Number(e.target.value))}
                  className="w-full bg-transparent border-0 text-sm font-bold focus:ring-0 p-0"
                />
              </div>

              {/* Actions */}
              <div className="col-span-1 md:col-span-2 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeItem(item.id)}
                  className="text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Row Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => addItem()}
          className="w-full py-8 border-2 border-dashed border-[#D4AF37]/20 rounded-[30px] flex items-center justify-center gap-3 text-[#D4AF37] font-serif italic text-xl hover:bg-[#D4AF37]/5 transition-all"
        >
          <Plus className="w-6 h-6" /> Add Another Masterpiece Element
        </motion.button>
      </div>
    </div>
  );
}
