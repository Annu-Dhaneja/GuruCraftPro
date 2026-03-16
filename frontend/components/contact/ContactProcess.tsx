"use client";

import { MessageSquare, Clock, UserCheck, Rocket } from "lucide-react";

const steps = [
    { icon: MessageSquare, title: "Message Received", desc: "You submit the form." },
    { icon: Clock, title: "24h Review", desc: "We analyze your request." },
    { icon: UserCheck, title: "Follow-up", desc: "Proposal or questions." },
    { icon: Rocket, title: "Kickoff", desc: "Project starts." },
];

export function ContactProcess() {
    return (
        <section className="py-20 bg-muted/20 border-y border-border">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold mb-2">What happens next?</h2>
                    <p className="text-muted-foreground">A transparent look at our onboarding process.</p>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 relative max-w-4xl mx-auto">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-0.5 bg-border -z-10" />

                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center bg-background p-4 rounded-xl border border-transparent hover:border-border transition-colors w-40">
                            <div className="h-12 w-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 border-4 border-background">
                                <step.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                            <p className="text-xs text-muted-foreground">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
