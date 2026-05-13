"use client";

import React, { useState } from "react";
import { 
    Upload, 
    Shirt, 
    Sparkles, 
    AlertCircle, 
    Loader2, 
    Bot, 
    ChevronLeft, 
    Check, 
    Zap,
    Download,
    Eye
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, getApiUrl, fetchWithAuth } from "@/lib/utils";

export default function VirtualTryOnPage() {
    const [personImage, setPersonImage] = useState<File | null>(null);
    const [garmentImage, setGarmentImage] = useState<File | null>(null);
    const [personPreview, setPersonPreview] = useState<string | null>(null);
    const [garmentPreview, setGarmentPreview] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'person' | 'garment') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'person') {
                setPersonImage(file);
                setPersonPreview(URL.createObjectURL(file));
            } else {
                setGarmentImage(file);
                setGarmentPreview(URL.createObjectURL(file));
            }
            setAnalysisResult(null);
            setGeneratedImage(null);
            setError(null);
        }
    };

    const handleTryOn = async () => {
        if (!personImage || !garmentImage) {
            setError("Both assets are required for neural mapping.");
            return;
        }

        setIsProcessing(true);
        setError(null);

        const formData = new FormData();
        formData.append("user_image", personImage);
        formData.append("garment_image", garmentImage);
        formData.append("prompt", "Analyze style fit and aesthetic compatibility.");

        try {
            const response = await fetchWithAuth("/api/v1/ai-lab/try-on", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Neural Engine connection failed.");

            const data = await response.json();
            if (data.status === "success") {
                setAnalysisResult(data.results.analysis);
                if (data.results.generated_image) setGeneratedImage(data.results.generated_image);
            } else {
                setError(data.message || "Mapping error occurred.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected core error occurred.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden flex flex-col">
            {/* Top Navigation */}
            <header className="h-16 border-b border-white/5 bg-[#020617]/90 backdrop-blur-2xl flex items-center justify-between px-8 sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/ai-lab" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Lab</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10" />
                    <h1 className="text-[10px] font-black tracking-[0.4em] uppercase italic text-indigo-400">
                        VIRTUAL <span className="text-white">TRY-ON ENGINE</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-600">
                    <span className="flex items-center gap-2 text-emerald-500"><Check className="w-3 h-3" /> Ready</span>
                    <span>v4.2-stable</span>
                </div>
            </header>

            <div className="flex-1 py-16 px-8 max-w-6xl mx-auto w-full space-y-16">
                {/* Hero Header */}
                <div className="text-center space-y-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black tracking-widest uppercase text-indigo-400">
                        <Sparkles className="w-3 h-3" /> Elite Stylist AI
                    </motion.div>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter">Neural <span className="text-indigo-400">Fitting</span> Room</h2>
                    <p className="text-slate-400 text-lg font-light italic max-w-2xl mx-auto">Upload your profile and the garment. Our AI will perform a deep aesthetic analysis and virtual mapping.</p>
                </div>

                {/* Upload Grid */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* User Profile */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">01. User Profile</span>
                            <span className="text-[10px] font-bold text-indigo-400 italic">Full Body Preferred</span>
                        </div>
                        <div 
                            className="aspect-[3/4] rounded-[3rem] border border-white/5 bg-white/5 relative group overflow-hidden cursor-pointer hover:border-indigo-500/30 transition-all"
                            onClick={() => document.getElementById('person-upload')?.click()}
                        >
                            <AnimatePresence mode="wait">
                                {personPreview ? (
                                    <motion.img 
                                        key="preview"
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        src={personPreview} 
                                        className="absolute inset-0 w-full h-full object-cover" 
                                    />
                                ) : (
                                    <motion.div key="empty" className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6">
                                        <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                            <Upload className="w-8 h-8 text-indigo-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-black uppercase tracking-widest">Select Profile</p>
                                            <p className="text-[10px] text-slate-500 italic">Drop image or click to browse</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <Button variant="secondary" className="rounded-full font-black text-[10px] uppercase tracking-widest px-8">Change Image</Button>
                            </div>
                        </div>
                        <input id="person-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'person')} />
                    </div>

                    {/* Garment Selection */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">02. Garment Asset</span>
                            <span className="text-[10px] font-bold text-rose-400 italic">High-Res Required</span>
                        </div>
                        <div 
                            className="aspect-[3/4] rounded-[3rem] border border-white/5 bg-white/5 relative group overflow-hidden cursor-pointer hover:border-rose-500/30 transition-all"
                            onClick={() => document.getElementById('garment-upload')?.click()}
                        >
                            <AnimatePresence mode="wait">
                                {garmentPreview ? (
                                    <motion.img 
                                        key="preview"
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        src={garmentPreview} 
                                        className="absolute inset-0 w-full h-full object-cover" 
                                    />
                                ) : (
                                    <motion.div key="empty" className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6">
                                        <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                                            <Shirt className="w-8 h-8 text-rose-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-black uppercase tracking-widest">Select Garment</p>
                                            <p className="text-[10px] text-slate-500 italic">Drop image or click to browse</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <Button variant="secondary" className="rounded-full font-black text-[10px] uppercase tracking-widest px-8">Change Asset</Button>
                            </div>
                        </div>
                        <input id="garment-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'garment')} />
                    </div>
                </div>

                {/* Processing Button */}
                <div className="flex flex-col items-center gap-6">
                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button 
                        disabled={isProcessing || !personImage || !garmentImage}
                        onClick={handleTryOn}
                        className="h-20 px-16 rounded-[2.5rem] bg-indigo-500 hover:bg-indigo-400 text-white font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:grayscale transition-all"
                    >
                        {isProcessing ? (
                            <div className="flex items-center gap-4">
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Neural Mapping...
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Zap className="w-6 h-6 fill-white" />
                                Launch AI Stylist
                            </div>
                        )}
                    </Button>
                </div>

                {/* Results Section */}
                <AnimatePresence>
                    {analysisResult && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12 pt-16 border-t border-white/5"
                        >
                            <div className="grid lg:grid-cols-2 gap-16">
                                {/* Analysis Text */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                                            <Bot className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase italic">AI Stylist Report</h3>
                                            <p className="text-[10px] font-bold text-slate-500 tracking-widest">REAL-TIME MULTIMODAL ANALYSIS</p>
                                        </div>
                                    </div>
                                    
                                    <div className="prose prose-invert prose-sm max-w-none prose-p:text-slate-400 prose-headings:text-white prose-strong:text-indigo-400">
                                        <ReactMarkdown>{analysisResult}</ReactMarkdown>
                                    </div>
                                </div>

                                {/* Result Preview */}
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-black uppercase italic">Neural Preview</h3>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="text-slate-500"><Download className="w-4 h-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-slate-500"><Eye className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                    <div className="aspect-[3/4] rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden relative group">
                                        {generatedImage ? (
                                            <img src={generatedImage} alt="Neural Result" className="absolute inset-0 w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-slate-500 italic">
                                                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                                                <p className="text-xs">Processing neural texture mapping...</p>
                                            </div>
                                        )}
                                        <div className="absolute top-8 right-8 bg-indigo-500 text-[8px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-2xl">AI GENERATED</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <footer className="h-12 border-t border-white/5 bg-[#020617] flex items-center justify-center px-8">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">© 2026 GURUCRaft NEURAL ENGINE v4.2.1</p>
            </footer>
        </main>
    );
}
