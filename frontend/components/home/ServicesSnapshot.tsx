"use client";

import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
    {
        title: "AI-Only Design",
        description: "Instant generation for quick ideas and mockups. Best for brainstorming.",
        price: "₹2,500",
        features: [
            "Unlimited AI Generations",
            "High-Res Downloads",
            "Commercial Use License",
            "Basic Editing Tools",
        ],
        cta: "Start Free Trial",
        popular: false,
    },
    {
        title: "AI + Manual Refinement",
        description: "AI speed with professional designer polish. Best for small businesses.",
        price: "₹15,000",
        features: [
            "Everything in AI-Only",
            "Expert Designer Review",
            "Vector Source Files",
            "2 Rounds of Revisions",
            "Brand Guidelines",
        ],
        cta: "Get Started",
        popular: true,
    },
    {
        title: "Fully Custom Design",
        description: "Bespoke branding for serious businesses. Complete creative direction.",
        price: "₹80,000",
        features: [
            "Dedicated Senior Designer",
            "Complete Brand Identity",
            "Unlimited Revisions",
            "Priority Support",
            "Copyright Transfer",
        ],
        cta: "Contact Us",
        popular: false,
    },
];

export function ServicesSnapshot() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden w-full max-w-full">
            {/* Background Accent - Strictly Clipped */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl -z-10" />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <Badge variant="secondary" className="mb-4 px-3 py-1 shadow-sm bg-indigo-50 text-indigo-700 border-indigo-100/50">Pricing Plans</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Flexible investments for <span className="text-indigo-600">every stage</span>.
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                        Choose the perfect balance of AI automation and human expertise.
                        Transparent pricing, no hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {plans.map((plan) => (
                        <Card
                            key={plan.title}
                            className={`flex flex-col relative transition-all duration-500 group h-full ${plan.popular
                                ? "border-indigo-500/30 shadow-2xl shadow-indigo-500/10 bg-background z-10 scale-100 md:scale-105 ring-1 ring-indigo-500/20"
                                : "border-border/50 shadow-sm bg-background/40 hover:bg-background/80 hover:border-indigo-500/20"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                                    </span>
                                </div>
                            )}

                            <CardHeader className="pb-8">
                                <CardTitle className={`text-xl font-bold ${plan.popular ? "text-indigo-600" : "text-foreground"}`}>
                                    {plan.title}
                                </CardTitle>
                                <CardDescription className="min-h-[48px] mt-2 text-base leading-relaxed">
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 pb-8">
                                <div className="mb-8 flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-bold tracking-tight">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-muted-foreground">/project</span>}
                                </div>
                                <div className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-foreground transition-colors">
                                            <div className={`mr-3 h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? "bg-indigo-100 text-indigo-600" : "bg-muted text-muted-foreground"
                                                }`}>
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Button
                                    variant={plan.popular ? "default" : "outline"}
                                    className={`w-full h-12 text-base rounded-xl transition-all ${plan.popular
                                        ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                                        : "hover:border-indigo-500/50 hover:text-indigo-600"
                                        }`}
                                >
                                    {plan.cta} {plan.popular && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
