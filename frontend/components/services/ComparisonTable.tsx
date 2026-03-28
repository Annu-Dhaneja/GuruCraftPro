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

export function ComparisonTable({ data }: { data?: any }) {
    const title = data?.title || "Compare Plans";
    const subtitle = "Find the right fit for your project's needs.";
    const columns = data?.columns || ["AI Only", "AI + Manual", "Fully Custom"];
    const rows = data?.rows || [
        { label: "Speed", values: ["Instant", "2-5 Days", "5-10 Days"] },
        { label: "Human Expertise", values: ["No", "Yes", "Yes"] },
        { label: "Source Files", values: ["No", "Yes", "Yes"] }
    ];


    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-muted-foreground">{subtitle}</p>
                </div>

                <div className="bg-card border border-border rounded-2xl overflow-x-auto shadow-sm">
                    <Table className="min-w-[600px]">
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="w-[30%] pl-6">Feature</TableHead>
                                {columns.map((col: string, idx: number) => (
                                    <TableHead key={idx} className="text-center font-bold text-indigo-400">
                                        {col}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row: any, i: number) => (
                                <TableRow key={i} className="hover:bg-muted/20">
                                    <TableCell className="font-medium pl-6">
                                        {row.label}
                                    </TableCell>
                                    {(row.values || []).map((val: any, j: number) => (
                                        <TableCell key={j} className="text-center">
                                            <CellContent value={val} />
                                        </TableCell>
                                    ))}
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
    if (value === true || value === "Yes" || value === "yes") return <div className="flex justify-center"><Check className="h-5 w-5 text-green-500" /></div>;
    if (value === false || value === "No" || value === "no") return <div className="flex justify-center"><X className="h-5 w-5 text-muted-foreground/30" /></div>;
    return <span className="text-sm font-medium">{value}</span>;
}
