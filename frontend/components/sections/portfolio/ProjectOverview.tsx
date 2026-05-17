"use client";

import { Calendar, Briefcase, User, PenTool } from "lucide-react";

interface InfoBlockProps {
    icon: any;
    label: string;
    value: string;
}

function InfoBlock({ icon: Icon, label, value }: InfoBlockProps) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</h4>
                <p className="font-medium text-base md:text-lg">{value}</p>
            </div>
        </div>
    );
}

export function ProjectOverview({ client, timeline, role, challenge, solution }: any) {
    return (
        <section className="py-20 border-b border-border bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
                    <InfoBlock icon={User} label="Client" value={client} />
                    <InfoBlock icon={Calendar} label="Timeline" value={timeline} />
                    <InfoBlock icon={Briefcase} label="Role" value={role} />
                    <InfoBlock icon={PenTool} label="Tools" value="Figma, AI, WebGL" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-lg leading-relaxed">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-px w-8 bg-primary" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">The Challenge</h3>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">Uncovering the core problem.</h2>
                        <p className="text-muted-foreground">{challenge}</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-px w-8 bg-primary" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">The Solution</h3>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">Crafting a digital masterpiece.</h2>
                        <p className="text-muted-foreground">{solution}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
