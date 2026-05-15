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

import { useSiteConfig } from "./SiteConfigProvider";

export function NavLinks() {
    const { config } = useSiteConfig();

    return (
        <NavigationMenu className="hidden lg:flex" delayDuration={0}>
            <NavigationMenuList>
                {config.nav.map((item) => {
                    const hasItems = item.items && item.items.length > 0;
                    const isSpecial = item.style === "special";
                    const isGuru = item.style === "guru";

                    if (hasItems) {
                        return (
                            <NavigationMenuItem key={item.label}>
                                <NavigationMenuTrigger className={cn(
                                    isSpecial && "text-indigo-400 font-semibold",
                                    isGuru && "text-purple-400 font-bold"
                                )}>
                                    {item.label}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className={cn(
                                        "grid w-[400px] gap-3 p-4 md:w-[500px] bg-popover/95 backdrop-blur-xl",
                                        item.items!.length > 4 ? "md:grid-cols-2 lg:w-[600px]" : "lg:w-[400px]"
                                    )}>
                                        {item.items?.map((subItem) => (
                                            <ListItem
                                                key={subItem.label}
                                                title={subItem.label}
                                                href={subItem.href}
                                                className={cn(isSpecial && "hover:bg-indigo-500/5")}
                                            >
                                                {subItem.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        );
                    }

                    return (
                        <NavigationMenuItem key={item.label}>
                            <NavigationMenuLink asChild>
                                <Link 
                                    href={item.href} 
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        isSpecial && "text-indigo-400 font-semibold",
                                        isGuru && "text-purple-400 font-bold"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    );
                })}
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
