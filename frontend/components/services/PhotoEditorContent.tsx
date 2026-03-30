"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, 
  Crop, 
  Layers, 
  Wand2, 
  Trash2, 
  Download, 
  Upload,
  Sliders,
  Type,
  Square,
  Circle,
  Undo,
  Redo,
  Sparkles,
  Command,
  Sun,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function PhotoEditorContent() {
  const [activeTool, setActiveTool] = useState("ai");
  const [isUploading, setIsUploading] = useState(false);
  
  const tools = [
    { id: "ai", icon: Wand2, label: "AI Magic" },
    { id: "adjust", icon: Sliders, label: "Adjust" },
    { id: "crop", icon: Crop, label: "Crop" },
    { id: "text", icon: Type, label: "Text" },
    { id: "shapes", icon: Square, label: "Shapes" },
    { id: "layers", icon: Layers, label: "Layers" }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-zinc-300 overflow-hidden pt-16">
      {/* ── Editor Workspace ────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <aside className="w-20 border-r border-white/5 bg-[#0D0D0D] flex flex-col items-center py-8 gap-4 px-2">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`p-3 rounded-2xl transition-all duration-300 group relative ${
                        activeTool === tool.id 
                        ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] scale-110' 
                        : 'hover:bg-white/5 text-zinc-500 hover:text-zinc-200'
                    }`}
                >
                    <tool.icon className="w-6 h-6" />
                    <span className="absolute left-full ml-4 px-2 py-1 rounded bg-zinc-800 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {tool.label}
                    </span>
                </button>
            ))}
            
            <div className="mt-auto border-t border-white/5 pt-8 w-full flex flex-col items-center gap-4">
                <button className="p-3 rounded-2xl hover:bg-white/5 text-zinc-500 hover:text-zinc-200 transition-all">
                    <Undo className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-2xl hover:bg-white/5 text-zinc-500 hover:text-zinc-200 transition-all">
                    <Redo className="w-5 h-5" />
                </button>
            </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 relative bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] bg-[size:32px_32px] flex items-center justify-center p-8 lg:p-16">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-[#1A1A1A] border border-white/5 backdrop-blur-xl flex items-center gap-4 text-sm font-bold shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                CANVAS_V1.EDITOR
                <div className="h-4 w-px bg-white/10" />
                <span className="text-zinc-500 uppercase tracking-widest text-[10px]">1920x1080</span>
            </div>

            <motion.div 
                layoutId="canvas"
                className="relative w-full max-w-5xl aspect-video bg-[#0A0A0A] rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden group"
            >
                {/* Mock Image Content */}
                <Image 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    alt="Editor Canvas"
                    fill
                    className={`object-cover transition-all duration-700 ${isUploading ? 'blur-xl opacity-50' : 'opacity-100'}`}
                />
                
                {/* AI Overlay Mockup */}
                <AnimatePresence>
                    {activeTool === "ai" && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10 pointer-events-none"
                        >
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-indigo-500 rounded-full animate-ping opacity-20" />
                            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border-2 border-indigo-400 rounded-lg animate-pulse opacity-20" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State / Upload Mock */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <div className="p-6 rounded-full bg-indigo-600/20 border border-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="w-10 h-10 text-indigo-400" />
                    </div>
                    <p className="text-xl font-bold text-white mb-2">Drag & Drop Image</p>
                    <p className="text-sm text-zinc-400">or click to browse local files</p>
                </div>
            </motion.div>

            {/* Bottom Actions */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 p-2 rounded-3xl bg-[#1A1A1A] border border-white/5 backdrop-blur-3xl shadow-2xl">
                <Button variant="ghost" className="rounded-2xl h-14 px-8 text-zinc-400 hover:text-white hover:bg-white/5 flex gap-2">
                    <Trash2 className="w-5 h-5 text-rose-500" /> Reset
                </Button>
                <Button className="rounded-2xl h-14 px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex gap-2 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                    <Download className="w-5 h-5" /> Export Artwork
                </Button>
            </div>
        </main>

        {/* Right Properties Panel */}
        <aside className="w-80 border-l border-white/5 bg-[#0D0D0D] p-8 overflow-y-auto space-y-10">
            <div>
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> AI Lab Pro
                </h3>
                <div className="space-y-4">
                    {[
                        { label: "BG Removal", icon: Command, active: true },
                        { label: "Auto Enhance", icon: Sun },
                        { label: "Style Transfer", icon: Palette },
                        { label: "Object Eraser", icon: Sparkles }
                    ].map((item, i) => (
                        <button 
                            key={i} 
                            className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                                item.active 
                                ? 'bg-indigo-600/10 border-indigo-500 text-white' 
                                : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                            }`}
                        >
                            <span className="flex items-center gap-3 font-bold">
                                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                                {item.label}
                            </span>
                            {item.active && <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Adjustments</h3>
                <div className="space-y-8">
                    {["Exposure", "Contrast", "Saturation"].map((label) => (
                        <div key={label} className="space-y-3">
                            <div className="flex justify-between text-xs font-bold">
                                <span>{label}</span>
                                <span className="text-indigo-400">0%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full w-1/2 bg-indigo-600" />
                                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 shadow-lg cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-8 space-y-4">
                <div className="p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-center">
                    <p className="text-sm font-bold text-indigo-400 mb-2">Cloud Synced</p>
                    <p className="text-xs text-zinc-500">Your edits are automatically saved to your creative cloud account.</p>
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
}
