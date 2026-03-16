"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function UpgradeCTA() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-card/95 backdrop-blur-md border border-indigo-500/20 shadow-2xl rounded-2xl p-4 overflow-hidden"
        >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-1 -right-1 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex items-start gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-base">Love the concept?</h4>
                        <p className="text-sm text-muted-foreground leading-tight mt-1">
                            Let professionals refine it into a production-ready brand identity.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md">
                        Request Custom Polish
                    </Button>
                    <Button variant="outline" className="w-full text-xs h-8">
                        View Pricing Plans
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
