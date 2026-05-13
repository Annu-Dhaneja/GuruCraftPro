"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ImageIcon, 
    Scissors, 
    Layers, 
    Maximize, 
    Wand2, 
    Trash2, 
    RotateCcw, 
    RotateCw, 
    Sun, 
    Contrast, 
    Palette, 
    Download, 
    Upload, 
    Eye, 
    Scaling, 
    Eraser, 
    Sparkles,
    ChevronLeft,
    Check
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function AIPhotoEditorPage() {
    const [image, setImage] = useState<string | null>("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200");
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTool, setActiveTool] = useState<'adjust' | 'ai' | 'filters' | 'crop'>('ai');
    const [comparisonMode, setComparisonMode] = useState(false);
    const [settings, setSettings] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        upscale: 1,
    });

    const runAITool = (tool: string) => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            // Simulated result
            if (tool === 'remove-bg') {
                setImage("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&fm=png&auto=format");
            }
        }, 2000);
    };

    return (
        <div className="h-screen bg-[#020617] text-white flex flex-col overflow-hidden">
            {/* Top Editor Bar */}
            <header className="h-16 border-b border-white/5 bg-[#020617]/90 backdrop-blur-2xl flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/services/vantage-ecom" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Back to Studio</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <Wand2 className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-sm font-black tracking-tight uppercase italic">
                            AI <span className="text-indigo-400">Photo Core</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost" 
                        onClick={() => setComparisonMode(!comparisonMode)}
                        className={cn("h-10 px-4 rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest", comparisonMode ? "bg-indigo-500 text-white" : "text-slate-400")}
                    >
                        <Eye className="w-4 h-4" /> Compare
                    </Button>
                    <Button className="h-10 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                        <Download className="w-4 h-4 mr-2" /> EXPORT FINAL
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Tool Rail */}
                <aside className="w-20 border-r border-white/5 bg-[#020617]/50 flex flex-col items-center py-8 gap-8">
                    {[
                        { id: 'ai', icon: Wand2, label: 'AI TOOLS' },
                        { id: 'adjust', icon: Sun, label: 'ADJUST' },
                        { id: 'filters', icon: Palette, label: 'FILTERS' },
                        { id: 'crop', icon: Scissors, label: 'CROP' },
                        { id: 'layers', icon: Layers, label: 'LAYERS' },
                    ].map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id as any)}
                            className={cn(
                                "flex flex-col items-center gap-1.5 transition-all group",
                                activeTool === tool.id ? "text-indigo-400" : "text-slate-600 hover:text-slate-300"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-[1.25rem] flex items-center justify-center transition-all duration-300",
                                activeTool === tool.id ? "bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" : "bg-white/5 border border-transparent"
                            )}>
                                <tool.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">{tool.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Sub-panel Content */}
                <aside className="w-80 border-r border-white/5 bg-[#020617]/30 backdrop-blur-md p-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTool}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-10"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">{activeTool} WORKSPACE</h2>
                                <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                            </div>

                            {activeTool === 'ai' && (
                                <div className="space-y-4">
                                    <Button 
                                        onClick={() => runAITool('remove-bg')}
                                        className="w-full h-20 bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 hover:border-indigo-500/50 rounded-2xl flex flex-col items-center justify-center gap-1 group transition-all"
                                    >
                                        <Eraser className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Remove Background</span>
                                    </Button>
                                    <Button 
                                        onClick={() => runAITool('upscale')}
                                        className="w-full h-20 bg-white/5 border border-white/10 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center gap-1 group transition-all"
                                    >
                                        <Scaling className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">AI Upscale 4X</span>
                                    </Button>
                                    <Button 
                                        onClick={() => runAITool('relight')}
                                        className="w-full h-20 bg-white/5 border border-white/10 hover:border-amber-500/50 rounded-2xl flex flex-col items-center justify-center gap-1 group transition-all"
                                    >
                                        <Sun className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">AI Studio Lighting</span>
                                    </Button>
                                </div>
                            )}

                            {activeTool === 'adjust' && (
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Brightness</span>
                                            <span className="text-[10px] font-bold text-white">{settings.brightness}%</span>
                                        </div>
                                        <Slider 
                                            value={[settings.brightness]} 
                                            max={200} 
                                            onValueChange={([v]: number[]) => setSettings({...settings, brightness: v})} 
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contrast</span>
                                            <span className="text-[10px] font-bold text-white">{settings.contrast}%</span>
                                        </div>
                                        <Slider 
                                            value={[settings.contrast]} 
                                            max={200} 
                                            onValueChange={([v]: number[]) => setSettings({...settings, contrast: v})} 
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </aside>

                {/* Center Canvas Area */}
                <main className="flex-1 bg-slate-950 p-12 relative flex items-center justify-center overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                    {image ? (
                        <div className="relative group max-w-full max-h-full">
                            <motion.div 
                                layout
                                className="relative shadow-[0_50px_100px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden"
                            >
                                <img 
                                    src={image} 
                                    alt="Editor" 
                                    className="max-w-full max-h-[70vh] object-contain"
                                    style={{
                                        filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%)`
                                    }}
                                />

                                {isProcessing && (
                                    <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                            <Wand2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">AI Engine Processing</p>
                                            <p className="text-[8px] font-bold text-slate-500 mt-1">Applying neural enhancements...</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Floating Hover Controls */}
                            <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 bg-white/10 backdrop-blur-md border border-white/10 text-white"><Maximize className="w-4 h-4" /></Button>
                                <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 bg-white/10 backdrop-blur-md border border-white/10 text-white"><RotateCw className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center max-w-sm">
                            <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-500/10 border border-dashed border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-8">
                                <Upload className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">Upload Asset</h3>
                            <p className="text-xs font-medium text-slate-500 mb-8">Select a high-resolution product image to start editing with AI.</p>
                            <Button className="rounded-full bg-indigo-500 text-white px-8 font-black uppercase tracking-widest text-[10px] h-12">
                                SELECT FILE
                            </Button>
                        </div>
                    )}

                    {/* Editor Footer Controls */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-[#020617]/80 backdrop-blur-2xl border border-white/5 px-8 py-3 rounded-full shadow-2xl">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><RotateCcw className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><RotateCw className="w-4 h-4" /></Button>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Zoom</span>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" className="h-6 px-2 text-[10px] font-black text-white hover:bg-white/5">FIT</Button>
                                <Button variant="ghost" className="h-6 px-2 text-[10px] font-black text-slate-500 hover:bg-white/5">100%</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Bottom Status Rail */}
            <footer className="h-8 border-t border-white/5 bg-[#020617] flex items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                        <Check className="w-3 h-3" /> AI Core Stable
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">800 x 1200 • RGB • 8-bit</span>
                </div>
                <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-slate-600">
                    <span>© 2026 VANTAGE CORE</span>
                    <span>v4.2.1-stable</span>
                </div>
            </footer>
        </div>
    );
}
