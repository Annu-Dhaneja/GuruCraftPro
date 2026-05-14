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
    if (pathname && (
        pathname.startsWith('/dashboard') || 
        pathname.startsWith('/admin') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup') ||
        pathname.startsWith('/ai-lab') ||
        pathname.startsWith('/portfolio/') ||
        pathname.startsWith('/wedding')
    )) {
        return null;
    }

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
                scrolled
                    ? "bg-[#020617]/80 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    : "bg-transparent py-6 border-b border-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-2 z-50 group">
                    {config?.brand?.logo_url ? (
                        <div className="relative h-8 w-32 sm:h-10 sm:w-40 md:h-12 md:w-56 transition-all duration-500 group-hover:scale-105 group-hover:brightness-110">
                            {/* If it's the default logo, it has a dark/light version. Otherwise, just show the uploaded image as-is. */}
                            {typeof config.brand.logo_url === 'string' && config.brand.logo_url.includes('dark-v4.svg') ? (
                                <>
                                    <Image
                                        src={config.brand.logo_url}
                                        alt={config.brand.name || "GuruCraft Pro"}
                                        fill
                                        className="object-contain object-left hidden dark:block"
                                        priority
                                    />
                                    <Image
                                        src={config.brand.logo_url.replace('dark-v4.svg', 'light-v4.svg')}
                                        alt={config.brand.name || "GuruCraft Pro"}
                                        fill
                                        className="object-contain object-left block dark:hidden"
                                        priority
                                    />
                                </>
                            ) : (
                                <Image
                                    src={config.brand.logo_url}
                                    alt={config.brand.name || "GuruCraft Pro"}
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            )}
                        </div>
                    ) : (
                        <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
                            {config?.brand?.logo_text || "GURUCRAFT"}
                        </span>
                    )}
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                    <NavLinks />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-6">

                    {/* Desktop Only CTA - Secondary */}
                    <Button 
                        variant="outline" 
                        className="hidden sm:flex rounded-full px-6 md:px-8 border-white/10 hover:bg-white hover:text-black transition-all duration-500 font-bold text-xs md:text-sm" 
                        asChild
                    >
                        <Link href="/request">INQUIRE NOW</Link>
                    </Button>

                    <div className="flex items-center gap-1 md:gap-2">
                        {/* Theme Switcher */}
                        <ThemeToggle />

                        {/* User Menu / Auth */}
                        <UserMenu />

                        {/* Mobile Menu Trigger */}
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
}
