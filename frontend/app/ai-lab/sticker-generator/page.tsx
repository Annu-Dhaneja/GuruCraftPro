"use client";

import { useState } from "react";
import { Sticker, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export default function StickerGeneratorPage() {
    const [prompt, setPrompt] = useState("");
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) {
            setError("Please describe the sticker you want to generate.");
            return;
        }

        setIsProcessing(true);
        setError(null);
        setResultImage(null);

        try {
            const response = await fetch(getApiUrl("/api/v1/ai-lab/generate-sticker"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate sticker. Please try again.");
            }

            const data = await response.json();
            if (data.status === "success") {
                setResultImage(data.output_url);
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
                <div className="max-w-2xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/10 mb-4">
                            <Sticker className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">AI Sticker Generator</h1>
                        <p className="text-muted-foreground">Turn your ideas into fun, expressive stickers.</p>
                    </div>

                    {/* Input Section */}
                    <div className="space-y-6 bg-card border rounded-xl p-6 shadow-sm">
                        <div className="space-y-2">
                            <Label htmlFor="prompt">Describe your sticker</Label>
                            <Textarea
                                id="prompt"
                                placeholder="E.g., A cute cat drinking coffee, cartoon style, thick outlines..."
                                className="min-h-[100px] resize-none"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <Button
                            className="w-full h-12 text-lg bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                            onClick={handleGenerate}
                            disabled={isProcessing || !prompt}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Making Sticker...
                                </>
                            ) : (
                                <>
                                    <Sticker className="mr-2 h-5 w-5" />
                                    Generate Sticker
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Result Section */}
                    {resultImage && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-2 justify-center">
                                <Label className="text-base font-semibold">Your Sticker</Label>
                            </div>
                            <div className="border border-border rounded-xl p-8 bg-card shadow-lg flex items-center justify-center bg-[url('/checker-pattern.png')] bg-repeat">
                                {/* Optional checker pattern for transparency visualization, but simpler to just use light gray bg for now if pattern missing */}
                                <div className="h-48 w-48 relative transition-transform hover:scale-110 duration-200">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={resultImage} alt="Generated Sticker" className="w-full h-full object-contain filter drop-shadow-xl" />
                                </div>
                            </div>
                            <div className="flex justify-center gap-4">
                                <Button variant="outline" onClick={() => window.open(resultImage, '_blank')}>Download PNG</Button>
                                <Button variant="secondary" onClick={() => { setResultImage(null); setPrompt(""); }}>Create Another</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
