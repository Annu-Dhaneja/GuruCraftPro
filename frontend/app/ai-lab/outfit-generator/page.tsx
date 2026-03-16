"use client";

import { useState } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

const STYLES = [
    "Modern Casual",
    "Business Professional",
    "Evening Gala",
    "Streetwear",
    "Bohemian",
    "Minimalist",
    "Avant-Garde",
    "Vintage 90s"
];

export default function OutfitGeneratorPage() {
    const [prompt, setPrompt] = useState("");
    const [style, setStyle] = useState("");
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) {
            setError("Please describe the outfit you want to generate.");
            return;
        }

        setIsProcessing(true);
        setError(null);
        setResultImage(null);

        try {
            const response = await fetch(getApiUrl("/api/v1/ai-lab/generate-outfit"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, style }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate outfit. Please try again.");
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
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 mb-4">
                            <Sparkles className="h-8 w-8 text-amber-500" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">AI Outfit Generator</h1>
                        <p className="text-muted-foreground">Describe your dream outfit and let AI design it for you.</p>
                    </div>

                    {/* Input Section */}
                    <div className="space-y-6 bg-card border rounded-xl p-6 shadow-sm">
                        <div className="space-y-2">
                            <Label htmlFor="prompt">Describe the outfit</Label>
                            <Textarea
                                id="prompt"
                                placeholder="E.g., A red silk evening gown with high slit and gold embroidery..."
                                className="min-h-[100px] resize-none"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="style">Style (Optional)</Label>
                            <Select value={style} onValueChange={setStyle}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a style" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STYLES.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <Button
                            className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                            onClick={handleGenerate}
                            disabled={isProcessing || !prompt}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Designing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Generate Outfit
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Result Section */}
                    {resultImage && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-2 justify-center">
                                <Label className="text-base font-semibold">Your Design</Label>
                            </div>
                            <div className="border border-border rounded-xl p-2 bg-card shadow-lg rotate-1 hover:rotate-0 transition-transform duration-300">
                                <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-muted/20">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={resultImage} alt="Generated Outfit" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex justify-center gap-4">
                                <Button variant="outline" onClick={() => window.open(resultImage, '_blank')}>Download</Button>
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
