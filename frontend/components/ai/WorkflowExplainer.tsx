"use client";

import { ArrowRight, Sparkles, UserCheck, CheckCircle2 } from "lucide-react";

export function WorkflowExplainer() {
    return (
        <section className="py-24 border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">From AI concept to polished masterpiece</h2>
                    <p className="text-muted-foreground">How our hybrid workflow delivers the best of both worlds.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-4xl mx-auto relative">

                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center max-w-[250px] relative z-10">
                        <div className="h-16 w-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center mb-6 shadow-sm">
                            <Sparkles className="h-8 w-8" />
                        </div>
                        <h3 className="font-semibold mb-2">1. AI Generation</h3>
                        <p className="text-sm text-muted-foreground">Rapidly explore directions and generate initial concepts in seconds.</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:block h-px w-16 bg-border relative">
                        <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center max-w-[250px] relative z-10">
                        <div className="h-16 w-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mb-6 shadow-sm">
                            <UserCheck className="h-8 w-8" />
                        </div>
                        <h3 className="font-semibold mb-2">2. Manual Refinement</h3>
                        <p className="text-sm text-muted-foreground">Gurucraftpro selects the best concept and applies professional design principles.</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:block h-px w-16 bg-border relative">
                        <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center max-w-[250px] relative z-10">
                        <div className="h-16 w-16 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-6 shadow-sm">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="font-semibold mb-2">3. Final Delivery</h3>
                        <p className="text-sm text-muted-foreground">Receive production-ready assets, fully licensed and polished to perfection.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
