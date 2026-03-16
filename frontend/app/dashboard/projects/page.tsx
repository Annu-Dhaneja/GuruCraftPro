"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";

const projects = [
    { name: "Neon Coffee Branding", client: "Neon Coffee Co.", status: "In Progress", date: "Jan 15, 2026", type: "Branding" },
    { name: "TechStart Pitch Deck", client: "TechStart Inc.", status: "Review", date: "Jan 12, 2026", type: "Presentation" },
    { name: "EcoLife Social Pack", client: "EcoLife", status: "Completed", date: "Jan 10, 2026", type: "Social Media" },
    { name: "Luxury Estate Brochure", client: "Azure Real Estate", status: "Completed", date: "Jan 05, 2026", type: "Print" },
];

export default function ProjectsPage() {
    return (
        <DashboardShell>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
                    <p className="text-muted-foreground">Manage and track your ongoing design requests.</p>
                </div>
                <Link href="/request">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Project
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Project Name</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Client</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Type</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {projects.map((project) => (
                                    <tr key={project.name} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">{project.name}</td>
                                        <td className="p-4 align-middle">{project.client}</td>
                                        <td className="p-4 align-middle">{project.type}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={project.status === "Completed" ? "default" : project.status === "In Progress" ? "secondary" : "outline"}>
                                                {project.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">{project.date}</td>
                                        <td className="p-4 align-middle text-right">
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Menu</span>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </DashboardShell>
    );
}
