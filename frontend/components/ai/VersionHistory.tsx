"use client";

import { Clock, RotateCcw, ImageIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAIStore } from "@/lib/store/useAIStore";
import Image from "next/image";

export function VersionHistory() {
    const { generationHistory, setPrompt } = useAIStore();

    if (generationHistory.length === 0) {
        return (
            <div className="border border-border rounded-xl bg-card overflow-hidden h-fit opacity-50">
                <div className="p-4 border-b border-border flex items-center gap-2 bg-muted/20">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium text-sm">Recent Generations</h3>
                </div>
                <div className="p-8 text-center text-xs text-muted-foreground">
                    No history yet. Start generating!
                </div>
            </div>
        )
    }

    return (
        <div className="border border-border rounded-xl bg-card overflow-hidden h-fit">
            <div className="p-4 border-b border-border flex items-center gap-2 bg-muted/20">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium text-sm">Recent Generations</h3>
            </div>

            <ScrollArea className="h-[200px] sm:h-auto sm:max-h-[300px]">
                <div className="p-2 space-y-1">
                    {generationHistory.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setPrompt(item.prompt)}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                        >
                            <div className="h-10 w-10 bg-muted rounded-md shrink-0 flex items-center justify-center overflow-hidden relative border border-border">
                                <Image src={item.url} alt="thumbnail" fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.prompt}</p>
                                <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <RotateCcw className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-2 border-t border-border bg-muted/20 text-center">
                <Button variant="link" className="text-xs h-auto p-0 text-muted-foreground">View Full History</Button>
            </div>
        </div>
    );
}
