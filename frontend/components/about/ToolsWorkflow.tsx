"use client";

import { Figma, PenTool } from "lucide-react";

// Mocking icons for specific tools since Lucide doesn't have all brand logos
const steps = [
    { title: "Define", desc: "Understand goals" },
    { title: "Explore", desc: "AI + Manual ideas" },
    { title: "Refine", desc: "Polish with intent" },
    { title: "Deliver", desc: "Final assets" },
];

export function ToolsWorkflow({ data }: { data?: any }) {
    const steps = [
        { title: "Define", desc: "Understand goals" },
        { title: "Explore", desc: "AI + Manual ideas" },
        { title: "Refine", desc: "Polish with intent" },
        { title: "Deliver", desc: "Final assets" },
    ];

    return (
        <section className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4 md:px-6 text-center">

                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8">{data?.title || "Tools of Trade"}</h2>
                    <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {data?.tools?.map((tool: string) => (
                             <div key={tool} className="text-xl font-bold flex items-center gap-2">
                                 {tool.includes("Figma") && <Figma className="h-6 w-6" />}
                                 {tool.includes("Adobe") && <PenTool className="h-6 w-6" />}
                                 {tool}
                             </div>
                        )) || (
                            <>
                                <div className="text-xl font-bold flex items-center gap-2"><Figma className="h-6 w-6" /> Figma</div>
                                <div className="text-xl font-bold flex items-center gap-2">Adobe Creative Cloud</div>
                                <div className="text-xl font-bold flex items-center gap-2">Midjourney</div>
                                <div className="text-xl font-bold flex items-center gap-2">ChatGPT</div>
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-10">Our Workflow</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
                        {steps.map((step, i) => (
                            <div key={step.title} className="flex flex-col md:flex-row items-center w-full">
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="h-10 w-10 sorted-full rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-semibold">{step.title}</h3>
                                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                                </div>
                                {/* Connector Line */}
                                {i !== steps.length - 1 && (
                                    <div className="h-8 w-0.5 md:h-0.5 md:w-full bg-border my-2 md:my-0 relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 hidden md:block" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
