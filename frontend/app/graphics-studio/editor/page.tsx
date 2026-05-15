"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Layout, 
    ImageIcon, 
    Type, 
    Shapes, 
    Layers, 
    Download, 
    Share2, 
    Settings, 
    Wand2,
    Plus,
    Palette,
    Search,
    ChevronRight,
    ArrowLeft,
    Undo2,
    Redo2,
    ZoomIn,
    ZoomOut,
    MousePointer2,
    Grab,
    Maximize,
    Save,
    Trash2,
    Copy,
    Lock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Types
interface DesignLayer {
    id: string;
    type: 'text' | 'image' | 'shape';
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    opacity: number;
    zIndex: number;
    color?: string;
    fontSize?: number;
    fontFamily?: string;
}

export default function DesignEditorPage() {
    const [layers, setLayers] = useState<DesignLayer[]>([
        { id: '1', type: 'text', content: 'LUXURY DESIGN', x: 100, y: 150, width: 600, height: 100, rotation: 0, opacity: 1, zIndex: 1, color: '#6366f1', fontSize: 80, fontFamily: 'serif' },
        { id: '2', type: 'shape', content: 'rect', x: 50, y: 50, width: 700, height: 400, rotation: 0, opacity: 0.1, zIndex: 0, color: '#ffffff' }
    ]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'templates' | 'elements' | 'text' | 'ai'>('templates');
    const canvasRef = useRef<HTMLDivElement>(null);

    const addLayer = (type: DesignLayer['type']) => {
        const newLayer: DesignLayer = {
            id: Date.now().toString(),
            type,
            content: type === 'text' ? 'New Text' : (type === 'shape' ? 'rect' : 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809'),
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            rotation: 0,
            opacity: 1,
            zIndex: layers.length,
            color: '#ffffff',
            fontSize: 24
        };
        setLayers([...layers, newLayer]);
        setSelectedId(newLayer.id);
    };

    const updateLayer = (id: string, updates: Partial<DesignLayer>) => {
        setLayers(layers.map(l => l.id === id ? { ...l, ...updates } : l));
    };

    const selectedLayer = layers.find(l => l.id === selectedId);

    return (
        <div className="h-screen bg-[#020617] text-white overflow-hidden flex flex-col">
            {/* Mesh Background for Depth */}
            <div className="fixed inset-0 z-0 mesh-gradient opacity-10" />

            {/* Top Bar */}
            <header className="relative z-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-2xl px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/graphics-studio" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Studio</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-widest text-primary uppercase">Untitled Project</span>
                        <h1 className="text-sm font-bold tracking-tight">Luxury Branding Kit v1.0</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 mr-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10 text-slate-400"><Undo2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10 text-slate-400"><Redo2 className="w-4 h-4" /></Button>
                    </div>
                    <Button variant="ghost" className="text-slate-400 hover:text-white gap-2 font-bold text-xs uppercase tracking-widest">
                        <Save className="w-4 h-4" /> Save
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-black font-black rounded-full px-6 gap-2">
                        <Download className="w-4 h-4" /> EXPORT
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* Left Sidebar - Tools */}
                <aside className="w-20 border-r border-white/5 bg-[#020617]/50 backdrop-blur-xl flex flex-col items-center py-6 gap-6">
                    {[
                        { id: 'templates', icon: Layout, label: 'Templates' },
                        { id: 'elements', icon: Shapes, label: 'Elements' },
                        { id: 'text', icon: Type, label: 'Text' },
                        { id: 'ai', icon: Wand2, label: 'AI Tools' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex flex-col items-center gap-1.5 transition-all duration-300 group",
                                activeTab === tab.id ? "text-primary" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                activeTab === tab.id ? "bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "bg-white/5 border border-transparent"
                            )}>
                                <tab.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">{tab.label}</span>
                        </button>
                    ))}
                    <div className="mt-auto">
                        <Button variant="ghost" size="icon" className="text-slate-500"><Settings className="w-5 h-5" /></Button>
                    </div>
                </aside>

                {/* Left Sub-sidebar - Content */}
                <aside className="w-80 border-r border-white/5 bg-[#020617]/30 backdrop-blur-md p-6 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-6"
                        >
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{activeTab}</h2>
                            
                            {activeTab === 'text' && (
                                <div className="space-y-3">
                                    <Button 
                                        onClick={() => addLayer('text')}
                                        className="w-full h-16 bg-white/5 border border-white/10 hover:border-primary/50 text-white rounded-2xl flex flex-col items-center justify-center gap-1"
                                    >
                                        <span className="text-lg font-black uppercase italic tracking-tighter">Heading</span>
                                        <span className="text-[9px] text-slate-500">80px Serif</span>
                                    </Button>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" className="h-12 border-white/5 bg-white/5">Subheading</Button>
                                        <Button variant="outline" className="h-12 border-white/5 bg-white/5">Body Text</Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'ai' && (
                                <div className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">AI Suggestion</p>
                                        <p className="text-xs text-slate-400 leading-relaxed mb-4 font-medium italic">
                                            "Try using a Gold gradient on your heading for a more luxurious feel."
                                        </p>
                                        <Button className="w-full bg-primary text-black font-black text-[10px] h-8 rounded-lg uppercase">
                                            Apply AI Fix
                                        </Button>
                                    </div>
                                    <Button className="w-full h-12 bg-white/5 border border-white/10 text-xs font-bold gap-2">
                                        <ImageIcon className="w-4 h-4" /> Magic AI Image
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </aside>

                {/* Main Canvas Area */}
                <main className="flex-1 bg-slate-950/50 p-12 overflow-auto flex items-center justify-center relative cursor-crosshair">
                    <div 
                        ref={canvasRef}
                        className="relative bg-white shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                        style={{ width: '800px', height: '500px' }}
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Layers Rendering */}
                        {layers.sort((a,b) => a.zIndex - b.zIndex).map((layer) => (
                            <motion.div
                                key={layer.id}
                                className={cn(
                                    "absolute flex items-center justify-center cursor-move",
                                    selectedId === layer.id ? "ring-2 ring-primary ring-offset-4 ring-offset-white" : ""
                                )}
                                style={{
                                    left: layer.x,
                                    top: layer.y,
                                    width: layer.width,
                                    height: layer.height,
                                    opacity: layer.opacity,
                                    zIndex: layer.zIndex,
                                    transform: `rotate(${layer.rotation}deg)`
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedId(layer.id);
                                }}
                                drag
                                dragMomentum={false}
                                onDragEnd={(e, info) => {
                                    updateLayer(layer.id, { x: layer.x + info.offset.x, y: layer.y + info.offset.y });
                                }}
                            >
                                {layer.type === 'text' && (
                                    <div 
                                        style={{ 
                                            color: layer.color, 
                                            fontSize: `${layer.fontSize}px`,
                                            fontFamily: layer.fontFamily === 'serif' ? 'Playfair Display, serif' : 'Inter, sans-serif',
                                            fontWeight: 'black',
                                            letterSpacing: '-0.05em',
                                            fontStyle: 'italic',
                                            lineHeight: 0.9,
                                            textAlign: 'center'
                                        }}
                                        className="select-none uppercase"
                                    >
                                        {layer.content}
                                    </div>
                                )}
                                {layer.type === 'shape' && (
                                    <div 
                                        className="w-full h-full"
                                        style={{ backgroundColor: layer.color }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Canvas Controls */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 flex items-center gap-6 shadow-2xl">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><ZoomOut className="w-4 h-4" /></Button>
                            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">100%</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><ZoomIn className="w-4 h-4" /></Button>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary"><MousePointer2 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><Grab className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Properties */}
                <aside className="w-80 border-l border-white/5 bg-[#020617]/50 backdrop-blur-xl p-6 overflow-y-auto">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Properties</h2>
                    
                    {selectedLayer ? (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Transform</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <span className="text-[9px] text-slate-600">X Position</span>
                                        <div className="bg-white/5 border border-white/5 rounded-lg p-2 text-xs font-bold">{Math.round(selectedLayer.x)}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[9px] text-slate-600">Y Position</span>
                                        <div className="bg-white/5 border border-white/5 rounded-lg p-2 text-xs font-bold">{Math.round(selectedLayer.y)}</div>
                                    </div>
                                </div>
                            </div>

                            {selectedLayer.type === 'text' && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Typography</p>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <span className="text-[9px] text-slate-600">Font Size</span>
                                            <Slider 
                                                value={[selectedLayer.fontSize || 0]} 
                                                max={200} 
                                                step={1} 
                                                onValueChange={([val]: number[]) => updateLayer(selectedLayer.id, { fontSize: val })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[9px] text-slate-600">Color</span>
                                            <div className="flex gap-2">
                                                {['#ffffff', '#6366f1', '#0f172a', '#ef4444'].map(c => (
                                                    <button 
                                                        key={c}
                                                        onClick={() => updateLayer(selectedLayer.id, { color: c })}
                                                        className={cn(
                                                            "w-8 h-8 rounded-full border-2",
                                                            selectedLayer.color === c ? "border-primary" : "border-transparent"
                                                        )}
                                                        style={{ backgroundColor: c }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-8 border-t border-white/5 flex gap-2">
                                <Button 
                                    variant="ghost" 
                                    className="flex-1 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-xl"
                                    onClick={() => {
                                        setLayers(layers.filter(l => l.id !== selectedId));
                                        setSelectedId(null);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </Button>
                                <Button variant="ghost" className="flex-1 bg-white/5 text-white hover:bg-white/10 rounded-xl">
                                    <Copy className="w-4 h-4 mr-2" /> Clone
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-30">
                            <Grab className="w-12 h-12" />
                            <p className="text-xs font-medium">Select a layer to <br /> view properties</p>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
