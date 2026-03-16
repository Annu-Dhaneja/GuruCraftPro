"use client";

import { Check, X, HelpCircle } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const features = [
    { name: "Speed", ai: "Instant", hybrid: "2-5 Days", custom: "5-10 Days", desc: "Turnaround time from request to delivery." },
    { name: "Human Expertise", ai: false, hybrid: true, custom: true, desc: "Involvement of professional human designers." },
    { name: "Customization", ai: "Low", hybrid: "Medium", custom: "High", desc: "Ability to tailor details to specific requirements." },
    { name: "Revisions", ai: "Regenerate", hybrid: "2 Rounds", custom: "Unlimited", desc: "Number of feedback loops included." },
    { name: "Commercial Use", ai: "Paid", hybrid: "Included", custom: "Included", desc: "Rights to use the design for commercial purposes." },
    { name: "Source Files", ai: false, hybrid: true, custom: true, desc: "Access to editable vector files (SVG, AI, FIG)." },
    { name: "Brand Guidelines", ai: false, hybrid: false, custom: true, desc: "Comprehensive guide on usage, fonts, and colors." },
];

export function ComparisonTable() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
                    <p className="text-muted-foreground">Find the right fit for your project's needs.</p>
                </div>

                <div className="bg-card border border-border rounded-2xl overflow-x-auto shadow-sm">
                    <Table className="min-w-[600px]">
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="w-[30%] pl-6">Feature</TableHead>
                                <TableHead className="text-center w-[20%] text-indigo-600 font-bold">AI Only</TableHead>
                                <TableHead className="text-center w-[25%] text-purple-600 font-bold bg-purple-50/50 dark:bg-purple-900/10">AI + Manual</TableHead>
                                <TableHead className="text-center w-[25%] text-pink-600 font-bold">Fully Custom</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {features.map((feature) => (
                                <TableRow key={feature.name} className="hover:bg-muted/20">
                                    <TableCell className="font-medium pl-6">
                                        <div className="flex items-center gap-2">
                                            {feature.name}
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{feature.desc}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <CellContent value={feature.ai} />
                                    </TableCell>
                                    <TableCell className="text-center bg-purple-50/30 dark:bg-purple-900/5">
                                        <CellContent value={feature.hybrid} />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <CellContent value={feature.custom} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
}

function CellContent({ value }: { value: string | boolean }) {
    if (value === true) return <div className="flex justify-center"><Check className="h-5 w-5 text-green-500" /></div>;
    if (value === false) return <div className="flex justify-center"><X className="h-5 w-5 text-muted-foreground/30" /></div>;
    return <span className="text-sm">{value}</span>;
}
