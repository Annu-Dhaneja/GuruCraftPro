"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import { useSiteConfig } from "./SiteConfigProvider";
import Image from "next/image";
import { PremiumButton } from "@/components/shared/UI";

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const { config } = useSiteConfig();
    const pathname = usePathname();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out",
                scrolled
                    ? "bg-white/80 backdrop-blur-3xl border-b border-slate-100 py-3 shadow-2xl"
                    : "bg-transparent py-8 border-b border-transparent"
            )}
        >
            <div className="container flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-2 z-50 group">
                    {config?.brand?.logo_url ? (
                        <div className="relative h-10 w-40 md:h-12 md:w-56 transition-all duration-500 group-hover:scale-105">
                             <Image
                                src={config.brand.logo_url}
                                alt={config.brand.name || "GuruCraft Pro"}
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    ) : (
                        <span className={cn(
                            "text-2xl font-black tracking-tighter uppercase italic leading-none transition-colors",
                            scrolled ? "text-slate-900" : "text-white"
                        )}>
                            {config?.brand?.logo_text || "GURUCRAFT"}
                        </span>
                    )}
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                    <NavLinks />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 md:gap-8">
                    {/* Theme Switcher */}
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    {/* Desktop Only CTA */}
                    <Link href="/request" className="hidden sm:block">
                        <PremiumButton 
                            variant="secondary"
                            size="sm"
                            className={cn(
                                "rounded-2xl border-slate-100 font-black italic uppercase tracking-widest text-[10px]",
                                !scrolled && "bg-white/10 text-white border-white/20 hover:bg-white hover:text-slate-900"
                            )}
                        >
                            INQUIRE NOW
                        </PremiumButton>
                    </Link>

                    <div className="flex items-center gap-2">
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
