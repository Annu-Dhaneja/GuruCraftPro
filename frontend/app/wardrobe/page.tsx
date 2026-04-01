import { WardrobeGrid } from "@/components/wardrobe/WardrobeGrid";
import { Sparkles, Shirt, Wand2 } from "lucide-react";

export default function WardrobePage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-32 px-6 lg:px-12">
      
      {/* LUXURY HERO HEADER */}
      <div className="relative mb-24 max-w-7xl mx-auto text-center perspective-1000">
        <div className="absolute -top-20 left-1/2 -track-x-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-3 h-3" />
            Your Digital Sanctuary
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white italic font-serif">
            The Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient">Wardrobe</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-zinc-400 text-lg md:text-xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">
            A meticulously curated collection of your style DNA. 
            Powered by AI to orchestrate your daily elegance.
          </p>

          <div className="flex items-center justify-center gap-8 pt-8 opacity-40">
             <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white"><Shirt className="w-4 h-4" /> Infinite Styles</div>
             <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white"><Wand2 className="w-4 h-4" /> AI Personalized</div>
          </div>
        </div>
      </div>

      {/* DYNAMIC WARDROBE GRID */}
      <div className="max-w-7xl mx-auto">
        <WardrobeGrid />
      </div>

    </main>
  );
}
