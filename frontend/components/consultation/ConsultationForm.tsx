"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown, Check } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const styles = ["Formal", "Casual", "Traditional", "Fusion"];

export function ConsultationForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
    const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [selectedStyle, setSelectedStyle] = useState(styles[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ start_date: startDate, style_preference: selectedStyle });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Start Date</label>
                    <div className="relative">
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="pl-12 h-14 bg-white/5 border-white/10 rounded-xl focus:ring-purple-500/50"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">Select the first day of your 7-day plan.</p>
                </div>

                {/* Style Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Style Preference</label>
                    <div className="grid grid-cols-2 gap-3">
                        {styles.map((style) => (
                            <button
                                key={style}
                                type="button"
                                onClick={() => setSelectedStyle(style)}
                                className={`h-14 rounded-xl border transition-all flex items-center justify-center gap-2 px-4 ${
                                    selectedStyle === style
                                        ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                                }`}
                            >
                                {style}
                                {selectedStyle === style && <Check className="h-4 w-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg font-semibold shadow-2xl shadow-purple-600/40 transition-all active:scale-[0.98]"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyzing Wardrobe...
                        </div>
                    ) : (
                        "Generate My Weekly Look"
                    )}
                </Button>
                <p className="text-center text-muted-foreground mt-4 text-sm italic">
                    Our AI stylist will calculate the optimal mix based on your choices.
                </p>
            </div>
        </form>
    );
}
