"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Clock, Package, Wand2 } from "lucide-react";

export function OverviewWidgets() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Active Projects"
                value="3"
                icon={Package}
                trend="+1 this month"
                trendColor="text-green-500"
            />
            <StatsCard
                title="AI Generations"
                value="128"
                icon={Wand2}
                trend="+24% from last week"
                trendColor="text-indigo-500"
            />
            <StatsCard
                title="Pending Actions"
                value="1"
                icon={Clock}
                description="Review pending"
            />
            <StatsCard
                title="Credits Remaining"
                value="450"
                icon={ArrowUpRight}
                description="Refills on Oct 1"
            />
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, trend, trendColor, description }: any) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(trend || description) && (
                    <p className={cn("text-xs mt-1", trendColor ? trendColor : "text-muted-foreground")}>
                        {trend || description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function RecentActivity() {
    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {[
                        { title: "Generated 4 logos for 'Neon Coffee'", time: "2 hours ago", type: "AI" },
                        { title: "Submitted request for 'Tech Brand Guide'", time: "Yesterday", type: "Project" },
                        { title: "Updated profile information", time: "2 days ago", type: "Settings" },
                        { title: "Downloaded 'Cyberpunk Poster' assets", time: "3 days ago", type: "Download" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mr-4 border border-border">
                                {item.type === "AI" ? <Wand2 className="h-4 w-4 text-indigo-500" /> : <Clock className="h-4 w-4 text-muted-foreground" />}
                            </div>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                            <div className="ml-auto font-medium">
                                <Button variant="ghost" size="sm">View</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
