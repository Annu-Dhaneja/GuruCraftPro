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
        title: "Wedding Planning",
        href: "/services/wedding-plan",
        description: "Bespoke luxury wedding coordination and design.",
    },
    {
        title: "Photo Editing",
        href: "/services/photo-editor",
        description: "High-end retouching and professional image editing.",
    },
    {
        title: "Guru Ji Art Work",
        href: "/services/guru-ji-art",
        description: "Divine hand-painted and digital masterpieces.",
    },
    {
        title: "Game Design",
        description: "Immersive character and environment concepts.",
        href: "/services/game-design",
    },
    {
        title: "Vantage Ecom",
        description: "Growth-focused e-commerce design solutions.",
        href: "/services/vantage-ecom",
    },
    {
        title: "All Works",
        href: "/portfolio",
        description: "View our complete portfolio catalog.",
    },
];

const creativeLabItems = [
    {
        title: "AI Design Lab",
        href: "/ai-lab",
        description: "Explore the future of creativity with our AI-powered design tools.",
    },
    {
        title: "Virtual Try-On",
        href: "/ai-lab/virtual-try-on",
        description: "Instantly see how garments look on you with AI technology.",
    },
    {
        title: "Guru Ji Art Work",
        href: "/guruji-darshan",
        description: "Divine hand-painted and digital masterpieces for your space.",
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
                    <NavigationMenuTrigger>Expertise</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover/95 backdrop-blur-xl">
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
                    <NavigationMenuTrigger className="text-indigo-500 font-semibold">Creative Lab</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[400px] bg-popover/95 backdrop-blur-xl">
                            {creativeLabItems.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    className="hover:bg-indigo-500/5"
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/services" className={navigationMenuTriggerStyle()}>
                            Pricing
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
