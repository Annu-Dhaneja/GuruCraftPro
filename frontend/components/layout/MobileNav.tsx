import * as React from "react";
import Link from "next/link";
import {
    Menu, X, LayoutDashboard, FileText, Settings, LogOut,
    Home, Sparkles, Zap, Layers, BookOpen, User, Mail, Briefcase, Paintbrush
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useSiteConfig } from "./SiteConfigProvider";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileNav() {
    const [open, setOpen] = React.useState(false);
    const { config } = useSiteConfig();
    // TODO: Replace with actual auth state check
    const isLoggedIn = false;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col h-full p-0">
                <SheetHeader className="p-6 text-left border-b border-border/50 bg-muted/20">
                    <SheetTitle className="text-xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                        {config.brand.name}
                    </SheetTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Premium Design Services
                    </p>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                    {/* Main Nav Items */}
                    <div className="flex flex-col gap-2">
                        {config.nav.map((item) => {
                            const isSpecial = item.style === "special";
                            const isGuru = item.style === "guru";
                            const hasItems = item.items && item.items.length > 0;
                            
                            // Map icon dynamically based on style or name 
                            let Icon = isGuru ? Paintbrush : isSpecial ? Sparkles : Layers;
                            if (item.label.toLowerCase() === 'home') Icon = Home;
                            else if (item.label.toLowerCase() === 'portfolio' || item.label.toLowerCase() === 'expertise') Icon = Briefcase;
                            else if (item.label.toLowerCase() === 'about') Icon = User;
                            else if (item.label.toLowerCase() === 'contact') Icon = Mail;
                            else if (item.label.toLowerCase() === 'learn' || item.label.toLowerCase() === 'resources') Icon = BookOpen;
                            else if (item.label.toLowerCase() === 'creative lab') Icon = Sparkles;

                            if (hasItems) {
                                return (
                                    <Accordion type="single" collapsible key={item.label} className="w-full">
                                        <AccordionItem value={item.label} className="border-none">
                                            <AccordionTrigger 
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 hover:bg-accent hover:no-underline",
                                                    isSpecial ? "text-indigo-400" : isGuru ? "text-purple-400" : "text-foreground/80"
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Icon className={cn("h-5 w-5", isSpecial ? "text-indigo-400" : isGuru ? "text-purple-400" : "text-muted-foreground")} />
                                                    {item.label}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pt-1 pb-2 px-4 flex flex-col gap-1">
                                                {item.items?.map((subItem) => (
                                                    <SheetClose key={subItem.label} asChild>
                                                        <Link
                                                            href={subItem.href}
                                                            className="flex items-center gap-3 px-8 py-2.5 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                                                        >
                                                            <div className="h-1 w-1 rounded-full bg-border" />
                                                            {subItem.label}
                                                        </Link>
                                                    </SheetClose>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                );
                            }

                            return (
                                <SheetClose key={item.label} asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                                            isSpecial
                                                ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                                                : isGuru 
                                                    ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 font-bold"
                                                    : "text-foreground/80"
                                        )}
                                    >
                                        <Icon className={cn("h-5 w-5", isSpecial ? "text-indigo-400" : isGuru ? "text-purple-400" : "text-muted-foreground")} />
                                        {item.label}
                                    </Link>
                                </SheetClose>
                            )
                        })}
                    </div>

                    <div className="mt-auto"></div>

                    {/* CTA Section */}
                    <SheetClose asChild>
                        <Link
                            href="/request"
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Zap className="h-5 w-5" />
                            Request Design
                        </Link>
                    </SheetClose>

                    {/* Auth Section */}
                    <div className="pt-6 border-t border-border mt-2">
                        {isLoggedIn ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 px-2 mb-4">
                                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-lg font-bold border border-indigo-200 shadow-sm">
                                        AU
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-base font-semibold truncate">Gurucraftpro User</p>
                                        <p className="text-sm text-muted-foreground truncate">user@example.com</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <SheetClose asChild>
                                        <Link
                                            href="/dashboard"
                                            className="flex flex-col items-center justify-center gap-2 p-3 bg-muted/40 rounded-xl hover:bg-muted transition-colors text-sm font-medium"
                                        >
                                            <LayoutDashboard className="h-5 w-5 text-indigo-500" /> Dashboard
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/portfolio"
                                            className="flex flex-col items-center justify-center gap-2 p-3 bg-muted/40 rounded-xl hover:bg-muted transition-colors text-sm font-medium"
                                        >
                                            <FileText className="h-5 w-5 text-purple-500" /> Projects
                                        </Link>
                                    </SheetClose>
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <SheetClose asChild>
                                        <Link
                                            href="/dashboard/settings"
                                            className="flex items-center gap-3 px-4 py-3 text-base text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
                                        >
                                            <Settings className="h-5 w-5" /> Settings
                                        </Link>
                                    </SheetClose>
                                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-6 text-base h-auto">
                                        <LogOut className="mr-3 h-5 w-5" />
                                        Log out
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Button variant="outline" className="w-full justify-center h-12 text-base" asChild>
                                    <Link href="/login">Log in</Link>
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-2">
                                    New here? <Link href="/signup" className="text-indigo-600 font-medium underline-offset-4 hover:underline">Create an account</Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
