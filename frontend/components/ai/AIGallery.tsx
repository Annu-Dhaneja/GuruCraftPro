"use client";

import { Download, Heart, RefreshCw, Sparkles, Loader2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAIStore } from "@/lib/store/useAIStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function AIGallery() {
    const { isGenerating, generatedImages } = useAIStore();
    const hasResults = generatedImages.length > 0;

    if (isGenerating) {
        return (
            <div className="w-full h-full min-h-[400px] grid grid-cols-2 gap-4 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-xl bg-muted relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shimmer" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!hasResults) {
        return (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/10 p-12 text-center transition-all hover:bg-muted/20">
                <div className="bg-muted rounded-full p-4 mb-4">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to create?</h3>
                <p className="text-muted-foreground max-w-sm">
                    Enter a prompt and configure your settings to start generating amazing designs.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {generatedImages.map((img) => (
                <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden bg-muted border border-border shadow-sm hover:shadow-md transition-all">
                    <Image
                        src={img.url}
                        alt={img.prompt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <div className="flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-black border-0">
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-black border-0">
                                <Maximize2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-black border-0 ml-auto">
                                <Heart className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
