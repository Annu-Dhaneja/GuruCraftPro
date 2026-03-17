"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const portfolioItems = [
    {
        title: "Logo Design",
        href: "/portfolio?category=Logo Design",
        description: "Memorable logos that define your brand identity.",
    },
    {
        title: "Branding",
        href: "/portfolio?category=Branding",
        description: "Complete visual identity systems and guidelines.",
    },
    {
        title: "UI / UX",
        href: "/portfolio?category=UI / UX",
        description: "Intuitive and beautiful digital experiences.",
    },
    {
        title: "Social Media",
        href: "/portfolio?category=Social Media",
        description: "Engaging content for Instagram, LinkedIn, and more.",
    },
    {
        title: "Posters & Print",
        href: "/portfolio?category=Wedding Card",
        description: "High-impact print materials and posters.",
    },
    {
        title: "All Works",
        href: "/portfolio",
        description: "View our complete portfolio catalog.",
    },
];

export function NavLinks() {
    return (
        <NavigationMenu className="hidden lg:flex" delayDuration={0}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/" className={navigationMenuTriggerStyle()}>
                            Home
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Portfolio</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover/95 backdrop-blur-sm">
                            {portfolioItems.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/ai-lab" className={cn(navigationMenuTriggerStyle(), "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 text-indigo-500 hover:text-indigo-600 font-medium")}>
                            AI Design Lab
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/ai-lab/virtual-try-on" className={cn(navigationMenuTriggerStyle(), "bg-gradient-to-r from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 text-pink-500 hover:text-pink-600 font-medium")}>
                            Virtual Try-On
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/guruji-darshan" className={cn(navigationMenuTriggerStyle(), "bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-orange-600 dark:text-orange-400 font-bold")}>
                            Guru Ji Art Work
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/services" className={navigationMenuTriggerStyle()}>
                            Services
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/resources" className={navigationMenuTriggerStyle()}>
                            Learn
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/about" className={navigationMenuTriggerStyle()}>
                            About
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/contact" className={navigationMenuTriggerStyle()}>
                            Contact
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={props.href || "#"}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
