"use client";

import { useState } from "react";
import { PenTool, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export default function LogoGeneratorPage() {
    const [prompt, setPrompt] = useState("");
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) {
            setError("Please describe the logo you want to generate.");
            return;
        }

        setIsProcessing(true);
        setError(null);
        setResultImage(null);

        try {
            const response = await fetch(getApiUrl("/api/v1/ai-lab/generate-logo"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate logo. Please try again.");
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
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-indigo-500/10 mb-4">
                            <PenTool className="h-8 w-8 text-indigo-500" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">AI Logo Generator</h1>
                        <p className="text-muted-foreground">Create professional logos and brand identities in seconds.</p>
                    </div>

                    {/* Input Section */}
                    <div className="space-y-6 bg-card border rounded-xl p-6 shadow-sm">
                        <div className="space-y-2">
                            <Label htmlFor="prompt">Describe your brand & logo Idea</Label>
                            <Textarea
                                id="prompt"
                                placeholder="E.g., A minimalist geometric fox logo, orange and black, vector style..."
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
                            className="w-full h-12 text-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
                            onClick={handleGenerate}
                            disabled={isProcessing || !prompt}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating Brand...
                                </>
                            ) : (
                                <>
                                    <PenTool className="mr-2 h-5 w-5" />
                                    Generate Logo
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Result Section */}
                    {resultImage && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-2 justify-center">
                                <Label className="text-base font-semibold">Your New Logo</Label>
                            </div>
                            <div className="border border-border rounded-xl p-8 bg-card shadow-lg flex items-center justify-center bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))]">
                                <div className="h-64 w-64 relative rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-border">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={resultImage} alt="Generated Logo" className="w-full h-full object-contain p-4" />
                                </div>
                            </div>
                            <div className="flex justify-center gap-4">
                                <Button variant="outline" onClick={() => window.open(resultImage, '_blank')}>Download SVG/PNG</Button>
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
