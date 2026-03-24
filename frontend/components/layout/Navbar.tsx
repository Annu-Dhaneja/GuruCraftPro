"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useSiteConfig } from "./SiteConfigProvider";
import Image from "next/image";

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const { config } = useSiteConfig();
    const pathname = usePathname();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to check if we should show the navbar
    if (pathname && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
        return null;
    }

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-2 z-50 group">
                    {config.brand.logo_url ? (
                        <div className="relative h-16 w-48 md:h-20 md:w-64 transition-transform group-hover:scale-105">
                            <Image
                                src={config.brand.logo_url}
                                alt={config.brand.name}
                                fill
                                className="object-contain object-left mix-blend-screen"
                                priority
                            />
                        </div>
                    ) : (
                        <>
                            <div className="h-8 w-8 bg-foreground rounded-br-xl rounded-tl-xl flex items-center justify-center transition-transform group-hover:scale-105">
                                <span className="text-background font-bold text-lg">{config.brand.logo_text}</span>
                            </div>
                            <span className="font-bold text-lg tracking-tight hidden sm:block">
                                {config.brand.name}
                            </span>
                        </>
                    )}
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
                    <NavLinks />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4">

                    {/* Desktop Only CTA - Secondary */}
                    <Button variant="outline" className="hidden lg:flex" asChild>
                        <Link href="/request">Request Design</Link>
                    </Button>

                    {/* Theme Switcher */}
                    <ThemeToggle />

                    {/* User Menu / Auth */}
                    <UserMenu />

                    {/* Mobile Menu Trigger */}
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
