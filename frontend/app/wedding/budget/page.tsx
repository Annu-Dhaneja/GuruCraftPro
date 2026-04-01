"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Sparkles, 
  ChevronLeft, 
  IndianRupee, 
  TrendingUp, 
  Wallet, 
  CheckCircle2,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { BudgetTable } from "@/components/wedding/budget/BudgetTable";
import { useBudget } from "@/hooks/use-budget";
import { Button } from "@/components/ui/button";

export default function WeddingBudgetPage() {
  const { 
    items, 
    totalBudget, 
    setTotalBudget, 
    addItem, 
    updateItem, 
    removeItem, 
    stats,
    isLoaded 
  } = useBudget();

  if (!isLoaded) return null;

  const totalActual = stats.totalActual;
  const progress = Math.min((totalActual / totalBudget) * 100, 100);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#2C2C2C] selection:bg-[#D4AF37]/30 pb-32">
      {/* ── Luxury Header ─────────────────────────────────── */}
      <header className="relative py-20 px-6 md:px-10 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <Link href="/services/wedding-plan" className="mb-12 group">
             <div className="flex items-center gap-2 text-zinc-400 hover:text-[#D4AF37] transition-all font-serif italic text-xl">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Masterpiece Vision
             </div>
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 rounded-full bg-white border border-[#D4AF37]/10 shadow-2xl"
          >
            <Heart className="w-8 h-8 text-[#D4AF37] animate-pulse" />
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-serif italic mb-6 tracking-tighter leading-none">
            Budget <span className="text-[#D4AF37] not-italic">Management</span>
          </h1>
          <p className="text-xl text-zinc-500 font-light italic max-w-2xl mx-auto">
            Orchestrating the financial harmony of your eternal story. Plan every detail with precision and grace.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10">
        {/* ── Financial Summary Dashboard ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          
          {/* Total Budget Setting */}
          <div className="col-span-1 md:col-span-2 p-10 bg-[#2C2C2C] rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full" />
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-8 opacity-60">
                 <Wallet className="w-6 h-6" />
                 <span className="text-xs font-bold uppercase tracking-widest">Total Planned Investment</span>
               </div>
               <div className="flex items-center gap-3 mb-10">
                 <IndianRupee className="w-10 h-10 text-[#D4AF37]" />
                 <input 
                   type="number"
                   value={totalBudget}
                   onChange={(e) => setTotalBudget(Number(e.target.value))}
                   className="bg-transparent border-0 text-5xl md:text-6xl font-serif italic text-white focus:ring-0 w-full p-0"
                 />
               </div>
               {/* Progress Bar */}
               <div className="space-y-4">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                   <span>Budget Utilization</span>
                   <span>{progress.toFixed(1)}% Used</span>
                 </div>
                 <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8962F] relative"
                    >
                       <div className="absolute top-0 right-0 w-4 h-full bg-white/20 blur-sm" />
                    </motion.div>
                 </div>
               </div>
            </div>
          </div>

          {/* Actual Expense */}
          <div className="bg-white p-10 rounded-[40px] border border-[#D4AF37]/10 shadow-xl">
             <div className="flex items-center gap-4 mb-8 text-zinc-400">
               <TrendingUp className="w-6 h-6" />
               <span className="text-xs font-bold uppercase tracking-widest">Actual Expense</span>
             </div>
             <div className="flex items-center gap-2 mb-2">
               <IndianRupee className="w-6 h-6 text-[#D4AF37]" />
               <span className="text-4xl font-serif italic tracking-tight">{stats.totalActual.toLocaleString()}</span>
             </div>
             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Commitments made</p>
          </div>

          {/* Remaining */}
          <div className="bg-white p-10 rounded-[40px] border border-[#D4AF37]/10 shadow-xl">
             <div className="flex items-center gap-4 mb-8 text-zinc-400">
               <CheckCircle2 className="w-6 h-6" />
               <span className="text-xs font-bold uppercase tracking-widest">Remaining Flow</span>
             </div>
             <div className="flex items-center gap-2 mb-2">
               <IndianRupee className="w-6 h-6 text-emerald-500" />
               <span className="text-4xl font-serif italic tracking-tight">{stats.remainingBudget.toLocaleString()}</span>
             </div>
             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Balance Available</p>
          </div>

        </div>

        {/* ── Budget Tracking Table ────────────────────────── */}
        <section className="bg-white rounded-[60px] p-8 md:p-20 shadow-2xl shadow-[#D4AF37]/5 border border-[#D4AF37]/5">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl text-left">
                <h2 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight">Particulars of Investment</h2>
                <p className="text-zinc-500 text-lg font-light italic">Every stroke, every melody, and every flavor matters. Detailed tracking for your signature experience.</p>
              </div>
              <div className="flex gap-4">
                 <div className="px-8 py-4 bg-[#FCFBF7] border border-[#D4AF37]/10 rounded-3xl flex flex-col items-center">
                    <Calendar className="w-10 h-10 text-[#D4AF37] mb-2" />
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Live Execution Tracking</span>
                 </div>
              </div>
           </div>

           <BudgetTable 
             items={items} 
             addItem={addItem} 
             updateItem={updateItem} 
             removeItem={removeItem} 
           />
        </section>

        {/* ── Masterpiece CTA ──────────────────────────────── */}
        <section className="mt-40 text-center relative py-32 bg-[#2C2C2C] rounded-[80px] text-white">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />
           <div className="relative z-10 px-6">
              <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-10" />
              <h2 className="text-5xl md:text-8xl font-serif italic mb-10 tracking-tighter">Your Masterpiece awaits.</h2>
              <p className="text-zinc-400 text-xl font-light italic max-w-2xl mx-auto mb-16 underline underline-offset-[12px] decoration-[#D4AF37]/30">
                Ready to transform these numbers into a royal gala? Let our Imperial concierge take over the execution.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8962F] text-white rounded-full px-20 h-24 text-3xl font-serif italic shadow-2xl transition-transform active:scale-95">
                  Confirm My Consultation
                </Button>
              </Link>
           </div>
        </section>
      </main>
    </div>
  );
}
