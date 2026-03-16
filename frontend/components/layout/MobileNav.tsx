import * as React from "react";
import Link from "next/link";
import {
    Menu, X, LayoutDashboard, FileText, Settings, LogOut,
    Home, Sparkles, Zap, Layers, BookOpen, User, Mail, Briefcase
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

// Enhanced structure with icons
const navItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "Portfolio", href: "/portfolio", icon: Briefcase },
    { title: "AI Design Lab", href: "/ai-lab", isSpecial: true, icon: Sparkles },
    { title: "Services", href: "/services", icon: Layers },
    { title: "Learn", href: "/resources", icon: BookOpen },
    { title: "About", href: "/about", icon: User },
    { title: "Contact", href: "/contact", icon: Mail },
];

export function MobileNav() {
    const [open, setOpen] = React.useState(false);
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
                        Gurucraftpro
                    </SheetTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Premium Design Services
                    </p>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                    {/* Main Nav Items */}
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <SheetClose key={item.title} asChild>
                                <Link
                                    href={item.href}
                                    className={`
                                        flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200
                                        hover:bg-accent hover:text-accent-foreground
                                        ${item.isSpecial
                                            ? "bg-indigo-50/50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                                            : "text-foreground/80"
                                        }
                                    `}
                                >
                                    <item.icon className={`h-5 w-5 ${item.isSpecial ? "text-indigo-500" : "text-muted-foreground"}`} />
                                    {item.title}
                                </Link>
                            </SheetClose>
                        ))}
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
