import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OverviewWidgets, RecentActivity } from "@/components/dashboard/OverviewWidgets";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dashboard | Annu Design Studio",
    description: "Manage your projects and AI generations.",
};

export default function DashboardPage() {
    return (
        <DashboardShell>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground">Welcome back, Annu. Here's what's happening in your studio.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/request">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Project
                        </Button>
                    </Link>
                </div>
            </div>

            <OverviewWidgets />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
                <RecentActivity />
                {/* Placeholder for another widget or ad */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 rounded-xl border border-dashed border-border bg-muted/20 flex items-center justify-center p-8 text-muted-foreground text-sm">
                    Additional Widgets (Calendar, Messages) coming soon.
                </div>
            </div>
        </DashboardShell>
    );
}
