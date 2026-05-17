"use client";

import {
    Palette,
    LayoutTemplate,
    Monitor,
    Smartphone,
    Type,
    Settings2,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAIStore } from "@/lib/store/useAIStore";
import { cn } from "@/lib/utils";

export function DesignControls() {
    const {
        style, setStyle,
        aspectRatio, setAspectRatio,
        designType, setDesignType,
        generateImages, isGenerating, prompt
    } = useAIStore();

    return (
        <div className="w-full p-6 bg-card border border-border rounded-xl space-y-8 h-full sticky top-24">
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-border">
                <Settings2 className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold">Configuration</h3>
            </div>

            {/* Design Type */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Design Type</Label>
                <div className="grid grid-cols-2 gap-2">
                    <TypeButton
                        icon={LayoutTemplate}
                        label="Logo"
                        active={designType === "Logo"}
                        onClick={() => setDesignType("Logo")}
                    />
                    <TypeButton
                        icon={Type}
                        label="Posters"
                        active={designType === "Posters"}
                        onClick={() => setDesignType("Posters")}
                    />
                    <TypeButton
                        icon={Monitor}
                        label="Web UI"
                        active={designType === "Web UI"}
                        onClick={() => setDesignType("Web UI")}
                    />
                    <TypeButton
                        icon={Smartphone}
                        label="Social"
                        active={designType === "Social"}
                        onClick={() => setDesignType("Social")}
                    />
                </div>
            </div>

            {/* Style */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Style Aesthetic</Label>
                <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="minimal">Minimalist & Clean</SelectItem>
                        <SelectItem value="modern">Modern & Bold</SelectItem>
                        <SelectItem value="luxury">Luxury & Elegant</SelectItem>
                        <SelectItem value="cyberpunk">Cyberpunk / Neon</SelectItem>
                        <SelectItem value="playful">Playful & 3D</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Aspect Ratio</Label>
                <RadioGroup value={aspectRatio} onValueChange={setAspectRatio} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1:1" id="r1" />
                        <Label htmlFor="r1">Square (1:1)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="16:9" id="r2" />
                        <Label htmlFor="r2">Landscape</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="9:16" id="r3" />
                        <Label htmlFor="r3">Portrait</Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Color Palette */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Color Palette</Label>
                <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-white to-gray-200 border border-gray-300 cursor-pointer ring-2 ring-indigo-500 ring-offset-2 transition-all hover:scale-110" />
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 cursor-pointer hover:scale-110 transition-transform opacity-70 hover:opacity-100" />
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 cursor-pointer hover:scale-110 transition-transform opacity-70 hover:opacity-100" />
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 cursor-pointer hover:scale-110 transition-transform opacity-70 hover:opacity-100" />
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-800 to-black cursor-pointer hover:scale-110 transition-transform opacity-70 hover:opacity-100" />
                </div>
            </div>

            <div className="pt-4 border-t border-border">
                <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base shadow-lg shadow-indigo-500/20"
                    onClick={() => generateImages()}
                    disabled={isGenerating || !prompt.trim()}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        "Generate Designs"
                    )}
                </Button>
            </div>
        </div>
    );
}

function TypeButton({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200",
                active
                    ? "bg-indigo-500/10 border-indigo-500 text-indigo-500 shadow-sm"
                    : "bg-muted/30 border-border hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
        >
            <Icon className="h-5 w-5 mb-2" />
            <span className="text-xs font-medium">{label}</span>
        </button>
    )
}
