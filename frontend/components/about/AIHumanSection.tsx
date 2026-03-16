"use client";

import { Zap, Brain, Rocket, Award } from "lucide-react";

export function AIHumanSection({ data }: { data?: any }) {
    if (!data) return null;

    return (
        <section className="py-24 container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 opacity-50" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">{data.title || "Why AI + Human Design?"}</h2>
                    <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                        {data.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        {/* We'll assume the first two features are the main blocks if provided, 
                            otherwise fallback to the split view logic if we want to keep it identical.
                            For now, let's keep the two blocks but make their content dynamic.
                        */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                            <div className="flex items-center gap-4 mb-4">
                                <Zap className="h-8 w-8 text-yellow-400" />
                                <h3 className="text-xl font-bold">AI Accelerates</h3>
                            </div>
                            <ul className="space-y-2 text-indigo-100/80 list-disc list-inside">
                                {data.features?.slice(0, 3).map((f: string) => <li key={f}>{f}</li>) || (
                                    <>
                                        <li>Rapid concept ideation and exploration</li>
                                        <li>Generates varied layout options instantly</li>
                                        <li>Automates repetitive tasks</li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                            <div className="flex items-center gap-4 mb-4">
                                <Brain className="h-8 w-8 text-pink-400" />
                                <h3 className="text-xl font-bold">Human Refines</h3>
                            </div>
                            <ul className="space-y-2 text-indigo-100/80 list-disc list-inside">
                                {data.features?.slice(3, 6).map((f: string) => <li key={f}>{f}</li>) || (
                                    <>
                                        <li>Ensures emotional resonance and brand fit</li>
                                        <li>Detailed typographic and color tuning</li>
                                        <li>Strategic problem solving</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
