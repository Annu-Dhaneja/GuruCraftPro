"use client";

import { useState } from "react";
import { Wand2, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAIStore } from "@/lib/store/useAIStore";
import { cn } from "@/lib/utils";

export function AIPromptInput() {
    // Local state for enhance toggle only
    const [enhance, setEnhance] = useState(false);

    // Global store state
    const { prompt, setPrompt, generateImages, isGenerating } = useAIStore();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateImages();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-12">
            <div className={cn(
                "bg-muted/30 border border-border rounded-xl p-4 shadow-sm transition-all duration-300",
                isGenerating ? "opacity-75 pointer-events-none ring-2 ring-indigo-500/50" : "focus-within:ring-2 focus-within:ring-indigo-500/20"
            )}>
                <Textarea
                    placeholder="Describe your design idea... (e.g., 'Minimalist logo for a fintech startup, blue and white color scheme')"
                    className="min-h-[120px] bg-transparent border-0 focus-visible:ring-0 resize-none text-lg placeholder:text-muted-foreground/50"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/50">
                    {/* Left Controls */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                            <Mic className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 pl-2 border-l border-border/50">
                            <Switch id="enhance-mode" checked={enhance} onCheckedChange={setEnhance} />
                            <Label htmlFor="enhance-mode" className="text-xs font-medium cursor-pointer select-none">
                                Enhance Prompt <span className="text-indigo-500 text-[10px] ml-1 bg-indigo-500/10 px-1 py-0.5 rounded">BETA</span>
                            </Label>
                        </div>
                    </div>

                    {/* Right / Counter */}
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground hidden sm:inline-block">
                            {prompt.length} / 1000
                        </span>
                        <Button
                            onClick={() => generateImages()}
                            disabled={!prompt.trim() || isGenerating}
                            className={cn(
                                "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all",
                                isGenerating && "animate-pulse"
                            )}
                        >
                            {isGenerating ? (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Sample Prompts */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2 no-scrollbar">
                {["Futuristic sneaker poster", "Abstract geometric wallpaper", "Coffee shop branding kit"].map(sample => (
                    <button
                        key={sample}
                        onClick={() => setPrompt(sample)}
                        disabled={isGenerating}
                        className="whitespace-nowrap px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted text-xs transition-colors disabled:opacity-50"
                    >
                        {sample}
                    </button>
                ))}
            </div>
        </div>
    );
}
