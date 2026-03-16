"use client";

import { useState } from "react";
import { Upload, Shirt, Sparkles, AlertCircle, Loader2, Bot } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export default function VirtualTryOnPage() {
    const [personImage, setPersonImage] = useState<File | null>(null);
    const [garmentImage, setGarmentImage] = useState<File | null>(null);
    const [personPreview, setPersonPreview] = useState<string | null>(null);
    const [garmentPreview, setGarmentPreview] = useState<string | null>(null);
    // Result Image State
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    // State for Analysis Result
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
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
            setError("Please upload both a person image and a garment image.");
            return;
        }

        setIsProcessing(true);
        setError(null);

        const formData = new FormData();
        formData.append("user_image", personImage);
        formData.append("garment_image", garmentImage);
        formData.append("prompt", "Analyze style fit");

        try {
            const response = await fetch(getApiUrl("/api/v1/ai-lab/try-on"), {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to process request.");
            }

            const data = await response.json();
            if (data.status === "success") {
                setAnalysisResult(data.results.analysis);
                if (data.results.generated_image) {
                    setGeneratedImage(data.results.generated_image);
                }
            } else {
                setError(data.message || "Something went wrong.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <div className="container mx-auto px-4 md:px-6 py-12 flex-grow">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">AI Stylist & Try-On Analysis</h1>
                        <p className="text-muted-foreground">Upload your photo and a dress. Our AI will analyze the fit and style match.</p>
                    </div>

                    {/* Upload Section */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Person Image Upload */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold">1. Upload Your Photo</Label>
                            <div className="border border-border/50 rounded-2xl overflow-hidden relative group hover:border-indigo-500/50 transition-colors shadow-sm cursor-pointer aspect-[3/4] bg-muted w-full max-w-sm mx-auto">
                                <img src={personPreview || "/images/user_provided/generated-image-2026-02-24_10-45-46 (2).jpg"} alt="Person Example" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                                {!personPreview && (
                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                                        <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">Example Photo</div>
                                    </div>
                                )}

                                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${personPreview ? 'bg-black/50 opacity-0 group-hover:opacity-100' : 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'}`}>
                                    <Button variant={personPreview ? "secondary" : "default"} className={personPreview ? "" : "mt-auto mb-8 shadow-xl"} onClick={(e) => { e.stopPropagation(); document.getElementById('person-upload')?.click(); }}>
                                        {personPreview ? "Change Photo" : <><Upload className="mr-2 h-4 w-4" /> Upload Your Photo</>}
                                    </Button>
                                    {!personPreview && <p className="text-xs text-white/80 mb-6 drop-shadow-md font-medium">Full body shots work best</p>}
                                </div>

                                <Input
                                    id="person-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, 'person')}
                                />
                                <div className="absolute inset-0 w-full h-full" onClick={() => document.getElementById('person-upload')?.click()} />
                            </div>
                        </div>

                        {/* Garment Image Upload */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold">2. Upload Dress / Outfit</Label>
                            <div className="border border-border/50 rounded-2xl overflow-hidden relative group hover:border-pink-500/50 transition-colors shadow-sm cursor-pointer aspect-[3/4] bg-muted w-full max-w-sm mx-auto">
                                <img src={garmentPreview || "/images/user_provided/generated-image-2026-02-23_14-29-25 (6).jpg"} alt="Garment Example" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                                {!garmentPreview && (
                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                                        <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">Example Dress</div>
                                    </div>
                                )}

                                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${garmentPreview ? 'bg-black/50 opacity-0 group-hover:opacity-100' : 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'}`}>
                                    <Button variant={garmentPreview ? "secondary" : "default"} className={garmentPreview ? "" : "mt-auto mb-8 shadow-xl bg-pink-600 hover:bg-pink-700"} onClick={(e) => { e.stopPropagation(); document.getElementById('garment-upload')?.click(); }}>
                                        {garmentPreview ? "Change Outfit" : <><Shirt className="mr-2 h-4 w-4" /> Upload Outfit</>}
                                    </Button>
                                    {!garmentPreview && <p className="text-xs text-white/80 mb-6 drop-shadow-md font-medium">Clear front view is recommended</p>}
                                </div>

                                <Input
                                    id="garment-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, 'garment')}
                                />
                                <div className="absolute inset-0 w-full h-full" onClick={() => document.getElementById('garment-upload')?.click()} />
                            </div>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                        {error && (
                            <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <Button
                            className="h-12 px-8 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            onClick={handleTryOn}
                            disabled={isProcessing || !personImage || !garmentImage}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Analyzing Style...
                                </>
                            ) : (
                                <>
                                    <Bot className="mr-2 h-5 w-5" />
                                    Ask AI Stylist
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Result Section */}
                    {analysisResult && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto">
                            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4 border-b pb-4">
                                    <div className="p-2 bg-indigo-100 rounded-full dark:bg-indigo-900/30">
                                        <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Stylist Analysis & Preview</h3>
                                        <p className="text-xs text-muted-foreground">Powered by Gurucraftpro AI</p>
                                    </div>
                                </div>

                                {/* Generated Image Result */}
                                {generatedImage && (
                                    <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border/50">
                                        <h4 className="text-sm font-semibold mb-4 text-center">Virtual Preview Result</h4>
                                        <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-lg overflow-hidden shadow-xl border border-border ring-1 ring-white/20">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={generatedImage}
                                                alt="Virtual Try-On Result"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 right-3 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wider shadow-md">
                                                AI Generated
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="prose prose-sm dark:prose-invert max-w-none text-base leading-relaxed">
                                    <ReactMarkdown
                                        components={{
                                            strong: ({ ...props }) => <span className="font-bold text-indigo-600 dark:text-indigo-400" {...props} />,
                                            ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
                                            li: ({ ...props }) => <li className="pl-1" {...props} />,
                                            h1: ({ ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                            h2: ({ ...props }) => <h4 className="text-lg font-bold mt-3 mb-2" {...props} />,
                                            h3: ({ ...props }) => <h5 className="text-base font-bold mt-3 mb-1" {...props} />,
                                        }}
                                    >
                                        {analysisResult}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
